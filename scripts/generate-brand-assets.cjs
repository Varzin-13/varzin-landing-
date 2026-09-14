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
const cyan = '#63d8d0';
const warm = '#e7b86a';
const violet = '#9f8cff';

const mark = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="VARZIN V mark">
  <defs><linearGradient id="mk" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${cyan}"/><stop offset=".52" stop-color="${sage}"/><stop offset="1" stop-color="${warm}"/></linearGradient><radialGradient id="mg"><stop stop-color="${cyan}" stop-opacity=".18"/><stop offset="1" stop-color="${bg}" stop-opacity="0"/></radialGradient></defs>
  <rect width="512" height="512" rx="96" fill="${bg}"/>
  <circle cx="256" cy="256" r="218" fill="url(#mg)"/>
  <circle cx="256" cy="256" r="178" fill="none" stroke="${cyan}" stroke-opacity=".18" stroke-width="2"/>
  <circle cx="256" cy="256" r="132" fill="none" stroke="${warm}" stroke-opacity=".18" stroke-width="2"/>
  <rect x="92" y="72" width="328" height="368" rx="22" fill="none" stroke="url(#mk)" stroke-width="10"/>
  <rect x="108" y="88" width="296" height="336" rx="14" fill="none" stroke="${paper}" stroke-opacity=".10" stroke-width="2"/>
  <path d="M164 151h47l49 183 49-183h39l-72 232h-40z" fill="${paper}"/>
  <circle cx="256" cy="408" r="8" fill="${warm}"/>
</svg>`;

const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="VARZIN Project social card">
  <defs>
    <radialGradient id="c" cx="0" cy="0" r="1" gradientTransform="translate(1030 120) rotate(135) scale(540)"><stop stop-color="${cyan}" stop-opacity=".20"/><stop offset="1" stop-color="${bg}" stop-opacity="0"/></radialGradient>
    <radialGradient id="w" cx="0" cy="0" r="1" gradientTransform="translate(1030 510) rotate(215) scale(470)"><stop stop-color="${warm}" stop-opacity=".16"/><stop offset="1" stop-color="${bg}" stop-opacity="0"/></radialGradient>
    <linearGradient id="title" x1="0" y1="0" x2="1" y2="0"><stop stop-color="${cyan}"/><stop offset=".48" stop-color="${sage}"/><stop offset="1" stop-color="${warm}"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="${bg}"/>
  <rect width="1200" height="630" fill="url(#c)"/><rect width="1200" height="630" fill="url(#w)"/>
  <g opacity=".32" stroke="${border}" stroke-width="1"><path d="M0 105h1200M0 210h1200M0 315h1200M0 420h1200M0 525h1200"/><path d="M200 0v630M400 0v630M600 0v630M800 0v630M1000 0v630"/></g>
  <g transform="translate(960 305)" fill="none"><circle r="180" stroke="${cyan}" stroke-opacity=".26" stroke-width="2"/><circle r="132" stroke="${warm}" stroke-opacity=".20" stroke-width="2"/><circle r="84" stroke="${violet}" stroke-opacity=".18" stroke-width="2"/><path d="M-180 0h360M0-180v360" stroke="${paper}" stroke-opacity=".07"/><g fill="${cyan}">${Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<circle cx="${(Math.cos(a)*180).toFixed(1)}" cy="${(Math.sin(a)*180).toFixed(1)}" r="5"/>`}).join('')}</g></g>
  <rect x="70" y="62" width="58" height="66" rx="10" fill="${bg}" stroke="url(#title)" stroke-width="2"/>
  <text x="99" y="110" text-anchor="middle" font-family="Georgia,serif" font-size="44" fill="${paper}">V</text>
  <text x="152" y="100" font-family="Arial,Helvetica,sans-serif" font-size="34" font-weight="700" letter-spacing="7" fill="${paper}">VARZIN</text>
  <line x1="352" y1="70" x2="352" y2="122" stroke="${border}" stroke-width="2"/>
  <text x="374" y="88" font-family="Arial,Helvetica,sans-serif" font-size="15" fill="${muted}">Independent computational research</text>
  <text x="374" y="112" font-family="Arial,Helvetica,sans-serif" font-size="15" fill="${muted}">Evidence-first public record</text>
  <text x="70" y="238" font-family="Arial,Helvetica,sans-serif" font-size="62" font-weight="400" letter-spacing="-2" fill="${paper}">Finite systems.</text>
  <text x="70" y="312" font-family="Arial,Helvetica,sans-serif" font-size="62" font-weight="400" letter-spacing="-2" fill="${paper}">Open questions.</text>
  <text x="70" y="392" font-family="Georgia,serif" font-size="66" font-style="italic" fill="url(#title)">Traceable evidence.</text>
  <line x1="70" y1="472" x2="1130" y2="472" stroke="${border}" stroke-width="2"/>
  <text x="70" y="520" font-family="Arial,Helvetica,sans-serif" font-size="19" fill="${muted}">Finite affine systems · LUXVAR · AI structure auditing · reproducibility</text>
  <text x="70" y="565" font-family="monospace" font-size="17" letter-spacing="2" fill="${cyan}">VARZIN.ORG</text>
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
