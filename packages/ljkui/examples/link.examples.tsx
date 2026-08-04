import React from 'react';
import { Link, linkPropDefs, Typography } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Typography', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/link.demo.tsx` before demos folded into examples. */
  Overview() {
    return (
      <div className="flex flex-col gap-2">
        <Typography.Text size="3">
          Read the <Link href="#">documentation</Link> to get started.
        </Typography.Text>
        <div className="flex items-center gap-4">
          <Link href="#" underline="auto">
            Auto underline
          </Link>
          <Link href="#" underline="hover">
            Hover underline
          </Link>
          <Link href="#" underline="always">
            Always underlined
          </Link>
          <Link href="#" color="orange">
            Orange link
          </Link>
        </div>
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
