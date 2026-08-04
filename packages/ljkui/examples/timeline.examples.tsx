import React from 'react';
import { Timeline } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'centered' } as const;

export const examples = {
  Default() {
    return (
      <div style={{ width: 340 }}>
        <Timeline.Root>
          <Timeline.Item time="09:00" title="Order placed" />
          <Timeline.Item time="10:15" title="Payment confirmed" color="green" />
          <Timeline.Item time="12:30" title="Shipped" color="blue">
            Package left the Sydney warehouse.
          </Timeline.Item>
          <Timeline.Item time="—" title="Out for delivery" color="gray" />
        </Timeline.Root>
      </div>
    );
  },

  Size() {
    const items = (
      <>
        <Timeline.Item time="Mon" title="Kickoff" />
        <Timeline.Item time="Wed" title="Design review" color="violet" />
        <Timeline.Item time="Fri" title="Ship" color="green" />
      </>
    );
    return (
      <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
        <Timeline.Root size="1">{items}</Timeline.Root>
        <Timeline.Root size="2">{items}</Timeline.Root>
        <Timeline.Root size="3">{items}</Timeline.Root>
      </div>
    );
  },
};
