import React from 'react';
import { Section, Card, Typography } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Layout', layout: 'centered' } as const;

export const examples = {
  Size() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {(['1', '2', '3', '4'] as const).map((size) => (
          <Card key={size} variant="soft">
            <Section size={size} style={{ background: 'var(--accent-alpha-200)' }}>
              <Typography.Text size="2">Section size {size}</Typography.Text>
            </Section>
          </Card>
        ))}
      </div>
    );
  },

  'As another element'() {
    return (
      <Section size="2" render={<section />}>
        <Typography.Text>
          Use the <Typography.Code>render</Typography.Code> prop to render the section as a{' '}
          <Typography.Code>&lt;section&gt;</Typography.Code> with vertical padding rhythm.
        </Typography.Text>
      </Section>
    );
  },
};
