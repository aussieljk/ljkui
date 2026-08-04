import TextareaOverview from './demos/textarea.demo';
import React from 'react';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/textarea.demo.tsx` before demos folded into examples. */
  Overview: TextareaOverview,
};
