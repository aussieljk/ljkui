'use client';

import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar';
import classNames from 'classnames';
import * as React from 'react';

import {
  CheckboxItem,
  Content,
  Group,
  GroupLabel,
  Item,
  RadioGroup,
  RadioItem,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
} from '../dropdown-menu/dropdown-menu';

type MenubarRootProps = React.ComponentProps<typeof MenubarPrimitive>;

/**
 * A horizontal bar of menus, as in a desktop application's File / Edit / View.
 *
 * Once one menu is open, moving the pointer across the bar opens its neighbours, and the arrow keys
 * move between them.
 *
 * @example
 * ```tsx
 * <Menubar.Root>
 *   <Menubar.Menu>
 *     <Menubar.Trigger>File</Menubar.Trigger>
 *     <Menubar.Content>
 *       <Menubar.Item>New window</Menubar.Item>
 *       <Menubar.Separator />
 *       <Menubar.Item>Print…</Menubar.Item>
 *     </Menubar.Content>
 *   </Menubar.Menu>
 * </Menubar.Root>
 * ```
 */
const MenubarRoot = (props: MenubarRootProps) => {
  const { className, ...rootProps } = props;
  return <MenubarPrimitive className={classNames('fui-MenubarRoot', className)} {...rootProps} />;
};
MenubarRoot.displayName = 'MenubarRoot';

type MenubarMenuProps = React.ComponentProps<typeof MenuPrimitive.Root>;

/** One menu within the bar, pairing a `Trigger` with its `Content`. */
const MenubarMenu = (props: MenubarMenuProps) => <MenuPrimitive.Root {...props} />;
MenubarMenu.displayName = 'MenubarMenu';

type MenubarTriggerProps = React.ComponentProps<typeof MenuPrimitive.Trigger>;

/** The button in the bar that opens its menu. */
const MenubarTrigger = (props: MenubarTriggerProps) => {
  const { className, ...triggerProps } = props;
  return (
    <MenuPrimitive.Trigger className={classNames('fui-reset', 'fui-MenubarTrigger', className)} {...triggerProps} />
  );
};
MenubarTrigger.displayName = 'MenubarTrigger';

export {
  CheckboxItem,
  Content,
  Group,
  GroupLabel,
  Item,
  MenubarMenu as Menu,
  MenubarRoot as Root,
  MenubarTrigger as Trigger,
  RadioGroup,
  RadioItem,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
};
export type { MenubarMenuProps as MenuProps, MenubarRootProps as RootProps, MenubarTriggerProps as TriggerProps };
