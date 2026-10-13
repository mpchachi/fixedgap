import { chromium } from '/home/luismols/.kiro/crew/workspace/DiariodeArrieta/demo/node_modules/playwright/index.mjs';
const out = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://127.0.0.1:3000/product', { waitUntil: 'load' });
await page.waitForTimeout(1500);
for (const i of [0, 1, 2]) {
  await page.evaluate((idx) => {
    const el = document.querySelector(`[data-step="${idx}"]`);
    const r = el.getBoundingClientRect();
    window.scrollTo(0, window.scrollY + r.top + r.height / 2 - window.innerHeight / 2);
  }, i);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${out}/s${i}.png` });
}
await browser.close();
console.log('ok');
