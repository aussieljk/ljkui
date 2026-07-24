import React from 'react';
import { Typography } from '@aussieljk/frosted';

const { Blockquote } = Typography;

function BlockquoteFixture() {
  const children = 'I love how we have the freedom to explore skeuomorphism';
  const props = {};
  return <Blockquote {...props}>{children}</Blockquote>;
}

export const examples = { Example: BlockquoteFixture };
