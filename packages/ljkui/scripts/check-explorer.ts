#!/usr/bin/env bun
/**
 * Guards the hand-authored halves of the explorer against silent drift.
 *
 * `fixtures/` is generated, so anything it does not reference is invisible: nothing imports
 * it, nothing builds it, and nothing complains. That is exactly how the three hand-written
 * tools (Color scales, Icon Browser, Theme Playground) were deleted along with `stories/`
 * during the Storybook migration and only caught by eye in `git status`.
 *
 *   bun run scripts/check-explorer.ts    # fail on any drift (CI)
 *
 * Four checks, each covering a thing the generator reads but does not verify:
 *   1. every `fixture-support/tools/*.tsx` has a TOOLS entry, and vice versa
 *   2. every tool module actually exports a non-empty `fixtures` object
 *   3. every `guides/*.mdx` has a GUIDES entry, and vice versa
 *   4. every `examples/*.examples.tsx` exports `fileMeta` naming a real section
 */
import { existsSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { GUIDES, LAYOUTS, SECTIONS, TOOLS } from './gen-fixtures-meta.ts';

const packageRoot = join(import.meta.dirname, '..');
const toolsDir = join(packageRoot, 'fixture-support', 'tools');
const guidesDir = join(packageRoot, 'guides');
const examplesDir = join(packageRoot, 'examples');

const problems: string[] = [];

/* 1 + 2 — tools. */
const toolModules = readdirSync(toolsDir)
  .filter((file) => file.endsWith('.tsx'))
  .map((file) => basename(file, '.tsx'));
const declaredTools = new Set(TOOLS.map((tool) => tool.module));

for (const module of toolModules) {
  if (!declaredTools.has(module)) {
    problems.push(
      `fixture-support/tools/${module}.tsx has no TOOLS entry in scripts/gen-fixtures-meta.ts — ` +
        `it will never appear in the explorer.`,
    );
  }
}
for (const tool of TOOLS) {
  const path = join(toolsDir, `${tool.module}.tsx`);
  if (!existsSync(path)) {
    problems.push(`TOOLS names ${tool.module}, but fixture-support/tools/${tool.module}.tsx does not exist.`);
    continue;
  }
  const mod = (await import(path)) as { fixtures?: Record<string, unknown> };
  if (!mod.fixtures || Object.keys(mod.fixtures).length === 0) {
    problems.push(`fixture-support/tools/${tool.module}.tsx exports no non-empty \`fixtures\` object.`);
  }
}

/* 3 — guides. */
const guideFiles = readdirSync(guidesDir).filter((file) => file.endsWith('.mdx'));
const declaredGuides = new Set(GUIDES.map((guide) => guide.file));

for (const file of guideFiles) {
  if (!declaredGuides.has(file)) {
    problems.push(`guides/${file} has no GUIDES entry in scripts/gen-fixtures-meta.ts — it is not in the explorer.`);
  }
}
for (const guide of GUIDES) {
  if (!existsSync(join(guidesDir, guide.file))) {
    problems.push(`GUIDES names guides/${guide.file}, which does not exist.`);
  }
}

/* 4 — every examples module declares where it belongs. */
for (const file of readdirSync(examplesDir).filter((f) => f.endsWith('.examples.tsx'))) {
  const mod = (await import(join(examplesDir, file))) as {
    fileMeta?: { group?: string; layout?: string };
    examples?: Record<string, unknown>;
  };
  if (!mod.examples || Object.keys(mod.examples).length === 0) {
    problems.push(`examples/${file} exports no non-empty \`examples\` object.`);
  }
  const group = mod.fileMeta?.group;
  if (!group) {
    problems.push(`examples/${file} has no \`export const fileMeta\` — add \`{ group, layout }\`.`);
    continue;
  }
  const top = group.split('/')[0];
  if (!SECTIONS.includes(top)) {
    problems.push(`examples/${file} declares group '${group}', but '${top}' is not in SECTIONS.`);
  }
  const layout = mod.fileMeta?.layout;
  if (layout && !LAYOUTS.includes(layout as (typeof LAYOUTS)[number])) {
    problems.push(`examples/${file} declares layout '${layout}', which is not a uaight layout.`);
  }
}

if (problems.length > 0) {
  console.error(`explorer: ${problems.length} problem${problems.length === 1 ? '' : 's'}\n`);
  for (const problem of problems) console.error(`  • ${problem}`);
  process.exit(1);
}

console.log(
  `explorer: ${toolModules.length} tools, ${guideFiles.length} guides, ` +
    `${readdirSync(examplesDir).filter((f) => f.endsWith('.examples.tsx')).length} example modules — all wired`,
);
