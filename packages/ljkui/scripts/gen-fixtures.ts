/**
 * Generates the uaight fixture modules from `examples/*.examples.tsx`.
 *
 * `fixtures/` is entirely generated (wiped and rewritten each run, git-tracked) and is
 * what `uaight()` scans — see `fixturesDir` in vite.config.ts. The hand-authored sources
 * it wraps are `examples/` (the component states), `guides/` (the prose, still MDX) and
 * `fixture-support/` (the theme decorator, the prop/a11y reference, the MDX component map).
 *
 * One module per component, so Vite code-splits per component and the explorer loads only
 * what you click on.
 *
 * Run with: bun run generate:fixtures (wired into `dev` / `build:explorer`).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, join, relative } from 'node:path';
import { A11Y } from './a11y-data.ts';

const packageRoot = join(import.meta.dirname, '..');
const examplesDir = join(packageRoot, 'examples');
const guidesDir = join(packageRoot, 'guides');
const componentsDir = join(packageRoot, 'src', 'components');
/** Everything under here is generated; the sources it wraps live in `examples/` and `guides/`. */
const fixturesDir = join(packageRoot, 'fixtures');

/**
 * Category per component, mirroring storybook.whop.dev's sidebar. A `/` nests
 * (whop groups the date pickers under `Controls/Dates`). uaight builds its tree from
 * directories, so a category is literally the directory the fixture module is written to.
 */
const CATEGORIES: Record<string, string> = {
  // Typography
  blockquote: 'Typography',
  code: 'Typography',
  em: 'Typography',
  heading: 'Typography',
  kbd: 'Typography',
  link: 'Typography',
  quote: 'Typography',
  strong: 'Typography',
  text: 'Typography',
  // Layout
  accordion: 'Layout',
  'aspect-ratio': 'Layout',
  bleed: 'Layout',
  collapsible: 'Layout',
  container: 'Layout',
  grid: 'Layout',
  'h-stack': 'Layout',
  inset: 'Layout',
  resizable: 'Layout',
  section: 'Layout',
  separator: 'Layout',
  sidebar: 'Layout',
  spacer: 'Layout',
  'v-stack': 'Layout',
  'z-stack': 'Layout',
  // Controls
  autocomplete: 'Controls',
  button: 'Controls',
  'button-group': 'Controls',
  checkbox: 'Controls',
  combobox: 'Controls',
  command: 'Controls',
  'context-menu': 'Controls',
  'dropdown-menu': 'Controls',
  'filter-chip': 'Controls',
  'icon-button': 'Controls',
  input: 'Controls',
  'input-group': 'Controls',
  'input-otp': 'Controls',
  menubar: 'Controls',
  'navigation-menu': 'Controls',
  'number-field': 'Controls',
  pagination: 'Controls',
  'radio-button-group': 'Controls',
  'radio-group': 'Controls',
  select: 'Controls',
  slider: 'Controls',
  switch: 'Controls',
  textarea: 'Controls',
  toggle: 'Controls',
  'toggle-group': 'Controls',
  'toggle-group-nav': 'Controls',
  'toggle-group-radio-group': 'Controls',
  // Controls / Dates — whop nests these
  calendar: 'Controls/Dates',
  'date-field': 'Controls/Dates',
  'date-picker': 'Controls/Dates',
  'date-range-picker': 'Controls/Dates',
  'range-calendar': 'Controls/Dates',
  // Data presentation
  chart: 'Data presentation',
  'data-table': 'Data presentation',
  table: 'Data presentation',
  // Forms
  field: 'Forms',
  fieldset: 'Forms',
  form: 'Forms',
  // Utilities
  shine: 'Utilities',
  theme: 'Utilities',
  icons: 'Utilities',
  scrollbars: 'Utilities',
  'country-flag': 'Utilities',
  pictograms: 'Utilities',
  'emoji-colors': 'Utilities',
  // Components — explicit so intent is clear (these also happen to be the default bucket, alongside
  // progress / circular-progress / badge / etc. which fall through implicitly).
  meter: 'Components',
  stepper: 'Components',
  timeline: 'Components',
  'tree-view': 'Components',
};
const DEFAULT_CATEGORY = 'Components';

/** Slug → the PascalCase display name whop uses (`alert-dialog` → `AlertDialog`). */
const SPECIAL_CASE_WORDS: Record<string, string> = { otp: 'OTP' };

function displayName(slug: string): string {
  return slug
    .split('-')
    .map((part) => SPECIAL_CASE_WORDS[part] ?? part[0]?.toUpperCase() + part.slice(1))
    .join('');
}

/**
 * The named examples in a module, in declaration order.
 *
 * The module is **imported** and its `examples` object read directly, rather than parsed.
 * Two earlier attempts to read the source text both produced wrong lists: a line regex for
 * a 2-space-indented `name(` matched module-scope `return (` and any nested object literal,
 * and a brace-depth scanner tripped over apostrophes in JSX prose — `don't` reads as an
 * unterminated string and swallows the rest of the object.
 *
 * Bun runs the TSX natively and resolves `ljkui` through the package tsconfig paths, so
 * importing costs nothing extra and cannot disagree with what the explorer will render.
 */
async function exampleNames(file: string): Promise<string[]> {
  const mod = (await import(join(examplesDir, file))) as { examples?: Record<string, unknown> };
  if (!mod.examples || typeof mod.examples !== 'object') {
    throw new Error(`${file} has no \`export const examples\` object.`);
  }
  const names = Object.keys(mod.examples);
  if (names.length === 0) throw new Error(`No examples found in ${file}`);
  return names;
}

const quote = (value: string) => `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;

/** An object-literal key: bare when it is a valid identifier, quoted otherwise. */
const key = (name: string) => (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : quote(name));

/**
 * Canvas layout per component. Everything defaults to `centered`, which is wrong for
 * anything that wants the full width (tables, charts, navigation) or that is a large
 * composition better shown with breathing room than dead-centred.
 */
const FULLSCREEN = new Set([
  'carousel', 'chart', 'command', 'data-table', 'drawer', 'lightbox', 'menubar', 'navigation-menu',
  'oscar', 'overlay', 'resizable', 'sheet', 'sidebar', 'sonner', 'table',
]); // prettier-ignore
const PADDED = new Set([
  'accordion', 'aspect-ratio', 'breadcrumb', 'collapsible', 'empty', 'field', 'fieldset', 'form',
  'grid', 'h-stack', 'inset', 'item', 'pagination', 'scroll-area', 'tabs', 'tabs-nav', 'v-stack',
  'widget-stack', 'z-stack',
]); // prettier-ignore

const layoutFor = (slug: string) => (FULLSCREEN.has(slug) ? 'fullscreen' : PADDED.has(slug) ? 'padded' : 'centered');

interface PropEntry {
  type?: string;
  default?: string;
  description?: string;
  required?: boolean;
}

function loadPropsJson(): Record<string, Record<string, PropEntry>> {
  const path = join(packageRoot, 'src', 'generated', 'props.json');
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    console.warn('uaight: src/generated/props.json not found — run `bun run generate:props`.');
    return {};
  }
}

const propsBySlug = loadPropsJson();
const hasProps = (slug: string) => Object.keys(propsBySlug[slug] ?? {}).length > 0;
/** A component gets a `Reference` fixture only when there is something to put on it. */
const hasReference = (slug: string) => hasProps(slug) || !!A11Y[slug];

/** Import specifier from a generated module back up to a repo-root-relative path. */
function importPath(fromDir: string, toFile: string): string {
  const rel = relative(fromDir, join(packageRoot, toFile)).replaceAll('\\', '/');
  return rel.startsWith('.') ? rel : `./${rel}`;
}

/* * * * * * * * * * * * * * * * * * * */
/*          Component modules          */
/* * * * * * * * * * * * * * * * * * * */

async function componentModule(slug: string, dir: string): Promise<string> {
  const names = await exampleNames(`${slug}.examples.tsx`);
  const layout = layoutFor(slug);
  const reference = hasReference(slug);

  const imports = [`import { examples } from ${quote(importPath(dir, `examples/${slug}.examples`))};`];
  if (reference) {
    // `jsx: "react"` (classic runtime) in the package tsconfig — JSX needs React in scope.
    imports.unshift(`import * as React from 'react';`);
    imports.push(`import { ComponentReference } from ${quote(importPath(dir, 'fixture-support/reference'))};`);
  }

  const meta = names.map((name) => `  ${key(name)}: { layout: ${quote(layout)} },`);
  // The reference is a document, not a component state — it always wants the full width.
  if (reference) meta.push(`  Reference: { layout: 'fullscreen' },`);

  const entries = names.map((name) => `  ${key(name)}: examples[${quote(name)}],`);
  if (reference) entries.push(`  Reference: () => <ComponentReference slug=${quote(slug)} />,`);

  return `${GENERATED_BY}
${imports.join('\n')}

export const fixtureMeta = {
${meta.join('\n')}
};

export default {
${entries.join('\n')}
};
`;
}

const GENERATED_BY = '// GENERATED by scripts/gen-fixtures.ts — do not edit.';

/* * * * * * * * * * * * * * * * * * * */
/*            Guide modules            */
/* * * * * * * * * * * * * * * * * * * */

/**
 * The guides, in reading order. The MDX in `guides/` is the single source of truth for
 * the prose and is rendered as-authored — `<Callout>`, `<Demo>` and `<PropsTable>` all
 * work now that MDX is compiled for real (see fixture-support/mdx-components.tsx).
 */
const GUIDES: Array<{ file: string; title: string }> = [
  { file: 'getting-started.mdx', title: '1. Getting started' },
  { file: 'installation.mdx', title: '2. Installation & Layers' },
  { file: 'typography.mdx', title: '3. Typography' },
  { file: 'color.mdx', title: '4. Color' },
  { file: 'breakpoints.mdx', title: '5. Breakpoints' },
  { file: 'tailwind.mdx', title: '6. Tailwind plugin' },
  { file: 'icons.mdx', title: '7. Icons' },
  { file: 'render-prop.mdx', title: '8. Render Prop (Composition)' },
  { file: 'theming.mdx', title: '9. Theming' },
  { file: 'layout.mdx', title: '10. Layout' },
  { file: 'adopting-tokens.mdx', title: '11. Adopting Tokens' },
];

/** A fixture module that renders one MDX document through the guide shell. */
function documentModule(dir: string, mdxSpecifier: string, title: string, order: number): string {
  return `${GENERATED_BY}
import * as React from 'react';
import { DEFAULT_FIXTURE } from 'uaight';
import Content, { frontmatter } from ${quote(mdxSpecifier)};
import { Guide } from ${quote(importPath(dir, 'fixture-support/guide'))};

export const fileMeta = { order: ${order} };

export const fixtureMeta = {
  [DEFAULT_FIXTURE]: { title: ${quote(title)}, layout: 'fullscreen' },
};

export default () => <Guide content={Content} frontmatter={frontmatter} />;
`;
}

/* * * * * * * * * * * * * * * * * * * */
/*                Tools                */
/* * * * * * * * * * * * * * * * * * * */

/**
 * The hand-authored explorer tools. These were the three hand-written `*.stories.tsx`
 * modules that lived alongside the generated ones; their components now sit in
 * `fixture-support/tools/`, each exporting a `fixtures` object, and this wraps them the
 * same way a component's examples are wrapped.
 */
const TOOLS: Array<{ module: string; name: string; layout: 'fullscreen' | 'padded' | 'centered' }> = [
  { module: 'ColorScale', name: 'ColorScale', layout: 'fullscreen' },
  { module: 'IconBrowser', name: 'IconBrowser', layout: 'fullscreen' },
  { module: 'ThemePlayground', name: 'ThemePlayground', layout: 'fullscreen' },
];

async function toolModule(tool: (typeof TOOLS)[number], dir: string): Promise<string> {
  const source = join(packageRoot, 'fixture-support', 'tools', `${tool.module}.tsx`);
  const mod = (await import(source)) as { fixtures?: Record<string, unknown> };
  const names = Object.keys(mod.fixtures ?? {});
  if (names.length === 0) throw new Error(`fixture-support/tools/${tool.module}.tsx has no \`fixtures\` export.`);

  return `${GENERATED_BY}
import { fixtures } from ${quote(importPath(dir, `fixture-support/tools/${tool.module}`))};

export const fixtureMeta = {
${names.map((name) => `  ${key(name)}: { layout: ${quote(tool.layout)} },`).join('\n')}
};

export default {
${names.map((name) => `  ${key(name)}: fixtures[${quote(name)}],`).join('\n')}
};
`;
}

/* * * * * * * * * * * * * * * * * * * */
/*          Generated reports          */
/* * * * * * * * * * * * * * * * * * * */

type CatalogEntry = { slug: string; category: string; component: string; count: number };

const yn = (v: boolean) => (v ? '✓' : '–');

/** Coverage dashboard: which components have a prop table / a11y notes / examples. */
function coveragePage(entries: CatalogEntry[]): string {
  const sorted = [...entries].sort((a, b) => a.component.localeCompare(b.component));
  const propsCount = entries.filter((e) => hasProps(e.slug)).length;
  const a11yCount = entries.filter((e) => A11Y[e.slug]).length;
  const rows = sorted
    .map(
      (e) =>
        `| ${e.component} | ${e.category.split('/')[0]} | ${yn(hasProps(e.slug))} | ${yn(!!A11Y[e.slug])} | ${e.count} |`,
    )
    .join('\n');
  return `---
title: "Coverage"
description: "Documentation coverage across the ${entries.length} components, generated from the sources."
---

Shrinking the gaps (a "–" in **Props** or **A11y**) is self-directed work — add a \`*.props.ts\`
or an entry in \`scripts/a11y-data.ts\`.

- **Props:** ${propsCount} / ${entries.length}
- **Keyboard/ARIA notes:** ${a11yCount} / ${entries.length}

| Component | Section | Props | A11y | Examples |
| --- | --- | :-: | :-: | :-: |
${rows}
`;
}

/**
 * Server/client classification. A component is a safe React Server Component only if it
 * never opts into `'use client'`, calls no client-only React hook, and touches no browser
 * global at all. This is a heuristic over the source text, not a compiler pass.
 */
const CLIENT_SIGNALS: Array<[RegExp, string]> = [
  [/['"]use client['"]/, "'use client'"],
  [
    /\buse(State|Effect|LayoutEffect|Ref|Reducer|Context|Callback|Memo|Id|Transition|ImperativeHandle)\b/,
    'React hooks',
  ],
  [/\b(window|document|localStorage|sessionStorage|navigator)\b\./, 'browser globals'],
  [/\b(ResizeObserver|IntersectionObserver|MutationObserver|matchMedia)\b/, 'browser observers'],
  [/\bCSS\.supports\b/, 'CSS.supports'],
];

function classify(slug: string): { known: boolean; client: boolean; reason: string } {
  const dir = join(componentsDir, slug);
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return { known: false, client: false, reason: '' };
  const src = readdirSync(dir)
    .filter((f) => f.endsWith('.tsx') || f.endsWith('.ts'))
    .map((f) => readFileSync(join(dir, f), 'utf8'))
    .join('\n');
  for (const [re, reason] of CLIENT_SIGNALS) if (re.test(src)) return { known: true, client: true, reason };
  return { known: true, client: false, reason: '' };
}

function rscPage(entries: CatalogEntry[]): string {
  const rows = entries
    .map((e) => ({ e, c: classify(e.slug) }))
    .filter(({ c }) => c.known)
    .sort((a, b) => Number(a.c.client) - Number(b.c.client) || a.e.component.localeCompare(b.e.component));
  const serverSafe = rows.filter(({ c }) => !c.client);
  const body = rows
    .map(({ e, c }) => `| ${e.component} | ${c.client ? 'Client' : '**Server-safe**'} | ${c.reason || '—'} |`)
    .join('\n');
  return `---
title: "Server Components"
description: "Which components are safe to render in a React Server Component, and which must sit below a 'use client' boundary."
---

Heuristic (source scan for hooks / browser globals), so verify at the edges — but it's the fast
answer to "can I use this in an RSC?".

**${serverSafe.length} of ${rows.length}** scanned components are server-safe; the rest need a
client boundary in their subtree.

<Callout>
  A client-only component still works in an RSC app — just import it into a file that has
  \`'use client'\` at the top, or wrap it. Only the component that reads browser state needs the
  boundary, not your whole page.
</Callout>

| Component | Rendering | Needs client because |
| --- | --- | --- |
${body}
`;
}

/** Recently-changed components, from git, so a PR preview lands on what moved. */
function recentlyChangedPage(entries: CatalogEntry[]): string {
  const bySlug = new Map(entries.map((e) => [e.slug, e]));
  const recent: Array<{ slug: string; subject: string; date: string }> = [];
  try {
    const log = execFileSync(
      'git',
      ['log', '-n', '60', '--date=short', '--pretty=format:%h\x1f%ad\x1f%s', '--name-only', '--', 'src/components'],
      { cwd: packageRoot, encoding: 'utf8' },
    );
    const seen = new Set<string>();
    let current = { subject: '', date: '' };
    for (const line of log.split('\n')) {
      if (line.includes('\x1f')) {
        const [, date, subject] = line.split('\x1f');
        current = { subject, date };
      } else {
        const slug = line.match(/^src\/components\/([^/]+)\//)?.[1];
        if (slug && bySlug.has(slug) && !seen.has(slug)) {
          seen.add(slug);
          recent.push({ slug, ...current });
        }
      }
      if (recent.length >= 15) break;
    }
  } catch {
    // Shallow clone or no git — leave the list empty rather than failing the build.
  }
  const list = recent.length
    ? recent.map((r) => `- **${bySlug.get(r.slug)!.component}** — _${r.date}_ · ${r.subject}`).join('\n')
    : '_No recent component changes found (shallow checkout?)._';
  return `---
title: "Recently Changed"
description: "The components touched in the last commits, so a PR preview lands on what moved."
---

${list}
`;
}

/** The catalog on the Introduction page: every component, grouped, with its example count. */
function introductionPage(entries: CatalogEntry[]): string {
  const byCategory = new Map<string, CatalogEntry[]>();
  for (const entry of entries) {
    const top = entry.category.split('/')[0];
    if (!byCategory.has(top)) byCategory.set(top, []);
    byCategory.get(top)!.push(entry);
  }
  const sections = [...byCategory.entries()]
    .sort(([a], [b]) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b))
    .map(([category, items]) => {
      const list = items
        .sort((a, b) => a.component.localeCompare(b.component))
        .map((e) => `${e.component} <sup>${e.count}</sup>`)
        .join(' · ');
      return `### ${category} <sup>${items.length}</sup>\n\n${list}`;
    })
    .join('\n\n');

  return `---
title: "ljkui"
description: "A React component library built on Base UI, themed with the Tailwind CSS v4 palettes."
---

## Install

\`\`\`sh
bun add ljkui
\`\`\`

\`\`\`tsx
import { Theme, Button } from 'ljkui';
import 'ljkui/styles.css';

export default function App() {
  return (
    <Theme accentColor="blue" grayColor="auto">
      <Button>Click me</Button>
    </Theme>
  );
}
\`\`\`

## Using this explorer

Every component has a fixture module under one of the tree sections, with one fixture per
example and a **Reference** fixture carrying its prop table, keyboard map and ARIA notes.
The control panel switches **appearance** (light/dark), **accent** and **gray** — every
fixture renders through \`<Theme>\`, which is the fastest way to check a component against
the full palette. Press \`⌘K\` to jump to anything, including the component usages uaight
harvested from \`src/\`.

The examples themselves live in \`packages/ljkui/examples/*.examples.tsx\`.

## All components

### Sections <sup>${entries.length} components</sup>

${sections}
`;
}

/** Section order on the Introduction page. uaight's own tree sorts directories alphabetically. */
const CATEGORY_ORDER = ['Components', 'Controls', 'Typography', 'Layout', 'Data presentation', 'Forms', 'Utilities'];

/* * * * * * * * * * * * * * * * * * * */
/*                 Run                 */
/* * * * * * * * * * * * * * * * * * * */

const files = readdirSync(examplesDir)
  .filter((file) => file.endsWith('.examples.tsx'))
  .sort();

rmSync(fixturesDir, { recursive: true, force: true });
mkdirSync(fixturesDir, { recursive: true });

/*
 * The root decorator. It has to live inside the fixtures dir — uaight picks decorators up
 * by directory, applying every one at or above a fixture's own path.
 */
writeFileSync(
  join(fixturesDir, 'uaight.decorator.tsx'),
  `${GENERATED_BY}
export { ThemeDecorator as default } from ${quote(importPath(fixturesDir, 'fixture-support/theme-decorator'))};
`,
);

// Guides — the MDX is imported straight from `guides/`, not copied.
const guidesOut = join(fixturesDir, 'Guides');
mkdirSync(guidesOut, { recursive: true });
let guideCount = 0;
for (const [index, guide] of GUIDES.entries()) {
  if (!existsSync(join(guidesDir, guide.file))) {
    console.warn(`uaight: skipping guide ${guide.file} — not found.`);
    continue;
  }
  const slug = guide.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); // prettier-ignore
  writeFileSync(
    join(guidesOut, `${slug}.examples.tsx`),
    documentModule(guidesOut, importPath(guidesOut, `guides/${guide.file}`), guide.title, index),
  );
  guideCount++;
}

// Components.
const counts: Record<string, number> = {};
const catalogEntries: CatalogEntry[] = [];
for (const file of files) {
  const slug = basename(file, '.examples.tsx');
  const category = CATEGORIES[slug] ?? DEFAULT_CATEGORY;
  const dir = join(fixturesDir, category);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${displayName(slug)}.examples.tsx`), await componentModule(slug, dir));
  counts[category] = (counts[category] ?? 0) + 1;
  catalogEntries.push({ slug, category, component: displayName(slug), count: (await exampleNames(file)).length });
}

// Tools.
const toolsOut = join(fixturesDir, 'Tools');
mkdirSync(toolsOut, { recursive: true });
for (const tool of TOOLS) {
  writeFileSync(join(toolsOut, `${tool.name}.examples.tsx`), await toolModule(tool, toolsOut));
}

/*
 * Generated documents. Unlike the guides these have no hand-authored source, so the MDX is
 * written next to its wrapper and re-read by Vite's MDX plugin like any other document.
 */
const reportsOut = join(fixturesDir, 'Reports');
mkdirSync(reportsOut, { recursive: true });
const REPORTS: Array<{ name: string; title: string; body: string }> = [
  { name: 'coverage', title: 'Coverage', body: coveragePage(catalogEntries) },
  { name: 'server-components', title: 'Server Components', body: rscPage(catalogEntries) },
  { name: 'recently-changed', title: 'Recently Changed', body: recentlyChangedPage(catalogEntries) },
];
for (const [index, report] of REPORTS.entries()) {
  writeFileSync(join(reportsOut, `${report.name}.mdx`), report.body);
  writeFileSync(
    join(reportsOut, `${report.name}.examples.tsx`),
    documentModule(reportsOut, `./${report.name}.mdx`, report.title, index),
  );
}

// Written last: the catalog is built from the modules that were actually generated.
writeFileSync(join(fixturesDir, 'Introduction.mdx'), introductionPage(catalogEntries));
writeFileSync(
  join(fixturesDir, 'Introduction.examples.tsx'),
  documentModule(fixturesDir, './Introduction.mdx', 'Introduction', -1),
);

/*
 * Format the output rather than trying to emit oxfmt-clean templates by hand. CI's
 * `format:check` covers fixtures/ too, so unformatted generated code fails the build —
 * and a template that happens to be clean today drifts the moment a name pushes a line
 * past 120 chars.
 */
try {
  execFileSync('bun', ['x', 'oxfmt', 'fixtures'], { cwd: packageRoot, stdio: 'pipe' });
} catch (error) {
  console.warn(`uaight: oxfmt failed on fixtures/ — run \`bun run format\` before committing.\n${error}`);
}

const summary = Object.entries(counts)
  .sort(([a], [b]) => CATEGORY_ORDER.indexOf(a.split('/')[0]) - CATEGORY_ORDER.indexOf(b.split('/')[0]))
  .map(([category, count]) => `${category} ${count}`)
  .join(', ');
console.log(
  `uaight: ${files.length} component modules + ${guideCount} guides + ${REPORTS.length} reports — ${summary}`,
);
