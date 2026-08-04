import React from 'react';
import { Badge, badgePropDefs } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/badge.demo.tsx` before demos folded into examples. */
  Overview() {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="solid" color="blue">
          Solid
        </Badge>
        <Badge variant="soft" color="green">
          Soft
        </Badge>
        <Badge variant="surface" color="orange">
          Surface
        </Badge>
        <Badge variant="outline" color="rose">
          Outline
        </Badge>
        <Badge size="2" color="purple">
          Size 2
        </Badge>
      </div>
    );
  },

  'Semantic color'() {
    const args = {
      size: badgePropDefs.size.default,
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <Badge {...args} color="info">
          Info
        </Badge>
        <Badge {...args} color="success">
          Success
        </Badge>
        <Badge {...args} color="warning">
          Warning
        </Badge>
        <Badge {...args} color="danger">
          Danger
        </Badge>
      </div>
    );
  },

  'High Contrast'() {
    const args = {
      children: 'Badge',
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Badge {...args} highContrast={false} variant="solid" />
          <Badge {...args} highContrast={false} variant="soft" />
          <Badge {...args} highContrast={false} variant="outline" />
          <Badge {...args} highContrast={false} variant="surface" />
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Badge {...args} variant="solid" highContrast />
          <Badge {...args} variant="soft" highContrast />
          <Badge {...args} variant="outline" highContrast />
          <Badge {...args} variant="surface" highContrast />
        </div>
      </div>
    );
  },
};
