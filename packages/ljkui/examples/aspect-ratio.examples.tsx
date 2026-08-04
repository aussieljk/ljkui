import AspectRatioOverview from './demos/aspect-ratio.demo';
import React from 'react';
import { AspectRatio, Card, HStack, Typography } from 'ljkui';

const Placeholder = ({ label }: { label: string }) => (
  <HStack
    alignment="center"
    style={{ width: '100%', height: '100%', background: 'var(--gray-alpha-200)', justifyContent: 'center' }}
  >
    <Typography.Text size="2" color="gray">
      {label}
    </Typography.Text>
  </HStack>
);

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Layout', layout: 'padded' } as const;

export const examples = {
  /** The canonical usage — was `demos/aspect-ratio.demo.tsx` before demos folded into examples. */
  Overview: AspectRatioOverview,

  Default: (
    <Card style={{ width: 320 }}>
      <AspectRatio ratio={16 / 9}>
        <Placeholder label="16 / 9" />
      </AspectRatio>
    </Card>
  ),

  Square: (
    <Card style={{ width: 240 }}>
      <AspectRatio>
        <Placeholder label="1 / 1" />
      </AspectRatio>
    </Card>
  ),

  Portrait: (
    <Card style={{ width: 240 }}>
      <AspectRatio ratio={3 / 4}>
        <Placeholder label="3 / 4" />
      </AspectRatio>
    </Card>
  ),

  Preset: (
    <Card style={{ width: 320 }}>
      <AspectRatio ratio="video">
        <Placeholder label="ratio='video'" />
      </AspectRatio>
    </Card>
  ),
};
