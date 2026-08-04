import React from 'react';
import { Button, HStack, Spacer } from 'ljkui';

export default function SpacerDemo() {
  return (
    <HStack spacing={0} className="w-80 rounded-xl border border-dashed border-gray-alpha-400 p-2">
      <Button size="1" variant="soft">
        Leading
      </Button>
      <Spacer minLength={24} />
      <Button size="1" variant="soft">
        Trailing
      </Button>
    </HStack>
  );
}
