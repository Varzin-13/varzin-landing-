// One navigation model for authored pages, generated records, and archive shells.
const fs = require('node:fs');
const path = require('node:path');
const destinations = [
  ['/field-index.html', 'Research', 'پژوهش'],
  ['/atlas.html', 'Atlas', 'اطلس'],
  ['/all-dois.html', 'Publications', 'انتشارات'],
  ['/cognitive-captcha.html', 'Products', 'محصولات'],
  ['/#reproducibility', 'Reproducibility', 'بازتولیدپذیری'],
  ['/researcher.html', 'Researcher', 'پژوهشگر'],
  ['/feedback.html', 'Contact', 'تماس'],
];

function headerFor(route, persian = false) {
  const links = destinations.map(([href, en, fa]) =>
    `<a href="${href}"${href === route ? ' aria-current="page"' : ''}>${persian ? fa : en}</a>`
  ).join('');
  return `<header class="vr-header" data-shared-navigation>
  <a class="vr-brand" href="${persian ? '/fa/' : '/'}"><span class="vr-mark" aria-hidden="true">V</span>VARZIN<span class="vr-brand-sub">${persian ? 'پژوهش مستقل' : 'Independent research'}</span></a>
  <nav class="vr-desktop" aria-label="${persian ? 'ناوبری پژوهش' : 'Research navigation'}">${links}</nav>
  <details class="vr-mobile"><summary>${persian ? 'فهرست' : 'Menu'} <span aria-hidden="true">＋</span></summary><nav aria-label="${persian ? 'ناوبری موبایل' : 'Mobile research navigation'}">${links}</nav></details>
</header>`;
}

function footer() {
  return `<footer class="vr-footer"><div><a class="vr-brand" href="/">VARZIN</a><p>Independent research. Explicit boundaries.<br>A public record that includes what did not work.</p></div><div><a href="/all-dois.html">Publications &amp; DOI records</a><a href="/researcher.html">Researcher profile</a><a href="/citation.html">Citation metadata</a><a href="/privacy.html">Privacy &amp; analytics</a><a href="/paper/">Historical archive</a></div><div><a href="https://github.com/Varzin-13">GitHub ↗</a><a href="https://orcid.org/0009-0000-4690-6842">ORCID ↗</a><a href="mailto:contact@varzin.org">contact@varzin.org</a></div><p class="vr-colophon">VARZIN Project · Reza Nirouyar <span>Evidence-first research portal / 2026</span></p></footer>`;
}

function generate() {
  const root = path.resolve(__dirname, '..');
  const ignored = new Set(['node_modules', 'dist', '.git', '.github', '.codex', '.agents', '.21st', 'test-results', 'review-shots', 'review-shots-final', 'review-shots-visibility', 'build']);
  let count = 0;
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      if (entry.isDirectory() && !ignored.has(entry.name)) walk(path.join(dir, entry.name));
      if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
      const file = path.join(dir, entry.name);
      const original = fs.readFileSync(file, 'utf8');
      const rel = path.relative(root, file).split(path.sep).join('/');
      const route = '/' + rel.replace(/(^|\/)index\.html$/, '$1');
      const pattern = /<header\b[^>]*class="vr-header"[^>]*>[\s\S]*?<\/header>/g;
      if (!pattern.test(original)) continue;
      pattern.lastIndex = 0;
      fs.writeFileSync(file, original.replace(pattern, headerFor(route, rel.startsWith('fa/'))));
      count++;
    }
  }
  walk(root);
  console.log(`Synchronized navigation on ${count} pages.`);
}

module.exports = { destinations, headerFor, footer, generate };
if (require.main === module) generate();
