import React from 'react';
import { Button, HStack, Spacer } from 'ljkui';

function SpacerFixture() {
  const args = { minLength: 24 };
  return (
    <HStack style={{ width: 400 }}>
      <Button>Leading</Button>
      <Spacer {...args} />
      <Button>Trailing</Button>
    </HStack>
  );
}

export const examples = { Example: SpacerFixture };
