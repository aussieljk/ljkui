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
import { DEFAULT_CATEGORY, GUIDES, type Layout, LAYOUTS, SECTIONS, TOOLS, sectionDir } from './gen-fixtures-meta.ts';

const packageRoot = join(import.meta.dirname, '..');
const examplesDir = join(packageRoot, 'examples');
const guidesDir = join(packageRoot, 'guides');
const componentsDir = join(packageRoot, 'src', 'components');
/** Everything under here is generated; the sources it wraps live in `examples/` and `guides/`. */
const fixturesDir = join(packageRoot, 'fixtures');

/** Slug → the PascalCase display name whop uses (`alert-dialog` → `AlertDialog`). */
const SPECIAL_CASE_WORDS: Record<string, string> = { otp: 'OTP' };

function displayName(slug: string): string {
  return slug
    .split('-')
    .map((part) => SPECIAL_CASE_WORDS[part] ?? part[0]?.toUpperCase() + part.slice(1))
    .join('');
}

export interface ExampleFileMeta {
  /** Tree section, `Controls` or the nested `Controls/Dates`. */
  group: string;
  /**
   * How the fixtures are framed. `centered` suits a leaf control; anything that wants the
   * full width (tables, charts, navigation) wants `fullscreen`, and a large composition
   * reads better `padded` than dead-centred.
   */
  layout: Layout;
}

interface ExamplesModule {
  examples?: Record<string, unknown>;
  fileMeta?: Partial<ExampleFileMeta>;
}

/**
 * The named examples in a module and its `fileMeta`, in declaration order.
 *
 * The module is **imported** and its exports read directly, rather than parsed. Two earlier
 * attempts to read the source text both produced wrong lists: a line regex for a 2-space
 * indented `name(` matched module-scope `return (` and any nested object literal, and a
 * brace-depth scanner tripped over apostrophes in JSX prose — `don't` reads as an
 * unterminated string and swallows the rest of the object.
 *
 * Bun runs the TSX natively and resolves `ljkui` through the package tsconfig paths, so
 * importing costs nothing extra and cannot disagree with what the explorer will render.
 */
async function readExamples(file: string): Promise<{ names: string[]; meta: ExampleFileMeta }> {
  const mod = (await import(join(examplesDir, file))) as ExamplesModule;
  if (!mod.examples || typeof mod.examples !== 'object') {
    throw new Error(`${file} has no \`export const examples\` object.`);
  }
  const names = Object.keys(mod.examples);
  if (names.length === 0) throw new Error(`No examples found in ${file}`);

  /*
   * `fileMeta` lives in the examples module rather than in a map here, so a component's
   * section and framing sit next to the examples they describe and cannot drift out of sync
   * with them. `check:explorer` fails when one is missing.
   */
  return {
    names,
    meta: {
      group: mod.fileMeta?.group ?? DEFAULT_CATEGORY,
      layout: mod.fileMeta?.layout ?? 'centered',
    },
  };
}

const quote = (value: string) => `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;

/** An object-literal key: bare when it is a valid identifier, quoted otherwise. */
const key = (name: string) => (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : quote(name));

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

async function componentModule(
  slug: string,
  dir: string,
  names: string[],
  meta_: ExampleFileMeta,
  playground: boolean,
): Promise<string> {
  const layout = meta_.layout;
  const reference = hasReference(slug);
  const jsx = reference || playground;

  const imports = [`import { examples } from ${quote(importPath(dir, `examples/${slug}.examples`))};`];
  if (jsx) {
    // `jsx: "react"` (classic runtime) in the package tsconfig — JSX needs React in scope.
    imports.unshift(`import * as React from 'react';`);
  }
  if (playground) {
    imports.push(`import { ${displayName(slug)} } from 'ljkui';`);
    imports.push(`import { Playground } from ${quote(importPath(dir, 'fixture-support/playground'))};`);
  }
  if (reference) {
    imports.push(`import { ComponentReference } from ${quote(importPath(dir, 'fixture-support/reference'))};`);
  }

  const meta = names.map((name) => `  ${key(name)}: { layout: ${quote(layout)} },`);
  if (playground) meta.push(`  Playground: { layout: ${quote(layout)} },`);
  // The reference is a document, not a component state — it always wants the full width.
  if (reference) meta.push(`  Reference: { layout: 'fullscreen' },`);

  const entries = names.map((name) => `  ${key(name)}: examples[${quote(name)}],`);
  if (playground) {
    entries.push(
      `  Playground: () => <Playground slug=${quote(slug)} component={${displayName(slug)}} name=${quote(displayName(slug))} />,`,
    );
  }
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
    .sort(([a], [b]) => SECTIONS.indexOf(a) - SECTIONS.indexOf(b))
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
const guidesOut = join(fixturesDir, sectionDir('Guides'));
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

/*
 * A component gets a Playground only when the barrel exports something renderable under its
 * PascalCase name and there is at least one controllable prop. That rules out the namespace
 * components (`Table`, `Alert`, …), whose root needs specific children to mean anything —
 * detected rather than allowlisted, so it cannot drift.
 */
const barrel = (await import('ljkui')) as Record<string, unknown>;
const canPlayground = (slug: string) =>
  typeof barrel[displayName(slug)] === 'function' && Object.keys(propsBySlug[slug] ?? {}).length > 0;

// Components.
const counts: Record<string, number> = {};
const catalogEntries: CatalogEntry[] = [];
let playgroundCount = 0;
for (const file of files) {
  const slug = basename(file, '.examples.tsx');
  const { names, meta } = await readExamples(file);
  const category = meta.group;
  const dir = join(fixturesDir, sectionDir(category));
  const playground = canPlayground(slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, `${displayName(slug)}.examples.tsx`),
    await componentModule(slug, dir, names, meta, playground),
  );
  if (playground) playgroundCount++;
  counts[category] = (counts[category] ?? 0) + 1;
  catalogEntries.push({ slug, category, component: displayName(slug), count: names.length });
}

// Tools.
const toolsOut = join(fixturesDir, sectionDir('Tools'));
mkdirSync(toolsOut, { recursive: true });
for (const tool of TOOLS) {
  writeFileSync(join(toolsOut, `${tool.name}.examples.tsx`), await toolModule(tool, toolsOut));
}

/*
 * Generated documents. Unlike the guides these have no hand-authored source, so the MDX is
 * written next to its wrapper and re-read by Vite's MDX plugin like any other document.
 */
const reportsOut = join(fixturesDir, sectionDir('Reports'));
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

/*
 * Written last: the catalog is built from the modules that were actually generated.
 *
 * It sits in its own directory, named the same as the file inside it, for two reasons: a
 * file at the fixtures root would sort *after* every directory (uaight lists directories
 * first), and a lone child whose label matches its directory collapses into a single row —
 * so this reads as one "1. Introduction" entry rather than a folder holding one item.
 */
const introOut = join(fixturesDir, sectionDir('Introduction'));
mkdirSync(introOut, { recursive: true });
writeFileSync(join(introOut, 'Introduction.mdx'), introductionPage(catalogEntries));
writeFileSync(
  join(introOut, `${sectionDir('Introduction')}.examples.tsx`),
  documentModule(introOut, './Introduction.mdx', 'Introduction', -1),
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
  .sort(([a], [b]) => SECTIONS.indexOf(a.split('/')[0]) - SECTIONS.indexOf(b.split('/')[0]))
  .map(([category, count]) => `${category} ${count}`)
  .join(', ');
console.log(
  `uaight: ${files.length} components (${playgroundCount} with playgrounds) + ${guideCount} guides + ` +
    `${REPORTS.length} reports + ${TOOLS.length} tools — ${summary}`,
);
