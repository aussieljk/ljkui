import React from 'react';
import { ToggleGroup, Typography } from 'ljkui';

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup.Root defaultValue="account">
      <ToggleGroup.List>
        <ToggleGroup.Trigger value="account">Account</ToggleGroup.Trigger>
        <ToggleGroup.Trigger value="documents">Documents</ToggleGroup.Trigger>
        <ToggleGroup.Trigger value="settings">Settings</ToggleGroup.Trigger>
      </ToggleGroup.List>

      <ToggleGroup.Content value="account" className="px-1 py-3">
        <Typography.Text size="2">Make changes to your account.</Typography.Text>
      </ToggleGroup.Content>
      <ToggleGroup.Content value="documents" className="px-1 py-3">
        <Typography.Text size="2">Access and update your documents.</Typography.Text>
      </ToggleGroup.Content>
      <ToggleGroup.Content value="settings" className="px-1 py-3">
        <Typography.Text size="2">Edit your profile and preferences.</Typography.Text>
      </ToggleGroup.Content>
    </ToggleGroup.Root>
  );
}
