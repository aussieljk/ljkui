import * as React from 'react';

// Local declaration so the dev-only warning compiles without node types;
// bundlers still statically replace `process.env.NODE_ENV`.
declare const process: { env: { NODE_ENV?: string } } | undefined;

const warned = new Set<string>();

/** Props that give an element an accessible name (a label association, or a text label for widgets
 * that don't render their own). */
interface AccessibleNameProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  title?: string;
}

/**
 * Dev-only: warn once per component when a role widget renders with no accessible name. Widgets like
 * `role="meter"` / `progressbar` / `tree` carry no visible text of their own, so without an
 * `aria-label` / `aria-labelledby` they are announced only by their value — unusable to assistive
 * tech. No-op in production. Warns once per component to avoid log spam.
 */
function useAccessibleNameWarning(component: string, props: AccessibleNameProps): void {
  const hasName = Boolean(props['aria-label'] || props['aria-labelledby'] || props.title);
  React.useEffect(() => {
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') return;
    if (hasName || warned.has(component)) return;
    warned.add(component);
    console.warn(
      `[ljkui] <${component}> has no accessible name — pass \`aria-label\` or \`aria-labelledby\` ` +
        `so assistive tech can announce it.`,
    );
  }, [component, hasName]);
}

export { useAccessibleNameWarning };
