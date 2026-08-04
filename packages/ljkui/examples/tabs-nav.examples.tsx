import React from 'react';
import { TabsNav, Typography, tabsNavPropDefs } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'padded' } as const;

export const examples = {
  Size() {
    const args = {
      color: tabsNavPropDefs.color.default,
      highContrast: tabsNavPropDefs.highContrast.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', width: 600 }}>
        <TabsNav.Root {...args} size="1">
          <TabsNav.Link active href="#">
            Account
          </TabsNav.Link>
          <TabsNav.Link href="#">Documents</TabsNav.Link>
          <TabsNav.Link href="#">Settings</TabsNav.Link>
        </TabsNav.Root>

        <TabsNav.Root {...args} size="2">
          <TabsNav.Link href="#">Overview</TabsNav.Link>
          <TabsNav.Link active href="#">
            Analytics
          </TabsNav.Link>
          <TabsNav.Link href="#">Reports</TabsNav.Link>
        </TabsNav.Root>
      </div>
    );
  },

  Color() {
    const args = {
      size: tabsNavPropDefs.size.default,
      highContrast: tabsNavPropDefs.highContrast.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', width: 600 }}>
        <TabsNav.Root {...args} color="indigo">
          <TabsNav.Link active={true} href="#">
            Account
          </TabsNav.Link>
          <TabsNav.Link href="#">Documents</TabsNav.Link>
          <TabsNav.Link href="#">Settings</TabsNav.Link>
        </TabsNav.Root>

        <TabsNav.Root {...args} color="cyan">
          <TabsNav.Link href="#">Overview</TabsNav.Link>
          <TabsNav.Link active href="#">
            Analytics
          </TabsNav.Link>
          <TabsNav.Link href="#">Reports</TabsNav.Link>
        </TabsNav.Root>

        <TabsNav.Root {...args} color="rose">
          <TabsNav.Link active href="#">
            One
          </TabsNav.Link>
          <TabsNav.Link href="#">Two</TabsNav.Link>
        </TabsNav.Root>
      </div>
    );
  },

  'High Contrast'() {
    const args = {
      size: tabsNavPropDefs.size.default,
      color: tabsNavPropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', width: 600 }}>
        <TabsNav.Root {...args} highContrast={false}>
          <TabsNav.Link active href="#">
            Account
          </TabsNav.Link>
          <TabsNav.Link href="#">Documents</TabsNav.Link>
          <TabsNav.Link href="#">Settings</TabsNav.Link>
        </TabsNav.Root>

        <TabsNav.Root {...args} highContrast>
          <TabsNav.Link href="#">Overview</TabsNav.Link>
          <TabsNav.Link active href="#">
            Analytics
          </TabsNav.Link>
          <TabsNav.Link href="#">Reports</TabsNav.Link>
        </TabsNav.Root>
      </div>
    );
  },

  'Render Prop (Client-Side Routing)'() {
    const args = {
      size: tabsNavPropDefs.size.default,
      color: tabsNavPropDefs.color.default,
      highContrast: tabsNavPropDefs.highContrast.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 600 }}>
        <Typography.Text>
          Use the <Typography.Code>render</Typography.Code> prop to integrate with your framework&apos;s router for
          client-side navigation. This is useful for frameworks like Next.js, React Router, or Remix.
        </Typography.Text>
        <TabsNav.Root {...args}>
          <TabsNav.Link render={<a href="/account" />}>Account</TabsNav.Link>
          <TabsNav.Link render={<a href="/documents" />}>Documents</TabsNav.Link>
          <TabsNav.Link
            active
            render={({ children, ...props }) => (
              <a href="/settings" {...props}>
                {children}
              </a>
            )}
          >
            Settings
          </TabsNav.Link>
        </TabsNav.Root>
        <Typography.Text size="1" color="gray">
          In a real app, replace <Typography.Code>{'<a />'}</Typography.Code> with your router&apos;s Link component,
          e.g. <Typography.Code>{'<NextLink href="/account" />'}</Typography.Code> for Next.js.
        </Typography.Text>
      </div>
    );
  },
};
