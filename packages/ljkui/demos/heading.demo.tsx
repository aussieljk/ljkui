import React from 'react';
import { Typography } from 'ljkui';

export default function HeadingDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Typography.Heading size="3">The quick brown fox</Typography.Heading>
      <Typography.Heading size="5">The quick brown fox</Typography.Heading>
      <Typography.Heading size="7">The quick brown fox</Typography.Heading>
      <Typography.Heading size="5" weight="medium">
        Medium weight
      </Typography.Heading>
      <Typography.Heading size="5" color="indigo">
        Indigo heading
      </Typography.Heading>
    </div>
  );
}
