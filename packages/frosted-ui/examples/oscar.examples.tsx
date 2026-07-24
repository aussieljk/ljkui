import { Cat, PartyPopper, Trophy } from 'lucide-react';
import React from 'react';
import {
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  Empty,
  Item,
  Kbd,
  Progress,
  Separator,
  Switch,
  Table,
  Tabs,
  Tooltip,
  Typography,
} from '@aussieljk/frosted';

const { Blockquote, Code, Em, Heading, Strong, Text } = Typography;

const nominees = [
  { name: 'Oscar Wilde', category: 'Best Original Aphorism', wins: 4 },
  { name: 'Oscar the Grouch', category: 'Best Supporting Bin', wins: 2 },
  { name: 'Oscar Peterson', category: 'Best Score', wins: 8 },
  { name: 'Oscar (the cat)', category: 'Best Nap in a Sunbeam', wins: 12 },
];

export const examples = {
  'Oscar’s profile'() {
    return (
      <Card size="2" style={{ width: 420 }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          <Avatar size="4" fallback="OW" color="amber" />
          <div style={{ minWidth: 0 }}>
            <Heading render={<div />} size="3">
              Oscar Wilde
            </Heading>
            <Text render={<div />} size="2" color="gray">
              Nominated for Best Original Aphorism
            </Text>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Badge color="success" variant="soft">
              Oscar winner
            </Badge>
          </div>
        </div>
      </Card>
    );
  },

  'Oscar’s badges'() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        <Badge variant="solid" color="amber">
          Oscar nominee
        </Badge>
        <Badge variant="soft" color="indigo">
          Oscar winner
        </Badge>
        <Badge variant="outline" color="cyan">
          Oscar snubbed
        </Badge>
        <Badge variant="surface" color="rose">
          Oscar bait
        </Badge>
      </div>
    );
  },

  'Oscar’s guest list'() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <AvatarGroup.Root size="3">
          <AvatarGroup.Avatar fallback="OW" color="amber" />
          <AvatarGroup.Avatar fallback="OG" color="green" />
          <AvatarGroup.Avatar fallback="OP" color="indigo" />
          <AvatarGroup.Avatar fallback="OC" color="orange" />
        </AvatarGroup.Root>
        <Text size="2" color="gray">
          Four Oscars and counting
        </Text>
      </div>
    );
  },

  'Oscar’s shortlist'() {
    return (
      <Card style={{ width: 460 }}>
        <Item.Group>
          {nominees.map((nominee, i) => (
            <React.Fragment key={nominee.name}>
              {i > 0 && <Item.Separator />}
              <Item.Root>
                <Item.Media>
                  <Avatar fallback={nominee.name.slice(0, 2)} color="amber" />
                </Item.Media>
                <Item.Content>
                  <Item.Title>{nominee.name}</Item.Title>
                  <Item.Description>{nominee.category}</Item.Description>
                </Item.Content>
                <Item.Actions>
                  <Button size="1" variant="surface">
                    Vote for Oscar
                  </Button>
                </Item.Actions>
              </Item.Root>
            </React.Fragment>
          ))}
        </Item.Group>
      </Card>
    );
  },

  'Oscar’s ballot'() {
    return (
      <div style={{ width: 420 }}>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Oscar</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Wins</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {nominees.map((nominee) => (
              <Table.Row key={nominee.name}>
                <Table.Cell>{nominee.name}</Table.Cell>
                <Table.Cell>{nominee.category}</Table.Cell>
                <Table.Cell>{nominee.wins}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    );
  },

  'Oscar’s campaign progress'() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 320 }}>
        <Text size="2">Oscar’s votes counted</Text>
        <Progress value={82} max={100} color="amber" />
        <Text size="2" color="gray">
          82% of the Academy has voted for an Oscar named Oscar
        </Text>
      </div>
    );
  },

  'Oscar’s preferences'() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Switch defaultChecked color="amber" />
          <Text size="2">Notify me when Oscar wins</Text>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Switch color="amber" />
          <Text size="2">Let Oscar pick the after-party playlist</Text>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Switch defaultChecked color="amber" />
          <Text size="2">Seat Oscar next to Oscar</Text>
        </label>
      </div>
    );
  },

  'Oscar’s announcement'() {
    return (
      <div style={{ maxWidth: 560 }}>
        <Alert.Root>
          <Alert.Icon>
            <PartyPopper size={16} />
          </Alert.Icon>
          <Alert.Title>Oscar has been nominated</Alert.Title>
          <Alert.Description>
            The envelope is sealed and the Academy has spoken — Oscar is up for four awards this year.
          </Alert.Description>
          <Alert.Actions>
            <Alert.Action>Congratulate Oscar</Alert.Action>
            <Alert.Action variant="secondary">Remind me on the night</Alert.Action>
          </Alert.Actions>
        </Alert.Root>
      </div>
    );
  },

  'Oscar’s categories'() {
    return (
      <div style={{ width: 520 }}>
        <Tabs.Root defaultValue="wilde">
          <Tabs.List>
            <Tabs.Trigger value="wilde">Oscar Wilde</Tabs.Trigger>
            <Tabs.Trigger value="grouch">Oscar the Grouch</Tabs.Trigger>
            <Tabs.Trigger value="peterson">Oscar Peterson</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="wilde" style={{ padding: '12px 16px 8px 16px' }}>
            <Text size="2">Oscar Wilde takes Best Original Aphorism, as he does every year.</Text>
          </Tabs.Content>

          <Tabs.Content value="grouch" style={{ padding: '12px 16px 8px 16px' }}>
            <Text size="2">Oscar the Grouch declines the award and returns to his bin.</Text>
          </Tabs.Content>

          <Tabs.Content value="peterson" style={{ padding: '12px 16px 8px 16px' }}>
            <Text size="2">Oscar Peterson plays the acceptance speech instead of giving one.</Text>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    );
  },

  'Oscar’s acceptance speech'() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 520 }}>
        <Blockquote>
          I have nothing to declare except my genius — and this Oscar. — <Strong>Oscar Wilde</Strong>
        </Blockquote>
        <Separator size="4" />
        <Text size="2">
          The trophy is <Em>technically</Em> called an Academy Award, but everyone calls it an{' '}
          <Code variant="soft">Oscar</Code>.
        </Text>
      </div>
    );
  },

  'Oscar’s shortcuts'() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <Tooltip content="Give Oscar the award">
          <Button variant="solid" color="amber">
            <Trophy size={16} />
            Award Oscar
          </Button>
        </Tooltip>
        <Text size="2" color="gray">
          or press <Kbd size="2">⌘ + O</Kbd>
        </Text>
      </div>
    );
  },

  'No Oscars found'() {
    return (
      <Empty.Root>
        <Empty.Header>
          <Empty.Media>
            <Cat size={24} />
          </Empty.Media>
          <Empty.Title>No Oscars found</Empty.Title>
          <Empty.Description>
            Nobody named Oscar has been nominated in this category yet. Try another category, or nominate an Oscar
            yourself.
          </Empty.Description>
        </Empty.Header>
        <Empty.Actions style={{ display: 'flex', flexDirection: 'row' }}>
          <Button variant="surface">Clear filters</Button>
          <Button variant="solid">Nominate Oscar</Button>
        </Empty.Actions>
      </Empty.Root>
    );
  },
};
