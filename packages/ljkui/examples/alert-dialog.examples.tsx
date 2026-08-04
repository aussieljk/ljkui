import AlertDialogOverview from './demos/alert-dialog.demo';
import React from 'react';
import { AlertDialog, Button, Input, Inset, Table, Typography, alertDialogContentPropDefs } from 'ljkui';

const detachedHandle = AlertDialog.createHandle();

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/alert-dialog.demo.tsx` before demos folded into examples. */
  Overview: AlertDialogOverview,

  Default() {
    const args = { size: alertDialogContentPropDefs.size.default };
    return (
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="classic" color="red">
            Revoke access
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }} {...args}>
          <AlertDialog.Title>Revoke access</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure? This application will no longer be accessible and any existing sessions will be expired.
          </AlertDialog.Description>

          <div
            style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)', justifyContent: 'flex-end' }}
          >
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="classic" color="red">
                Revoke access
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    );
  },

  Sizes() {
    const args = { size: alertDialogContentPropDefs.size.default };
    return (
      <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button variant="classic" color="red">
              Size 1
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content style={{ maxWidth: 350 }} {...args} size="1">
            <AlertDialog.Title>Revoke access</AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure? This application will no longer be accessible and any existing sessions will be expired.
            </AlertDialog.Description>

            <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
              <AlertDialog.Cancel>
                <Button size="1" variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button size="1" variant="classic" color="red">
                  Revoke access
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>

        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button variant="classic" color="red">
              Size 2
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content style={{ maxWidth: 350 }} size="2">
            <AlertDialog.Title>Revoke access</AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure? This application will no longer be accessible and any existing sessions will be expired.
            </AlertDialog.Description>

            <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
              <AlertDialog.Cancel>
                <Button size="2" variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button size="2" variant="classic" color="red">
                  Revoke access
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>

        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button variant="classic" color="red">
              Size 3
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content style={{ maxWidth: 350 }} size="3">
            <AlertDialog.Title>Revoke access</AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure? This application will no longer be accessible and any existing sessions will be expired.
            </AlertDialog.Description>

            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
              <AlertDialog.Cancel>
                <Button size="2" variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button size="2" variant="classic" color="red">
                  Revoke access
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>

        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button variant="classic" color="red">
              Size 4
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content style={{ maxWidth: 350 }} size="4">
            <AlertDialog.Title>Revoke access</AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure? This application will no longer be accessible and any existing sessions will be expired.
            </AlertDialog.Description>

            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
              <AlertDialog.Cancel>
                <Button size="3" variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button size="3" variant="classic" color="red">
                  Revoke access
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    );
  },

  'With inset content'() {
    const args = { size: alertDialogContentPropDefs.size.default };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
        <Typography.Text>
          Use the <Typography.Code>Inset</Typography.Code> component to align content flush with the sides of the dialog
          (bypassing its padding).
        </Typography.Text>
        <div>
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button color="red" variant="classic">
                Delete users
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: 500 }} {...args}>
              <AlertDialog.Title>Delete Users</AlertDialog.Title>
              <AlertDialog.Description>
                Are you sure you want to delete these users? This action is permanent and cannot be undone.
              </AlertDialog.Description>

              <Inset side="x" style={{ marginTop: 'var(--space-5)', marginBottom: 'var(--space-5)' }}>
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                      <Table.Cell>danilo@example.com</Table.Cell>
                      <Table.Cell>Developer</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                      <Table.Cell>zahra@example.com</Table.Cell>
                      <Table.Cell>Admin</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
              </Inset>

              <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button color="red" variant="classic">
                    Delete users
                  </Button>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </div>
      </div>
    );
  },

  'Using Close Component'() {
    const args = { size: alertDialogContentPropDefs.size.default };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Typography.Text>
          Base UI provides a single <Typography.Code>Close</Typography.Code> component instead of separate{' '}
          <Typography.Code>Action</Typography.Code> and <Typography.Code>Cancel</Typography.Code>. Both close the dialog
          - use styling to differentiate.
        </Typography.Text>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button variant="classic" color="red">
              Delete item
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content style={{ maxWidth: 400 }} {...args}>
            <AlertDialog.Title>Delete item?</AlertDialog.Title>
            <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-4)',
                justifyContent: 'flex-end',
              }}
            >
              <AlertDialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Close>
              <AlertDialog.Close>
                <Button variant="classic" color="red">
                  Delete
                </Button>
              </AlertDialog.Close>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    );
  },

  'Detached Triggers'() {
    const args = { size: alertDialogContentPropDefs.size.default };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Typography.Text>
          Use <Typography.Code>AlertDialog.createHandle()</Typography.Code> to control a dialog from a trigger located
          outside the <Typography.Code>AlertDialog.Root</Typography.Code>.
        </Typography.Text>

        <AlertDialog.Trigger handle={detachedHandle}>
          <Button color="red" variant="classic">
            Detached Trigger
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Root handle={detachedHandle}>
          <AlertDialog.Content {...args} style={{ maxWidth: 400 }}>
            <AlertDialog.Title>Detached Alert Dialog</AlertDialog.Title>
            <AlertDialog.Description>
              This dialog is controlled by a trigger outside of its Root component.
            </AlertDialog.Description>
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-4)',
                justifyContent: 'flex-end',
              }}
            >
              <AlertDialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Close>
              <AlertDialog.Close>
                <Button variant="classic" color="red">
                  Confirm
                </Button>
              </AlertDialog.Close>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    );
  },

  'Multiple Triggers with Payload'() {
    const args = { size: alertDialogContentPropDefs.size.default };
    const handle = React.useMemo(
      () => AlertDialog.createHandle<{ item: string; action: 'archive' | 'delete' | 'reset' }>(),
      [],
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Typography.Text>
          Multiple triggers can control the same dialog. Each trigger can pass a different{' '}
          <Typography.Code>payload</Typography.Code>. The payload type is inferred from the handle - TypeScript will
          catch type errors.
        </Typography.Text>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {/* TypeScript will catch payload type errors because handle infers the type */}
          <AlertDialog.Trigger handle={handle} payload={{ item: 'Project A', action: 'archive' }}>
            <Button variant="soft" color="orange">
              Archive Project A
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Trigger handle={handle} payload={{ item: 'Project B', action: 'delete' }}>
            <Button variant="soft" color="red">
              Delete Project B
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Trigger handle={handle} payload={{ item: 'All data', action: 'reset' }}>
            <Button variant="classic" color="red">
              Reset All Data
            </Button>
          </AlertDialog.Trigger>
        </div>

        <AlertDialog.Root handle={handle}>
          {({ payload }) => (
            <AlertDialog.Content {...args} style={{ maxWidth: 450 }}>
              <AlertDialog.Title>
                {payload?.action === 'archive' && 'Archive item?'}
                {payload?.action === 'delete' && 'Delete item?'}
                {payload?.action === 'reset' && 'Reset all data?'}
              </AlertDialog.Title>
              <AlertDialog.Description>
                {payload?.action === 'archive' &&
                  `Are you sure you want to archive "${payload?.item}"? You can restore it later.`}
                {payload?.action === 'delete' &&
                  `Are you sure you want to delete "${payload?.item}"? This cannot be undone.`}
                {payload?.action === 'reset' &&
                  'This will permanently delete all your data. This action cannot be undone.'}
              </AlertDialog.Description>
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--space-3)',
                  marginTop: 'var(--space-4)',
                  justifyContent: 'flex-end',
                }}
              >
                <AlertDialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Close>
                <AlertDialog.Close>
                  <Button variant="classic" color={payload?.action === 'archive' ? 'orange' : 'red'}>
                    {payload?.action === 'archive' && 'Archive'}
                    {payload?.action === 'delete' && 'Delete'}
                    {payload?.action === 'reset' && 'Reset'}
                  </Button>
                </AlertDialog.Close>
              </div>
            </AlertDialog.Content>
          )}
        </AlertDialog.Root>
      </div>
    );
  },

  'Controlled Mode'() {
    const args = { size: alertDialogContentPropDefs.size.default };
    const [open, setOpen] = React.useState(false);
    const [pendingAction, setPendingAction] = React.useState<string | null>(null);

    const handleAction = (action: string) => {
      setPendingAction(action);
      setOpen(true);
    };

    const handleConfirm = () => {
      console.log(`Confirmed action: ${pendingAction}`);
      setOpen(false);
      setPendingAction(null);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Typography.Text>
          Use <Typography.Code>open</Typography.Code> and <Typography.Code>onOpenChange</Typography.Code> for fully
          controlled mode.
        </Typography.Text>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button onClick={() => handleAction('save')} variant="soft">
            Save Changes
          </Button>
          <Button onClick={() => handleAction('discard')} variant="soft" color="red">
            Discard Changes
          </Button>
        </div>

        <AlertDialog.Root open={open} onOpenChange={setOpen}>
          <AlertDialog.Content {...args} style={{ maxWidth: 400 }}>
            <AlertDialog.Title>{pendingAction === 'save' ? 'Save changes?' : 'Discard changes?'}</AlertDialog.Title>
            <AlertDialog.Description>
              {pendingAction === 'save'
                ? 'Your changes will be saved permanently.'
                : 'All unsaved changes will be lost.'}
            </AlertDialog.Description>
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-4)',
                justifyContent: 'flex-end',
              }}
            >
              <AlertDialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Close>
              <Button variant="classic" color={pendingAction === 'save' ? 'green' : 'red'} onClick={handleConfirm}>
                {pendingAction === 'save' ? 'Save' : 'Discard'}
              </Button>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    );
  },

  'Actions Ref'() {
    const args = { size: alertDialogContentPropDefs.size.default };
    const actionsRef = React.useRef<AlertDialog.Actions>(null!);
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async () => {
      setIsDeleting(true);
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsDeleting(false);
      // Close dialog programmatically after operation completes
      actionsRef.current?.close();
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Typography.Text>
          Use <Typography.Code>actionsRef</Typography.Code> to close the dialog programmatically after an async
          operation.
        </Typography.Text>

        <AlertDialog.Root actionsRef={actionsRef}>
          <AlertDialog.Trigger>
            <Button variant="classic" color="red">
              Delete with async operation
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content {...args} style={{ maxWidth: 400 }}>
            <AlertDialog.Title>Delete item?</AlertDialog.Title>
            <AlertDialog.Description>
              This will permanently delete the item. The dialog will close automatically when the operation completes.
            </AlertDialog.Description>
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-4)',
                justifyContent: 'flex-end',
              }}
            >
              <AlertDialog.Close>
                <Button variant="soft" color="gray" disabled={isDeleting}>
                  Cancel
                </Button>
              </AlertDialog.Close>
              <Button variant="classic" color="red" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    );
  },

  'Initial Focus'() {
    const args = { size: alertDialogContentPropDefs.size.default };
    const cancelRef = React.useRef<HTMLButtonElement>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Typography.Text>
          Use <Typography.Code>initialFocus</Typography.Code> to control which element receives focus when the dialog
          opens. For destructive actions, focus the cancel button to prevent accidental confirmation.
        </Typography.Text>

        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button variant="classic" color="red">
              Delete account
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content {...args} style={{ maxWidth: 400 }} initialFocus={cancelRef}>
            <AlertDialog.Title>Delete your account?</AlertDialog.Title>
            <AlertDialog.Description>
              This will permanently delete your account and all associated data. This action cannot be undone.
            </AlertDialog.Description>
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-4)',
                justifyContent: 'flex-end',
              }}
            >
              <AlertDialog.Close>
                <Button ref={cancelRef} variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Close>
              <AlertDialog.Close>
                <Button variant="classic" color="red">
                  Delete account
                </Button>
              </AlertDialog.Close>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    );
  },

  'Final Focus'() {
    const args = { size: alertDialogContentPropDefs.size.default };
    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Typography.Text>
          Use <Typography.Code>finalFocus</Typography.Code> to control where focus returns when the dialog closes.
        </Typography.Text>

        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button variant="soft" color="red">
                Clear input
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content {...args} style={{ maxWidth: 400 }} finalFocus={inputRef}>
              <AlertDialog.Title>Clear input?</AlertDialog.Title>
              <AlertDialog.Description>
                This will clear the text you entered. Focus will return to the input field after closing.
              </AlertDialog.Description>
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--space-3)',
                  marginTop: 'var(--space-4)',
                  justifyContent: 'flex-end',
                }}
              >
                <AlertDialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Close>
                <AlertDialog.Close>
                  <Button variant="classic" color="red">
                    Clear
                  </Button>
                </AlertDialog.Close>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Root>
          <Input.Control ref={inputRef} placeholder="Type something..." style={{ width: 200 }} />
        </div>
      </div>
    );
  },

  'Open Change Complete'() {
    const args = { size: alertDialogContentPropDefs.size.default };
    const [logs, setLogs] = React.useState<string[]>([]);

    const addLog = (message: string) => {
      const time = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3,
      });
      setLogs((prev) => [`[${time}] ${message}`, ...prev].slice(0, 10));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Typography.Text>
          Compare <Typography.Code>onOpenChange</Typography.Code> (fires immediately) vs{' '}
          <Typography.Code>onOpenChangeComplete</Typography.Code> (fires after animations).
        </Typography.Text>

        <AlertDialog.Root
          onOpenChange={(open) => addLog(`onOpenChange: ${open ? 'opening' : 'closing'}`)}
          onOpenChangeComplete={(open) => addLog(`onOpenChangeComplete: ${open ? 'opened' : 'closed'}`)}
        >
          <AlertDialog.Trigger>
            <Button variant="classic" color="red">
              Open Alert Dialog
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content {...args} style={{ maxWidth: 400 }}>
            <AlertDialog.Title>Confirm action</AlertDialog.Title>
            <AlertDialog.Description>Watch the event log to see callback timing.</AlertDialog.Description>
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-4)',
                justifyContent: 'flex-end',
              }}
            >
              <AlertDialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Close>
              <AlertDialog.Close>
                <Button variant="classic" color="red">
                  Confirm
                </Button>
              </AlertDialog.Close>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>

        <div
          style={{
            padding: 'var(--space-3)',
            background: 'var(--gray-alpha-100)',
            borderRadius: 'var(--radius-2)',
            fontFamily: 'monospace',
            fontSize: 'var(--font-size-1)',
            minHeight: 150,
            width: 400,
          }}
        >
          <Typography.Text size="1" weight="medium" style={{ marginBottom: 8, display: 'block' }}>
            Event Log:
          </Typography.Text>
          {logs.length === 0 ? (
            <Typography.Text size="1" color="gray">
              Open/close the dialog to see events...
            </Typography.Text>
          ) : (
            logs.map((log, i) => (
              <div key={i} style={{ color: log.includes('Complete') ? 'var(--accent-900)' : 'var(--gray-900)' }}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    );
  },
};
