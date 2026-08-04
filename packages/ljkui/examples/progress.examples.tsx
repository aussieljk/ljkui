import React from 'react';
import { Progress, progressPropDefs } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/progress.demo.tsx` before demos folded into examples. */
  Overview() {
    return (
      <div className="flex w-70 flex-col gap-4">
        <Progress value={25} size="1" aria-label="25% complete" />
        <Progress value={60} size="2" aria-label="60% complete" />
        <Progress value={85} size="3" color="green" aria-label="85% complete" />
      </div>
    );
  },

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
