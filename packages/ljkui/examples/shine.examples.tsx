import ShineOverview from './demos/shine.demo';
import React from 'react';
import { Shine, Typography } from 'ljkui';

function ShineFixture() {
  const props = { puffyness: '2' } as const;
  return (
    <Shine {...props}>
      <Typography.Text size="9" weight="bold">
        🧸☔️ Shine! ✨👻
      </Typography.Text>
    </Shine>
  );
}

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Utilities', layout: 'centered' } as const;

export const examples = { Overview: ShineOverview, Example: ShineFixture };
