/**
 * The uaight plugin options.
 *
 * Shared, because two things need to agree on them: `vite.config.ts` (which runs the plugin)
 * and `scripts/gen-fixtures.ts` (which calls uaight's Node API to harvest call sites at
 * generate time, so the deployed explorer keeps data the dev-only scan would otherwise take
 * with it). A second copy of this config would drift silently and produce a Usages report
 * that disagrees with the ⌘K palette.
 */
import type { UaightPluginOptions } from 'uaight/vite';

/**
 * uaight's own `DEFAULT_INVENTORY_EXCLUDE`, restated because the option replaces the list
 * instead of extending it. Keep in sync if the canary changes it — the load-bearing entry
 * is `node_modules`, without which the scan walks the whole store.
 */
const INVENTORY_EXCLUDE_DEFAULTS = [
  '**/node_modules/**',
  '**/*.d.ts',
  '**/*.test.*',
  '**/*.spec.*',
  '**/*.bench.*',
  '**/__tests__/**',
  '**/__mocks__/**',
];

export const uaightOptions: UaightPluginOptions = {
  /*
   * The package root, not `fixtures/` — the inventory and call-site scans glob from
   * `fixturesDir`, so pointing it at the generated directory would leave them with
   * nothing but our own wrappers to look at (which uaight ignores by construction).
   * From here they see `src/` and `examples/`, which is where the real usages are.
   */
  fixturesDir: '.',
  fixtureFileSuffix: 'fixture',
  /*
   * The generated wrappers are the only `*.fixture.tsx` files in the tree, which is the
   * whole point of the distinct suffix. `examples/*.examples.tsx` used to match the fixture
   * glob as well and had to be excluded — but `exclude` is applied to the inventory scan
   * too, so excluding them also threw away every call site written in an example. Separate
   * suffixes let the fixtures be generated and the examples be harvested.
   */
  exclude: ['dist/**', 'dist-uaight/**'],
  /*
   * Storybook is gone, so there is no CSF to read and no `.storybook/preview` to
   * discover. Left explicit: with it on, uaight would go looking for both.
   */
  storybook: false,
  /*
   * Narrowed to the public components. Scanning everything found ~470 "components",
   * most of which nobody wants to render in isolation — the `base-*` internals
   * (base-button, base-menu, base-tabs-list, …), helpers, and the icon adapters.
   *
   * FOOTGUN: `exclude` here *replaces* uaight's default list rather than extending it,
   * and that default is what carries the `node_modules` entry. Spread DEFAULTS into any
   * exclude you add — dropping it makes the scan walk node_modules and return nothing
   * useful, which is exactly how this returned 0 the first time.
   */
  inventory: {
    /*
     * `examples/` is in here even though it is not a component directory: the call-site
     * harvest rides on this very glob, and the examples — which now include the former
     * demos — are the canonical usages, the most useful thing in the ⌘K palette.
     * Narrowing this to `src/components` alone roughly halves the harvest.
     */
    include: ['src/components/**/*.tsx', 'examples/**/*.tsx'],
    exclude: [...INVENTORY_EXCLUDE_DEFAULTS, 'src/components/base-*/**'],
  },
  callSites: { max: 8 },
  /*
   * Every fixture module is generated as an explicit object literal with no spreads, so
   * uaight's parser enumerates all 800-odd fixture names statically — measured: zero
   * undecidable files. `warm` would spend a browser round-trip on every boot re-deriving
   * names it already has. `check:explorer` is what keeps that guarantee true.
   */
  index: 'static',
  /*
   * Codecs for the `@internationalized/date` value types the date components pass around.
   * Without them those props serialize as `opaque` — visible but not editable, and not
   * encodable into a share link.
   */
  codecs: 'fixture-support/codecs.tsx',
};
