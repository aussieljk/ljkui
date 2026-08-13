export * from './components';

// Public helper surface — the prop-definition vocabulary, responsive helpers, and the color-scale /
// palette engine (used for runtime custom themes; see the Theming guide). Internal mechanics (ref &
// effect hooks, DOM prop plumbing, className assembly, `mergeRefs`/`useControllableState`) are
// deliberately NOT re-exported here — import them from './helpers' within src, not from the barrel.
export type {
  Breakpoints,
  Responsive,
  PropDef,
  GetPropDefTypes,
  PropsWithoutColor,
  PropsWithoutRefOrColor,
} from './helpers';
export {
  withBreakpoints,
  isBreakpointsObject,
  asChildProp,
  colorProp,
  highContrastProp,
  alignProp,
  weightProp,
  trimProp,
} from './helpers';
export * from './helpers/tailwind-colors';
export * from './helpers/tailwind-palette';
export * from './helpers/emoji-colors';
// NOTE: the Tailwind plugin is intentionally NOT re-exported here. It hard-imports
// `tailwindcss/plugin` at module top, so re-exporting it from the barrel made a bare
// `import { Button } from 'ljkui'` crash for any consumer without tailwindcss installed
// (tailwindcss is only an optional peer). Import it from the `ljkui/tailwind` subpath instead.
export { Theme, updateThemeAppearanceClass, useThemeContext } from './theme';
export * from './theme-options';
export { ThemePanel } from './theme-panel';
