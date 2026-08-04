import React from 'react';
import { Container, Card, Typography } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Layout', layout: 'centered' } as const;

export const examples = {
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
