import { chromium } from '/home/luismols/.kiro/crew/workspace/DiariodeArrieta/demo/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const out = process.argv[2];
const url = process.argv[3] || 'https://harbor.ai/';
const tag = process.argv[4] || 'home';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(2500);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
console.log('height', total);
let y = 0, i = 0;
while (y < total && i < 40) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/${tag}-${String(i).padStart(2, '0')}.png` });
  y += 700; i++;
}
// motion hints: fonts, animated elements, libs
const info = await page.evaluate(() => {
  const fonts = new Set();
  document.querySelectorAll('h1,h2,h3,p,a,span').forEach((el) => fonts.add(getComputedStyle(el).fontFamily));
  const scripts = [...document.scripts].map((s) => s.src).filter(Boolean);
  const anim = [...document.querySelectorAll('*')].filter((el) => {
    const cs = getComputedStyle(el);
    return cs.animationName !== 'none' || (cs.transitionDuration && cs.transitionDuration !== '0s');
  }).length;
  const sticky = [...document.querySelectorAll('*')].filter((el) => getComputedStyle(el).position === 'sticky').length;
  const canvases = document.querySelectorAll('canvas').length;
  const videos = document.querySelectorAll('video').length;
  const bg = getComputedStyle(document.body).backgroundColor;
  return { fonts: [...fonts], scripts: scripts.slice(0, 20), anim, sticky, canvases, videos, bg, title: document.title };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
