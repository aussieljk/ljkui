/**
 * The library's breakpoint scale, mirroring `src/styles/breakpoints.css`.
 *
 * Keep in sync with that file — `check:explorer` compares the two and fails on drift, so this
 * cannot quietly diverge from the `@custom-media` queries the components actually respond to.
 */
export const BREAKPOINTS = [
  { name: 'xs', min: 520 },
  { name: 'sm', min: 768 },
  { name: 'md', min: 1024 },
  { name: 'lg', min: 1280 },
  { name: 'xl', min: 1640 },
] as const;

export type BreakpointName = (typeof BREAKPOINTS)[number]['name'];

/** The widest breakpoint whose `min-width` the given width satisfies, or `base` below `xs`. */
export function activeBreakpoint(width: number): BreakpointName | 'base' {
  let active: BreakpointName | 'base' = 'base';
  for (const breakpoint of BREAKPOINTS) {
    if (width >= breakpoint.min) active = breakpoint.name;
  }
  return active;
}
