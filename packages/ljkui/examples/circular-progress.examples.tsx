import CircularProgressOverview from './demos/circular-progress.demo';
import React from 'react';
import { CircularProgress, circularProgressPropDefs } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/circular-progress.demo.tsx` before demos folded into examples. */
  Overview: CircularProgressOverview,

  'High Contrast'() {
    const args = {
      size: circularProgressPropDefs.size.default,
      color: circularProgressPropDefs.color.default,
      value: 40,
      max: 100,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 300 }}>
          <CircularProgress {...args} highContrast={false} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 300 }}>
          <CircularProgress {...args} highContrast />
        </div>
      </div>
    );
  },
};
