const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'seo-meta.config.json'), 'utf8'));
const base = cfg.baseUrl.replace(/\/$/, '');
const excluded = new Set([...(cfg.excludeFiles || []), ...(cfg.noindexFiles || []), '404.html']);
const ignoreDirs = new Set(['node_modules','dist','.git','.github','.codex','.agents','.21st','test-results','review-shots','review-shots-final','review-shots-visibility','build']);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoreDirs.has(entry.name)) walk(path.join(dir, entry.name), out);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      out.push(path.relative(root, path.join(dir, entry.name)).split(path.sep).join('/'));
    }
  }
  return out;
}

const files = walk(root).filter((name) => !excluded.has(name) && !name.startsWith('google'));
function canonical(name) {
  if (name === 'index.html') return `${base}/`;
  if (name.endsWith('/index.html')) return `${base}/${name.slice(0, -'index.html'.length)}`;
  return `${base}/${name}`;
}
const urls = [...new Set(files.map(canonical))].sort((a, b) => a === `${base}/` ? -1 : b === `${base}/` ? 1 : a.localeCompare(b));
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), xml);
console.log(`Generated sitemap.xml with ${urls.length} indexable URLs.`);
