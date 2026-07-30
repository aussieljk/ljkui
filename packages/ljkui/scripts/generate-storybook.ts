/**
 * Generates the Storybook story files from `examples/*.examples.tsx`.
 *
 * Shape mirrors storybook.whop.dev (the fork's own Storybook): a handful of
 * top-level categories, one **title per component**, and one story per named
 * example — rather than a single title holding every example in the library.
 *
 * Crucially this writes **one module per component**. The previous generator
 * emitted a single `examples.stories.tsx` that imported all 92 example modules
 * eagerly, so opening any story pulled the entire library into one chunk; now
 * Vite code-splits per component and Storybook loads only what you click on.
 *
 * Run with: bun run generate:storybook (wired into `storybook` / `build-storybook`).
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const packageRoot = join(import.meta.dirname, '..');
const examplesDir = join(packageRoot, 'examples');
/** Everything under here is generated; hand-authored MDX lives in `stories/` itself. */
const generatedDir = join(packageRoot, 'stories', 'generated');

/**
 * Category per component, mirroring storybook.whop.dev's sidebar. A `/` nests
 * (whop groups the date pickers under `Controls/Dates`).
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
  collapsible: 'Layout',
  grid: 'Layout',
  'h-stack': 'Layout',
  inset: 'Layout',
  resizable: 'Layout',
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
  // Components (everything else falls through to this default)
};
const DEFAULT_CATEGORY = 'Components';

/** Ordering of the top-level sidebar sections, matching whop's. */
const CATEGORY_ORDER = [
  'Introduction',
  'Guides',
  'Components',
  'Controls',
  'Typography',
  'Layout',
  'Data presentation',
  'Forms',
  'Utilities',
];

/** Slug → the PascalCase display name whop uses (`alert-dialog` → `AlertDialog`). */
const SPECIAL_CASE_WORDS: Record<string, string> = { otp: 'OTP' };

function displayName(slug: string): string {
  return slug
    .split('-')
    .map((part) => SPECIAL_CASE_WORDS[part] ?? part[0]?.toUpperCase() + part.slice(1))
    .join('');
}

/** A valid, stable JS identifier for a story export. */
function identifier(name: string, fallback: string): string {
  const id = name
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join('')
    .replace(/^[^a-zA-Z_$]+/, '');
  return id || fallback;
}

/**
 * The named examples in a module, in declaration order.
 *
 * The module is **imported** and its `examples` object read directly, rather than parsed.
 * Two earlier attempts to read the source text both produced wrong story lists: a line
 * regex for a 2-space-indented `name(` matched module-scope `return (` and any nested
 * object literal (191 phantom stories that mounted blank), and a brace-depth scanner
 * tripped over apostrophes in JSX prose — `don't` reads as an unterminated string and
 * swallows the rest of the object (73 real examples silently dropped).
 *
 * Bun runs the TSX natively and resolves `ljkui` through the package tsconfig paths, so
 * importing costs nothing extra and cannot disagree with what Storybook will render.
 * This is the same trick packages/docs/scripts/gen-props.ts uses on the `*.props.ts`.
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

/* * * * * * * * * * * * * * * * * * * */
/*              Prop tables            */
/* * * * * * * * * * * * * * * * * * * */

interface PropEntry {
  type?: string;
  default?: string;
  description?: string;
  required?: boolean;
}

/**
 * The docs site already extracts every component's `*.props.ts` into a JSON file
 * (packages/docs/scripts/gen-props.ts, keyed by the same slug used here). Reuse it so
 * the Storybook Docs tab gets the same prop table rather than a second extractor.
 */
function loadPropsJson(): Record<string, Record<string, PropEntry>> {
  const path = join(packageRoot, '..', 'docs', 'src', 'generated', 'props.json');
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    console.warn('Storybook: packages/docs/src/generated/props.json not found — prop tables will be empty.');
    return {};
  }
}

const propsBySlug = loadPropsJson();

/**
 * `argTypes` for the Docs tab's prop table.
 *
 * Controls are switched off: these stories render fixed examples rather than spreading
 * `args` into a component, so a live control would render a knob that changes nothing.
 * The table itself is the point — it is what the upstream Storybook shows per component.
 */
function argTypesFor(slug: string): string {
  const props = propsBySlug[slug];
  if (!props || Object.keys(props).length === 0) return '';

  const entries = Object.entries(props)
    .map(([name, prop]) => {
      const table = [
        prop.type ? `type: { summary: ${quote(prop.type)} }` : '',
        prop.default !== undefined ? `defaultValue: { summary: ${quote(String(prop.default))} }` : '',
      ]
        .filter(Boolean)
        .join(', ');
      const parts = [
        prop.description ? `description: ${quote(prop.description)}` : '',
        table ? `table: { ${table} }` : '',
        prop.required ? 'required: true' : '',
        'control: false',
      ].filter(Boolean);
      return `    ${quote(name)}: { ${parts.join(', ')} },`;
    })
    .join('\n');

  return `  argTypes: {\n${entries}\n  },\n`;
}

async function storyModule(slug: string, category: string): Promise<string> {
  const component = displayName(slug);
  const used = new Set<string>();
  const names = await exampleNames(slug + '.examples.tsx');

  const story = (id: string, name: string, exampleName: string, description?: string) => {
    const docs = description ? `\n  parameters: { docs: { description: { story: ${quote(description)} } } },` : '';
    return `export const ${id}: Story = {
  name: ${quote(name)},
  render: () => render(examples[${quote(exampleName)}]),${docs}
};`;
  };

  const stories = names.map((name, index) => {
    let id = identifier(name, `Example${index + 1}`);
    while (used.has(id)) id = `${id}_`;
    used.add(id);
    return story(id, name, name);
  });

  /*
   * Whop's Storybook leads every component with `Default`. Where the examples already
   * define one, it is used as-is; otherwise the first example stands in as the canonical
   * "what does this look like" entry, since Storybook opens a component on its first story.
   */
  if (!names.includes('Default') && names.length > 0) {
    stories.unshift(
      story('Default', 'Default', names[0], `The canonical ${component}. Same as “${names[0]}”, shown first.`),
    );
  }

  // stories/generated/<category…>/X.stories.tsx — depth varies (Controls/Dates nests).
  const depth = category.split('/').length;
  const toExamples = '../'.repeat(depth + 2);
  const toStories = '../'.repeat(depth + 1);

  return `// GENERATED by scripts/generate-storybook.ts — do not edit.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { examples } from '${toExamples}examples/${slug}.examples';
import { render } from '${toStories}render-example';

const meta = {
  title: '${category}/${component}',
  tags: ['autodocs'],
  parameters: {
    layout: '${layoutFor(slug)}',
    docs: {
      description: {
        component: 'Examples for \`${component}\`, from examples/${slug}.examples.tsx.',
      },
    },
  },
${argTypesFor(slug)}} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

${stories.join('\n\n')}
`;
}

/* * * * * * * * * * * * * * * * * * * */
/*                Guides               */
/* * * * * * * * * * * * * * * * * * * */

const docsGuidesDir = join(packageRoot, '..', 'docs', 'content', 'docs', 'guides');

/**
 * Guide pages, ported from the docs site so the prose has one source of truth.
 * Numbered like whop's, which orders them in the sidebar by title.
 */
const GUIDES: Array<{ file: string; title: string }> = [
  { file: 'typography.mdx', title: '2. Typography' },
  { file: 'color.mdx', title: '3. Color' },
  { file: 'breakpoints.mdx', title: '4. Breakpoints' },
  { file: 'tailwind.mdx', title: '5. Tailwind plugin' },
  { file: 'icons.mdx', title: '6. Icons' },
  { file: 'render-prop.mdx', title: '7. Render Prop (Composition)' },
  { file: 'theming.mdx', title: '8. Theming' },
  { file: 'layout.mdx', title: '9. Layout' },
];

/**
 * Strip the Fumadocs-only tags the docs site provides and Storybook does not
 * (`<Demo>`, `<PropsTable>`, `<Examples>`, `<AllExamples>`), and downgrade
 * `<Callout>` to a blockquote. Everything else is plain MDX and renders as-is.
 */
function portGuide(source: string, title: string): string {
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n/);
  const body = frontmatter ? source.slice(frontmatter[0].length) : source;
  const description = frontmatter?.[1].match(/^description:\s*["']?(.*?)["']?\s*$/m)?.[1];

  const ported = body
    .replace(/<(Demo|PropsTable|Examples|AllExamples|ComponentCatalog)\b[^>]*\/>/g, '')
    .replace(/<Callout\b[^>]*>([\s\S]*?)<\/Callout>/g, (_, inner: string) =>
      inner
        .trim()
        .split('\n')
        .map((line: string) => `> ${line.trim()}`)
        .join('\n'),
    )
    .trim();

  const heading = title.replace(/^\d+\.\s*/, '');
  // The frontmatter description is plain prose, not MDX — `<Theme>` in it would be
  // parsed as an unclosed JSX tag and fail the whole index.
  const escaped = description?.replace(/[<{]/g, (c) => (c === '<' ? '&lt;' : '&#123;'));
  return `{/* GENERATED by scripts/generate-storybook.ts from docs/content/docs/guides — do not edit. */}
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Guides/${title}" />

# ${heading}
${escaped ? `\n_${escaped}_\n` : ''}
${ported}
`;
}

/**
 * Storybook's id for a title — lowercased, non-alphanumerics collapsed to dashes.
 * `Controls/Dates/Calendar` → `controls-dates-calendar`, which addresses its docs page
 * as `?path=/docs/controls-dates-calendar--docs`.
 */
function storybookId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** The catalog table on the Introduction page: every component, linked to its page. */
function catalogMarkdown(entries: Array<{ category: string; component: string; count: number }>): string {
  const byCategory = new Map<string, typeof entries>();
  for (const entry of entries) {
    const top = entry.category.split('/')[0];
    if (!byCategory.has(top)) byCategory.set(top, []);
    byCategory.get(top)!.push(entry);
  }

  const sections = [...byCategory.entries()]
    .sort(([a], [b]) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b))
    .map(([top, items]) => {
      const links = items
        .sort((a, b) => a.component.localeCompare(b.component))
        .map((item) => {
          const id = storybookId(`${item.category}/${item.component}`);
          return `[${item.component}](?path=/docs/${id}--docs) <sup>${item.count}</sup>`;
        })
        .join(' · ');
      return `### ${top} <sup>${items.length}</sup>\n\n${links}\n`;
    })
    .join('\n');

  return sections;
}

const introduction = (catalog: string) => `{/* GENERATED by scripts/generate-storybook.ts — do not edit. */}
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Introduction" />

# ljkui

A React component library built on [Base UI](https://base-ui.com), themed with the
Tailwind CSS v4 palettes.

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

## Using this Storybook

Every component has a page under one of the sidebar sections, with one story per
example. The toolbar switches **appearance** (light/dark), **accent color** and
**gray color**, and every story re-renders through \`<Theme>\` — which is the fastest
way to check a component against the full palette.

The examples themselves live in \`packages/ljkui/examples/*.examples.tsx\` and are
shared with the docs site, so a story and a docs demo never drift apart.

## All components

Every page in this Storybook, with the number of examples on each.

${catalog}
`;

const GETTING_STARTED = `{/* GENERATED by scripts/generate-storybook.ts — do not edit. */}
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Guides/1. Getting started" />

# Getting started

## Install

\`\`\`sh
bun add ljkui
\`\`\`

## Wrap your app in a Theme

\`ljkui/styles.css\` carries the tokens and a global reset; \`<Theme>\` scopes the
accent, gray, radius and appearance to a subtree.

\`\`\`tsx
import { Theme } from 'ljkui';
import 'ljkui/styles.css';

<Theme accentColor="blue" grayColor="auto" radius="medium" appearance="inherit">
  {children}
</Theme>
\`\`\`

## With Tailwind

Import the theme bridge after Tailwind to get utilities for every design token —
\`bg-accent-700\`, \`text-gray-900\`, \`border-gray-alpha-300\`. The layer order matters;
see the **Tailwind plugin** guide.

\`\`\`css
@layer theme, base, ljkui, components, utilities;

@import 'tailwindcss';
@import 'ljkui/styles.css' layer(ljkui);
@import 'ljkui/theme.css';
\`\`\`
`;

const files = readdirSync(examplesDir)
  .filter((file) => file.endsWith('.examples.tsx'))
  .sort();

rmSync(generatedDir, { recursive: true, force: true });

mkdirSync(join(generatedDir, 'Guides'), { recursive: true });
writeFileSync(join(generatedDir, 'Guides', '1-getting-started.mdx'), GETTING_STARTED);

let guideCount = 1;
for (const guide of GUIDES) {
  let source: string;
  try {
    source = readFileSync(join(docsGuidesDir, guide.file), 'utf8');
  } catch {
    console.warn(`Storybook: skipping guide ${guide.file} — not found in the docs package.`);
    continue;
  }
  const slug = guide.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); // prettier-ignore
  writeFileSync(join(generatedDir, 'Guides', `${slug}.mdx`), portGuide(source, guide.title));
  guideCount++;
}

const counts: Record<string, number> = {};
const catalogEntries: Array<{ category: string; component: string; count: number }> = [];
for (const file of files) {
  const slug = basename(file, '.examples.tsx');
  const category = CATEGORIES[slug] ?? DEFAULT_CATEGORY;
  const dir = join(generatedDir, category);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${displayName(slug)}.stories.tsx`), await storyModule(slug, category));
  counts[category] = (counts[category] ?? 0) + 1;
  catalogEntries.push({ category, component: displayName(slug), count: (await exampleNames(file)).length });
}

// Written last: the catalog is built from the pages that were actually generated.
writeFileSync(join(generatedDir, 'Introduction.mdx'), introduction(catalogMarkdown(catalogEntries)));

/*
 * Format the output rather than trying to emit oxfmt-clean templates by hand. CI's
 * `format:check` covers stories/ too, so unformatted generated code fails the build —
 * and a template that happens to be clean today drifts the moment a prop description
 * pushes a line past 120 chars.
 */
try {
  execFileSync('bun', ['x', 'oxfmt', 'stories'], { cwd: packageRoot, stdio: 'pipe' });
} catch (error) {
  console.warn(`Storybook: oxfmt failed on stories/ — run \`bun run format\` before committing.\n${error}`);
}

/*
 * The sidebar order lives in .storybook/preview.tsx, which must hold it as an inline
 * literal (Storybook statically parses `options.storySort` and rejects an imported
 * constant). Verify the two lists agree rather than generating a file preview cannot use.
 */
const previewSource = readFileSync(join(packageRoot, '.storybook', 'preview.tsx'), 'utf8');
const missing = [...new Set(Object.keys(counts).map((category) => category.split('/')[0]))].filter(
  (category) => !previewSource.includes(`'${category}'`),
);
if (missing.length > 0) {
  console.warn(
    `Storybook: ${missing.join(', ')} missing from storySort.order in .storybook/preview.tsx — ` +
      `those sections will sort alphabetically at the end.`,
  );
}

const summary = Object.entries(counts)
  .sort(([a], [b]) => CATEGORY_ORDER.indexOf(a.split('/')[0]) - CATEGORY_ORDER.indexOf(b.split('/')[0]))
  .map(([category, count]) => `${category} ${count}`)
  .join(', ');
console.log(`Storybook: ${files.length} component modules + ${guideCount} guides — ${summary}`);
