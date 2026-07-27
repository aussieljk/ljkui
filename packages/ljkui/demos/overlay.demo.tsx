import React from 'react';
import { Badge, Overlay } from 'ljkui';

export default function OverlayDemo() {
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
}
