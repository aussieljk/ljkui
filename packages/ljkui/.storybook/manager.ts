import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

/*
 * The manager UI (sidebar, toolbar, addon panels) is a separate React app from the
 * preview iframe, so preview.tsx and storybook.css do not reach it. Theme it here so the
 * chrome uses the same typeface as the components.
 */
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'ljkui',
    fontBase: "'SF Pro Text', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', system-ui, sans-serif", // prettier-ignore
    fontCode: "'SF Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  }),
});
