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
        items: ['indigo', 'cyan', 'rose', 'orange', 'green'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    appearance: 'light',
    accentColor: 'indigo',
  },
  decorators: [
    (Story, context) => (
      <Theme
        appearance={context.globals.appearance}
        accentColor={context.globals.accentColor}
        grayColor="slate"
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
