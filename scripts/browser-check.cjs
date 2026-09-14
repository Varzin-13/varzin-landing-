const { chromium } = require("@playwright/test");
const { default: AxeBuilder } = require("@axe-core/playwright");
const fs = require("node:fs");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  fs.mkdirSync("test-results", { recursive: true });
  const defaultRoutes = [
    "/",
    "/atlas.html",
    "/field-index.html",
    "/all-dois.html",
    "/feedback.html",
    "/luxvar-birth-intro.html",
    "/vpe001-protocol.html",
    "/cyclical-resonance-report.html",
    "/master-report-v3.html",
    "/paper/",
    "/homepage-before-redesign.html",
  ];
  const routes = process.env.ROUTES ? process.env.ROUTES.split(",") : defaultRoutes;
  await Promise.all([375, 768, 1024, 1440].map(async (width) => {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    for (const route of routes) {
      const errors = [];
      page.removeAllListeners("pageerror");
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto("http://127.0.0.1:4173" + route, {
        waitUntil: "networkidle",
      });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      const offenders = overflow
        ? await page.evaluate(() =>
            [...document.querySelectorAll("body *")]
              .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
              .slice(0, 8)
              .map((e) => e.tagName + "." + e.className),
          )
        : [];
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      results.push({
        width,
        route,
        overflow,
        offenders,
        errors,
        violations: axe.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      });
      fs.writeFileSync("test-results/browser-progress.json", JSON.stringify(results, null, 2));
      if (route === "/") {
        await page.screenshot({
          path: `test-results/home-${width}.png`,
          fullPage: true,
        });
        if (width === 375) {
          await page.locator(".vr-mobile summary").click();
          if (!(await page.locator(".vr-mobile nav").isVisible()))
            throw Error("Mobile menu not visible");
          await page.keyboard.press("Escape");
          if ((await page.locator(".vr-mobile").getAttribute("open")) !== null)
            throw Error("Escape failed");
        }
      }
    }
    await context.close();
  }));
  const page = await browser.newPage({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 900 },
  });
  await page.goto("http://127.0.0.1:4173/");
  await page.locator(".vr-mobile summary").click();
  if (!(await page.locator(".vr-mobile nav").isVisible()))
    throw Error("No-JS menu failed");
  await page.close();
  fs.writeFileSync(
    "test-results/browser.json",
    JSON.stringify(results, null, 2),
  );
  console.log(
    JSON.stringify(
      results.map((r) => ({
        width: r.width,
        route: r.route,
        overflow: r.overflow,
        errors: r.errors,
        violations: r.violations.map((v) => v.id),
      })),
      null,
      2,
    ),
  );
  await browser.close();
  process.exitCode = results.some(
    (r) => r.overflow || r.errors.length || r.violations.length,
  )
    ? 1
    : 0;
})();
