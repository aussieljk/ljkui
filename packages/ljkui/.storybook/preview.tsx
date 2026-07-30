import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { Theme } from 'ljkui';
import '../src/styles/index.css';
import './storybook.css';

/*
 * The library's breakpoint scale (src/styles/breakpoints.css) as viewport presets, so a
 * story can be checked at the exact width a `--sm` / `--md` custom media query flips at.
 * Each preset is the breakpoint's own min-width, i.e. the narrowest viewport that matches.
 *
 * Storybook 10 ships the viewport tool in core (`storybook/dist/viewport`) — it is
 * configured through `parameters.viewport.options`, and must NOT be added as an addon.
 */
const breakpointViewports = {
  xs: { name: 'xs — 520px', styles: { width: '520px', height: '800px' }, type: 'mobile' },
  sm: { name: 'sm — 768px', styles: { width: '768px', height: '1024px' }, type: 'tablet' },
  md: { name: 'md — 1024px', styles: { width: '1024px', height: '768px' }, type: 'desktop' },
  lg: { name: 'lg — 1280px', styles: { width: '1280px', height: '800px' }, type: 'desktop' },
  xl: { name: 'xl — 1640px', styles: { width: '1640px', height: '1024px' }, type: 'desktop' },
} as const;

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    viewport: { options: breakpointViewports },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    layout: 'centered',
    options: {
      /*
       * Top-level sections in whop's order; within a section, declaration order.
       * Storybook statically parses this, so it must stay an inline literal — an
       * imported constant fails with "Unexpected 'categoryOrder'". Keep in sync with
       * CATEGORY_ORDER in scripts/generate-storybook.ts, which warns on drift.
       */
      storySort: {
        order: [
          'Introduction',
          'Guides',
          'Reports',
          'Components',
          'Controls',
          'Typography',
          'Layout',
          'Data presentation',
          'Forms',
          'Utilities',
        ],
      },
    },
  },
  globalTypes: {
    appearance: {
      description: 'Theme appearance',
      toolbar: {
        title: 'Appearance',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
    accentColor: {
      description: 'Accent color',
      toolbar: {
        title: 'Accent',
        icon: 'paintbrush',
        items: ['blue', 'indigo', 'violet', 'cyan', 'sky', 'green', 'amber', 'orange', 'red', 'rose', 'gray'],
        dynamicTitle: true,
      },
    },
    grayColor: {
      description: 'Gray scale paired with the accent',
      toolbar: {
        title: 'Gray',
        icon: 'contrast',
        items: ['auto', 'slate', 'zinc', 'neutral', 'stone'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    appearance: 'light',
    accentColor: 'blue',
    grayColor: 'auto',
    // `value: undefined` resolves to the responsive viewport (fills the preview area).
    // Naming a key here instead (e.g. 'md') would pin every story to that width.
    viewport: { value: undefined, isRotated: false },
  },
  decorators: [
    (Story, context) => (
      <Theme
        appearance={context.globals.appearance}
        accentColor={context.globals.accentColor}
        grayColor={context.globals.grayColor}
        hasBackground
      >
        <Story />
      </Theme>
    ),
  ],
};

export default preview;
