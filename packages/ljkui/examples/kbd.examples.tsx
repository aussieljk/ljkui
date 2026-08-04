import KbdOverview from './demos/kbd.demo';
import React from 'react';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Typography', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/kbd.demo.tsx` before demos folded into examples. */
  Overview: KbdOverview,
};
