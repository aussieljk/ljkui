/**
 * The explorer's shape — its sections, its guides, and its hand-authored tools.
 *
 * Split out of `gen-fixtures.ts` so `check-explorer.ts` can read the same lists without
 * running the generator: that script does its work at module scope, so importing it would
 * wipe and rewrite the whole of `fixtures/` as a side effect of a check.
 */

export type Layout = 'centered' | 'padded' | 'fullscreen';

export const LAYOUTS: readonly Layout[] = ['centered', 'padded', 'fullscreen'];

/**
 * The explorer's top-level sections, in the order they should appear.
 *
 * uaight builds its tree from directories and sorts them with an `Intl.Collator`
 * (`numeric: true`) — `fileMeta.order` sorts files *within* a directory and has no say over
 * the directories themselves. So the intended order has to be in the name, and the numeric
 * collation is what lets `10. Utilities` sort after `9. Forms` without zero-padding. The
 * numbering matches how the guides are already titled ("1. Getting started").
 *
 * A component's section comes from `fileMeta.group` in its own examples module, not from a
 * map here — see `sectionDir`.
 */
export const SECTIONS = [
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
  'Tools',
];

export const DEFAULT_CATEGORY = 'Components';

/**
 * A `fileMeta.group` (`Controls`, or the nested `Controls/Dates`) to the directory the
 * fixture module is written to, with the section's ordering prefix on the top level.
 */
export function sectionDir(group: string): string {
  const [top, ...rest] = group.split('/');
  const index = SECTIONS.indexOf(top);
  if (index < 0) throw new Error(`Unknown section \`${top}\` — add it to SECTIONS in gen-fixtures-meta.ts`);
  return [`${index + 1}. ${top}`, ...rest].join('/');
}

/**
 * The guides, in reading order. The MDX in `guides/` is the single source of truth for
 * the prose and is rendered as-authored — `<Callout>`, `<Demo>` and `<PropsTable>` all
 * work now that MDX is compiled for real (see fixture-support/mdx-components.tsx).
 */
export const GUIDES: Array<{ file: string; title: string }> = [
  { file: 'getting-started.mdx', title: '1. Getting started' },
  { file: 'installation.mdx', title: '2. Installation & Layers' },
  { file: 'typography.mdx', title: '3. Typography' },
  { file: 'color.mdx', title: '4. Color' },
  { file: 'breakpoints.mdx', title: '5. Breakpoints' },
  { file: 'tailwind.mdx', title: '6. Tailwind plugin' },
  { file: 'icons.mdx', title: '7. Icons' },
  { file: 'render-prop.mdx', title: '8. Render Prop (Composition)' },
  /*
   * `forms.mdx` and `oscar.mdx` were written for the Fumadocs site and never made it into
   * the Storybook guide list, so they sat in `guides/` unreferenced and unrendered for
   * months. `check:explorer` is what surfaced them.
   */
  { file: 'forms.mdx', title: '9. Forms & Field Binding' },
  { file: 'theming.mdx', title: '10. Theming' },
  { file: 'layout.mdx', title: '11. Layout' },
  { file: 'adopting-tokens.mdx', title: '12. Adopting Tokens' },
  { file: 'oscar.mdx', title: '13. Oscar (a tour)' },
];

/**
 * The hand-authored explorer tools. These were the three hand-written `*.stories.tsx`
 * modules that lived alongside the generated ones; their components now sit in
 * `fixture-support/tools/`, each exporting a `fixtures` object, and this wraps them the
 * same way a component's examples are wrapped.
 *
 * Nothing else references those modules, so `check:explorer` is what stops one going
 * missing unnoticed — which is exactly how all three were nearly lost with `stories/`.
 */
export const TOOLS: Array<{ module: string; name: string; layout: Layout }> = [
  { module: 'ColorScale', name: 'ColorScale', layout: 'fullscreen' },
  { module: 'IconBrowser', name: 'IconBrowser', layout: 'fullscreen' },
  { module: 'ThemePlayground', name: 'ThemePlayground', layout: 'fullscreen' },
];
