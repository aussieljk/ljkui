import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { Theme } from 'ljkui';
import '../src/styles/index.css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
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
  },
  decorators: [
    (Story, context) => (
      <Theme
        appearance={context.globals.appearance}
        accentColor={context.globals.accentColor}
        grayColor={context.globals.grayColor}
        radius="medium"
        scaling="100%"
        hasBackground
      >
        <Story />
      </Theme>
    ),
  ],
};

export default preview;
