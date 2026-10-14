import { chromium } from '/home/luismols/.kiro/crew/workspace/DiariodeArrieta/demo/node_modules/playwright/index.mjs';
const out = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));

// Product: blueprint over the pinned story
await page.goto('http://127.0.0.1:3000/product', { waitUntil: 'load' });
await page.waitForTimeout(1500);
for (const i of [0, 2]) {
  await page.evaluate((idx) => {
    const el = document.querySelector(`[data-step="${idx}"]`);
    const r = el.getBoundingClientRect();
    window.scrollTo(0, window.scrollY + r.top + r.height / 2 - window.innerHeight / 2);
  }, i);
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${out}/bp-${i}.png` });
}
// Nav fold: top vs scrolled
await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(800);
await page.screenshot({ path: `${out}/nav-top.png`, clip: { x: 0, y: 0, width: 420, height: 80 } });
await page.evaluate(() => window.scrollTo(0, 600)); await page.waitForTimeout(900);
await page.screenshot({ path: `${out}/nav-scrolled.png`, clip: { x: 0, y: 0, width: 420, height: 80 } });

// Company: pullquote half-filled
await page.goto('http://127.0.0.1:3000/company', { waitUntil: 'load' });
await page.waitForTimeout(1200);
await page.evaluate(() => {
  const el = [...document.querySelectorAll('p')].find((p) => p.getAttribute('aria-label')?.startsWith('Every sensor'));
  const r = el.getBoundingClientRect();
  window.scrollTo(0, window.scrollY + r.top - window.innerHeight * 0.62);
});
await page.waitForTimeout(900);
await page.screenshot({ path: `${out}/ink-company.png` });

// Manifesto
await page.goto('http://127.0.0.1:3000/company/behind-fixedgap', { waitUntil: 'load' });
await page.waitForSelector('p[aria-label]');
await page.waitForTimeout(1500);
await page.evaluate(() => {
  const el = document.querySelectorAll('p[aria-label]')[1];
  const r = el.getBoundingClientRect();
  window.scrollTo(0, window.scrollY + r.top - window.innerHeight * 0.6);
});
await page.waitForTimeout(900);
await page.screenshot({ path: `${out}/ink-manifesto.png` });
console.log('errors', errors.length, errors.slice(0, 3));
await browser.close();
