import React from 'react';
import { Badge, Overlay } from 'ljkui';

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

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'fullscreen' } as const;

export const examples = {
  Overview() {
    return (
      <Overlay.Root alignment="topTrailing">
        <div className="size-40 rounded-2xl bg-accent-alpha-200" />
        <Overlay.Root.Content>
          <Badge color="red" variant="solid" className="m-2">
            99+
          </Badge>
        </Overlay.Root.Content>
      </Overlay.Root>
    );
  },
  Example: OverlayFixture,
};
