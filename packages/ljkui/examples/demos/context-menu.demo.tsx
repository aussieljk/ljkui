import React from 'react';
import { ContextMenu } from 'ljkui';

export default function ContextMenuDemo() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div className="flex h-[150px] w-50 items-center justify-center rounded-md bg-gray-alpha-50">
          Right-click here
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item shortcut="⌘ E">Edit</ContextMenu.Item>
        <ContextMenu.Item shortcut="⌘ D">Duplicate</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item shortcut="⌘ N">Archive</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item shortcut="⌘ ⌫" color="danger">
          Delete
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
