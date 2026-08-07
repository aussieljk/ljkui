import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { uight } from '@aussieljk/uight/vite';
import { PREBUNDLE } from './fixture-support/prebundle';
import { uightOptions } from './fixture-support/uight-options';
import { defineConfig } from 'vite';

const packageRoot = import.meta.dirname;

/*
 * The library ships no site of its own — this dev server exists so uight has a host to
 * ride on. `/uight` is the explorer; there is nothing else to serve, which is why the
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
    uight(uightOptions),
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
