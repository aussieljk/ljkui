import React from 'react';
import { Shine, Typography, Badge } from 'ljkui';

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

export const examples = {
  Overview() {
    return (
      <div className="flex flex-col items-center gap-4">
        <Shine puffyness="2">
          <Typography.Text size="9" weight="bold">
            Shine ✨
          </Typography.Text>
        </Shine>
        <Shine puffyness="1">
          <Badge size="2" color="yellow">
            Premium
          </Badge>
        </Shine>
      </div>
    );
  },
  Example: ShineFixture,
};
