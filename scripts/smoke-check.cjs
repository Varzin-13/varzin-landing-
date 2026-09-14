const { chromium } = require('@playwright/test');
const fs = require('node:fs');
(async () => {
 const browser = await chromium.launch();
 const results = [];
 for (const reducedMotion of ['reduce', 'no-preference']) {
  const page = await browser.newPage({viewport:{width:375,height:900},reducedMotion});
  const warnings = [];
  page.on('console', m => {if (['warning','error'].includes(m.type())) warnings.push(m.text());});
  page.on('pageerror', e => warnings.push(e.message));
  await page.goto('http://127.0.0.1:4173/');
  await page.keyboard.press('Tab');
  if (await page.locator('.vr-skip').evaluate(e => e !== document.activeElement)) throw Error('Skip link is not first keyboard target');
  await page.keyboard.press('Enter');
  await page.locator('.vr-mobile summary').focus();
  await page.keyboard.press('Enter');
  if (!await page.locator('.vr-mobile nav').isVisible()) throw Error('Keyboard menu failed');
  await page.keyboard.press('Escape');
  const animations=await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length);
  const resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({url:r.name,bytes:r.transferSize})));
  if(animations)throw Error('Unexpected permanent animation');
  results.push({reducedMotion,warnings,runningAnimations:animations,resources});
  await page.close();
 }
 fs.writeFileSync('test-results/smoke.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify(results,null,2));
 await browser.close();
 if(results.some(r=>r.warnings.length))process.exitCode=1;
})();
