import React from 'react';
import { Link, linkPropDefs } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Typography', layout: 'centered' } as const;

export const examples = {
  Size() {
    const args = {
      children: 'ljkui',
      href: 'https://ljkui.localhost/',
      target: '_blank',
      color: linkPropDefs.color.default,
      size: linkPropDefs.size.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Link {...args} size="0" />
        <Link {...args} size="1" />
        <Link {...args} size="2" />
        <Link {...args} size="3" />
        <Link {...args} size="4" />
        <Link {...args} size="5" />
        <Link {...args} size="6" />
        <Link {...args} size="7" />
        <Link {...args} size="8" />
        <Link {...args} size="9" />
      </div>
    );
  },

  Color() {
    const args = {
      children: 'ljkui',
      href: 'https://ljkui.localhost/',
      target: '_blank',
      color: linkPropDefs.color.default,
      size: linkPropDefs.size.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 'var(--space-2)' }}>
        <Link {...args} color="indigo" />
        <Link {...args} color="cyan" />
        <Link {...args} color="orange" />
        <Link {...args} color="rose" />
      </div>
    );
  },

  Underline() {
    const args = {
      children: 'ljkui',
      href: 'https://ljkui.localhost/',
      target: '_blank',
      color: linkPropDefs.color.default,
      size: linkPropDefs.size.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 'var(--space-2)' }}>
        <Link {...args} underline="auto" />
        <Link {...args} underline="hover" />
        <Link {...args} underline="always" />
      </div>
    );
  },

  'High Contrast'() {
    const args = {
      children: 'ljkui',
      href: 'https://ljkui.localhost/',
      target: '_blank',
      color: linkPropDefs.color.default,
      size: linkPropDefs.size.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link {...args} />
        <Link {...args} highContrast />
      </div>
    );
  },

  'As Button'() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 16 }}>
        {/* Link rendered as a button - useful for actions that look like links */}
        <Link render={<button type="button" onClick={() => alert('Button clicked!')} />} size="2">
          Click me (I&apos;m a button!)
        </Link>
      </div>
    );
  },
};
