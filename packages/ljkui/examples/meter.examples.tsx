import MeterOverview from './demos/meter.demo';
import React from 'react';
import { Meter } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/meter.demo.tsx` before demos folded into examples. */
  Overview: MeterOverview,

  'Optimum coloring'() {
    // low=20, high=80, optimum=90 → higher is better: green above 80, amber 20-80, red below 20.
    const args = { min: 0, max: 100, low: 20, high: 80, optimum: 90 };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 300 }}>
        <Meter {...args} value={95} />
        <Meter {...args} value={55} />
        <Meter {...args} value={10} />
      </div>
    );
  },
};
