import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

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
    /*
     * Pre-bundle the heavy leaf dependencies the examples reach for. Without this the
     * optimizer discovers them lazily, one component page at a time, and each discovery
     * triggers a re-optimize plus a full page reload mid-browse.
     */
    optimizeDeps: {
      ...config.optimizeDeps,
      include: [...(config.optimizeDeps?.include ?? []), 'react', 'react-dom', 'react-dom/client', 'lucide-react'],
    },
  }),
};

export default config;
