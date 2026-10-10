// One-off: batch 2 of real photos -> public/home as WebP.
import sharp from 'sharp';

const src = process.argv[2];
const jobs = [
  ['image00001.jpeg', 'awards-pillar.webp', 1600],
  ['image00002.jpeg', 'awards-ucm.webp', 1600],
  ['image00003.jpeg', 'company-harvard-chan.webp', 1200],
  ['image00004.jpeg', 'company-hbs.webp', 1200],
];
for (const [inName, outName, width] of jobs) {
  const out = `public/home/${outName}`;
  const info = await sharp(`${src}/${inName}`).rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  console.log(outName, info.width, 'x', info.height, Math.round(info.size / 1024), 'KB');
}
