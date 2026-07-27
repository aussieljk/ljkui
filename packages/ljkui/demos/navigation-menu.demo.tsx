import React from 'react';
import { NavigationMenu } from 'ljkui';

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Product</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link href="#overview">Overview</NavigationMenu.Link>
            <NavigationMenu.Link href="#pricing">Pricing</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#support">Support</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}
