import React from 'react';
import { Stepper } from 'ljkui';

const steps = [
  { label: 'Cart' },
  { label: 'Shipping', description: 'Address & method' },
  { label: 'Payment', description: 'Card details' },
  { label: 'Review' },
];

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

  Size() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', width: 520 }}>
        <Stepper size="1" steps={steps} activeStep={2} />
        <Stepper size="2" steps={steps} activeStep={2} />
        <Stepper size="3" steps={steps} activeStep={2} />
      </div>
    );
  },

  Color() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', width: 520 }}>
        <Stepper color="green" steps={steps} activeStep={2} />
        <Stepper color="violet" steps={steps} activeStep={2} />
      </div>
    );
  },
};
