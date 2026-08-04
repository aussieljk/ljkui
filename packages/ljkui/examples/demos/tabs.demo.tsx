import React from 'react';
import { Tabs, Typography } from 'ljkui';

export default function TabsDemo() {
  return (
    <Tabs.Root defaultValue="account" className="w-full max-w-100">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="account" className="px-1 py-3">
        <Typography.Text size="2">Make changes to your account.</Typography.Text>
      </Tabs.Content>
      <Tabs.Content value="documents" className="px-1 py-3">
        <Typography.Text size="2">Access and update your documents.</Typography.Text>
      </Tabs.Content>
      <Tabs.Content value="settings" className="px-1 py-3">
        <Typography.Text size="2">Edit your profile and preferences.</Typography.Text>
      </Tabs.Content>
    </Tabs.Root>
  );
}
