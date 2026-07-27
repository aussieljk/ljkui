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

export const examples = { Example: ShineFixture };
