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
      alias: {
        ...config.resolve?.alias,
        ljkui: resolve(packageRoot, 'src'),
        'ljkui/icons': resolve(packageRoot, 'src/icons'),
        'ljkui/icons/lucide': resolve(packageRoot, 'src/icons/adapters/lucide.ts'),
        'ljkui/icons/heroicons': resolve(packageRoot, 'src/icons/adapters/heroicons.ts'),
        'ljkui/icons/hugeicons': resolve(packageRoot, 'src/icons/adapters/hugeicons.ts'),
        'ljkui/icons/phosphor': resolve(packageRoot, 'src/icons/adapters/phosphor.ts'),
        'ljkui/icons/tabler': resolve(packageRoot, 'src/icons/adapters/tabler.ts'),
      },
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
