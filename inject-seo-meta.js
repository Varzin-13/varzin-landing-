#!/usr/bin/env node
/**
 * VARZIN — SEO/Social metadata injector
 *
 * Shared metadata is generated from seo-meta.config.json.
 * Pages listed in noindexFiles receive "noindex, follow";
 * normal public research pages receive "index, follow".
 *
 * The injector also keeps <meta charset> first in <head>, emits page-specific
 * Open Graph/Twitter fields, and exposes conservative WebSite/Organization/Person
 * structured data without implying institutional affiliation or peer review.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(process.argv[2] || ".");
const CONFIG_PATH = path.join(__dirname, "seo-meta.config.json");
const RESEARCH_OUTPUTS_PATH = path.join(__dirname, "research-outputs.json");
const START_MARK = "<!-- SEO-META:START -->";
const END_MARK = "<!-- SEO-META:END -->";

const IGNORE_DIRS = new Set([
  "node_modules", ".codex", ".agents", ".21st", "test-results",
  "review-shots", "review-shots-final", ".git", ".github", "dist", "build",
]);

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`Config not found: ${CONFIG_PATH}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
}


function loadResearchOutputs() {
  if (!fs.existsSync(RESEARCH_OUTPUTS_PATH)) return [];
  const parsed = JSON.parse(fs.readFileSync(RESEARCH_OUTPUTS_PATH, "utf8"));
  return Array.isArray(parsed.records) ? parsed.records : [];
}

function relativePathFor(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function findHtmlFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) findHtmlFiles(path.join(dir, entry.name), files);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

function canonicalUrlFor(filePath, cfg) {
  const rel = relativePathFor(filePath);
  const base = cfg.baseUrl.replace(/\/$/, "");
  if (rel === "index.html") return `${base}/`;
  if (rel.endsWith("/index.html")) return `${base}/${rel.slice(0, -"index.html".length)}`;
  return `${base}/${rel}`;
}

function robotsFor(filePath, cfg) {
  const rel = relativePathFor(filePath);
  return new Set(cfg.noindexFiles || []).has(rel) ? "noindex, follow" : "index, follow";
}

function decodeBasicEntities(value) {
  return String(value || "")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function extractPageMeta(html, cfg) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = decodeBasicEntities(titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").trim() : cfg.siteName);
  let description = cfg.siteDescription || "Independent computational research and reproducibility from the VARZIN Project.";
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    if (!/\bname\s*=\s*["']description["']/i.test(tag)) continue;
    const content = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i);
    if (content) description = decodeBasicEntities(content[1].trim());
  }
  return { title, description };
}

function normalizeManagedHead(html) {
  let cleaned = html
    .replace(/\s*<meta\s+charset\s*=\s*["']?[^>"'\s]+["']?\s*\/?>/gi, "")
    .replace(/\s*<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/gi, "")
    .replace(/\s*<meta\b(?=[^>]*\bname\s*=\s*["']description["'])[^>]*>/gi, "");
  const head = cleaned.match(/<head[^>]*>/i);
  if (!head) return cleaned;
  const at = head.index + head[0].length;
  return cleaned.slice(0, at) + '\n<meta charset="UTF-8">' + cleaned.slice(at);
}

function buildMetaBlock(canonicalUrl, robots, cfg, pageMeta, researchOutputs = []) {
  const base = cfg.baseUrl.replace(/\/$/, "");
  const researcher = cfg.researcherName || "Reza Nirouyar";
  const imageAlt = cfg.ogImageAlt || "VARZIN Project — evidence-first computational research";
  const isResearcherProfile = canonicalUrl === `${base}/researcher.html`;
  const pageNode = {
    "@type": isResearcherProfile ? "ProfilePage" : "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: pageMeta.title,
    description: pageMeta.description,
    isPartOf: { "@id": `${base}/#website` },
    author: { "@id": `${base}/#researcher` }
  };
  if (isResearcherProfile) pageNode.mainEntity = { "@id": `${base}/#researcher` };

  const publicationPage = canonicalUrl === `${base}/all-dois.html`;
  const researcherPage = canonicalUrl === `${base}/researcher.html`;
  const publicationNodes = (publicationPage || researcherPage) ? researchOutputs.map((record) => ({
    "@type": record.type || "CreativeWork",
    "@id": `${record.varzinRecordUrl || `${base}/#${record.id}`}#record`,
    name: record.title,
    url: record.varzinRecordUrl || record.url,
    sameAs: [record.url, record.zenodoRecordUrl].filter(Boolean),
    identifier: record.doi,
    version: record.version,
    datePublished: record.publicationDate || "2026",
    author: { "@id": `${base}/#researcher` },
    description: record.currentInterpretation || record.overview || record.scope
  })) : [];
  const outputList = publicationPage && publicationNodes.length ? {
    "@type": "ItemList",
    "@id": `${base}/all-dois.html#public-research-outputs`,
    name: "VARZIN public research outputs",
    numberOfItems: publicationNodes.length,
    itemListElement: publicationNodes.map((node, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@id": node["@id"] }
    }))
  } : null;
  if (outputList) pageNode.mainEntity = { "@id": outputList["@id"] };

  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: cfg.baseUrl,
        name: cfg.siteName,
        description: cfg.siteDescription || pageMeta.description,
        author: { "@id": `${base}/#researcher` },
        publisher: { "@id": `${base}/#organization` }
      },
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: cfg.siteName,
        url: cfg.baseUrl,
        logo: `${base}/assets/favicon.png`,
        email: `mailto:${cfg.contactEmail}`,
        sameAs: [cfg.github]
      },
      {
        "@type": "Person",
        "@id": `${base}/#researcher`,
        name: researcher,
        url: `${base}/researcher.html`,
        email: `mailto:${cfg.contactEmail}`,
        sameAs: [cfg.orcid, cfg.github, cfg.linkedin].filter(Boolean)
      },
      pageNode,
      ...(outputList ? [outputList] : []),
      ...publicationNodes
    ]
  }, null, 2);

  return `${START_MARK}
<!-- Auto-generated — do not hand-edit between these markers.
     Edit seo-meta.config.json and re-run inject-seo-meta.js instead. -->
<meta name="description" content="${escapeAttr(pageMeta.description)}">\n<meta name="robots" content="${robots}">
<meta name="generator" content="${escapeAttr(cfg.generator)}">
<meta name="rating" content="General">
<meta name="theme-color" content="#111513">
<meta name="color-scheme" content="dark light">
${cfg.gaMeasurementId ? `<meta name="varzin-ga4-id" content="${escapeAttr(cfg.gaMeasurementId)}">\n<script src="/assets/analytics.js" defer></script>\n` : ""}
<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />
<link rel="icon" href="${escapeAttr(cfg.baseUrl)}/assets/brand-mark.svg" type="image/svg+xml" />
<link rel="icon" href="${escapeAttr(cfg.baseUrl)}/assets/favicon.png" sizes="512x512" type="image/png" />
<link rel="icon" href="${escapeAttr(cfg.baseUrl)}/assets/favicon-32.png" sizes="32x32" type="image/png" />
<link rel="apple-touch-icon" href="${escapeAttr(cfg.baseUrl)}/assets/apple-touch-icon.png" sizes="180x180" />
<link rel="manifest" href="${escapeAttr(cfg.baseUrl)}/manifest.webmanifest" />
<link rel="alternate" type="application/json" href="${base}/research-outputs.json" title="VARZIN machine-readable research records" />
<link rel="alternate" type="text/plain" href="${base}/llms.txt" title="VARZIN LLM-readable research index" />

<meta property="og:type" content="website">
<meta property="og:site_name" content="${escapeAttr(cfg.siteName)}">
<meta property="og:locale" content="${escapeAttr(cfg.locale)}">
<meta property="og:locale:alternate" content="${escapeAttr(cfg.localeAlternate)}">
<meta property="og:url" content="${escapeAttr(canonicalUrl)}">
<meta property="og:title" content="${escapeAttr(pageMeta.title)}">
<meta property="og:description" content="${escapeAttr(pageMeta.description)}">
<meta property="og:image" content="${escapeAttr(cfg.ogImage)}">
<meta property="og:image:width" content="${escapeAttr(cfg.ogImageWidth)}">
<meta property="og:image:height" content="${escapeAttr(cfg.ogImageHeight)}">
<meta property="og:image:alt" content="${escapeAttr(imageAlt)}">

<meta name="twitter:card" content="${escapeAttr(cfg.twitterCard)}">
<meta name="twitter:title" content="${escapeAttr(pageMeta.title)}">
<meta name="twitter:description" content="${escapeAttr(pageMeta.description)}">
<meta name="twitter:image" content="${escapeAttr(cfg.ogImage)}">
<meta name="twitter:image:alt" content="${escapeAttr(imageAlt)}">

<script type="application/ld+json">
${structuredData}
</script>
${END_MARK}`;
}

function upsertBlock(html, block) {
  const startIdx = html.indexOf(START_MARK);
  const endIdx = html.indexOf(END_MARK);
  if (startIdx !== -1 && endIdx !== -1) {
    return html.slice(0, startIdx) + block + html.slice(endIdx + END_MARK.length);
  }
  const charset = html.match(/<meta\s+charset=[^>]+>/i);
  const head = html.match(/<head[^>]*>/i);
  if (!head) {
    console.warn("  ! No <head> tag found — skipped.");
    return null;
  }
  const insertAt = charset ? charset.index + charset[0].length : head.index + head[0].length;
  return html.slice(0, insertAt) + "\n" + block + "\n" + html.slice(insertAt);
}

function main() {
  const cfg = loadConfig();
  const researchOutputs = loadResearchOutputs();
  const excludedPaths = new Set(cfg.excludeFiles || []);
  const files = findHtmlFiles(ROOT).filter((file) => !excludedPaths.has(relativePathFor(file)));
  if (files.length === 0) return console.log("No .html files found.");

  let changed = 0;
  for (const file of files) {
    const canonicalUrl = canonicalUrlFor(file, cfg);
    const robots = robotsFor(file, cfg);
    const original = fs.readFileSync(file, "utf8");
    const pageMeta = extractPageMeta(original, cfg);
    const normalized = normalizeManagedHead(original);
    const block = buildMetaBlock(canonicalUrl, robots, cfg, pageMeta, researchOutputs);
    const updated = upsertBlock(normalized, block);
    if (updated === null) continue;
    if (updated !== original) {
      fs.writeFileSync(file, updated, "utf8");
      changed++;
      console.log(`✓ ${relativePathFor(file)} -> ${canonicalUrl} [${robots}]`);
    } else {
      console.log(`= ${relativePathFor(file)} (already up to date)`);
    }
  }
  console.log(`\nDone. ${changed}/${files.length} file(s) updated.`);
}

main();
