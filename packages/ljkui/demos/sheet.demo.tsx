import React from 'react';
import { Button, Input, Sheet, Typography } from 'ljkui';

export default function SheetDemo() {
  return (
    <Sheet.Root>
      <Sheet.Trigger>
        <Button>Edit profile</Button>
      </Sheet.Trigger>

      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>Edit profile</Sheet.Title>
          <Sheet.Description>Make changes to your profile.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Body>
          <label>
            <Typography.Text render={<div />} size="2" weight="bold" className="mb-1">
              Name
            </Typography.Text>
            <Input.Control defaultValue="Freja Johnsen" placeholder="Enter your full name" />
          </label>

          <div className="mt-4 flex justify-end gap-3">
            <Sheet.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Sheet.Close>
            <Sheet.Close>
              <Button>Save</Button>
            </Sheet.Close>
          </div>
        </Sheet.Body>
      </Sheet.Content>
    </Sheet.Root>
  );
}
