import classNames from 'classnames';

interface RootModifiers {
  /** `size` → `fui-r-size-<n>`. */
  size?: string | number;
  /** `variant` → `fui-variant-<name>`. */
  variant?: string;
  /** `orientation` → `fui-orientation-<name>`. */
  orientation?: string;
  /** `alignment` → `fui-r-alignment-<name>` (SwiftUI-style layout primitives). */
  alignment?: string;
  /** `side` → `fui-side-<name>`. */
  side?: string;
  /** `highContrast` → the `fui-high-contrast` flag. */
  highContrast?: boolean;
}

/**
 * Assembles a component root's `className` from the shared `fui-*` modifier conventions, in one
 * place. Every component otherwise re-spells `fui-r-size-*` / `fui-variant-*` / `fui-orientation-*`
 * and the `fui-high-contrast` flag by hand — a drifting copy of exactly that is how several
 * components ended up silently missing `highContrast`. Pass the base class, the consumer
 * `className`, and the resolved modifier values; `extra` takes any one-off classes.
 *
 * @example
 * className={rootClassName('fui-Badge', className, { size, variant, highContrast })}
 */
function rootClassName(
  base: string,
  className: classNames.Argument,
  modifiers: RootModifiers,
  ...extra: classNames.ArgumentArray
): string {
  const { size, variant, orientation, alignment, side, highContrast } = modifiers;
  return classNames(
    base,
    className,
    size != null && `fui-r-size-${size}`,
    variant != null && `fui-variant-${variant}`,
    orientation != null && `fui-orientation-${orientation}`,
    alignment != null && `fui-r-alignment-${alignment}`,
    side != null && `fui-side-${side}`,
    { 'fui-high-contrast': !!highContrast },
    ...extra,
  );
}

export { rootClassName };
export type { RootModifiers };
