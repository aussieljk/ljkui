import * as React from 'react';
import { Typography } from 'ljkui';
import propsJson from '../src/generated/props.json';

/*
 * One fixture per enumerable prop, rendered from the library's own `*.props.ts` definitions.
 *
 * The great majority of the hand-authored examples were this and nothing else: "render the
 * component once per value of `size`" (39 files), "…per value of `color`" (31), "…per value of
 * `variant`" (10). Each was ~15 lines of flex-row boilerplate that restated what `props.json`
 * already knows, and each went stale the moment a variant was added — the `Color` examples had
 * drifted to showing four of the twenty-six colors.
 *
 * `Playground` (see playground.tsx) already reads exactly this metadata to build live controls.
 * This is the same reading with the axis fixed instead of interactive, so the two cannot
 * disagree about what values a prop accepts.
 *
 * A hand-authored example of the same name always wins — `gen-fixtures.ts` only synthesises
 * the fixtures a module does not already export, so a component whose `Size` genuinely needs
 * to show something else just keeps writing it.
 */

interface PropEntry {
  type?: string;
  default?: string;
  description?: string;
}

const PROPS = propsJson as Record<string, Record<string, PropEntry>>;

/**
 * The props worth a fixture of their own.
 *
 * Deliberately a list rather than "every string union": `type`, `as`, `side` and friends are
 * union-typed too, but a grid of them documents nothing — they change where a thing goes, not
 * what it looks like. These five are the visual axes, and they are what the deleted examples
 * actually enumerated.
 */
export const ENUMERABLE = ['size', 'variant', 'color', 'radius', 'weight'] as const;

/** Fixture name for a prop: `size` → `Size`, `highContrast` → `High contrast`. */
export function fixtureNameFor(prop: string): string {
  const spaced = prop.replace(/([A-Z])/g, ' $1').toLowerCase();
  return spaced[0].toUpperCase() + spaced.slice(1);
}

/** `'"1" | "2"'` → `['1', '2']`; null when the type is not a union of string literals. */
function stringUnion(type: string | undefined): string[] | null {
  const inner = type?.match(/^Responsive<([\s\S]+)>$/)?.[1].trim() ?? type;
  if (!inner || !inner.includes('|')) return null;
  const parts = inner.split('|').map((part) => part.trim());
  if (!parts.every((part) => /^"[^"]*"$/.test(part))) return null;
  return parts.map((part) => part.slice(1, -1));
}

/** The values `prop` takes on `slug`, or null when there is nothing to enumerate. */
export function optionsFor(slug: string, prop: string): string[] | null {
  const options = stringUnion(PROPS[slug]?.[prop]?.type);
  return options && options.length > 1 ? options : null;
}

/*
 * Wraps, because `color` has 26 values. A fixed row was fine when the examples hand-picked
 * four of them; showing the whole axis needs to reflow.
 */
const gridStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  gap: 'var(--space-4)',
  padding: 'var(--space-4)',
};

const cellStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--space-2)',
};

interface EnumerateProps {
  slug: string;
  prop: string;
  /** Display name of the driven export — also the default text child, as in `Playground`. */
  name: string;
  /** Children for a namespace component, from the module's `playgroundChildren` export. */
  renderChildren?: () => React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- props are assembled from JSON; see playground.tsx
  component: React.ComponentType<any>;
}

export function Enumerate({ slug, prop, name, component: Component, renderChildren }: EnumerateProps) {
  const options = optionsFor(slug, prop);
  if (!options) return null;

  /*
   * The other enumerable props are pinned to their documented defaults rather than left unset,
   * so a `Color` grid varies colour alone. Several components branch on `undefined` to inherit
   * the theme accent, so a prop with no default stays absent instead of being invented.
   */
  const base: Record<string, string> = {};
  for (const other of ENUMERABLE) {
    if (other === prop) continue;
    const fallback = PROPS[slug]?.[other]?.default;
    if (fallback !== undefined && optionsFor(slug, other)) base[other] = fallback;
  }

  return (
    <div style={gridStyle}>
      {options.map((option) => (
        <div key={option} style={cellStyle}>
          <Component {...base} {...{ [prop]: option }}>
            {renderChildren ? renderChildren() : name}
          </Component>
          <Typography.Code size="1" color="gray">
            {option}
          </Typography.Code>
        </div>
      ))}
    </div>
  );
}
