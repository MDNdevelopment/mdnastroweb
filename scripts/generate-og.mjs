// One-off script: generates public/assets/og-card.jpg (1200x630) for og:image/twitter:image.
// Run with: node scripts/generate-og.mjs
//
// Uses sharp's bundled librsvg to rasterize an SVG built from brand colors + the existing
// pentagon mark (public/assets/mdn-mark.webp). Falls back to system-installed condensed/sans
// fonts (Avenir Next Condensed, Helvetica Neue) since the site's Google Fonts (Saira Condensed,
// Hanken Grotesk) aren't installed locally for librsvg/fontconfig to pick up.

import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const assets = path.join(root, 'public', 'assets');

const WIDTH = 1200;
const HEIGHT = 630;

const BG = '#0C0B0A';
const GOLD = '#FFB200';
const CREAM = '#F6F3EC';
const MUTED = '#9a9489';

async function main() {
  // Mark is a transparent-bg WebP; convert to PNG buffer so it composites cleanly over the SVG.
  const markPng = await sharp(path.join(assets, 'mdn-mark.webp'))
    .resize(150, 150)
    .png()
    .toBuffer();

  const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="18%" cy="15%" r="70%">
      <stop offset="0%" stop-color="#1a1712" />
      <stop offset="100%" stop-color="${BG}" />
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />

  <!-- thin corner frame, flat geometric line -->
  <rect x="28" y="28" width="${WIDTH - 56}" height="${HEIGHT - 56}" fill="none"
        stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />

  <text x="100" y="330" font-family="Avenir Next Condensed, Helvetica Neue, Arial" font-weight="800"
        font-size="86" letter-spacing="-1" fill="${CREAM}">MDN Publicidad</text>
  <text x="100" y="330" font-family="Avenir Next Condensed, Helvetica Neue, Arial" font-weight="800"
        font-size="86" letter-spacing="-1" fill="${GOLD}" transform="translate(0,90)">Studio</text>

  <line x1="103" y1="452" x2="330" y2="452" stroke="${GOLD}" stroke-width="3" />

  <text x="100" y="500" font-family="Helvetica Neue, Arial" font-weight="400" font-size="30"
        fill="${MUTED}">Fortalecemos tu presencia digital</text>

  <text x="100" y="548" font-family="Helvetica Neue, Arial" font-weight="700" font-size="20"
        letter-spacing="2.5" fill="${MUTED}">WEB · REDES · BRANDING · AUDIOVISUAL · ASESORÍA</text>
</svg>`;

  const svgBuffer = Buffer.from(svg);

  await sharp(svgBuffer)
    .composite([{ input: markPng, left: WIDTH - 150 - 100, top: (HEIGHT - 150) / 2 }])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(assets, 'og-card.jpg'));

  console.log('Wrote public/assets/og-card.jpg');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
