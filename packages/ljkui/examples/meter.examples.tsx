import React from 'react';
import { Meter, meterPropDefs } from 'ljkui';

export const examples = {
  Size() {
    const args = {
      size: meterPropDefs.size.default,
      value: 60,
      min: 0,
      max: 100,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 300 }}>
        <Meter {...args} size="6" />
        <Meter {...args} size="5" />
        <Meter {...args} size="4" />
        <Meter {...args} size="3" />
        <Meter {...args} size="2" />
        <Meter {...args} size="1" />
      </div>
    );
  },

  Color() {
    const args = { value: 60, min: 0, max: 100 };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 300 }}>
        <Meter {...args} color="indigo" />
        <Meter {...args} color="cyan" />
        <Meter {...args} color="orange" />
        <Meter {...args} color="rose" />
      </div>
    );
  },

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
