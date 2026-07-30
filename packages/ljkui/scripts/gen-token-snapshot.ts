#!/usr/bin/env bun
/**
 * Token contract snapshot — guards the fragile palette/token CSS.
 *
 * The palette generator is easy to get subtly wrong (the 12 Radix-style role steps, the
 * deliberately non-monotone bright scales — see CLAUDE.md → Sharp Edges). This captures every
 * `--token: value` declaration across the color token CSS into a committed, sorted JSON file,
 * so a palette edit surfaces as an explicit, reviewable `git diff` of exactly which values
 * moved — no test framework, just the snapshot.
 *
 *   bun scripts/gen-token-snapshot.ts          # rewrite the snapshot (after a deliberate change)
 *   bun scripts/gen-token-snapshot.ts --check  # CI: fail if the snapshot is stale vs the CSS
 *
 * Declarations are deduped and sorted, so the file is order-independent; the same token
 * defined with different values in different scopes (light/dark) keeps every distinct value.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const packageRoot = join(import.meta.dirname, '..');
const tokensDir = join(packageRoot, 'src', 'styles', 'tokens');
const outFile = join(packageRoot, 'src', 'generated', 'tokens.snapshot.json');

/** The color token sources — the parts most likely to drift when a palette is regenerated. */
const SOURCES = ['palettes.css', 'custom-color.css', 'color.css'];

/** Every `--name: value` declaration in a stylesheet, whitespace-normalised. */
function declarations(css: string): string[] {
  const out: string[] = [];
  for (const match of css.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;{}]+);/gi)) {
    const name = match[1];
    const value = match[2].replace(/\s+/g, ' ').trim();
    out.push(`${name}: ${value}`);
  }
  return out;
}

const decls = new Set<string>();
for (const file of SOURCES) {
  const path = join(tokensDir, file);
  if (!existsSync(path)) continue;
  for (const decl of declarations(readFileSync(path, 'utf8'))) decls.add(decl);
}
const snapshot = [...decls].sort();
const serialized = JSON.stringify(snapshot, null, 2) + '\n';

if (process.argv.includes('--check')) {
  const current = existsSync(outFile) ? readFileSync(outFile, 'utf8') : '';
  if (current !== serialized) {
    console.error(
      '✗ token snapshot is stale — the color token CSS changed without updating the snapshot.\n' +
        '  Run `bun run generate:tokens-snapshot` and commit src/generated/tokens.snapshot.json,\n' +
        '  then review the diff to confirm every moved value is intentional.',
    );
    process.exit(1);
  }
  console.log(`✓ token snapshot current (${snapshot.length} declarations).`);
} else {
  writeFileSync(outFile, serialized);
  console.log(`✓ token snapshot: ${snapshot.length} declarations → src/generated/tokens.snapshot.json`);
}
