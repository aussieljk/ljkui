import ProgressOverview from './demos/progress.demo';
import React from 'react';
import { Progress, progressPropDefs } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/progress.demo.tsx` before demos folded into examples. */
  Overview: ProgressOverview,

  'High Contrast'() {
    const args = {
      size: progressPropDefs.size.default,
      color: progressPropDefs.color.default,
      value: 40,
      max: 100,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 300 }}>
          <Progress {...args} highContrast={false} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 300 }}>
          <Progress {...args} highContrast />
        </div>
      </div>
    );
  },
};
