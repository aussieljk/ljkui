#!/usr/bin/env bun
/**
 * Guards the per-component file conventions the library relies on but nothing else enforces, so a
 * new component can't half-land. Complements `check-props.ts` (prop-table coverage) and
 * `gen-css-index.ts --check` (css registration). For every directory under `src/components`:
 *
 *   - it exports a barrel `index.ts` (the component `export *`d from `src/components/index.ts`), and
 *   - it has a matching `examples/<name>.examples.tsx` demo (the source of its explorer fixtures).
 *
 * A handful of internal primitives and the split `typography/` dir are exempt below.
 *
 *   bun scripts/check-component-shape.ts
 */
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const packageRoot = join(import.meta.dirname, '..');
const componentsDir = join(packageRoot, 'src', 'components');
const examplesDir = join(packageRoot, 'examples');

/** Internal `base-*` primitives composed by other components — never exported or demoed on their own. */
const INTERNAL = new Set(['base-button', 'base-menu', 'base-tabs-list', 'base-toggle-group-list']);

/** Dirs that legitimately have no `examples/<dir>.examples.tsx` because they fan out to several
 * per-export examples instead (typography → heading/text/code/…). */
const NO_EXAMPLE = new Set([...INTERNAL, 'typography']);

/** Dirs with no barrel `index.ts` (purely internal, imported by path). */
const NO_INDEX = new Set(['base-toggle-group-list']);

const dirs = readdirSync(componentsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const missingIndex = dirs.filter((d) => !NO_INDEX.has(d) && !existsSync(join(componentsDir, d, 'index.ts')));
const missingExample = dirs.filter((d) => !NO_EXAMPLE.has(d) && !existsSync(join(examplesDir, `${d}.examples.tsx`)));

let failed = false;
const report = (label: string, list: string[], fix: string) => {
  if (list.length === 0) return;
  failed = true;
  console.error(`✗ ${list.length} ${label}:\n` + list.map((d) => `    ${d}`).join('\n') + `\n  ${fix}`);
};

report(
  'component(s) missing a barrel index.ts',
  missingIndex,
  'Add src/components/<name>/index.ts, or add the slug to NO_INDEX in scripts/check-component-shape.ts.',
);
report(
  'component(s) missing an examples/<name>.examples.tsx',
  missingExample,
  'Add the examples module (see examples/button.examples.tsx), or add the slug to NO_EXAMPLE.',
);

if (failed) process.exit(1);
console.log(`✓ component shape: ${dirs.length} components have an index.ts and an examples module.`);
