import * as React from 'react';
import { Theme } from 'ljkui';
import { demos } from '@/demos/registry';
import { DemoBoundary } from './demo-boundary';
import { PreviewFrame, PreviewToolbar } from './docs-experience';

/**
 * Renders a live usage demo from the ljkui package inside a `<Theme>` (so accent/gray tokens
 * resolve) and offers its verbatim source for copy-paste. `appearance="inherit"` means the demo
 * follows Fumadocs' own light/dark toggle rather than pinning one.
 */
export function Demo({ name }: { name: string }) {
  // Live previews render client-only: many components touch browser globals (CSS.supports,
  // portals, ResizeObserver) that throw during SSR/prerender. The page shell still prerenders;
  // only the interactive preview waits for mount. The source below is always server-rendered.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const entry = demos[name];

  if (!entry) {
    return (
      <div className="my-6 rounded-lg border border-fd-border p-4 text-sm text-fd-muted-foreground">
        Unknown demo: <code>{name}</code>
      </div>
    );
  }

  const { Component, source } = entry;

  return (
    <figure className="not-prose my-6 overflow-hidden rounded-lg border border-fd-border">
      <PreviewToolbar />
      <PreviewFrame>
        <Theme
          appearance="inherit"
          className="flex min-h-32 flex-wrap items-center justify-center gap-3 bg-fd-card p-6"
        >
          {mounted ? (
            <DemoBoundary name={name}>
              <React.Suspense fallback={<div className="text-sm text-fd-muted-foreground">Loading…</div>}>
                <Component />
              </React.Suspense>
            </DemoBoundary>
          ) : (
            <div className="text-sm text-fd-muted-foreground">Loading…</div>
          )}
        </Theme>
      </PreviewFrame>
      <details className="border-t border-fd-border bg-fd-secondary/30">
        <summary className="cursor-pointer select-none px-4 py-2 text-sm font-medium">Show code</summary>
        <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
          <code>{source}</code>
        </pre>
      </details>
    </figure>
  );
}
