import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { Theme } from 'ljkui';
import { demos } from '@/demos/registry';
import { componentLabel } from '@/lib/component-label';
import { DemoBoundary } from './demo-boundary';

/**
 * Mounts once the element gets within `rootMargin` of the viewport, and stays mounted.
 * The showcase renders every demo in the package — booting ~90 live component trees on load
 * would cost seconds, so each card waits until it's nearly on screen.
 */
function useNearViewport<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [near, setNear] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setNear(true);
      },
      { rootMargin: '300px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [near]);

  return [ref, near] as const;
}

function ShowcaseCard({ name }: { name: string }) {
  const [ref, near] = useNearViewport<HTMLLIElement>();
  const entry = demos[name];
  if (!entry) return null;
  const { Component } = entry;

  return (
    <li
      ref={ref}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-fd-border bg-fd-card"
    >
      {/* The preview is decoration for the card-wide link below, and demos contain their own
          focusable controls — keep the whole thing out of the tab order and the a11y tree.
          Demos vary wildly in size, so oversized ones are clipped and faded rather than
          allowed to stretch the grid. */}
      <div
        aria-hidden
        className="pointer-events-none flex h-44 items-center justify-center overflow-hidden p-5 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]"
      >
        <Theme appearance="inherit" className="flex max-h-full flex-wrap items-center justify-center gap-2">
          {near ? (
            <DemoBoundary name={name} compact>
              <React.Suspense fallback={null}>
                <Component />
              </React.Suspense>
            </DemoBoundary>
          ) : null}
        </Theme>
      </div>
      <div className="border-t border-fd-border px-4 py-2.5">
        <Link
          to="/docs/$"
          params={{ _splat: `components/${name}` }}
          className="text-sm font-medium after:absolute after:inset-0 group-hover:text-fd-primary"
        >
          {componentLabel(name)}
        </Link>
      </div>
    </li>
  );
}

/** Every demo in the package as a grid of live, linked previews. */
export function Showcase() {
  const names = React.useMemo(() => Object.keys(demos).sort(), []);

  return (
    <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {names.map((name) => (
        <ShowcaseCard key={name} name={name} />
      ))}
    </ul>
  );
}
