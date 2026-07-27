import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/**/*.{ts,tsx}'],
  format: ['esm'],
  outDir: 'dist',
  unbundle: true,
  dts: true,
  sourcemap: true,
  platform: 'neutral',
});
