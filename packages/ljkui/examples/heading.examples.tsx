import React from 'react';
import { Typography } from 'ljkui';

const { Heading } = Typography;

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Typography', layout: 'centered', enumerate: 'Typography.Heading' } as const;

export const examples = {
  /** The canonical usage — was `demos/heading.demo.tsx` before demos folded into examples. */
  Overview() {
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
  },

  Align() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 500 }}>
        <Heading {...args} align="left">
          Left-aligned
        </Heading>
        <Heading {...args} align="center">
          Center-aligned
        </Heading>
        <Heading {...args} align="right">
          Right-aligned
        </Heading>
      </div>
    );
  },

  Trim() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Heading
          {...args}
          trim="normal"
          style={{
            background: 'var(--gray-alpha-50)',
            borderTop: '1px dashed var(--gray-alpha-500)',
            borderBottom: '1px dashed var(--gray-alpha-500)',
          }}
        >
          Without trim
        </Heading>
        <Heading
          {...args}
          trim="both"
          style={{
            background: 'var(--gray-alpha-50)',
            borderTop: '1px dashed var(--gray-alpha-500)',
            borderBottom: '1px dashed var(--gray-alpha-500)',
          }}
        >
          With trim
        </Heading>
      </div>
    );
  },

  'High Contrast'() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Heading {...args} highContrast color="indigo">
          The quick brown fox jumps over the lazy dog.
        </Heading>
        <Heading {...args} highContrast color="cyan">
          The quick brown fox jumps over the lazy dog.
        </Heading>
        <Heading {...args} highContrast color="orange">
          The quick brown fox jumps over the lazy dog.
        </Heading>
        <Heading {...args} highContrast color="rose">
          The quick brown fox jumps over the lazy dog.
        </Heading>
      </div>
    );
  },
};
