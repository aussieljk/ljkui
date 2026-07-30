import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
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
  }),
};

export default config;
