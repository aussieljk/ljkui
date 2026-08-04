import BlockquoteOverview from './demos/blockquote.demo';
import React from 'react';
import { Typography } from 'ljkui';

const { Blockquote } = Typography;

function BlockquoteFixture() {
  const children = 'I love how we have the freedom to explore skeuomorphism';
  const props = {};
  return <Blockquote {...props}>{children}</Blockquote>;
}

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Typography', layout: 'centered' } as const;

export const examples = { Overview: BlockquoteOverview, Example: BlockquoteFixture };
