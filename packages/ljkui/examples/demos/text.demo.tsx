import React from 'react';
import { Typography } from 'ljkui';

export default function TextDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Typography.Text size="1">The quick brown fox jumps over the lazy dog.</Typography.Text>
      <Typography.Text size="2">The quick brown fox jumps over the lazy dog.</Typography.Text>
      <Typography.Text size="3">The quick brown fox jumps over the lazy dog.</Typography.Text>
      <Typography.Text size="4">The quick brown fox jumps over the lazy dog.</Typography.Text>
      <Typography.Text size="3" weight="medium">
        Medium weight
      </Typography.Text>
      <Typography.Text size="3" weight="bold">
        Bold weight
      </Typography.Text>
      <Typography.Text size="3" color="indigo">
        Indigo text
      </Typography.Text>
    </div>
  );
}
