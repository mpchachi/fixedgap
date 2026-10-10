// Usage: node scripts/preview.mjs <srcDir> <outDir>
// Writes 900px JPEG previews (EXIF-rotated) and prints dimensions.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const [src, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(src).sort()) {
  if (!/\.(jpe?g|png|webp|heic)$/i.test(f)) continue;
  const img = sharp(path.join(src, f)).rotate();
  const meta = await img.metadata();
  const dst = path.join(out, f.replace(/\.[^.]+$/, '.jpg'));
  await img.resize({ width: 900, withoutEnlargement: true }).jpeg({ quality: 80 }).toFile(dst);
  console.log(f, meta.width, 'x', meta.height, meta.orientation ?? '');
}
