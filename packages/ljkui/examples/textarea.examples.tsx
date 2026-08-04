import { Textarea } from 'ljkui';
import React from 'react';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/textarea.demo.tsx` before demos folded into examples. */
  Overview() {
    return (
      <div className="flex w-75 flex-col gap-3">
        <Textarea placeholder="Reply to comment…" />
        <Textarea variant="soft" placeholder="Soft variant" />
        <Textarea variant="soft" color="blue" size="3" placeholder="Blue, size 3" />
        <Textarea disabled placeholder="Disabled" />
      </div>
    );
  },
};
