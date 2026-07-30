/**
 * gen-token-seeds.ts — extract the literal light-mode hex seeds from
 * palettes.css into a small JSON the published `ljkui-lint-raw-colors` bin can
 * read at runtime (the bin ships in `dist/` and can't reach `src/`).
 *
 * Writes `dist/token-seeds.json`: `[{ palette, step, hex }, …]`.
 * Run as part of `build:meta`.
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const cssPath = resolve(here, '..', 'src', 'styles', 'tokens', 'palettes.css');
const outFile = resolve(here, '..', 'dist', 'token-seeds.json');

function normalizeHex(hex: string): string {
  let h = hex.replace('#', '').toLowerCase();
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  if (h.length === 8) h = h.slice(0, 6);
  return `#${h}`;
}

const css = readFileSync(cssPath, 'utf8');
const seeds: Array<{ palette: string; step: number; hex: string }> = [];
const seen = new Set<string>();
const re = /--([a-z]+)-(\d+)\s*:\s*(#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)\s*;/g;
let m: RegExpExecArray | null;
while ((m = re.exec(css)) !== null) {
  const palette = m[1];
  const step = Number(m[2]);
  const key = `${palette}-${step}`;
  if (seen.has(key)) continue;
  seen.add(key);
  seeds.push({ palette, step, hex: normalizeHex(m[3]) });
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(seeds) + '\n');
console.log(`Token seeds: ${seeds.length} → dist/token-seeds.json`);
