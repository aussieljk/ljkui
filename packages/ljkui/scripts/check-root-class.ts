#!/usr/bin/env bun
/**
 * Guards the shared root-className conventions. The `fui-*` root modifiers — `fui-r-size-<n>`,
 * `fui-variant-<name>`, `fui-orientation-<name>`, `fui-r-alignment-<name>`, `fui-side-<name>` and
 * the `fui-high-contrast` flag — must be assembled in ONE place: the `rootClassName` helper
 * (src/helpers/props/root-class-name.ts). A component that hand-spells any of them has a private,
 * drifting copy of that logic — which is exactly how several components silently ended up missing
 * `highContrast`. This gate fails if a component file spells a modifier literal itself.
 *
 *   bun scripts/check-root-class.ts
 *
 * To clear the backlog: route the component's root `className` through `rootClassName(...)` (see
 * badge/badge.tsx or v-stack/v-stack.tsx) and delete its slug from BACKLOG below. The script also
 * fails if a BACKLOG entry no longer hand-spells any modifier — so the list can't rot.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const componentsDir = join(import.meta.dirname, '..', 'src', 'components');

/** Literal modifier patterns that belong only inside `rootClassName`. */
const MODIFIER_RE =
  /fui-r-size-\$|fui-variant-\$|fui-orientation-\$|fui-r-alignment-\$|fui-side-\$|'fui-high-contrast'/;

/** Components that still hand-spell modifiers — shrink this list, don't grow it. */
const BACKLOG = new Set<string>([
  'alert',
  'alert-dialog',
  'autocomplete',
  'avatar',
  'avatar-group',
  'avatar-stack',
  'base-button',
  'card',
  'checkbox',
  'combobox',
  'context-menu',
  'data-table',
  'date-field',
  'dialog',
  'dropdown-menu',
  'empty',
  'filter-chip',
  'hover-card',
  'input',
  'item',
  'kbd',
  'number-field',
  'overlay',
  'pagination',
  'popover',
  'radio-button-group',
  'radio-group',
  'scroll-area',
  'select',
  'separator',
  'skeleton',
  'slider',
  'spinner',
  'switch',
  'table',
  'tabs',
  'tabs-nav',
  'textarea',
  'toggle',
  'typography',
]);

const dirs = readdirSync(componentsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const handSpells = (dir: string) =>
  readdirSync(join(componentsDir, dir))
    .filter((file) => file.endsWith('.tsx'))
    .some((file) => MODIFIER_RE.test(readFileSync(join(componentsDir, dir, file), 'utf8')));

const offenders = dirs.filter((dir) => !BACKLOG.has(dir) && handSpells(dir));
const staleBacklog = dirs.filter((dir) => BACKLOG.has(dir) && !handSpells(dir));

let failed = false;

if (offenders.length > 0) {
  failed = true;
  console.error(
    `✗ ${offenders.length} component(s) hand-spell fui-* root modifiers instead of using rootClassName:\n` +
      offenders.map((d) => `    src/components/${d}/`).join('\n') +
      `\n  Route the root className through rootClassName(...) (see src/components/badge/badge.tsx).`,
  );
}

if (staleBacklog.length > 0) {
  failed = true;
  console.error(
    `✓ ${staleBacklog.length} BACKLOG component(s) no longer hand-spell modifiers — remove them from scripts/check-root-class.ts:\n` +
      staleBacklog.map((d) => `    ${d}`).join('\n'),
  );
}

if (failed) process.exit(1);
console.log(`✓ root-className conventions OK (${BACKLOG.size} in migration backlog)`);
