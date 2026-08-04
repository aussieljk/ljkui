import ToggleOverview from './demos/toggle.demo';
import React from 'react';
import { HStack, Toggle, Typography } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/toggle.demo.tsx` before demos folded into examples. */
  Overview: ToggleOverview,

  Variants: (
    <HStack spacing={12} alignment="center">
      {(['solid', 'soft', 'surface', 'ghost'] as const).map((variant) => (
        <Toggle key={variant} variant={variant} defaultPressed>
          {variant}
        </Toggle>
      ))}
    </HStack>
  ),

  Sizes: (
    <HStack spacing={12} alignment="center">
      {(['1', '2', '3', '4'] as const).map((size) => (
        <Toggle key={size} size={size} defaultPressed>
          Size {size}
        </Toggle>
      ))}
    </HStack>
  ),

  Controlled: (() => {
    const Controlled = () => {
      const [pressed, setPressed] = React.useState(false);
      return (
        <HStack spacing={12} alignment="center">
          <Toggle pressed={pressed} onPressedChange={setPressed}>
            Mute notifications
          </Toggle>
          <Typography.Text size="2" color="gray">
            {pressed ? 'Muted' : 'Unmuted'}
          </Typography.Text>
        </HStack>
      );
    };
    return <Controlled />;
  })(),

  Disabled: (
    <HStack spacing={12} alignment="center">
      <Toggle disabled>Off</Toggle>
      <Toggle disabled defaultPressed>
        On
      </Toggle>
    </HStack>
  ),
};
