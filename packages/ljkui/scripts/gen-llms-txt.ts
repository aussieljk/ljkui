/**
 * gen-llms-txt.ts — generate the docs that AI coding agents read.
 *
 * Writes two files into `dist/` (both shipped + exported from the package, and
 * copied into the deployed explorer by scripts/deploy.ts):
 *
 *   - llms.txt       a one-page cheatsheet. Setup, the rules that break things
 *                    when ignored, and one line per component listing its
 *                    exports and the exact values its props accept. An agent
 *                    reads this once and can write correct ljkui code.
 *   - llms-full.txt  the long version: every guide inlined, a real code example
 *                    per component (its `Overview` example, verbatim), and the
 *                    full prop reference.
 *
 * Sources: guides/*.mdx (prose), examples/*.examples.tsx (code), the built
 * dist/index.js (the real export names), src/generated/props.json (props).
 * Run as part of `build:meta`, after `build:js`.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(here, '..');
const guidesDir = join(pkgRoot, 'guides');
const examplesDir = join(pkgRoot, 'examples');
const distDir = join(pkgRoot, 'dist');
const DOCS_URL = 'https://ljkui.vercel.app';

interface PropRow {
  type?: string;
  default?: string | number | boolean | null;
  description?: string;
}
type Props = Record<string, Record<string, PropRow>>;

const propsPath = join(pkgRoot, 'src/generated/props.json');
if (!existsSync(propsPath)) {
  // Silently emitting an empty prop reference ships broken docs. Fail loudly — `generate:props`
  // must run first (build:meta and generate:fixtures both do).
  console.error(`✗ ${propsPath} is missing. Run \`bun run generate:props\` before gen-llms-txt.`);
  process.exit(1);
}
const props: Props = JSON.parse(readFileSync(propsPath, 'utf8'));
if (Object.keys(props).length === 0) {
  console.error(`✗ ${propsPath} is empty — the prop reference would be blank. Regenerate it.`);
  process.exit(1);
}

/*
 * The export names come from the built package, not from a list kept by hand: whatever
 * `import { … } from 'ljkui'` resolves to is exactly what an agent can write.
 */
const distEntry = join(distDir, 'index.js');
if (!existsSync(distEntry)) {
  console.error(`✗ ${distEntry} is missing. Run \`bun run build:js\` before gen-llms-txt.`);
  process.exit(1);
}
const barrel: Record<string, unknown> = await import(distEntry);

/**
 * `AlertDialog` → `alert-dialog`, the key props.json and examples/ use. Acronyms stay
 * whole (`InputOTP` → `input-otp`), which is how the files are actually named.
 */
const kebab = (name: string) =>
  name
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

/** The sub-exports of a namespace component (`Tabs.Root`, `Tabs.List`, …), or `[]`. */
function namespaceParts(name: string): string[] {
  const value = barrel[name];
  if (typeof value !== 'object' || value === null) return [];
  return Object.keys(value).filter((k) => /^[A-Z]/.test(k));
}

/** `"1" | "2" | "3"` → `1|2|3`; anything else is passed through as-is. */
function shortType(type: string | undefined): string {
  if (!type) return '';
  const parts = type.split('|').map((p) => p.trim());
  if (parts.length > 1 && parts.every((p) => /^"[^"]*"$/.test(p))) {
    const values = parts.map((p) => p.slice(1, -1));
    // The 26 palette names are the same everywhere. Naming them once, in Rules, keeps
    // every component line short enough to scan.
    if (values.length > 8 && values.includes('blue') && values.includes('slate')) return '<color>';
    return values.join('|');
  }
  return type;
}

/** `size=1|2|3|4 (2)` — the value set, and the default in brackets. */
function propSummary(slug: string): string {
  return Object.entries(props[slug] ?? {})
    .map(([prop, def]) => {
      const type = shortType(def.type);
      const dflt = def.default !== undefined && def.default !== null ? ` (${String(def.default)})` : '';
      return type ? `${prop}=${type}${dflt}` : `${prop}${dflt}`;
    })
    .join(', ');
}

/** Strip MDX frontmatter and read the title. */
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

/**
 * The body of a component's `Overview()` example, verbatim — the canonical usage (see
 * CLAUDE.md), so it is real, compiling code rather than a snippet written for the docs
 * and left to rot. A handful of modules have no `Overview`; their first example is
 * just as real, so take that instead of shipping the component with no code at all.
 */
/** Components whose examples live under another name — `Typography.Text` is `text`. */
const EXAMPLE_ALIASES: Record<string, string> = { typography: 'text' };

function overviewExample(slug: string): string | undefined {
  const file = join(examplesDir, `${EXAMPLE_ALIASES[slug] ?? slug}.examples.tsx`);
  if (!existsSync(file)) return undefined;
  const src = readFileSync(file, 'utf8');
  let start = src.indexOf('Overview() {');
  if (start === -1) start = src.search(/\n  (?:'[^']+'|[A-Za-z]\w*)\(\) \{/);
  if (start === -1) return undefined;

  // Walk braces from the opening `{` to find where the function body ends.
  let depth = 0;
  let end = -1;
  for (let i = src.indexOf('{', start); i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}' && --depth === 0) {
      end = i;
      break;
    }
  }
  if (end === -1) return undefined;

  const body = src.slice(src.indexOf('{', start) + 1, end).replace(/^\n+|\s+$/g, '');
  // Drop the shared 4-space indent the example carries from sitting inside `examples = {}`.
  const lines = body.split('\n');
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length));
  const code = lines.map((l) => l.slice(indent)).join('\n');

  // An example that is nothing but `return ( … );` reads better as the JSX alone.
  if (code.startsWith('return (') && code.endsWith(');')) {
    const inner = code.slice('return ('.length, -');'.length).replace(/^\n+|\s+$/g, '');
    if (!inner.includes('\nreturn')) return inner.replace(/^ {2}/gm, '');
  }
  return code;
}

const guides = readdirSync(guidesDir)
  .filter((f) => f.endsWith('.mdx'))
  .sort()
  .map(readGuide);

/*
 * Every component the barrel exports — a PascalCase function (a component) or object (a
 * namespace like `Tabs`). Driven by the barrel rather than by props.json so that the
 * prop-less primitives (Flex, Box, Grid, …) are listed too; an agent that cannot see
 * them will reach for a `<div>` instead.
 */
const components = Object.keys(barrel)
  .filter((name) => /^[A-Z]/.test(name))
  .filter((name) => typeof barrel[name] === 'function' || namespaceParts(name).length > 0)
  .sort()
  .map((name) => ({ name, slug: kebab(name) }));

const blurb =
  'ljkui — a React component library. Themeable, ESM-only, ships its own CSS. Import components from `ljkui`, import `ljkui/styles.css` once, wrap your app in `<Theme>`.';

const setup = [
  '```tsx',
  '// 1. install:  bun add ljkui',
  '// 2. at the root of your app:',
  "import { Theme } from 'ljkui';",
  "import 'ljkui/styles.css';",
  '',
  'export default function App() {',
  '  return (',
  '    <Theme>',
  '      <YourApp />',
  '    </Theme>',
  '  );',
  '}',
  '```',
];

const rules = [
  'Read these before writing code. Each one fails quietly if you get it wrong.',
  '',
  "- Import everything from the package root: `import { Button, Card } from 'ljkui'`. There are no per-component paths.",
  '- `ljkui/styles.css` must be imported exactly once, at the app root.',
  '- Using Tailwind? Put the import in a layer, or the library reset silently beats every Tailwind utility:',
  "  `@layer theme, base, ljkui, components, utilities;` then `@import 'ljkui/styles.css' layer(ljkui);`",
  '- Size, variant and radius props are strings, not numbers: `size="2"`, not `size={2}`.',
  '- `<color>` below means any of: danger, warning, success, info, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, slate, gray, zinc, neutral, stone.',
  '- The gray scale is fixed. There is no prop for it and no token to override — just use `color="gray"` or `var(--gray-*)`.',
  '- The library ships no icon set. Import icons from whatever library you like and pass them as children: `<Button><Search /> Search</Button>`. Inside a Button or IconButton they are sized automatically, so an icon that carries no width/height of its own still comes out right.',
  "- The library ships no font. Text inherits the host page's font; `--font-mono` is used for code if you define it.",
  '- ESM only. There is no CommonJS build.',
];

/* ------------------------------------------------------------------ */
/* llms.txt — the one-page cheatsheet                                  */
/* ------------------------------------------------------------------ */

const indexParts: string[] = [
  '# ljkui',
  '',
  `> ${blurb}`,
  '',
  '## Setup',
  '',
  ...setup,
  '',
  '## Rules',
  '',
  ...rules,
  '',
  '## Components',
  '',
  'One line each: the export, then its props and the values they accept, with the default in brackets. `parts:` lists the sub-components of a namespace, written as `Tabs.Root`.',
  '',
];

for (const { slug, name } of components) {
  const parts = namespaceParts(name);
  const summary = propSummary(slug);
  const line = [`- \`${name}\``, summary, parts.length ? `parts: ${parts.join(', ')}` : ''].filter(Boolean).join(' — ');
  indexParts.push(line);
}

indexParts.push(
  '',
  '## More',
  '',
  `- [llms-full.txt](${DOCS_URL}/llms-full.txt): a working code example for every component, plus the full guides and prop descriptions.`,
  `- [${DOCS_URL}](${DOCS_URL}): the live component explorer.`,
  '',
);

/* ------------------------------------------------------------------ */
/* llms-full.txt — guides, examples, full props                        */
/* ------------------------------------------------------------------ */

const fullParts: string[] = [
  '# ljkui — full documentation',
  '',
  `> ${blurb}`,
  '',
  'Start with llms.txt if you have not read it — it has the setup and the rules.',
  '',
  '---',
  '',
  '# Guides',
  '',
];

for (const g of guides) {
  fullParts.push(`## ${g.title}`, '', g.body, '', '---', '');
}

fullParts.push('# Components', '');
for (const { slug, name } of components) {
  fullParts.push(`## ${name}`, '');

  const parts = namespaceParts(name);
  if (parts.length) fullParts.push(`Parts: ${parts.map((p) => `${name}.${p}`).join(', ')}`, '');

  const example = overviewExample(slug);
  if (example) fullParts.push('```tsx', example, '```', '');

  const rows = Object.entries(props[slug] ?? {});
  if (rows.length) {
    fullParts.push('Props:');
    for (const [prop, def] of rows) {
      const type = def.type ? `: ${def.type}` : '';
      const dflt = def.default !== undefined && def.default !== null ? ` (default: ${String(def.default)})` : '';
      const desc = def.description ? ` — ${def.description}` : '';
      fullParts.push(`  - ${prop}${type}${dflt}${desc}`);
    }
    fullParts.push('');
  }
}

mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, 'llms.txt'), indexParts.join('\n'));
writeFileSync(join(distDir, 'llms-full.txt'), fullParts.join('\n'));
console.log(`llms.txt: ${components.length} components, ${guides.length} guides → dist/llms.txt + dist/llms-full.txt`);
