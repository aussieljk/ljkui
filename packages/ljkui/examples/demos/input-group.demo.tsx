import React from 'react';
import { InputGroup } from 'ljkui';

export default function InputGroupDemo() {
  return (
    <InputGroup.Root style={{ maxWidth: 260 }}>
      <InputGroup.Addon>
        <InputGroup.Text>$</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Input placeholder="0.00" inputMode="decimal" />
      <InputGroup.Addon>
        <InputGroup.Text>USD</InputGroup.Text>
      </InputGroup.Addon>
    </InputGroup.Root>
  );
}
