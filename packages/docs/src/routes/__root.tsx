import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import * as React from 'react';
import appCss from '@/styles/app.css?url';
import { RootProvider } from 'fumadocs-ui/provider/tanstack';

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
      // Inter, the non-Apple half of --default-font-family. The library can't @import it
      // (see ljkui/src/styles/fonts.css) so every consumer links it here instead.
      { rel: 'preconnect', href: 'https://rsms.me/' },
      { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
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
          <Outlet />
        </RootProvider>
        <Scripts />
      </body>
    </html>
  );
}
