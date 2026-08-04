import React from 'react';
import { Menubar } from 'ljkui';

export default function MenubarDemo() {
  return (
    <Menubar.Root>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>New window</Menubar.Item>
          <Menubar.Item>Open…</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>Print…</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>Undo</Menubar.Item>
          <Menubar.Item>Redo</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  );
}
