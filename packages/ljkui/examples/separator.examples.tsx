import SeparatorOverview from './demos/separator.demo';
import React from 'react';
import { Separator, separatorPropDefs } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Layout', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/separator.demo.tsx` before demos folded into examples. */
  Overview: SeparatorOverview,

  Orientation() {
    const args = {
      size: separatorPropDefs.size.default,
      color: separatorPropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <Separator {...args} orientation="horizontal" />
        <Separator {...args} orientation="vertical" />
      </div>
    );
  },
};
