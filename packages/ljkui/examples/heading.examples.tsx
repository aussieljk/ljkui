import HeadingOverview from './demos/heading.demo';
import React from 'react';
import { Typography } from 'ljkui';

const { Heading } = Typography;

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Typography', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/heading.demo.tsx` before demos folded into examples. */
  Overview: HeadingOverview,

  Size() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Heading {...args} size="0">
          The quick brown fox jumps over the lazy dog.
        </Heading>
        <Heading {...args} size="1">
          The quick brown fox jumps over the lazy dog.
        </Heading>
        <Heading {...args} size="2">
          The quick brown fox jumps over the lazy dog.
        </Heading>
        <Heading {...args} size="3">
          The quick brown fox jumps over the lazy dog.
        </Heading>
        <Heading {...args} size="4">
          The quick brown fox jumps over the lazy dog.
        </Heading>
        <Heading {...args} size="5">
          The quick brown fox jumps over the lazy dog.
        </Heading>
        <Heading {...args} size="6">
          The quick brown fox jumps over the lazy dog.
        </Heading>
        <Heading {...args} size="7">
          The quick brown fox jumps over the lazy dog.
        </Heading>
        <Heading {...args} size="8">
          The quick brown fox jumps over the lazy dog.
        </Heading>
        <Heading {...args} size="9">
          The quick brown fox jumps over the lazy dog.
        </Heading>
      </div>
    );
  },

  Color() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Heading {...args} color="indigo">
          The quick brown fox jumps over the lazy dog.
        </Heading>
        <Heading {...args} color="cyan">
          The quick brown fox jumps over the lazy dog.
        </Heading>
        <Heading {...args} color="orange">
          The quick brown fox jumps over the lazy dog.
        </Heading>
        <Heading {...args} color="rose">
          The quick brown fox jumps over the lazy dog.
        </Heading>
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
