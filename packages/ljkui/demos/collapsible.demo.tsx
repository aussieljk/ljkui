import React from 'react';
import { Button, Collapsible, Typography } from 'ljkui';

export default function CollapsibleDemo() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger render={<Button variant="ghost" />}>Advanced options</Collapsible.Trigger>
      <Collapsible.Content>
        <Typography.Text size="2" color="gray">
          Requests are retried three times before the job is marked as failed.
        </Typography.Text>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
