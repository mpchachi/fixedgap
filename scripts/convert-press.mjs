// One-off: press photos -> public/home as WebP (3:2 cards).
import sharp from 'sharp';

const src = process.argv[2];
const jobs = [
  ['p1.png', 'press-tribuna-boston.webp'],
  ['p2.png', 'press-theobjective.webp'],
  ['p3.png', 'press-tribuna-madrid.webp'],
];
for (const [inName, outName] of jobs) {
  const info = await sharp(`${src}/${inName}`)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`public/home/${outName}`);
  console.log(outName, info.width, 'x', info.height, Math.round(info.size / 1024), 'KB');
}
