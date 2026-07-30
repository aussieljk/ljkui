import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/*
 * The heavy leaf dependencies the components reach for. Without pre-bundling, Vite's dep
 * optimizer discovers each Base UI subpath lazily the first time you open the component that
 * uses it — and every discovery triggers a re-optimize plus a full page reload mid-browse.
 * Every `@base-ui/react/*` entry point the library imports is listed so a first visit to any
 * component page is instant. Regenerate with:
 *   grep -rhoE "@base-ui/react[a-z/-]*" src/components | sort -u
 */
const PREBUNDLE = [
  'react',
  'react-dom',
  'react-dom/client',
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

const config: StorybookConfig = {
  // One module per component (see scripts/generate-storybook.ts) plus the MDX pages.
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  /*
   * `react-docgen` is the fast Babel-based analyser. The alternative,
   * react-docgen-typescript, runs a full TS program over every story module and
   * everything it imports — with ~90 component modules each pulling in the library,
   * that dominates dev-server boot.
   */
  typescript: {
    reactDocgen: 'react-docgen',
  },
  viteFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      /*
       * Regex `find`s, and the array form, are both load-bearing. A bare `ljkui: …/src`
       * string alias also rewrites every subpath as a prefix, so `ljkui/icons/lucide`
       * resolves to `src/icons/lucide` — a path that does not exist — and the build dies
       * with UNLOADABLE_DEPENDENCY. The docs vite config carries the same guard.
       *
       * Storybook points at `src` rather than `dist` so stories hot-reload against the
       * source; the examples' own tsconfig maps `ljkui` -> `./src` too, so there is a
       * single module instance and only one ThemeContext.
       */
      alias: [
        ...(Array.isArray(config.resolve?.alias) ? config.resolve.alias : []),
        { find: /^ljkui$/, replacement: resolve(packageRoot, 'src') },
        { find: /^ljkui\/icons$/, replacement: resolve(packageRoot, 'src/icons') },
        { find: /^ljkui\/icons\/(.+)$/, replacement: resolve(packageRoot, 'src/icons/adapters/$1') },
      ],
    },
    // Pre-bundle every heavy leaf dep up front (see PREBUNDLE) so browsing never stalls on a
    // lazy re-optimize + reload.
    optimizeDeps: {
      ...config.optimizeDeps,
      include: [...(config.optimizeDeps?.include ?? []), ...PREBUNDLE],
    },
    // The library is one big module graph; a 500 kB warning on every build is just noise, and
    // Storybook already code-splits one chunk per component story (see generate-storybook.ts).
    build: {
      ...config.build,
      chunkSizeWarningLimit: 3000,
    },
  }),
};

export default config;
