import React from 'react';
import { Button, ButtonGroup, VStack } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/button-group.demo.tsx` before demos folded into examples. */
  Overview() {
    return (
      <ButtonGroup.Root>
        <ButtonGroup.Text>https://</ButtonGroup.Text>
        <Button variant="surface">example.com</Button>
        <Button variant="solid">Copy</Button>
      </ButtonGroup.Root>
    );
  },

  Default: (
    <ButtonGroup.Root>
      <Button>Save</Button>
      <Button>Save and publish</Button>
    </ButtonGroup.Root>
  ),

  'With text segment': (
    <ButtonGroup.Root>
      <ButtonGroup.Text>https://</ButtonGroup.Text>
      <Button variant="surface">example.com</Button>
      <Button variant="solid">Copy</Button>
    </ButtonGroup.Root>
  ),

  'With separator': (
    <ButtonGroup.Root>
      <Button variant="surface">Undo</Button>
      <ButtonGroup.Separator />
      <Button variant="surface">Redo</Button>
    </ButtonGroup.Root>
  ),

  Vertical: (
    <ButtonGroup.Root orientation="vertical">
      <Button variant="surface">Top</Button>
      <Button variant="surface">Middle</Button>
      <Button variant="surface">Bottom</Button>
    </ButtonGroup.Root>
  ),

  Sizes: (
    <VStack spacing={12} alignment="leading">
      {(['1', '2', '3', '4'] as const).map((size) => (
        <ButtonGroup.Root key={size}>
          <Button size={size}>Previous</Button>
          <Button size={size}>Next</Button>
        </ButtonGroup.Root>
      ))}
    </VStack>
  ),
};
