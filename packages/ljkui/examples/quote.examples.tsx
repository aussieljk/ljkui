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

export const examples = { Example: QuoteFixture };
