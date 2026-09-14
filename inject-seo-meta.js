#!/usr/bin/env node
/**
 * VARZIN — SEO/Social metadata injector
 *
 * Shared metadata is generated from seo-meta.config.json.
 * Pages listed in noindexFiles receive "noindex, follow";
 * normal public research pages receive "index, follow".
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(process.argv[2] || ".");
const CONFIG_PATH = path.join(__dirname, "seo-meta.config.json");
const START_MARK = "<!-- SEO-META:START -->";
const END_MARK = "<!-- SEO-META:END -->";

const IGNORE_DIRS = new Set([
  "node_modules",
  ".codex",
  ".agents",
  ".21st",
  "test-results",
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

function relativePathFor(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
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
  const rel = relativePathFor(filePath);
  const base = cfg.baseUrl.replace(/\/$/, "");

  if (rel === "index.html") {
    return `${base}/`;
  }

  return `${base}/${rel}`;
}

function robotsFor(filePath, cfg) {
  const rel = relativePathFor(filePath);
  const noindexFiles = new Set(cfg.noindexFiles || []);

  return noindexFiles.has(rel) ? "noindex, follow" : "index, follow";
}

function buildMetaBlock(canonicalUrl, robots, cfg) {
  return `${START_MARK}
<!-- Auto-generated — do not hand-edit between these markers.
     Edit seo-meta.config.json and re-run inject-seo-meta.js instead. -->
<meta name="robots" content="${robots}">
<meta name="generator" content="${cfg.generator}">
<meta name="rating" content="General">

<link rel="canonical" href="${canonicalUrl}" />
<link rel="icon" href="${cfg.baseUrl}/assets/favicon.png" type="image/png" />

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
    "contactType": "Research contact"
  }
}
</script>
${END_MARK}`;
}

function upsertBlock(html, block) {
  const startIdx = html.indexOf(START_MARK);
  const endIdx = html.indexOf(END_MARK);

  if (startIdx !== -1 && endIdx !== -1) {
    return (
      html.slice(0, startIdx) +
      block +
      html.slice(endIdx + END_MARK.length)
    );
  }

  const headMatch = html.match(/<head[^>]*>/i);

  if (!headMatch) {
    console.warn("  ! No <head> tag found — skipped.");
    return null;
  }

  const insertAt = headMatch.index + headMatch[0].length;

  return (
    html.slice(0, insertAt) +
    "\n" +
    block +
    "\n" +
    html.slice(insertAt)
  );
}

function main() {
  const cfg = loadConfig();

  const excludedPaths = new Set(cfg.excludeFiles || []);

  const files = findHtmlFiles(ROOT).filter(
    (file) => !excludedPaths.has(relativePathFor(file))
  );

  if (files.length === 0) {
    console.log("No .html files found.");
    return;
  }

  let changed = 0;

  for (const file of files) {
    const canonicalUrl = canonicalUrlFor(file, cfg);
    const robots = robotsFor(file, cfg);
    const block = buildMetaBlock(canonicalUrl, robots, cfg);

    const original = fs.readFileSync(file, "utf8");
    const updated = upsertBlock(original, block);

    if (updated === null) {
      continue;
    }

    if (updated !== original) {
      fs.writeFileSync(file, updated, "utf8");
      changed++;
      console.log(
        `✓ ${relativePathFor(file)} -> ${canonicalUrl} [${robots}]`
      );
    } else {
      console.log(`= ${relativePathFor(file)} (already up to date)`);
    }
  }

  console.log(`\nDone. ${changed}/${files.length} file(s) updated.`);
}

main();
