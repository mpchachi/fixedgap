// Usage: node scripts/shot.mjs <outDir>
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
  await page.waitForTimeout(1800);
  await el.screenshot({ path: `${out}/${name}.png` });
  console.log('ok', name);
}

// Home: rail (Measure crop), dashboard still, team split
await shot('/', 'section:has(img[src*="render-trend"])', 'home-rail');
await shot('/', 'section:has(img[src*="dashboard.png"])', 'home-dashboard');
await shot('/', 'section:has(img[src*="company-harvard-chan"])', 'home-team');
await shot('/awards', 'main', 'awards');
await shot('/company', '#boston', 'company-boston');
await browser.close();
