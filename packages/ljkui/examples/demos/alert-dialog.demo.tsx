import React from 'react';
import { AlertDialog, Button } from 'ljkui';

export default function AlertDialogDemo() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="classic" color="red">
          Revoke access
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content className="max-w-[450px]">
        <AlertDialog.Title>Revoke access</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure? This application will no longer be accessible and any existing sessions will be expired.
        </AlertDialog.Description>

        <div className="mt-4 flex justify-end gap-3">
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
}
