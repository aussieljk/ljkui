import React from 'react';
import { Typography } from 'ljkui';

const { Quote, Text } = Typography;

function QuoteFixture() {
  const args = {};
  return (
    <Text>
      His famous quote, <Quote {...args}>Styles come and go. Good design is a language, not a style</Quote>, elegantly
      summs up Massimo’s philosophy of design.
    </Text>
  );
}

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Typography', layout: 'centered' } as const;

export const examples = {
  Overview() {
    return (
      <Typography.Text size="3">
        His famous quote,{' '}
        <Typography.Quote>Styles come and go. Good design is a language, not a style</Typography.Quote>, elegantly sums
        up Massimo’s philosophy of design.
      </Typography.Text>
    );
  },
  Example: QuoteFixture,
};
