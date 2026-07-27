import React from 'react';
import { Avatar, Button, Checkbox, Popover, Textarea } from 'ljkui';

export default function PopoverDemo() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="soft">Comment</Button>
      </Popover.Trigger>
      <Popover.Content className="w-90">
        <div className="flex gap-3">
          <Avatar size="2" fallback="A" />
          <div className="grow">
            <Textarea placeholder="Write a comment…" className="h-20" />
            <div className="mt-3 flex items-center justify-between gap-3">
              <Checkbox size="2">Send to group</Checkbox>
              <Popover.Close>
                <Button size="1">Comment</Button>
              </Popover.Close>
            </div>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
