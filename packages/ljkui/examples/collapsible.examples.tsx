import CollapsibleOverview from './demos/collapsible.demo';
import React from 'react';
import { Button, Collapsible, Typography } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Layout', layout: 'padded' } as const;

export const examples = {
  /** The canonical usage — was `demos/collapsible.demo.tsx` before demos folded into examples. */
  Overview: CollapsibleOverview,

  Default: (
    <Collapsible.Root>
      <Collapsible.Trigger render={<Button variant="ghost" />}>Advanced options</Collapsible.Trigger>
      <Collapsible.Content>
        <Typography.Text size="2" color="gray">
          Requests are retried three times before the job is marked as failed.
        </Typography.Text>
      </Collapsible.Content>
    </Collapsible.Root>
  ),

  'Open by default': (
    <Collapsible.Root defaultOpen>
      <Collapsible.Trigger render={<Button variant="ghost" />}>Delivery details</Collapsible.Trigger>
      <Collapsible.Content>
        <Typography.Text size="2" color="gray">
          Ships in 2–3 business days.
        </Typography.Text>
      </Collapsible.Content>
    </Collapsible.Root>
  ),

  Disabled: (
    <Collapsible.Root disabled>
      <Collapsible.Trigger render={<Button variant="ghost" />}>Unavailable</Collapsible.Trigger>
      <Collapsible.Content>
        <Typography.Text size="2">Never shown.</Typography.Text>
      </Collapsible.Content>
    </Collapsible.Root>
  ),
};
