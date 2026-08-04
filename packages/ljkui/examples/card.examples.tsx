import React from 'react';
import { Avatar, Card, Typography } from 'ljkui';

const CardContentExample = () => (
  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
    <Avatar size="3" fallback="IM" color="indigo" />
    <div>
      <Typography.Text render={<div />} size="2" weight="bold">
        Ilya Miskov
      </Typography.Text>
      <Typography.Text render={<div />} size="2" color="gray">
        I love how we have the freedom to explore skeuomorphism
      </Typography.Text>
    </div>
  </div>
);

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/card.demo.tsx` before demos folded into examples. */
  Overview() {
    return (
      <Card size="2" variant="surface" className="max-w-80">
        <div className="flex items-center gap-3">
          <Avatar size="3" fallback="AF" color="blue" />
          <div>
            <Typography.Text render={<div />} size="2" weight="bold">
              ljkui
            </Typography.Text>
            <Typography.Text render={<div />} size="2" color="gray">
              A design system for building products
            </Typography.Text>
          </div>
        </div>
      </Card>
    );
  },

  'Inset Content'() {
    const args = {};
    return (
      <Card size="2" style={{ maxWidth: 240, padding: 0 }} {...args}>
        <img
          src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          alt="Bold typography"
          style={{
            display: 'block',
            objectFit: 'cover',
            width: '100%',
            height: 140,
            backgroundColor: 'var(--gray-300)',
          }}
        />

        <div style={{ padding: 'var( --card-padding)' }}>
          <Typography.Text render={<p />} size="3">
            This is a really nice image description.
          </Typography.Text>
        </div>
      </Card>
    );
  },

  Media() {
    return (
      <Card size="2" style={{ width: 300 }}>
        <Card.Media>
          <img
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="Bold typography"
            style={{ height: 160, backgroundColor: 'var(--gray-300)' }}
          />
        </Card.Media>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <Typography.Text render={<div />} size="3" weight="bold">
            Bold typography
          </Typography.Text>
          <Typography.Text render={<div />} size="2" color="gray">
            Media bleeds to the card edges and clips to the inner radius.
          </Typography.Text>
        </div>
      </Card>
    );
  },

  'As another element'() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div>
          <Typography.Text>
            Use the <Typography.Code>render</Typography.Code> prop to render the card as a link or a button. This prop
            adds styles for the interactive states, like hover and focus.
          </Typography.Text>
        </div>
        <div>
          <Card {...args} render={<a href="#" />} style={{ maxWidth: 350 }}>
            <CardContentExample />
          </Card>
        </div>
      </div>
    );
  },
};
