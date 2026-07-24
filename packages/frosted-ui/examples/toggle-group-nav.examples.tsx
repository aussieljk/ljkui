import React from 'react';
import { ToggleGroupNav, Typography } from '@aussieljk/frosted';

export const examples = {
  Default() {
    const args = {};
    return (
      <div style={{ width: 600 }}>
        <ToggleGroupNav.Root {...args}>
          <ToggleGroupNav.Link active={true} href="#">
            Account
          </ToggleGroupNav.Link>
          <ToggleGroupNav.Link href="#">Documents</ToggleGroupNav.Link>
          <ToggleGroupNav.Link href="#">Settings</ToggleGroupNav.Link>
        </ToggleGroupNav.Root>
      </div>
    );
  },

  'Render Prop (Client-Side Routing)'() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 400 }}>
        <Typography.Text>
          Use the <Typography.Code>render</Typography.Code> prop to integrate with your framework&apos;s router for
          client-side navigation.
        </Typography.Text>
        <ToggleGroupNav.Root {...args}>
          <ToggleGroupNav.Link active render={<a href="/account" />}>
            Account
          </ToggleGroupNav.Link>
          <ToggleGroupNav.Link render={<a href="/documents" />}>Documents</ToggleGroupNav.Link>
          <ToggleGroupNav.Link render={<a href="/settings" />}>Settings</ToggleGroupNav.Link>
        </ToggleGroupNav.Root>
        <Typography.Text size="1" color="gray">
          In a real app, replace <Typography.Code>{'<a />'}</Typography.Code> with your router&apos;s Link component,
          e.g. <Typography.Code>{'<NextLink href="/account" />'}</Typography.Code> for Next.js.
        </Typography.Text>
      </div>
    );
  },
};
