// Generate readable, static HTML from the versioned Markdown sources.
// Markdown is rendered at build time; the public pages work without JavaScript.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked, Renderer } from 'marked';
import navigation from './site-navigation.cjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const pages = [
  {source: 'README.md', output: 'research-position.html', title: 'Current research position', kicker: 'VARZIN / Research position', description: 'The current VARZIN research position, evidence categories, reproducibility policy, and boundaries of supported claims.'},
  {source: 'VARZIN_preprint_v2.md', output: 'luxvar-preprint.html', title: 'LUXVAR preprint and corrections', kicker: 'Historical manuscript / annotated reading copy', description: 'Historical local LUXVAR manuscript with correction notes, protocol-version boundaries, and unresolved DOI provenance.', historical: true},
  {source: 'VPE001A_protocol_design.md', output: 'vpe001a-core30-history.html', title: 'Core-30 human-rater draft', kicker: 'Protocol history / June 2026', description: 'Historical Core-30 card-sorting proposal, preserved separately from the later N=59 three-cohort VPE-001A plan.', historical: true},
];
const readingPaths = new Map(pages.map(p => ['/' + p.source, '/' + p.output]));

function shell({title, description, route, content}) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(title)} | VARZIN</title><meta name="description" content="${escape(description)}"><meta name="author" content="Reza Nirouyar"><link rel="stylesheet" href="/assets/research.css"><script src="/assets/research.js" defer></script></head>
<body class="vr-document"><a class="vr-skip" href="#vr-main">Skip to content</a>${navigation.headerFor(route)}<main id="vr-main" tabindex="-1"><div class="vr-doc-shell">${content}</div></main>${navigation.footer()}</body></html>\n`;
}

for (const page of pages) {
  const source = fs.readFileSync(path.join(root, page.source), 'utf8');
  const sourceTitle = source.match(/^# (.+)$/m)?.[1] || page.title;
  const body = source.replace(/^# .+\r?\n/, '');
  const headings = [];
  let table = 0, heading = 0;
  const renderer = new Renderer();
  const marked = new Marked({gfm: true, renderer: {
    // Sources are repository-owned text, but raw HTML is still displayed as text.
    html({text}) { return escape(text); },
    heading(token) {
      const id = `document-section-${++heading}`;
      const text = this.parser.parseInline(token.tokens);
      if (token.depth === 2) headings.push({id, text});
      return `<h${token.depth} id="${id}">${text}</h${token.depth}>\n`;
    },
    table(token) {
      return `<div class="vr-table-scroll" tabindex="0" role="region" aria-label="Document table ${++table}; scroll horizontally for more columns">${renderer.table.call(this, token)}</div>\n`;
    },
  }, walkTokens(token) {
    if (token.type !== 'link') return;
    const url = new URL(token.href, 'https://varzin.org/');
    if (!['http:', 'https:', 'mailto:'].includes(url.protocol)) throw new Error(`Unsupported source link: ${token.href}`);
    if (url.origin === 'https://varzin.org' && readingPaths.has(url.pathname)) token.href = readingPaths.get(url.pathname) + url.hash;
  }});
  const rendered = marked.parse(body);
  const notice = page.historical ? `<aside class="vr-archive-notice" aria-label="Historical record"><strong>Historical / superseded record</strong><p>This annotated local source preserves earlier wording and corrections. It is not a newly registered protocol or a verified copy of a particular Zenodo release. Use the <a href="/vpe001a-status.html">current human-study status</a> and <a href="/publications/zenodo-22115483.html">version-specific LUXVAR publication record</a> for the current reading.</p></aside>` : '';
  const toc = `<nav class="vr-document-toc" aria-label="On this page"><h2>On this page</h2><ul>${headings.map(h => `<li><a href="#${h.id}">${h.text}</a></li>`).join('')}</ul></nav>`;
  const content = `${notice}<section class="vr-page-hero"><span class="vr-kicker">${escape(page.kicker)}</span><h1>${escape(page.title)}</h1><p class="vr-source-title">${escape(sourceTitle)}</p><div class="vr-actions"><a class="vr-button" href="/${page.source}" download>Download Markdown source</a><a class="vr-button" href="/all-dois.html">Publication registry</a></div></section>${toc}<article class="vr-prose" aria-label="Document text">${rendered}</article>`;
  fs.writeFileSync(path.join(root, page.output), shell({...page, route: '/' + page.output, content}));
}

const cff = fs.readFileSync(path.join(root, 'CITATION.cff'), 'utf8');
fs.writeFileSync(path.join(root, 'CITATION.cff.txt'), cff);
fs.writeFileSync(path.join(root, 'citation.html'), shell({
  title: 'Citation and metadata', route: '/citation.html',
  description: 'How to cite the VARZIN portal and find the exact version-specific DOI for a scientific result, with downloadable citation metadata.',
  content: `<section class="vr-page-hero"><span class="vr-kicker">VARZIN / Citation</span><h1>Cite the record you used.</h1><p>For a scientific result, use its exact version-specific publication or software release. A citation of this portal is not a substitute for the underlying research record.</p></section>
<section class="vr-editorial-section"><h2>Research publications</h2><p>The publication registry gives deposited titles, versions, DOIs, and the scope of each result. Current interpretation follows the latest relevant manuscript and its matching artifacts; earlier versions remain traceable.</p><a class="vr-button vr-primary" href="/all-dois.html">Find a publication and its DOI</a></section>
<section class="vr-editorial-section"><h2>The portal itself</h2><p>Nirouyar, Reza. <em>VARZIN Research Portal and Reproducibility Materials.</em> VARZIN Project. <a href="https://varzin.org/">https://varzin.org/</a>. Include your access date or the repository revision when citing a changing page.</p><div class="vr-actions"><a class="vr-button" href="/CITATION.cff" download>Download CFF metadata</a><a class="vr-button" href="/CITATION.cff.txt">Read plain-text metadata</a><a class="vr-button" href="https://github.com/Varzin-13/varzin-landing-/blob/main/CITATION.cff">View citation source on GitHub ↗</a></div></section>
<section class="vr-editorial-section"><h2>Machine-readable metadata</h2><p>The CFF download and the plain-text version contain the same metadata.</p><pre class="vr-citation-source"><code>${escape(cff)}</code></pre></section>`
}));
console.log('Generated three document reading pages, citation page, and matching plain-text CFF.');
