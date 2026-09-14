const { chromium } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const assets = path.join(root, 'assets');
const sage = '#b8d899';
const paper = '#eef1e9';
const muted = '#b3beb5';
const bg = '#111513';
const border = '#39463b';

const mark = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="VARZIN V mark">
  <rect width="512" height="512" rx="96" fill="${bg}"/>
  <rect x="92" y="72" width="328" height="368" rx="8" fill="none" stroke="${sage}" stroke-width="12"/>
  <path d="M164 151h47l49 183 49-183h39l-72 232h-40z" fill="${paper}"/>
  <circle cx="256" cy="408" r="8" fill="${sage}"/>
</svg>`;

const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="VARZIN Project social card">
  <rect width="1200" height="630" fill="${bg}"/>
  <g opacity=".55" stroke="${border}" stroke-width="1">
    <path d="M0 105h1200M0 210h1200M0 315h1200M0 420h1200M0 525h1200"/>
    <path d="M200 0v630M400 0v630M600 0v630M800 0v630M1000 0v630"/>
  </g>
  <rect x="70" y="62" width="58" height="66" rx="3" fill="${bg}" stroke="${sage}" stroke-width="2"/>
  <text x="99" y="110" text-anchor="middle" font-family="Georgia,serif" font-size="44" fill="${sage}">V</text>
  <text x="152" y="100" font-family="Arial,Helvetica,sans-serif" font-size="34" font-weight="700" letter-spacing="7" fill="${paper}">VARZIN</text>
  <line x1="352" y1="70" x2="352" y2="122" stroke="${border}" stroke-width="2"/>
  <text x="374" y="88" font-family="Arial,Helvetica,sans-serif" font-size="15" fill="${muted}">Independent computational research</text>
  <text x="374" y="112" font-family="Arial,Helvetica,sans-serif" font-size="15" fill="${muted}">Evidence-first public record</text>

  <text x="70" y="238" font-family="Arial,Helvetica,sans-serif" font-size="62" font-weight="400" letter-spacing="-2" fill="${paper}">Finite systems.</text>
  <text x="70" y="312" font-family="Arial,Helvetica,sans-serif" font-size="62" font-weight="400" letter-spacing="-2" fill="${paper}">Open questions.</text>
  <text x="70" y="392" font-family="Georgia,serif" font-size="66" font-style="italic" fill="${sage}">Traceable evidence.</text>

  <line x1="70" y1="472" x2="1130" y2="472" stroke="${border}" stroke-width="2"/>
  <text x="70" y="520" font-family="Arial,Helvetica,sans-serif" font-size="19" fill="${muted}">Finite affine systems · LUXVAR · AI structure auditing · reproducibility</text>
  <text x="70" y="565" font-family="monospace" font-size="17" letter-spacing="2" fill="${sage}">VARZIN.ORG</text>
  <text x="1130" y="565" text-anchor="end" font-family="monospace" font-size="15" fill="${muted}">Reza Nirouyar · 2026</text>
</svg>`;

fs.writeFileSync(path.join(assets, 'brand-mark.svg'), mark);
fs.writeFileSync(path.join(assets, 'varzin-social-image.svg'), social);

(async () => {
  const browser = await chromium.launch({ headless: true });
  async function render(svg, width, height, out, type, quality) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.setContent(`<style>html,body{margin:0;width:${width}px;height:${height}px;overflow:hidden;background:${bg}}svg{display:block;width:${width}px;height:${height}px}</style>${svg}`);
    await page.screenshot({ path: out, type, quality, fullPage: false });
    await page.close();
  }
  await render(mark, 512, 512, path.join(assets, 'favicon.png'), 'png');
  await render(mark, 192, 192, path.join(assets, 'favicon-192.png'), 'png');
  await render(mark, 180, 180, path.join(assets, 'apple-touch-icon.png'), 'png');
  await render(mark, 32, 32, path.join(assets, 'favicon-32.png'), 'png');
  await render(social, 1200, 630, path.join(assets, 'varzin-social-image.jpg'), 'jpeg', 94);
  await browser.close();
  console.log('Generated brand assets: favicon, touch icons, and social image');
})();
