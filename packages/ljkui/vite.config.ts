import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { uaight } from 'uaight/vite';
import { defineConfig } from 'vite';

const packageRoot = import.meta.dirname;

/*
 * The heavy leaf dependencies the components reach for. Without pre-bundling, Vite's dep
 * optimizer discovers each Base UI subpath lazily the first time you open the component that
 * uses it — and every discovery triggers a re-optimize plus a full page reload mid-browse.
 * Every `@base-ui/react/*` entry point the library imports is listed so a first visit to any
 * component is instant. Regenerate with:
 *   grep -rhoE "@base-ui/react[a-z/-]*" src/components | sort -u
 */
const PREBUNDLE = [
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-runtime',
  'classnames',
  'lucide-react',
  'credit-card-type',
  'react-aria-components',
  '@internationalized/date',
  '@react-aria/calendar',
  '@react-aria/datepicker',
  '@react-aria/focus',
  '@react-aria/utils',
  '@react-stately/calendar',
  '@react-stately/datepicker',
  '@base-ui/react',
  '@base-ui/react/accordion',
  '@base-ui/react/alert-dialog',
  '@base-ui/react/autocomplete',
  '@base-ui/react/avatar',
  '@base-ui/react/button',
  '@base-ui/react/checkbox',
  '@base-ui/react/collapsible',
  '@base-ui/react/combobox',
  '@base-ui/react/context-menu',
  '@base-ui/react/dialog',
  '@base-ui/react/drawer',
  '@base-ui/react/field',
  '@base-ui/react/fieldset',
  '@base-ui/react/form',
  '@base-ui/react/input',
  '@base-ui/react/menu',
  '@base-ui/react/menubar',
  '@base-ui/react/meter',
  '@base-ui/react/navigation-menu',
  '@base-ui/react/number-field',
  '@base-ui/react/otp-field',
  '@base-ui/react/popover',
  '@base-ui/react/preview-card',
  '@base-ui/react/radio',
  '@base-ui/react/radio-group',
  '@base-ui/react/scroll-area',
  '@base-ui/react/select',
  '@base-ui/react/separator',
  '@base-ui/react/slider',
  '@base-ui/react/switch',
  '@base-ui/react/tabs',
  '@base-ui/react/toast',
  '@base-ui/react/toggle',
  '@base-ui/react/tooltip',
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
      exclude: ['examples/**', 'storybook-static/**', 'dist/**'],
      /*
       * Storybook is gone, so there is no CSF to read and no `.storybook/preview` to
       * discover. Left explicit: with it on, uaight would go looking for both.
       */
      storybook: false,
      // The inventory and the call-site harvest are left on their defaults. Passing an
      // `exclude` here would *replace* uaight's default list rather than extend it —
      // including the node_modules entry, which is what keeps the scan bounded.
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
