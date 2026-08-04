import StrongOverview from './demos/strong.demo';
import React from 'react';
import { Typography } from 'ljkui';

const { Strong, Text } = Typography;

function StrongFixture() {
  const args = {};
  return (
    <Text>
      The most important thing to remember is, <Strong {...args}>stay positive</Strong>.
    </Text>
  );
}

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Typography', layout: 'centered' } as const;

export const examples = { Overview: StrongOverview, Example: StrongFixture };
