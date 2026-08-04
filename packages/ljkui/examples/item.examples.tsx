import React from 'react';
import { Avatar, Badge, Button, Card, Item, VStack } from 'ljkui';

const people = [
  { name: 'Ada Lovelace', email: 'ada@example.com', role: 'Owner' },
  { name: 'Grace Hopper', email: 'grace@example.com', role: 'Admin' },
  { name: 'Katherine Johnson', email: 'katherine@example.com', role: 'Member' },
];

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'padded' } as const;

export const examples = {
  /** The canonical usage — was `demos/item.demo.tsx` before demos folded into examples. */
  Overview() {
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
  },

  Default: (
    <Item.Root style={{ maxWidth: 420 }}>
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
  ),

  Group: (
    <Card style={{ maxWidth: 420 }}>
      <Item.Group>
        {people.map((person, i) => (
          <React.Fragment key={person.email}>
            {i > 0 && <Item.Separator />}
            <Item.Root>
              <Item.Media>
                <Avatar
                  fallback={person.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                />
              </Item.Media>
              <Item.Content>
                <Item.Title>{person.name}</Item.Title>
                <Item.Description>{person.email}</Item.Description>
              </Item.Content>
              <Item.Actions>
                <Badge>{person.role}</Badge>
              </Item.Actions>
            </Item.Root>
          </React.Fragment>
        ))}
      </Item.Group>
    </Card>
  ),

  Variants: (
    <VStack spacing={12} style={{ maxWidth: 420 }}>
      {(['plain', 'outline', 'muted'] as const).map((variant) => (
        <Item.Root key={variant} variant={variant}>
          <Item.Content>
            <Item.Title>{variant}</Item.Title>
            <Item.Description>The {variant} variant.</Item.Description>
          </Item.Content>
        </Item.Root>
      ))}
    </VStack>
  ),

  Sizes: (
    <VStack spacing={12} style={{ maxWidth: 420 }}>
      {(['1', '2', '3'] as const).map((size) => (
        <Item.Root key={size} variant="outline" size={size}>
          <Item.Content>
            <Item.Title>Size {size}</Item.Title>
            <Item.Description>Supporting copy.</Item.Description>
          </Item.Content>
        </Item.Root>
      ))}
    </VStack>
  ),
};
