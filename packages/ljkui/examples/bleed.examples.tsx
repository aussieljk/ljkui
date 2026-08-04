import React from 'react';
import { Bleed, Card, Typography } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Layout', layout: 'centered' } as const;

export const examples = {
  Example() {
    return (
      <Card size="2" style={{ maxWidth: 280 }}>
        <Bleed side="x" size="3">
          <div style={{ height: 96, background: 'var(--accent-alpha-200)' }} />
        </Bleed>
        <Typography.Text size="2">
          The tinted area bleeds out to the card&apos;s edges; this text keeps the normal padding.
        </Typography.Text>
      </Card>
    );
  },

  Side() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {(['all', 'x', 'y', 'top', 'bottom'] as const).map((side) => (
          <Card key={side} size="2" style={{ maxWidth: 280 }}>
            <Bleed side={side} size="2">
              <div style={{ height: 64, background: 'var(--accent-alpha-200)' }} />
            </Bleed>
            <Typography.Text size="2">side={side}</Typography.Text>
          </Card>
        ))}
      </div>
    );
  },
};
