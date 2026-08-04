import ContextMenuOverview from './demos/context-menu.demo';
import React from 'react';
import { Button, ContextMenu, Dialog, Input, Textarea, Typography, contextMenuContentPropDefs } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/context-menu.demo.tsx` before demos folded into examples. */
  Overview: ContextMenuOverview,

  Default() {
    const args = {
      size: contextMenuContentPropDefs.size.default,
      variant: contextMenuContentPropDefs.variant.default,
    };
    return (
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div
            style={{
              background: 'var(--gray-alpha-50)',
              borderRadius: 'var(--radius-3)',
              width: 200,
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Right-click here
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content {...args}>
          <ContextMenu.Item shortcut="⌘ E">Edit</ContextMenu.Item>
          <ContextMenu.Item shortcut="⌘ D">Duplicate</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item shortcut="⌘ N">Archive</ContextMenu.Item>

          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item>Move to project…</ContextMenu.Item>
              <ContextMenu.Item>Move to folder…</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>Advanced options…</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>

          <ContextMenu.Separator />
          <ContextMenu.Item>Share</ContextMenu.Item>
          <ContextMenu.Item>Add to favorites</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item shortcut="⌘ ⌫" color="danger">
            Delete
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    );
  },

  'Checkbox and Radio Items'() {
    const args = {
      size: contextMenuContentPropDefs.size.default,
      variant: contextMenuContentPropDefs.variant.default,
    };
    const [showGrid, setShowGrid] = React.useState(true);
    const [showRulers, setShowRulers] = React.useState(false);
    const [view, setView] = React.useState<string>('list');

    return (
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div
            style={{
              background: 'var(--gray-alpha-50)',
              borderRadius: 'var(--radius-3)',
              width: 200,
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Right-click here
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content {...args}>
          <ContextMenu.CheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
            Show Grid
          </ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem checked={showRulers} onCheckedChange={setShowRulers}>
            Show Rulers
          </ContextMenu.CheckboxItem>
          <ContextMenu.Separator />
          <ContextMenu.RadioGroup value={view} onValueChange={setView}>
            <ContextMenu.RadioItem value="list">List View</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="grid">Grid View</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="gallery">Gallery View</ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>
        </ContextMenu.Content>
      </ContextMenu.Root>
    );
  },

  'Nested Menu'() {
    const args = {
      size: contextMenuContentPropDefs.size.default,
      variant: contextMenuContentPropDefs.variant.default,
    };
    return (
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div
            style={{
              background: 'var(--gray-alpha-50)',
              borderRadius: 'var(--radius-3)',
              width: 200,
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Right-click here
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content {...args}>
          <ContextMenu.Item>Add to Library</ContextMenu.Item>

          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>Add to Playlist</ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item>Get Up!</ContextMenu.Item>
              <ContextMenu.Item>Inside Out</ContextMenu.Item>
              <ContextMenu.Item>Night Beats</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>New playlist…</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>

          <ContextMenu.Separator />
          <ContextMenu.Group>
            <ContextMenu.GroupLabel>Actions</ContextMenu.GroupLabel>
            <ContextMenu.Item>Play Next</ContextMenu.Item>
            <ContextMenu.Item>Play Last</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Favorite</ContextMenu.Item>
            <ContextMenu.Item>Share</ContextMenu.Item>
          </ContextMenu.Group>
        </ContextMenu.Content>
      </ContextMenu.Root>
    );
  },

  'Item as Link'() {
    const args = {
      size: contextMenuContentPropDefs.size.default,
      variant: contextMenuContentPropDefs.variant.default,
    };
    return (
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div
            style={{
              background: 'var(--gray-alpha-50)',
              borderRadius: 'var(--radius-3)',
              width: 200,
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Right-click here
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content {...args}>
          <ContextMenu.Item render={<a href="#home" />}>Home</ContextMenu.Item>
          <ContextMenu.Item render={<a href="#projects" />}>Projects</ContextMenu.Item>
          <ContextMenu.Item render={<a href="#settings" />}>Settings</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item render={<a href="https://github.com" target="_blank" rel="noopener noreferrer" />}>
            GitHub ↗
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    );
  },

  'Dialog from Context Menu'() {
    const args = {
      size: contextMenuContentPropDefs.size.default,
      variant: contextMenuContentPropDefs.variant.default,
    };
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Typography.Text render={<div />} style={{ maxWidth: 500, textAlign: 'center' }}>
          Open a dialog from a context menu using controlled state. The dialog is controlled via{' '}
          <Typography.Code>open</Typography.Code> and <Typography.Code>onOpenChange</Typography.Code> props, and opened
          imperatively via <Typography.Code>onClick</Typography.Code> on the menu item.
        </Typography.Text>

        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <div
              style={{
                background: 'var(--gray-alpha-50)',
                borderRadius: 'var(--radius-3)',
                width: 200,
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Right-click here
            </div>
          </ContextMenu.Trigger>
          <ContextMenu.Content {...args}>
            <ContextMenu.Item>View Details</ContextMenu.Item>
            <ContextMenu.Item>Duplicate</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item onClick={() => setEditDialogOpen(true)}>Edit...</ContextMenu.Item>
            <ContextMenu.Item color="danger" onClick={() => setDeleteDialogOpen(true)}>
              Delete...
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>

        {/* Edit Dialog - rendered outside the menu */}
        <Dialog.Root open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>Edit Item</Dialog.Title>
            <Dialog.Description>Make changes to your item here.</Dialog.Description>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-3)',
              }}
            >
              <label>
                <Typography.Text render={<div />} size="2" style={{ marginBottom: 4 }} weight="bold">
                  Name
                </Typography.Text>
                <Input.Control defaultValue="My Item" placeholder="Enter name" />
              </label>
              <label>
                <Typography.Text render={<div />} size="2" style={{ marginBottom: 4 }} weight="bold">
                  Description
                </Typography.Text>
                <Textarea defaultValue="A sample item description" placeholder="Enter description" />
              </label>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-4)',
                justifyContent: 'flex-end',
              }}
            >
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button variant="classic">Save Changes</Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Root>

        {/* Delete Dialog - rendered outside the menu */}
        <Dialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <Dialog.Content style={{ maxWidth: 400 }}>
            <Dialog.Title>Delete Item</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to delete this item? This action cannot be undone.
            </Dialog.Description>

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-4)',
                justifyContent: 'flex-end',
              }}
            >
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button variant="classic" color="red">
                  Delete
                </Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    );
  },

  'Side and Align'() {
    const args = {
      size: contextMenuContentPropDefs.size.default,
      variant: contextMenuContentPropDefs.variant.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Typography.Text render={<div />} style={{ maxWidth: 500, textAlign: 'center' }}>
          Control where the menu appears relative to the click position using <Typography.Code>side</Typography.Code>{' '}
          and <Typography.Code>align</Typography.Code> props. Try right-clicking each box.
        </Typography.Text>

        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <div
                style={{
                  background: 'var(--gray-alpha-50)',
                  borderRadius: 'var(--radius-3)',
                  width: 140,
                  height: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--font-size-1)',
                }}
              >
                Bottom Start
              </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content {...args} side="bottom" align="start">
              <ContextMenu.Item>Item 1</ContextMenu.Item>
              <ContextMenu.Item>Item 2</ContextMenu.Item>
              <ContextMenu.Item>Item 3</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>

          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <div
                style={{
                  background: 'var(--gray-alpha-50)',
                  borderRadius: 'var(--radius-3)',
                  width: 140,
                  height: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--font-size-1)',
                }}
              >
                Right Start
              </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content {...args} side="right" align="start">
              <ContextMenu.Item>Item 1</ContextMenu.Item>
              <ContextMenu.Item>Item 2</ContextMenu.Item>
              <ContextMenu.Item>Item 3</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>

          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <div
                style={{
                  background: 'var(--gray-alpha-50)',
                  borderRadius: 'var(--radius-3)',
                  width: 140,
                  height: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--font-size-1)',
                }}
              >
                Top End
              </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content {...args} side="top" align="end">
              <ContextMenu.Item>Item 1</ContextMenu.Item>
              <ContextMenu.Item>Item 2</ContextMenu.Item>
              <ContextMenu.Item>Item 3</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>

          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <div
                style={{
                  background: 'var(--gray-alpha-50)',
                  borderRadius: 'var(--radius-3)',
                  width: 140,
                  height: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--font-size-1)',
                }}
              >
                Left Center
              </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content {...args} side="left" align="center">
              <ContextMenu.Item>Item 1</ContextMenu.Item>
              <ContextMenu.Item>Item 2</ContextMenu.Item>
              <ContextMenu.Item>Item 3</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        </div>
      </div>
    );
  },

  'Side Offset and Align Offset'() {
    const args = {
      size: contextMenuContentPropDefs.size.default,
      variant: contextMenuContentPropDefs.variant.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Typography.Text render={<div />} style={{ maxWidth: 500, textAlign: 'center' }}>
          Fine-tune menu positioning with <Typography.Code>sideOffset</Typography.Code> (distance from click) and{' '}
          <Typography.Code>alignOffset</Typography.Code> (shift along the alignment axis). Right-click each box.
        </Typography.Text>

        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <div
                style={{
                  background: 'var(--gray-alpha-50)',
                  borderRadius: 'var(--radius-3)',
                  width: 140,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--font-size-1)',
                }}
              >
                Default
              </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content {...args}>
              <ContextMenu.Item>Item 1</ContextMenu.Item>
              <ContextMenu.Item>Item 2</ContextMenu.Item>
              <ContextMenu.Item>Item 3</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>

          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <div
                style={{
                  background: 'var(--gray-alpha-50)',
                  borderRadius: 'var(--radius-3)',
                  width: 140,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--font-size-1)',
                }}
              >
                sideOffset: 20
              </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content {...args} sideOffset={20}>
              <ContextMenu.Item>Item 1</ContextMenu.Item>
              <ContextMenu.Item>Item 2</ContextMenu.Item>
              <ContextMenu.Item>Item 3</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>

          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <div
                style={{
                  background: 'var(--gray-alpha-50)',
                  borderRadius: 'var(--radius-3)',
                  width: 140,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--font-size-1)',
                }}
              >
                alignOffset: 30
              </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content {...args} alignOffset={30}>
              <ContextMenu.Item>Item 1</ContextMenu.Item>
              <ContextMenu.Item>Item 2</ContextMenu.Item>
              <ContextMenu.Item>Item 3</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>

          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <div
                style={{
                  background: 'var(--gray-alpha-50)',
                  borderRadius: 'var(--radius-3)',
                  width: 140,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--font-size-1)',
                  textAlign: 'center',
                }}
              >
                Both: 20, 20
              </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content {...args} sideOffset={20} alignOffset={20}>
              <ContextMenu.Item>Item 1</ContextMenu.Item>
              <ContextMenu.Item>Item 2</ContextMenu.Item>
              <ContextMenu.Item>Item 3</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        </div>
      </div>
    );
  },
};
