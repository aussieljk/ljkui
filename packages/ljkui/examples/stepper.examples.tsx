import React from 'react';
import { Stepper } from 'ljkui';

const steps = [
  { label: 'Cart' },
  { label: 'Shipping', description: 'Address & method' },
  { label: 'Payment', description: 'Card details' },
  { label: 'Review' },
];

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'centered' } as const;

export const examples = {
  Horizontal() {
    return (
      <div style={{ width: 520 }}>
        <Stepper steps={steps} activeStep={2} />
      </div>
    );
  },

  Vertical() {
    return (
      <div style={{ width: 280 }}>
        <Stepper orientation="vertical" steps={steps} activeStep={1} />
      </div>
    );
  },
};
