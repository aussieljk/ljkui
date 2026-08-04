import React from 'react';
import { Card, Inset, Typography } from 'ljkui';

function InsetFixture() {
  const props = { side: 'top', pb: 'current' } as const;
  return (
    <Card size="2" style={{ maxWidth: 280 }}>
      <Inset {...props}>
        <div style={{ height: 96, background: 'var(--accent-alpha-200)' }} />
      </Inset>
      <Typography.Text size="2">
        The tinted area bleeds to the card&apos;s edges; this text keeps the normal padding.
      </Typography.Text>
    </Card>
  );
}

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Layout', layout: 'padded' } as const;

export const examples = {
  Overview() {
    return (
      <Card size="2" className="max-w-70">
        <Inset side="top" pb="current">
          <div className="h-24 bg-accent-alpha-200" />
        </Inset>
        <Typography.Text size="2">
          The tinted area bleeds to the card&apos;s edges; this text keeps the normal padding.
        </Typography.Text>
      </Card>
    );
  },
  Example: InsetFixture,
};
