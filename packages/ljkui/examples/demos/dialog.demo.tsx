import React from 'react';
import { Button, Dialog, Input, Typography } from 'ljkui';

export default function DialogDemo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger nativeButton>
        <Button>Edit profile</Button>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-[450px]">
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>Make changes to your profile.</Dialog.Description>

        <label>
          <Typography.Text render={<div />} size="2" weight="bold" className="mb-1">
            Name
          </Typography.Text>
          <Input.Root>
            <Input.Control defaultValue="Freja Johnsen" placeholder="Enter your full name" />
          </Input.Root>
        </label>

        <div className="mt-4 flex justify-end gap-3">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
