import MenubarOverview from './demos/menubar.demo';
import React from 'react';
import { Menubar } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls', layout: 'fullscreen' } as const;

export const examples = {
  /** The canonical usage — was `demos/menubar.demo.tsx` before demos folded into examples. */
  Overview: MenubarOverview,

  Default: (
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
          <Menubar.Separator />
          <Menubar.Sub>
            <Menubar.SubTrigger>Find</Menubar.SubTrigger>
            <Menubar.SubContent>
              <Menubar.Item>Find…</Menubar.Item>
              <Menubar.Item>Find next</Menubar.Item>
            </Menubar.SubContent>
          </Menubar.Sub>
        </Menubar.Content>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger>View</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.CheckboxItem defaultChecked>Show sidebar</Menubar.CheckboxItem>
          <Menubar.CheckboxItem>Show status bar</Menubar.CheckboxItem>
          <Menubar.Separator />
          <Menubar.RadioGroup defaultValue="comfortable">
            <Menubar.GroupLabel>Density</Menubar.GroupLabel>
            <Menubar.RadioItem value="compact">Compact</Menubar.RadioItem>
            <Menubar.RadioItem value="comfortable">Comfortable</Menubar.RadioItem>
          </Menubar.RadioGroup>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  ),
};
