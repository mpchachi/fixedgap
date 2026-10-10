// Usage: node scripts/shot.mjs <outDir>
// Screenshots the home awards block and the Company "boston" section.
import { chromium } from '/home/luismols/.kiro/crew/workspace/DiariodeArrieta/demo/node_modules/playwright/index.mjs';
import fs from 'node:fs';

const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
const base = 'http://127.0.0.1:3000';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

async function shot(url, selector, name) {
  await page.goto(base + url, { waitUntil: 'load' });
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await el.screenshot({ path: `${out}/${name}.png` });
  console.log('ok', name);
}

await shot('/', '#awards', 'awards');
await shot('/company', '#boston', 'boston');
await browser.close();
