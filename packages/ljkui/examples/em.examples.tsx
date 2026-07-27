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

export const examples = { Example: EmFixture };
