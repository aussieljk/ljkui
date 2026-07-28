import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import * as React from 'react';
import appCss from '@/styles/app.css?url';
import { RootProvider } from 'fumadocs-ui/provider/tanstack';
import { DocsExperienceProvider } from '@/components/docs-experience';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'ljkui — component docs',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      // No webfont: ljkui ships no font-family, so the components inherit
      // whatever this site's own type stack resolves to.
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <DocsExperienceProvider>
            <Outlet />
          </DocsExperienceProvider>
        </RootProvider>
        <Scripts />
      </body>
    </html>
  );
}
