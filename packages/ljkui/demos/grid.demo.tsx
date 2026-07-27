import React from 'react';
import { Grid, Typography } from 'ljkui';

const cell: React.CSSProperties = {
  minWidth: 48,
  padding: 8,
  display: 'grid',
  placeItems: 'center',
  borderRadius: 8,
  background: 'var(--accent-alpha-200)',
};

export default function GridDemo() {
  return (
    <Grid.Root horizontalSpacing={8} verticalSpacing={8}>
      <Grid.Root.Row>
        <div style={cell}>1</div>
        <div style={cell}>2</div>
        <div style={cell}>3</div>
      </Grid.Root.Row>
      <Grid.Root.Row>
        <div style={cell}>4</div>
        <div style={cell}>5</div>
      </Grid.Root.Row>
      <Typography.Text size="2" color="gray">
        Spans every column
      </Typography.Text>
    </Grid.Root>
  );
}
