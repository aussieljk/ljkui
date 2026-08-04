import { Kbd, Typography } from 'ljkui';
import React from 'react';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Typography', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/kbd.demo.tsx` before demos folded into examples. */
  Overview() {
    return (
      <div className="flex flex-col gap-3">
        <Typography.Text size="3">
          Press <Kbd>⇧⌘K</Kbd> to open the command palette.
        </Typography.Text>
        <div className="flex items-center gap-3">
          <Kbd size="1">Shift + Tab</Kbd>
          <Kbd size="3">Shift + Tab</Kbd>
          <Kbd size="5">Shift + Tab</Kbd>
        </div>
      </div>
    );
  },
};
