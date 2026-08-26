#!/usr/bin/env node
/**
 * VARZIN — SEO/Social meta tag injector
 * -------------------------------------
 * Run this once per deploy (or wire it into a git pre-commit hook / GitHub
 * Action — see seo-meta.yml) and it will insert or refresh a standard block
 * of <meta>, <link rel="canonical">, and JSON-LD tags in the <head> of every
 * .html file in the repo, using a single shared config (seo-meta.config.json).
 *
 * - Safe to re-run: it looks for the markers
 *     <!-- SEO-META:START --> ... <!-- SEO-META:END -->
 *   and replaces only what's between them. If a page doesn't have the
 *   markers yet, it inserts them right after the opening <head> tag.
 * - Canonical URL is derived automatically from the file's path relative to
 *   the repo root, so you never hand-edit a URL again:
 *     index.html            -> https://varzin.org/
 *     atlas.html             -> https://varzin.org/atlas.html
 *     sub/page.html          -> https://varzin.org/sub/page.html
 * - Add new .html files anywhere in the repo and just re-run the script —
 *   no config changes needed unless you want to exclude a file.
 *
 * Usage:
 *   node inject-seo-meta.js                # scans from repo root (cwd)
 *   node inject-seo-meta.js ./public        # scans a specific directory
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(process.argv[2] || ".");
const CONFIG_PATH = path.join(__dirname, "seo-meta.config.json");
const START_MARK = "<!-- SEO-META:START -->";
const END_MARK = "<!-- SEO-META:END -->";

const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  ".github",
  "dist",
  "build",
]);

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`Config not found: ${CONFIG_PATH}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
}

function findHtmlFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        findHtmlFiles(path.join(dir, entry.name), files);
      }
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

function canonicalUrlFor(filePath, cfg) {
  const rel = path.relative(ROOT, filePath).split(path.sep).join("/");
  const base = cfg.baseUrl.replace(/\/$/, "");
  if (rel === "index.html") return `${base}/`;
  return `${base}/${rel}`;
}

function buildMetaBlock(canonicalUrl, cfg) {
  return `${START_MARK}
<!-- Auto-generated — do not hand-edit between these markers.
     Edit seo-meta.config.json and re-run inject-seo-meta.js instead. -->
<meta name="robots" content="index, follow">
<meta name="generator" content="${cfg.generator}">
<meta name="rating" content="General">

<link rel="canonical" href="${canonicalUrl}" />

<meta property="og:type" content="website">
<meta property="og:site_name" content="${cfg.siteName}">
<meta property="og:locale" content="${cfg.locale}">
<meta property="og:locale:alternate" content="${cfg.localeAlternate}">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:image" content="${cfg.ogImage}">
<meta property="og:image:width" content="${cfg.ogImageWidth}">
<meta property="og:image:height" content="${cfg.ogImageHeight}">

<meta name="twitter:card" content="${cfg.twitterCard}">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${cfg.siteName}",
  "url": "${cfg.baseUrl}",
  "logo": "${cfg.baseUrl}/assets/favicon.png",
  "sameAs": [
    "${cfg.orcid}",
    "${cfg.github}"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "${cfg.contactEmail}",
    "contactType": "Customer Service"
  }
}
</script>
${END_MARK}`;
}

function upsertBlock(html, block) {
  const startIdx = html.indexOf(START_MARK);
  const endIdx = html.indexOf(END_MARK);

  if (startIdx !== -1 && endIdx !== -1) {
    // Replace existing block in place.
    return (
      html.slice(0, startIdx) + block + html.slice(endIdx + END_MARK.length)
    );
  }

  // No markers yet — insert right after the opening <head> tag.
  const headMatch = html.match(/<head[^>]*>/i);
  if (!headMatch) {
    console.warn("  ! No <head> tag found — skipped.");
    return null;
  }
  const insertAt = headMatch.index + headMatch[0].length;
  return html.slice(0, insertAt) + "\n" + block + "\n" + html.slice(insertAt);
}

function main() {
  const cfg = loadConfig();
  const exclude = new Set(cfg.excludeFiles || []);
  const files = findHtmlFiles(ROOT).filter(
    (f) => !exclude.has(path.basename(f))
  );

  if (files.length === 0) {
    console.log("No .html files found.");
    return;
  }

  let changed = 0;
  for (const file of files) {
    const canonicalUrl = canonicalUrlFor(file, cfg);
    const block = buildMetaBlock(canonicalUrl, cfg);
    const original = fs.readFileSync(file, "utf8");
    const updated = upsertBlock(original, block);

    if (updated === null) continue;
    if (updated !== original) {
      fs.writeFileSync(file, updated, "utf8");
      changed++;
      console.log(`✓ ${path.relative(ROOT, file)} -> ${canonicalUrl}`);
    } else {
      console.log(`= ${path.relative(ROOT, file)} (already up to date)`);
    }
  }

  console.log(`\nDone. ${changed}/${files.length} file(s) updated.`);
}

main();
