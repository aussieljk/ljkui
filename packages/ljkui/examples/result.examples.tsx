import React from 'react';
import { Button, Result } from 'ljkui';

const STATUSES = ['success', 'error', 'warning', 'info'] as const;

export const examples = {
  Success() {
    return (
      <Result.Root status="success">
        <Result.Icon />
        <Result.Title>Payment complete</Result.Title>
        <Result.Description>We emailed a receipt to you. Your subscription is now active.</Result.Description>
        <Result.Actions style={{ flexDirection: 'row' }}>
          <Button variant="surface">View invoice</Button>
          <Button>Back to dashboard</Button>
        </Result.Actions>
      </Result.Root>
    );
  },

  Error() {
    return (
      <Result.Root status="error">
        <Result.Icon />
        <Result.Title>Something went wrong</Result.Title>
        <Result.Description>We couldn't process your request. Please try again in a moment.</Result.Description>
        <Result.Actions style={{ flexDirection: 'row' }}>
          <Button variant="surface">Contact support</Button>
          <Button>Retry</Button>
        </Result.Actions>
      </Result.Root>
    );
  },

  'All statuses'() {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        {STATUSES.map((status) => (
          <Result.Root key={status} status={status}>
            <Result.Icon />
            <Result.Title style={{ textTransform: 'capitalize' }}>{status}</Result.Title>
            <Result.Description>Default icon and accent color for the “{status}” status.</Result.Description>
          </Result.Root>
        ))}
      </div>
    );
  },

  'Custom icon'() {
    return (
      <Result.Root status="info">
        <Result.Icon>🚀</Result.Icon>
        <Result.Title>You're on the waitlist</Result.Title>
        <Result.Description>We'll email you the moment your spot opens up.</Result.Description>
      </Result.Root>
    );
  },
};
