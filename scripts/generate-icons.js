import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const sizes = [
  16, // favicon-16x16.png
  32, // favicon-32x32.png
  72, // icon-72x72.png
  96, // icon-96x96.png
  128, // icon-128x128.png
  144, // icon-144x144.png
  152, // icon-152x152.png
  180, // apple-touch-icon.png
  192, // icon-192x192.png
  384, // icon-384x384.png
  512, // icon-512x512.png
];

async function generateIcons() {
  const svgBuffer = await fs.readFile('public/icons/icon.svg');

  for (const size of sizes) {
    const fileName = size === 180 
      ? 'apple-touch-icon.png'
      : size <= 32 
        ? `favicon-${size}x${size}.png` 
        : `icon-${size}x${size}.png`;

    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`public/icons/${fileName}`);
    
    console.log(`Generated ${fileName}`);
  }
}

generateIcons().catch(console.error); 