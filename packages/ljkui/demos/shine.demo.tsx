import React from 'react';
import { Badge, Shine, Typography } from 'ljkui';

export default function ShineDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Shine puffyness="2">
        <Typography.Text size="9" weight="bold">
          Shine ✨
        </Typography.Text>
      </Shine>
      <Shine puffyness="1">
        <Badge size="2" color="yellow">
          Premium
        </Badge>
      </Shine>
    </div>
  );
}
