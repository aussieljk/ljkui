import * as React from 'react';
import { Theme } from 'ljkui';
import { exampleModules, type Example, type ExampleRecord } from '@/examples/registry';
import { DemoBoundary } from './demo-boundary';

function renderExample(example: Example) {
  if (React.isValidElement(example)) return example;
  const Component = example as React.ComponentType;
  return <Component />;
}

function Gallery({ examples }: { examples: ExampleRecord }) {
  return (
    <>
      {Object.entries(examples).map(([label, example]) => (
        <section key={label} className="border-t border-fd-border first:border-t-0">
          <h3 className="px-4 pt-4 text-xs font-medium tracking-wider text-fd-muted-foreground uppercase">{label}</h3>
          <Theme appearance="inherit" className="flex flex-wrap items-center gap-3 p-4">
            <DemoBoundary name={label}>{renderExample(example)}</DemoBoundary>
          </Theme>
        </section>
      ))}
    </>
  );
}

/**
 * The variant gallery for one component — every named example from
 * `packages/ljkui/examples/<name>.examples.tsx`, in declared order.
 *
 * Client-only for the same reason as `<Demo>`: these are real component trees that touch browser
 * globals (CSS.supports, portals, ResizeObserver) and throw during prerender. The page shell still
 * prerenders; only the previews wait for mount.
 */
export function Examples({ name }: { name: string }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const load = exampleModules[name];

  // Pages for components that never had variant examples simply render nothing.
  const LazyGallery = React.useMemo(() => {
    if (!load) return null;
    return React.lazy(async () => {
      const module = await load();
      return { default: () => <Gallery examples={module.examples} /> };
    });
  }, [load]);

  if (!LazyGallery) return null;

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-fd-border bg-fd-card">
      {mounted ? (
        <React.Suspense fallback={<div className="p-4 text-sm text-fd-muted-foreground">Loading examples…</div>}>
          <LazyGallery />
        </React.Suspense>
      ) : (
        <div className="p-4 text-sm text-fd-muted-foreground">Loading examples…</div>
      )}
    </div>
  );
}
