import React from 'react';
import { Grid, Typography } from 'ljkui';

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      minWidth: 48,
      padding: 8,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 8,
      background: 'var(--accent-alpha-200)',
    }}
  >
    {children}
  </div>
);

function GridFixture() {
  const props = { horizontalSpacing: 8, verticalSpacing: 8 };
  return (
    <Grid.Root {...props}>
      <Grid.Root.Row>
        <Cell>1</Cell>
        <Cell>2</Cell>
        <Cell>3</Cell>
      </Grid.Root.Row>
      <Grid.Root.Row>
        <Cell>4</Cell>
        <Cell>5</Cell>
      </Grid.Root.Row>
      <Typography.Text size="2" color="gray">
        Spans every column
      </Typography.Text>
    </Grid.Root>
  );
}

function UniformColumnsFixture() {
  return (
    <Grid.Root columns={3} gap={8}>
      <Grid.Root.Item colSpan={2}>
        <Cell>span 2</Cell>
      </Grid.Root.Item>
      <Cell>2</Cell>
      <Cell>3</Cell>
      <Cell>4</Cell>
      <Cell>5</Cell>
    </Grid.Root>
  );
}

export const examples = { Example: GridFixture, UniformColumns: UniformColumnsFixture };
