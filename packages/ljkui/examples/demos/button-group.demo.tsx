import React from 'react';
import { Button, ButtonGroup } from 'ljkui';

export default function ButtonGroupDemo() {
  return (
    <ButtonGroup.Root>
      <ButtonGroup.Text>https://</ButtonGroup.Text>
      <Button variant="surface">example.com</Button>
      <Button variant="solid">Copy</Button>
    </ButtonGroup.Root>
  );
}
