import React from 'react';
import { Alert, IconProvider, Icons } from 'ljkui';
import { lucideAdapter } from 'ljkui/icons/lucide';

export default function AlertDemo() {
  return (
    <IconProvider library={lucideAdapter}>
      <Alert.Root color="warning" className="max-w-105">
        <Alert.Icon>
          <Icons.Info />
        </Alert.Icon>
        <Alert.Title>Your trial ends in 3 days</Alert.Title>
        <Alert.Description>Upgrade to keep access to analytics and priority support.</Alert.Description>
        <Alert.Actions>
          <Alert.Action>Upgrade</Alert.Action>
          <Alert.Action variant="secondary">Remind me later</Alert.Action>
        </Alert.Actions>
      </Alert.Root>
    </IconProvider>
  );
}
