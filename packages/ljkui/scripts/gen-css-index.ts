#!/usr/bin/env bun
/**
 * Guards (and fixes) CSS registration in `src/styles/index.css`.
 *
 * `index.css` is the hand-ordered manifest of `@import`s that becomes the shipped `styles.css`.
 * Its ordering is load-bearing (dialog after heading/text; autocomplete after base-menu; utilities
 * and layout after the components), so this script does NOT reorder it — it only makes sure every
 * component stylesheet actually reaches the bundle. A component whose `.css` is never imported (by
 * index.css directly, or transitively via another component's `@import`) ships with no styles and
 * fails silently — exactly how `credit-card.css` sat unstyled.
 *
 *   bun run scripts/gen-css-index.ts            # append any orphaned component css (at the end)
 *   bun run scripts/gen-css-index.ts --check    # fail instead of writing (CI)
 *
 * New leaf components land at the bottom, matching how they're added by hand; move the line up into
 * the right ordering group only if it has a real cascade dependency.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const packageRoot = join(import.meta.dirname, '..');
const componentsDir = join(packageRoot, 'src', 'components');
const indexCss = join(packageRoot, 'src', 'styles', 'index.css');

/** Every `.css` reachable from `entry` by following relative `@import '...'` transitively. */
function reachableCss(entry: string): Set<string> {
  const seen = new Set<string>();
  const visit = (file: string) => {
    const abs = resolve(file);
    if (seen.has(abs) || !existsSync(abs)) return;
    seen.add(abs);
    const src = readFileSync(abs, 'utf8');
    for (const m of src.matchAll(/@import\s+'(\.[^']+)'/g)) {
      visit(resolve(dirname(abs), m[1]));
    }
  };
  visit(entry);
  return seen;
}

/** Every component stylesheet: `src/components/<dir>/<file>.css`. */
function componentCssFiles(): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(componentsDir)) {
    const dir = join(componentsDir, entry);
    if (!statSync(dir).isDirectory()) continue;
    for (const file of readdirSync(dir)) {
      if (file.endsWith('.css')) out.push(join(dir, file));
    }
  }
  return out;
}

const reachable = reachableCss(indexCss);
const orphans = componentCssFiles().filter((f) => !reachable.has(resolve(f)));
const check = process.argv.includes('--check');

if (orphans.length === 0) {
  console.log('✓ css registration: every component stylesheet is imported by src/styles/index.css.');
  process.exit(0);
}

const importLines = orphans.map((f) => `@import '${relative(dirname(indexCss), f)}';`);

if (check) {
  console.error(
    `✗ ${orphans.length} component stylesheet(s) are not imported anywhere (they ship unstyled):\n` +
      orphans.map((f) => `    ${relative(packageRoot, f)}`).join('\n') +
      `\n  Run \`bun run scripts/gen-css-index.ts\` to append them, or add the @import to src/styles/index.css by hand.`,
  );
  process.exit(1);
}

const current = readFileSync(indexCss, 'utf8');
const next = current.replace(/\n*$/, '\n') + importLines.join('\n') + '\n';
writeFileSync(indexCss, next);
console.log(
  `Appended ${orphans.length} orphaned import(s) to src/styles/index.css:\n    ${importLines.join('\n    ')}`,
);
