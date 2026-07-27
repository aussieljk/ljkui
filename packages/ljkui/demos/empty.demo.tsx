import React from 'react';
import { Button, Empty, IconProvider, Icons } from 'ljkui';
import { lucideAdapter } from 'ljkui/icons/lucide';

export default function EmptyDemo() {
  return (
    <IconProvider library={lucideAdapter}>
      <Empty.Root>
        <Empty.Header>
          <Empty.Media>
            <Icons.Inbox />
          </Empty.Media>
          <Empty.Title>No messages yet</Empty.Title>
          <Empty.Description>When someone sends you a message, it will show up here.</Empty.Description>
        </Empty.Header>
        <Empty.Actions>
          <Button variant="classic">Compose message</Button>
        </Empty.Actions>
      </Empty.Root>
    </IconProvider>
  );
}
