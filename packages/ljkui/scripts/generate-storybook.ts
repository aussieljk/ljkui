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
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { A11Y } from './a11y-data.ts';

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
  // Components (everything else falls through to this default)
};
const DEFAULT_CATEGORY = 'Components';

/** Ordering of the top-level sidebar sections, matching whop's. */
const CATEGORY_ORDER = [
  'Introduction',
  'Guides',
  'Reports',
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
  const path = join(packageRoot, 'src', 'generated', 'props.json');
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    console.warn(
      'Storybook: src/generated/props.json not found — run `bun run generate:props`. Prop tables will be empty.',
    );
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

/**
 * The Keyboard + Accessibility section appended to a component's Docs page, built from
 * `scripts/a11y-data.ts`. Returns '' for a slug with no entry. Emitted as markdown inside
 * the autodocs `description.component`, which Storybook renders (tables and all).
 */
function a11yMarkdown(slug: string): string {
  const entry = A11Y[slug];
  if (!entry) return '';
  let md = '';
  if (entry.keyboard?.length) {
    md += '\n\n## Keyboard\n\n| Key | Action |\n| --- | --- |\n';
    md += entry.keyboard.map(([key, action]) => `| ${key} | ${action} |`).join('\n');
  }
  if (entry.notes?.length) {
    md += '\n\n## Accessibility\n\n' + entry.notes.map((note) => `- ${note}`).join('\n');
  }
  return md;
}

/* * * * * * * * * * * * * * * * * * * */
/*        Copy-pasteable source        */
/* * * * * * * * * * * * * * * * * * * */

/** Remove the common leading indentation and surrounding blank lines from a block of code. */
function dedent(text: string): string {
  const lines = text.replace(/^\n+/, '').replace(/\s+$/, '').split('\n');
  const indents = lines.filter((line) => line.trim()).map((line) => line.match(/^ */)![0].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(min)).join('\n');
}

const escapeRe = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** The identifiers a module imports from `ljkui` (following `as` renames and `* as` namespaces). */
function ljkuiImports(source: string): Set<string> {
  const set = new Set<string>();
  // `[^;]` keeps a match inside a single import statement, so a preceding `import … from
  // 'lucide-react'` can't bleed its `{ … }` into the ljkui clause.
  const importRe = /import\s+([^;]*?)\s+from\s+['"]ljkui['"]/g;
  let match: RegExpExecArray | null;
  while ((match = importRe.exec(source))) {
    const clause = match[1];
    const named = clause.match(/\{([^}]*)\}/);
    if (named) {
      for (const part of named[1].split(',')) {
        const token = part.trim();
        if (!token) continue;
        const renamed = token.match(/\bas\s+(\w+)/);
        set.add(renamed ? renamed[1] : token.replace(/\s.*/, ''));
      }
    }
    const namespace = clause.match(/\*\s+as\s+(\w+)/);
    if (namespace) set.add(namespace[1]);
    const dflt = clause.match(/^\s*(\w+)\s*(?:,|$)/);
    if (dflt) set.add(dflt[1]);
  }
  return set;
}

/** Prepend a realistic `import { … } from 'ljkui';` line listing the ljkui bindings the snippet uses. */
function withImport(snippet: string, imports: Set<string>): string {
  const used = [...imports]
    .filter((name) => new RegExp(`\\b${escapeRe(name)}\\b`).test(snippet))
    .sort((a, b) => a.localeCompare(b));
  return used.length ? `import { ${used.join(', ')} } from 'ljkui';\n\n${snippet}` : snippet;
}

/**
 * The real source text of each named example, keyed by name, for `docs.source.code`.
 *
 * Best-effort: each example is located by its header at 2-space indent (`  Name(` /
 * `  'Name'(` / `  Name:`), and its span runs to the next example's header (or the object's
 * close). Using the next header as the boundary — rather than brace-matching — sidesteps the
 * apostrophe-in-JSX trap that broke earlier source scanners here. If an example can't be
 * extracted it is simply omitted, so the story falls back to Storybook's default source.
 */
function extractExampleSources(source: string, names: string[]): Map<string, string> {
  const result = new Map<string, string>();
  const imports = ljkuiImports(source);

  const headers = names.map((name) => {
    const esc = escapeRe(name);
    const re = new RegExp(`\\n  (?:'${esc}'|"${esc}"|${esc})\\s*([:(])`, 'g');
    const match = re.exec(source);
    return match ? { name, start: match.index, delim: match[1] } : null;
  });

  const objEnd = source.lastIndexOf('\n};');

  headers.forEach((header, index) => {
    if (!header) return;
    try {
      let end = objEnd;
      for (let next = index + 1; next < headers.length; next++) {
        if (headers[next]) {
          end = headers[next]!.start;
          break;
        }
      }
      const chunk = source.slice(header.start, end < header.start ? source.length : end);

      let body: string;
      if (header.delim === '(') {
        // Method shorthand: Name(…) { …body… }
        const paren = chunk.indexOf(')');
        const open = chunk.indexOf('{', paren);
        const close = chunk.lastIndexOf('}');
        if (open === -1 || close <= open) return;
        body = chunk.slice(open + 1, close);
      } else {
        // Value: Name: (…) => { …body… }  |  Name: (…) => ( …expr… )
        const arrow = chunk.indexOf('=>');
        const rest = chunk.slice(arrow === -1 ? chunk.indexOf(':') + 1 : arrow + 2).trimStart();
        if (rest.startsWith('{')) {
          const close = rest.lastIndexOf('}');
          if (close <= 0) return;
          body = rest.slice(1, close);
        } else {
          body = rest.replace(/,\s*$/, '');
        }
      }

      let snippet = dedent(body);
      // `return (<JSX/>);` → just the JSX. A body that opens with anything else (e.g. a
      // `const args = …` setup) is kept whole so the snippet stays runnable.
      const wrapped = snippet.match(/^return \(\n?([\s\S]*?)\n?\)\s*;?\s*$/);
      const bare = snippet.match(/^return ([\s\S]*?);?\s*$/);
      if (wrapped) snippet = dedent(wrapped[1]);
      else if (bare && !bare[1].includes('return ')) snippet = bare[1].trim();

      snippet = snippet.trim();
      if (snippet) result.set(header.name, withImport(snippet, imports));
    } catch {
      // Best-effort — a single failed extraction must never break the build.
    }
  });

  return result;
}

async function storyModule(slug: string, category: string): Promise<string> {
  const component = displayName(slug);
  const used = new Set<string>();
  const names = await exampleNames(slug + '.examples.tsx');
  const sources = extractExampleSources(readFileSync(join(examplesDir, slug + '.examples.tsx'), 'utf8'), names);
  // JSON.stringify → a valid double-quoted literal with escaped newlines, so the multi-line
  // a11y markdown can live in the generated meta without hand-escaping.
  const componentDescription = JSON.stringify(
    `Examples for \`${component}\`, from examples/${slug}.examples.tsx.` + a11yMarkdown(slug),
  );

  const story = (id: string, name: string, exampleName: string, description?: string, source?: string) => {
    const parts = [
      description ? `description: { story: ${quote(description)} }` : '',
      source ? `source: { language: 'tsx', code: ${JSON.stringify(source)} }` : '',
    ].filter(Boolean);
    const docs = parts.length ? `\n  parameters: { docs: { ${parts.join(', ')} } },` : '';
    return `export const ${id}: Story = {
  name: ${quote(name)},
  render: () => render(examples[${quote(exampleName)}]),${docs}
};`;
  };

  const stories = names.map((name, index) => {
    let id = identifier(name, `Example${index + 1}`);
    while (used.has(id)) id = `${id}_`;
    used.add(id);
    return story(id, name, name, undefined, sources.get(name));
  });

  /*
   * Whop's Storybook leads every component with `Default`. Where the examples already
   * define one, it is used as-is; otherwise the first example stands in as the canonical
   * "what does this look like" entry, since Storybook opens a component on its first story.
   * Single-example components are skipped — there a synthesised `Default` is a pure
   * duplicate of the only story (the layout primitives are all shaped this way).
   */
  if (!names.includes('Default') && names.length > 1) {
    stories.unshift(
      story(
        'Default',
        'Default',
        names[0],
        `The canonical ${component}. Same as “${names[0]}”, shown first.`,
        sources.get(names[0]),
      ),
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
        component: ${componentDescription},
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

const docsGuidesDir = join(packageRoot, 'guides');

/**
 * Guide pages. Numbered like whop's, which orders them in the sidebar by title.
 * The prose lives in `packages/ljkui/guides/*.mdx` — the single source of truth
 * now that Storybook is the only site.
 */
const GUIDES: Array<{ file: string; title: string }> = [
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
  return `{/* GENERATED by scripts/generate-storybook.ts from packages/ljkui/guides — do not edit. */}
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

/* * * * * * * * * * * * * * * * * * * */
/*          Generated reports          */
/* * * * * * * * * * * * * * * * * * * */

type CatalogEntry = { slug: string; category: string; component: string; count: number };

const componentsDir = join(packageRoot, 'src', 'components');
const yn = (v: boolean) => (v ? '✓' : '–');
const pageLink = (e: CatalogEntry) =>
  `[${e.component}](?path=/docs/${storybookId(`${e.category}/${e.component}`)}--docs)`;

/** #10 — coverage dashboard: which components have a prop table / a11y notes / examples. */
function coveragePage(entries: CatalogEntry[]): string {
  const sorted = [...entries].sort((a, b) => a.component.localeCompare(b.component));
  const propsCount = entries.filter((e) => propsBySlug[e.slug] && Object.keys(propsBySlug[e.slug]).length > 0).length;
  const a11yCount = entries.filter((e) => A11Y[e.slug]).length;
  const rows = sorted
    .map((e) => {
      const hasProps = !!propsBySlug[e.slug] && Object.keys(propsBySlug[e.slug]).length > 0;
      return `| ${pageLink(e)} | ${e.category.split('/')[0]} | ${yn(hasProps)} | ${yn(!!A11Y[e.slug])} | ${e.count} |`;
    })
    .join('\n');
  return `{/* GENERATED by scripts/generate-storybook.ts — do not edit. */}
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Reports/Coverage" />

# Coverage

Documentation coverage across the ${entries.length} components, generated from the sources.
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
 * #5 — server/client classification. A component is a safe React Server Component only if it
 * never opts into `'use client'`, calls no client-only React hook, and touches no browser global
 * at all. This is a heuristic over the source text, not a compiler pass — treat it as guidance.
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
    .map(({ e, c }) => `| ${pageLink(e)} | ${c.client ? 'Client' : '**Server-safe**'} | ${c.reason || '—'} |`)
    .join('\n');
  return `{/* GENERATED by scripts/generate-storybook.ts — do not edit. */}
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Reports/Server Components" />

# Server Components

Which components are safe to render in a React Server Component, and which must sit below a
\`'use client'\` boundary. Heuristic (source scan for hooks / browser globals), so verify at the
edges — but it's the fast answer to "can I use this in an RSC?".

**${serverSafe.length} of ${rows.length}** scanned components are server-safe; the rest need a
client boundary in their subtree.

> A client-only component still works in an RSC app — just import it into a file that has
> \`'use client'\` at the top, or wrap it. Only the component that reads browser state needs the
> boundary, not your whole page.

| Component | Rendering | Needs client because |
| --- | --- | --- |
${body}
`;
}

/** #3 — recently-changed components, from git, so a PR preview lands on what moved. */
function overviewPage(entries: CatalogEntry[]): string {
  const bySlug = new Map(entries.map((e) => [e.slug, e]));
  let recent: Array<{ slug: string; subject: string; date: string }> = [];
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
    ? recent.map((r) => `- ${pageLink(bySlug.get(r.slug)!)} — _${r.date}_ · ${r.subject}`).join('\n')
    : '_No recent component changes found (shallow checkout?)._';
  return `{/* GENERATED by scripts/generate-storybook.ts — do not edit. */}
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Reports/Recently Changed" />

# Recently changed

The components touched in the last commits — so a PR's Storybook preview lands on what moved
instead of the alphabetical sidebar.

${list}
`;
}

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
const catalogEntries: Array<{ slug: string; category: string; component: string; count: number }> = [];
for (const file of files) {
  const slug = basename(file, '.examples.tsx');
  const category = CATEGORIES[slug] ?? DEFAULT_CATEGORY;
  const dir = join(generatedDir, category);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${displayName(slug)}.stories.tsx`), await storyModule(slug, category));
  counts[category] = (counts[category] ?? 0) + 1;
  catalogEntries.push({ slug, category, component: displayName(slug), count: (await exampleNames(file)).length });
}

// Written last: the catalog is built from the pages that were actually generated.
writeFileSync(join(generatedDir, 'Introduction.mdx'), introduction(catalogMarkdown(catalogEntries)));

// Generated report pages (see the helpers near the top of this file).
mkdirSync(join(generatedDir, 'Reports'), { recursive: true });
writeFileSync(join(generatedDir, 'Reports', 'Coverage.mdx'), coveragePage(catalogEntries));
writeFileSync(join(generatedDir, 'Reports', 'Server-Components.mdx'), rscPage(catalogEntries));
writeFileSync(join(generatedDir, 'Reports', 'Recently-Changed.mdx'), overviewPage(catalogEntries));

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
