import React from 'react';
import { Typography } from '@aussieljk/frosted';

const { Strong, Text } = Typography;

function StrongFixture() {
  const args = {};
  return (
    <Text>
      The most important thing to remember is, <Strong {...args}>stay positive</Strong>.
    </Text>
  );
}

export const examples = { Example: StrongFixture };
