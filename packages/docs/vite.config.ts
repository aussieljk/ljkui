import react from '@vitejs/plugin-react';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import mdx from 'fumadocs-mdx/vite';
import { nitro } from 'nitro/vite';

// The live usage demos live in the ljkui package (`demos/*.demo.tsx`). They import the
// public `ljkui` entry, so they render exactly what a consumer would copy-paste.
// `@demos` lets the docs registry import both the component and its `?raw` source.
const demosDir = fileURLToPath(new URL('../ljkui/demos', import.meta.url));
const ljkuiDist = fileURLToPath(new URL('../ljkui/dist', import.meta.url));

export default defineConfig({
  server: {
    // Dev runs behind the portless HTTPS proxy as https://ljkui.localhost — portless picks
    // vite's private port and appends `--port`, so there is no port to hardcode here. Vite
    // would still point the browser's HMR socket at that private port, which the proxy doesn't
    // expose, so aim it at the proxy's TLS port instead.
    hmr: { protocol: 'wss', host: 'ljkui.localhost', clientPort: 443 },
  },
  plugins: [
    mdx(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
      },
    }),
    react(),
    // please see https://tanstack.com/start/latest/docs/framework/react/guide/hosting#nitro for guides on hosting
    nitro({
      preset: 'vercel',
    }),
  ],
  // TanStack Start's client entry and Fumadocs' MDX runtime are only reached once the browser
  // asks for them, which is after the dep optimizer's first pass has finished. The second pass
  // rewrites the chunk hashes the browser is already holding, so the boot ends in a reload and a
  // wall of "file does not exist in the optimize deps directory". Naming them keeps it to one pass.
  optimizeDeps: {
    include: [
      '@tanstack/router-core',
      '@tanstack/router-core/isServer',
      '@tanstack/router-core/ssr/client',
      'seroval',
      '@base-ui/react/direction-provider',
      '@fuma-translate/react',
      'class-variance-authority',
      'cnfast',
      'hast-util-to-jsx-runtime',
      'next-themes',
      'rehype-raw',
      'remark',
      'remark-rehype',
      'scroll-into-view-if-needed',
      'unist-util-visit',
      'vfile',
    ],
  },
  resolve: {
    tsconfigPaths: true,
    alias: [
      { find: 'tslib', replacement: 'tslib/tslib.es6.js' },
      { find: '@demos', replacement: demosDir },

      // Pin the library to its built output — load-bearing, and subtle.
      //
      // The demos and examples live *inside* packages/ljkui, whose tsconfig maps
      // `ljkui` -> `./src` so they typecheck against the public entry name. With
      // `tsconfigPaths: true` Vite honours that mapping at runtime as well, so those files would
      // import a second copy of the library from source while the docs' own wrappers (<Demo>,
      // <Examples>, the showcase) import `dist` through node_modules. Two module instances means
      // two `ThemeContext`s: every component that reads it — Autocomplete, Combobox, DropdownMenu
      // and the menus built on them — throws "`useThemeContext` must be used within a `Theme`"
      // even though it plainly is. Aliases resolve before tsconfig paths, so these win.
      //
      // Regex `find`s because a bare string would also rewrite the subpaths as a prefix.
      { find: /^ljkui$/, replacement: `${ljkuiDist}/index.js` },
      { find: /^ljkui\/icons$/, replacement: `${ljkuiDist}/icons/index.js` },
      { find: /^ljkui\/icons\/(.+)$/, replacement: `${ljkuiDist}/icons/adapters/$1.js` },
    ],
  },
});
