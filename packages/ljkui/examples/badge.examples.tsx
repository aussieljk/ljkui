import React from 'react';
import { Badge, badgePropDefs } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'centered' } as const;

export const examples = {
  Size() {
    const args = {
      children: 'Badge',
      size: badgePropDefs.size.default,
      variant: badgePropDefs.variant.default,
      color: badgePropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <Badge {...args} size="2" />
        <Badge {...args} size="1" />
      </div>
    );
  },

  Variant() {
    const args = {
      children: 'Badge',
      size: badgePropDefs.size.default,
      color: badgePropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <Badge {...args} variant="solid" />
        <Badge {...args} variant="soft" />
        <Badge {...args} variant="outline" />
        <Badge {...args} variant="surface" />
      </div>
    );
  },

  Color() {
    const args = {
      children: 'Badge',
      size: badgePropDefs.size.default,
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <Badge {...args} color="indigo" />
        <Badge {...args} color="cyan" />
        <Badge {...args} color="orange" />
        <Badge {...args} color="rose" />
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
