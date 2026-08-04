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

  Size() {
    const args = {
      size: separatorPropDefs.size.default,
      color: separatorPropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Separator {...args} orientation="horizontal" size="4" />
          <Separator {...args} orientation="horizontal" size="3" />
          <Separator {...args} orientation="horizontal" size="2" />
          <Separator {...args} orientation="horizontal" size="1" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', height: 96 }}>
          <Separator {...args} orientation="vertical" size="4" />
          <Separator {...args} orientation="vertical" size="3" />
          <Separator {...args} orientation="vertical" size="2" />
          <Separator {...args} orientation="vertical" size="1" />
        </div>
      </div>
    );
  },

  Color() {
    const args = {
      size: separatorPropDefs.size.default,
      color: separatorPropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Separator {...args} color="indigo" size="3" />
        <Separator {...args} color="cyan" size="3" />
        <Separator {...args} color="orange" size="3" />
        <Separator {...args} color="rose" size="3" />
      </div>
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
