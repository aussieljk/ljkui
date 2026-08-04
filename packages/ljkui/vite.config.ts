import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { uaight } from 'uaight/vite';
import { PREBUNDLE } from './fixture-support/prebundle';
import { defineConfig } from 'vite';

const packageRoot = import.meta.dirname;

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

/*
 * The library ships no site of its own — this dev server exists so uaight has a host to
 * ride on. `/uaight` is the explorer; there is nothing else to serve, which is why the
 * repo carries no index.html (the static build scaffolds its own and removes it after).
 */
export default defineConfig({
  root: packageRoot,
  plugins: [
    // MDX must run before the React plugin so the JSX it emits gets the Fast Refresh treatment.
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: 'frontmatter' }], remarkGfm],
        providerImportSource: '@mdx-js/react',
      }),
    },
    react(),
    uaight({
      /*
       * The package root, not `fixtures/` — the inventory and call-site scans glob from
       * `fixturesDir`, so pointing it at the generated directory would leave them with
       * nothing but our own wrappers to look at (which uaight ignores by construction).
       * From here they see `src/` and `demos/`, which is where the real usages are.
       */
      fixturesDir: '.',
      fixtureFileSuffix: 'examples',
      /*
       * `examples/*.examples.tsx` matches the fixture glob too, but those modules are the
       * hand-authored sources — they export `examples`, not a default — and every one is
       * already wrapped under `fixtures/`. Without this each component appears twice, once
       * as an unreadable duplicate.
       */
      exclude: ['examples/**', 'dist/**', 'dist-uaight/**'],
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
         * `demos/` is in here even though it is not a component directory: the call-site
         * harvest rides on this very glob, and the demos are the canonical usages — the
         * most useful thing in the ⌘K palette. Narrowing this to `src/components` alone
         * halves the harvest (615 groups → 327), which is not a trade worth making.
         */
        include: ['src/components/**/*.tsx', 'demos/**/*.tsx'],
        exclude: [...INVENTORY_EXCLUDE_DEFAULTS, 'src/components/base-*/**'],
      },
      callSites: { max: 8 },
      /*
       * Codecs for the `@internationalized/date` value types the date components pass around.
       * Without them those props serialize as `opaque` — visible but not editable, and not
       * encodable into a share link.
       */
      codecs: 'fixture-support/codecs.tsx',
    }),
  ],
  resolve: {
    /*
     * Regex `find`s, and the array form, are both load-bearing. A bare `ljkui: …/src`
     * string alias also rewrites every subpath as a prefix, so `ljkui/icons/lucide`
     * resolves to `src/icons/lucide` — a path that does not exist — and the build dies
     * with UNLOADABLE_DEPENDENCY.
     *
     * Pointing at `src` rather than `dist` keeps a single module instance, so there is
     * one ThemeContext and the components that read it don't throw.
     */
    alias: [
      { find: /^ljkui$/, replacement: resolve(packageRoot, 'src') },
      { find: /^ljkui\/icons$/, replacement: resolve(packageRoot, 'src/icons') },
      { find: /^ljkui\/icons\/(.+)$/, replacement: resolve(packageRoot, 'src/icons/adapters/$1') },
    ],
  },
  optimizeDeps: {
    include: PREBUNDLE,
  },
  build: {
    // The library is one big module graph; a 500 kB warning on every build is just noise.
    chunkSizeWarningLimit: 3000,
  },
});
