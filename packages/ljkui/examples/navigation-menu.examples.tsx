import React from 'react';
import { NavigationMenu } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls', layout: 'fullscreen' } as const;

export const examples = {
  Default: (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Product</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link href="#overview">Overview</NavigationMenu.Link>
            <NavigationMenu.Link href="#pricing">Pricing</NavigationMenu.Link>
            <NavigationMenu.Link href="#changelog">Changelog</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Developers</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link href="#docs">Documentation</NavigationMenu.Link>
            <NavigationMenu.Link href="#api">API reference</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link href="#support">Support</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  ),
};
