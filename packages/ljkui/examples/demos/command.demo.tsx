import React from 'react';
import { Command } from 'ljkui';

export default function CommandDemo() {
  return (
    <Command.Root style={{ width: 380, boxShadow: '0 0 0 1px var(--gray-alpha-300) inset' }}>
      <Command.Input placeholder="Type a command or search…" />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Actions">
          <Command.Item onSelect={() => console.log('invoice')}>
            Create invoice
            <Command.Shortcut>⌘N</Command.Shortcut>
          </Command.Item>
          <Command.Item onSelect={() => console.log('customer')}>
            Add customer
            <Command.Shortcut>⌘⇧C</Command.Shortcut>
          </Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="Navigation">
          <Command.Item onSelect={() => console.log('settings')}>Go to settings</Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Root>
  );
}
