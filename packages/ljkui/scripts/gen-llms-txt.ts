/**
 * gen-llms-txt.ts — generate machine-readable docs for AI coding agents.
 *
 * Writes two files into `dist/` (both shipped + exported from the package):
 *   - llms.txt       a compact index (llmstxt.org format): blurb, install,
 *                    the guide list, and every component + its props.
 *   - llms-full.txt  the full corpus: every guide's prose inlined, plus a
 *                    complete prop reference from props.json.
 *
 * Sources: README.md (blurb), guides/*.mdx (prose), src/generated/props.json
 * (component + prop metadata). Run as part of `build:meta`.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(here, '..');
const guidesDir = join(pkgRoot, 'guides');
const distDir = join(pkgRoot, 'dist');
const DOCS_URL = 'https://ljkui.vercel.app';

interface PropRow {
  type?: string;
  default?: string | number | boolean | null;
  description?: string;
}
type Props = Record<string, Record<string, PropRow>>;

const props: Props = existsSync(join(pkgRoot, 'src/generated/props.json'))
  ? JSON.parse(readFileSync(join(pkgRoot, 'src/generated/props.json'), 'utf8'))
  : {};

/** Strip MDX frontmatter and downgrade a few MDX-only tags to plain markdown. */
function readGuide(file: string): { title: string; body: string } {
  const raw = readFileSync(join(guidesDir, file), 'utf8');
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const body = (fm ? raw.slice(fm[0].length) : raw).trim();
  const titleMatch = (
    fm?.[1].match(/title:\s*(.+)/)?.[1] ??
    body.match(/^#\s+(.+)/m)?.[1] ??
    file.replace(/\.mdx$/, '')
  )
    .trim()
    .replace(/^['"]|['"]$/g, '');
  return { title: titleMatch, body };
}

const guideFiles = readdirSync(guidesDir)
  .filter((f) => f.endsWith('.mdx'))
  .sort();

const guides = guideFiles.map(readGuide);

const componentNames = Object.keys(props).sort();

function propsBlock(name: string): string {
  const rows = props[name];
  const lines = Object.entries(rows).map(([prop, def]) => {
    const type = def.type ? `: ${def.type}` : '';
    const dflt = def.default !== undefined && def.default !== null ? ` (default: ${String(def.default)})` : '';
    const desc = def.description ? ` — ${def.description}` : '';
    return `  - ${prop}${type}${dflt}${desc}`;
  });
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// llms.txt — compact index
// ---------------------------------------------------------------------------

const blurb =
  'ljkui — a themeable React design system: components, SwiftUI-style layout primitives, and pluggable icon sets. ESM-only. Wrap your app in `<Theme>` and import `ljkui/styles.css`.';

const indexParts: string[] = [
  '# ljkui',
  '',
  `> ${blurb}`,
  '',
  '## Install',
  '',
  '```sh',
  'bun add ljkui',
  '```',
  '',
  'Import the CSS once at your app root and wrap it in `<Theme>`. With Tailwind, import styles.css into the `ljkui` layer (see the Installation & Layers guide) or headings will flatten.',
  '',
  '## Guides',
  '',
  ...guides.map((g) => `- [${g.title}](${DOCS_URL}): see llms-full.txt for full text`),
  '',
  '## Components',
  '',
  ...componentNames.map((n) => `- ${n}`),
  '',
  '## Full docs',
  '',
  `- [llms-full.txt](${DOCS_URL}/llms-full.txt): every guide inlined + full prop reference`,
  '',
];

// ---------------------------------------------------------------------------
// llms-full.txt — full corpus
// ---------------------------------------------------------------------------

const fullParts: string[] = ['# ljkui — full documentation', '', `> ${blurb}`, '', '---', '', '# Guides', ''];

for (const g of guides) {
  fullParts.push(`## ${g.title}`, '', g.body, '', '---', '');
}

fullParts.push('# Component props', '');
for (const name of componentNames) {
  fullParts.push(`## ${name}`, '', propsBlock(name), '');
}

mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, 'llms.txt'), indexParts.join('\n'));
writeFileSync(join(distDir, 'llms-full.txt'), fullParts.join('\n'));
console.log(
  `llms.txt: ${componentNames.length} components, ${guides.length} guides → dist/llms.txt + dist/llms-full.txt`,
);
