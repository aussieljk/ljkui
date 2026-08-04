import EmOverview from './demos/em.demo';
import React from 'react';
import { Typography } from 'ljkui';

const { Em, Text } = Typography;

function EmFixture() {
  const args = {
    children: 'Em',
  };
  return (
    <Text>
      We <Em {...args}>had</Em> to do something about it.
    </Text>
  );
}

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Typography', layout: 'centered' } as const;

export const examples = { Overview: EmOverview, Example: EmFixture };
