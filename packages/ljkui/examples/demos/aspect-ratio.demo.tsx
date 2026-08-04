import React from 'react';
import { AspectRatio, Card, Typography } from 'ljkui';

export default function AspectRatioDemo() {
  return (
    <Card style={{ width: 300 }}>
      <AspectRatio ratio={16 / 9}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--gray-alpha-200)',
          }}
        >
          <Typography.Text size="2" color="gray">
            16 / 9
          </Typography.Text>
        </div>
      </AspectRatio>
    </Card>
  );
}
