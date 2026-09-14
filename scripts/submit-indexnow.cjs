const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const dryRun = process.argv.includes('--dry-run');
const keyFiles = fs.readdirSync(root).filter((name) => /^indexnow-[A-Fa-f0-9]{16,128}\.txt$/.test(name));
if (keyFiles.length !== 1) throw new Error(`Expected exactly one IndexNow key file, found ${keyFiles.length}`);
const keyFile = keyFiles[0];
const key = fs.readFileSync(path.join(root, keyFile), 'utf8').trim();
if (!/^[A-Fa-f0-9]{8,128}$/.test(key)) throw new Error('Invalid IndexNow key format');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error('No sitemap URLs found');
const payload = {
  host: 'varzin.org',
  key,
  keyLocation: `https://varzin.org/${keyFile}`,
  urlList,
};
if (dryRun) {
  console.log(JSON.stringify({ endpoint: 'https://api.indexnow.org/indexnow', ...payload }, null, 2));
  process.exit(0);
}
(async () => {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const body = await response.text();
  console.log(`IndexNow HTTP ${response.status}${body ? `: ${body}` : ''}`);
  if (![200, 202].includes(response.status)) process.exitCode = 1;
})();
