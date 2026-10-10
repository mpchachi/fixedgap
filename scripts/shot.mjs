// Usage: node scripts/shot.mjs <outDir>
import { chromium } from '/home/luismols/.kiro/crew/workspace/DiariodeArrieta/demo/node_modules/playwright/index.mjs';
import fs from 'node:fs';

const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
const base = 'http://127.0.0.1:3000';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

// 1. Home: hero at t=0.15s (curtain mid-lift) and settled
await page.goto(base + '/', { waitUntil: 'commit' });
await page.waitForTimeout(150);
await page.screenshot({ path: `${out}/t-curtain.png` });
await page.waitForTimeout(1800);
await page.screenshot({ path: `${out}/t-hero.png` });

// 2. Scroll to the tabs section: Visual reveal mid-way and settled
await page.evaluate(() => window.scrollTo(0, 1100));
await page.waitForTimeout(250);
await page.screenshot({ path: `${out}/reveal-mid.png` });
await page.waitForTimeout(1600);
await page.screenshot({ path: `${out}/reveal-done.png` });

// 3. Client-side navigation to Product via the nav link, catch the curtain
await page.click('nav a[href="/product"]');
await page.waitForTimeout(120);
await page.screenshot({ path: `${out}/nav-curtain.png` });
await page.waitForTimeout(1500);
console.log('scrollY after nav', await page.evaluate(() => window.scrollY));

// 4. Sticky story: scroll through the three blocks and capture each state
const blocks = page.locator('[data-step]');
const n = await blocks.count();
for (let i = 0; i < n; i += 1) {
  const box = await blocks.nth(i).boundingBox();
  await page.evaluate((y) => window.scrollTo(0, y), box.y + window_scroll_fix(box));
  await page.waitForTimeout(1100);
  await page.screenshot({ path: `${out}/story-${i}.png` });
}
function window_scroll_fix(box) { return box.height / 2 - 450; }

console.log('errors', errors.length, errors.slice(0, 5));
await browser.close();
