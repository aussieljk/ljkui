import React from 'react';
import { Container, Card, Typography } from 'ljkui';

export const examples = {
  Size() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {(['1', '2', '3', '4'] as const).map((size) => (
          <Container key={size} size={size}>
            <Card variant="soft">
              <Typography.Text size="2">Container size {size}</Typography.Text>
            </Card>
          </Container>
        ))}
      </div>
    );
  },

  Align() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {(['left', 'center', 'right'] as const).map((align) => (
          <Container key={align} size="1" align={align}>
            <Card variant="soft">
              <Typography.Text size="2">Aligned {align}</Typography.Text>
            </Card>
          </Container>
        ))}
      </div>
    );
  },

  'As another element'() {
    return (
      <Container size="2" render={<main />}>
        <Typography.Text>
          Use the <Typography.Code>render</Typography.Code> prop to render the container as a{' '}
          <Typography.Code>&lt;main&gt;</Typography.Code> or <Typography.Code>&lt;section&gt;</Typography.Code>.
        </Typography.Text>
      </Container>
    );
  },
};
