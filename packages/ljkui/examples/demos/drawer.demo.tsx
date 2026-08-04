import React from 'react';
import { Button, Drawer, Input, Typography } from 'ljkui';

export default function DrawerDemo() {
  return (
    <Drawer.Root>
      <Drawer.Trigger>
        <Button>Edit profile</Button>
      </Drawer.Trigger>

      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Edit profile</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Typography.Text render={<p />} size="2" className="mb-4">
            Make changes to your profile, then save.
          </Typography.Text>

          <label>
            <Typography.Text render={<div />} size="2" weight="bold" className="mb-1">
              Name
            </Typography.Text>
            <Input.Control defaultValue="Freja Johnsen" placeholder="Enter your full name" />
          </label>

          <div className="mt-4 flex justify-end gap-3">
            <Drawer.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Drawer.Close>
            <Drawer.Close>
              <Button>Save</Button>
            </Drawer.Close>
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
