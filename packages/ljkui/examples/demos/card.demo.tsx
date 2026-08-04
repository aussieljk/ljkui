import React from 'react';
import { Avatar, Card, Typography } from 'ljkui';

export default function CardDemo() {
  return (
    <Card size="2" variant="surface" className="max-w-80">
      <div className="flex items-center gap-3">
        <Avatar size="3" fallback="AF" color="blue" />
        <div>
          <Typography.Text render={<div />} size="2" weight="bold">
            ljkui
          </Typography.Text>
          <Typography.Text render={<div />} size="2" color="gray">
            A design system for building products
          </Typography.Text>
        </div>
      </div>
    </Card>
  );
}
