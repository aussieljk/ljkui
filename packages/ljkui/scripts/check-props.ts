#!/usr/bin/env bun
/**
 * Guards prop-table coverage: every component directory under `src/components` must ship a
 * `*.props.ts` (the structured propDefs `gen-props.ts` turns into the Storybook prop table),
 * unless it is explicitly exempted below. A new component with no propDefs therefore fails CI
 * rather than silently landing without a prop table — the coverage can't quietly rot.
 *
 *   bun scripts/check-props.ts
 *
 * To clear the backlog: give the component a `<name>.props.ts` and delete it from BACKLOG.
 * The script also fails if an exempt entry has since gained a props file (keep the list honest).
 */
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const componentsDir = join(import.meta.dirname, '..', 'src', 'components');

/** Genuine primitives / structural wrappers with no design-system props to document — permanent. */
const PRIMITIVES = new Set([
  'aspect-ratio',
  'base-toggle-group-list',
  'empty',
  'portal',
  'shine',
  'spacer',
  'visually-hidden',
]);

/** User-facing components that still owe a props.ts — shrink this list, don't grow it. */
const BACKLOG = new Set([
  'collapsible',
  'command',
  'credit-card',
  'field',
  'fieldset',
  'input-group',
  'lightbox',
  'menubar',
  'resizable',
  'sheet',
  'toggle-group',
  'toggle-group-radio-group',
]);

const exempt = new Set([...PRIMITIVES, ...BACKLOG]);

const dirs = readdirSync(componentsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const hasProps = (dir: string) => readdirSync(join(componentsDir, dir)).some((file) => file.endsWith('.props.ts'));

const missing = dirs.filter((dir) => !exempt.has(dir) && !hasProps(dir));
const staleExempt = dirs.filter((dir) => exempt.has(dir) && hasProps(dir));

let failed = false;

if (missing.length > 0) {
  failed = true;
  console.error(
    `✗ ${missing.length} component(s) have no *.props.ts and are not exempt:\n` +
      missing.map((d) => `    src/components/${d}/`).join('\n') +
      `\n  Add a \`<name>.props.ts\` (see button/button.props.ts), or add the slug to PRIMITIVES/BACKLOG in scripts/check-props.ts.`,
  );
}

if (staleExempt.length > 0) {
  failed = true;
  console.error(
    `✗ ${staleExempt.length} exempt component(s) now have a props file — remove them from scripts/check-props.ts:\n` +
      staleExempt.map((d) => `    ${d}`).join('\n'),
  );
}

if (failed) process.exit(1);

console.log(
  `✓ props coverage: ${dirs.length - exempt.size}/${dirs.length} components documented ` +
    `(${PRIMITIVES.size} primitives exempt, ${BACKLOG.size} on the backlog).`,
);
