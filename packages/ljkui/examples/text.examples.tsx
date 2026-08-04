import TextOverview from './demos/text.demo';
import React from 'react';
import { Checkbox, Input, Kbd, Link, Typography } from 'ljkui';

const { Code, Em, Text } = Typography;

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Typography', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/text.demo.tsx` before demos folded into examples. */
  Overview: TextOverview,

  Size() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Text {...args} size="0">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} size="1">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} size="2">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} size="3">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} size="4">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} size="5">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} size="6">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} size="7">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} size="8">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} size="9">
          The quick brown fox jumps over the lazy dog.
        </Text>
      </div>
    );
  },

  Weight() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Text {...args} weight="light">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} weight="regular">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} weight="medium">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} weight="semi-bold">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} weight="bold">
          The quick brown fox jumps over the lazy dog.
        </Text>
      </div>
    );
  },

  Color() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Text {...args} color="indigo">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} color="cyan">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} color="orange">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} color="rose">
          The quick brown fox jumps over the lazy dog.
        </Text>
      </div>
    );
  },

  Align() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 500 }}>
        <Text {...args} align="left">
          Left-aligned
        </Text>
        <Text {...args} align="center">
          Center-aligned
        </Text>
        <Text {...args} align="right">
          Right-aligned
        </Text>
      </div>
    );
  },

  Trim() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Text
          {...args}
          trim="normal"
          style={{
            background: 'var(--gray-alpha-50)',
            borderTop: '1px dashed var(--gray-alpha-500)',
            borderBottom: '1px dashed var(--gray-alpha-500)',
          }}
        >
          Without trim
        </Text>
        <Text
          {...args}
          trim="both"
          style={{
            background: 'var(--gray-alpha-50)',
            borderTop: '1px dashed var(--gray-alpha-500)',
            borderBottom: '1px dashed var(--gray-alpha-500)',
          }}
        >
          With trim
        </Text>
      </div>
    );
  },

  Formatting() {
    const args = {};
    return (
      <Text size="5" {...args}>
        Look, such a helpful <Link href="#">link</Link>, an <Em>italic emphasis</Em>, a piece of computer{' '}
        <Code>code</Code>, and even a hotkey combination <Kbd>⇧⌘A</Kbd> within the text.
      </Text>
    );
  },

  'With form controls'() {
    return (
      <div style={{ maxWidth: 300 }}>
        <Text size="3" render={<div />} style={{ display: 'flex', gap: 12 }}>
          <Checkbox defaultChecked /> Composing Text with a form control like Checkbox, RadioGroup, or Switch
          automatically centers the control with the first line of text, even when the text is multi-line.
        </Text>
      </div>
    );
  },

  'High Contrast'() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Text {...args} highContrast color="indigo">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} highContrast color="cyan">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} highContrast color="orange">
          The quick brown fox jumps over the lazy dog.
        </Text>
        <Text {...args} highContrast color="rose">
          The quick brown fox jumps over the lazy dog.
        </Text>
      </div>
    );
  },

  'As Form Label'() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 300 }}>
        <Text size="2" weight="medium" render={<button type="button" />}>
          as button
        </Text>
        {/* Using the render prop to render Text as a label element */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Text size="2" weight="medium" render={<label htmlFor="email-input" />}>
            Email address
          </Text>
          <Input.Root>
            <Input.Control id="email-input" placeholder="Enter your email" />
          </Input.Root>
        </div>

        {/* Another example with required indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Text size="2" weight="medium" render={<label htmlFor="password-input" />}>
            Password <Text color="red">*</Text>
          </Text>
          <Input.Root>
            <Input.Control id="password-input" type="password" placeholder="Enter your password" />
          </Input.Root>
        </div>

        {/* Using render prop with htmlFor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Text size="2" weight="medium" render={<label htmlFor="username-input" />}>
            Username
          </Text>
          <Input.Root>
            <Input.Control id="username-input" placeholder="Enter your username" />
          </Input.Root>
        </div>
      </div>
    );
  },
};
