/**
 * Generates one docs page per live demo in the ljkui package. The demos are the source of
 * truth for the current component API (the archived Storybook MDX describes an older, drifted
 * API), so each page renders the real `<Demo>` and nothing goes stale silently.
 *
 * Idempotent: only writes a page that doesn't exist yet, so hand-authored pages (button.mdx and
 * anything you enrich later) are preserved. Re-run after adding a demo:
 *
 *   bun run scripts/gen-component-pages.ts
 */
import { readdirSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { componentLabel } from '../src/lib/component-label';

const here = dirname(fileURLToPath(import.meta.url));
const demosDir = join(here, '../../ljkui/demos');
const examplesDir = join(here, '../../ljkui/examples');
const outDir = join(here, '../content/docs/components');

mkdirSync(outDir, { recursive: true });

const demos = readdirSync(demosDir)
  .filter((f) => f.endsWith('.demo.tsx'))
  .map((f) => f.replace('.demo.tsx', ''))
  .sort();

// A component only gets an `## Examples` section if it actually has a variant gallery.
const withExamples = new Set(
  readdirSync(examplesDir)
    .filter((f) => f.endsWith('.examples.tsx'))
    .map((f) => f.replace('.examples.tsx', '')),
);

let created = 0;
for (const name of demos) {
  const file = join(outDir, `${name}.mdx`);
  if (existsSync(file)) continue;

  const title = componentLabel(name);
  const examples = withExamples.has(name) ? `## Examples\n\n<Examples name="${name}" />\n\n` : '';
  writeFileSync(
    file,
    `---
title: ${title}
description: ${title} component.
---

<Demo name="${name}" />

${examples}## Props

<PropsTable component="${name}" />
`,
  );
  created++;
}

console.log(
  `Component pages: ${created} created, ${demos.length - created} already existed (${demos.length} demos total).`,
);
