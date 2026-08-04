import KbdOverview from './demos/kbd.demo';
import React from 'react';
import { Kbd } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Typography', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/kbd.demo.tsx` before demos folded into examples. */
  Overview: KbdOverview,

  Size() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div>
          <Kbd {...args} size="1">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="2">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="3">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="4">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="5">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="6">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="7">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="8">
            Shift + Tab
          </Kbd>
        </div>
        <div>
          <Kbd {...args} size="9">
            Shift + Tab
          </Kbd>
        </div>
      </div>
    );
  },
};
