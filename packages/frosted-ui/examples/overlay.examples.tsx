import React from 'react';
import { Badge, Overlay } from '@aussieljk/frosted';

function OverlayFixture() {
  const props = { alignment: 'topTrailing' } as const;
  return (
    <Overlay.Root {...props}>
      <div style={{ width: 160, height: 160, borderRadius: 16, background: 'var(--accent-alpha-200)' }} />
      <Overlay.Root.Content>
        <Badge color="red" style={{ margin: 8 }}>
          99+
        </Badge>
      </Overlay.Root.Content>
    </Overlay.Root>
  );
}

export const examples = { Example: OverlayFixture };
