// Downloads the Fluent Emoji Flat SVG of every word into img/words/, skipping files already present.
// Usage: node scripts/fetch-icons.mjs
import fs from 'node:fs';
import { WORDS } from '../js/words.js';

const OUT_DIR = new URL('../img/words/', import.meta.url);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

fs.mkdirSync(OUT_DIR, { recursive: true });
const failed = [];

for (const { icon } of WORDS) {
  const file = new URL(`${icon}.svg`, OUT_DIR);
  if (fs.existsSync(file)) continue;

  let saved = false;
  // Iconify throttles bursts, so back off and retry before giving up on an icon.
  for (let attempt = 0; attempt < 4 && !saved; attempt++) {
    const response = await fetch(`https://api.iconify.design/fluent-emoji-flat/${icon}.svg`);
    const body = await response.text();
    if (response.ok && body.startsWith('<svg')) {
      fs.writeFileSync(file, body);
      saved = true;
    } else {
      await sleep(3000 * (attempt + 1));
    }
  }
  if (!saved) failed.push(icon);
  await sleep(400);
}

console.log(failed.length ? `Échec : ${failed.join(', ')}` : 'Toutes les illustrations sont là.');
