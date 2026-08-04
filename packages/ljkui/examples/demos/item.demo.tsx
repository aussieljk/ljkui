import React from 'react';
import { Avatar, Button, Item } from 'ljkui';

export default function ItemDemo() {
  return (
    <Item.Root variant="outline" style={{ maxWidth: 380 }}>
      <Item.Media>
        <Avatar fallback="AL" />
      </Item.Media>
      <Item.Content>
        <Item.Title>Ada Lovelace</Item.Title>
        <Item.Description>ada@example.com</Item.Description>
      </Item.Content>
      <Item.Actions>
        <Button size="1" variant="surface">
          Invite
        </Button>
      </Item.Actions>
    </Item.Root>
  );
}
