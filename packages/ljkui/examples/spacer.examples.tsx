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

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Layout', layout: 'centered' } as const;

export const examples = { Example: SpacerFixture };
