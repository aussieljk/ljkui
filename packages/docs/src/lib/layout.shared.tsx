import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import { ThemeConfigurator } from '@/components/docs-experience';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
      transparentMode: 'top',
    },
    links: [
      { text: 'Components', url: '/docs/components', active: 'nested-url' },
      { text: 'Guides', url: '/docs/guides/theming', active: 'nested-url' },
      { text: 'Migrate', url: '/docs/migrations', active: 'nested-url' },
      { type: 'custom', secondary: true, children: <ThemeConfigurator /> },
    ],
    searchToggle: {
      full: {
        className: 'docs-global-search',
        children: (
          <>
            <span>Search components, examples and guides…</span>
            <kbd>⌘ K</kbd>
          </>
        ),
      },
    },
    themeSwitch: { enabled: false },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
