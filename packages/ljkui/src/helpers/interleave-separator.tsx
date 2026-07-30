import * as React from 'react';

/**
 * Returns `children` with a copy of `separator` inserted between each non-nullish
 * child (never before the first or after the last). Keys are stable and unique.
 */
function interleaveSeparator(children: React.ReactNode, separator: React.ReactNode): React.ReactNode[] {
  const items = React.Children.toArray(children).filter((child) => child !== null && child !== undefined);
  return items.flatMap((child, i) =>
    i === 0 ? [child] : [<React.Fragment key={`fui-sep-${i}`}>{separator}</React.Fragment>, child],
  );
}

export { interleaveSeparator };
