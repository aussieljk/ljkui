import React from 'react';
import { Separator, separatorPropDefs, Typography } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Layout', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/separator.demo.tsx` before demos folded into examples. */
  Overview() {
    return (
      <Typography.Text size="2">
        Tools for building high-quality, accessible UI.
        <Separator size="4" className="my-3" />
        <div className="flex items-center gap-3">
          Themes
          <Separator orientation="vertical" />
          Primitives
          <Separator orientation="vertical" />
          Icons
          <Separator orientation="vertical" />
          Colors
        </div>
      </Typography.Text>
    );
  },

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
