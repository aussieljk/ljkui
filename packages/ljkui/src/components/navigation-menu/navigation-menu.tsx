'use client';

import { NavigationMenu as NavigationMenuPrimitive } from '@base-ui/react/navigation-menu';
import classNames from 'classnames';
import * as React from 'react';

import { ThickChevronRightIcon } from '../../icons';

type NavigationMenuRootProps = React.ComponentProps<typeof NavigationMenuPrimitive.Root>;

/**
 * Site-level navigation whose items can reveal a panel of links.
 *
 * The open panel animates between items in a shared viewport, so moving along the bar feels like one
 * surface resizing rather than separate popovers.
 *
 * @example
 * ```tsx
 * <NavigationMenu.Root>
 *   <NavigationMenu.List>
 *     <NavigationMenu.Item>
 *       <NavigationMenu.Trigger>Product</NavigationMenu.Trigger>
 *       <NavigationMenu.Content>
 *         <NavigationMenu.Link href="/overview">Overview</NavigationMenu.Link>
 *       </NavigationMenu.Content>
 *     </NavigationMenu.Item>
 *   </NavigationMenu.List>
 *   <NavigationMenu.Viewport />
 * </NavigationMenu.Root>
 * ```
 */
const NavigationMenuRoot = (props: NavigationMenuRootProps) => {
  const { className, ...rootProps } = props;
  return <NavigationMenuPrimitive.Root className={classNames('fui-NavigationMenuRoot', className)} {...rootProps} />;
};
NavigationMenuRoot.displayName = 'NavigationMenuRoot';

type NavigationMenuListProps = React.ComponentProps<typeof NavigationMenuPrimitive.List>;

/** The row of top-level navigation items. */
const NavigationMenuList = (props: NavigationMenuListProps) => {
  const { className, ...listProps } = props;
  return <NavigationMenuPrimitive.List className={classNames('fui-NavigationMenuList', className)} {...listProps} />;
};
NavigationMenuList.displayName = 'NavigationMenuList';

type NavigationMenuItemProps = React.ComponentProps<typeof NavigationMenuPrimitive.Item>;

/** A single top-level entry, either a plain `Link` or a `Trigger` with `Content`. */
const NavigationMenuItem = (props: NavigationMenuItemProps) => {
  const { className, ...itemProps } = props;
  return <NavigationMenuPrimitive.Item className={classNames('fui-NavigationMenuItem', className)} {...itemProps} />;
};
NavigationMenuItem.displayName = 'NavigationMenuItem';

type NavigationMenuTriggerProps = React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>;

/** Opens an item's panel. Suffixed with a chevron that rotates while open. */
const NavigationMenuTrigger = (props: NavigationMenuTriggerProps) => {
  const { className, children, ...triggerProps } = props;
  return (
    <NavigationMenuPrimitive.Trigger
      className={classNames('fui-reset', 'fui-NavigationMenuTrigger', className)}
      {...triggerProps}
    >
      {children}
      <NavigationMenuPrimitive.Icon className="fui-NavigationMenuTriggerIcon">
        <ThickChevronRightIcon />
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  );
};
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

type NavigationMenuContentProps = React.ComponentProps<typeof NavigationMenuPrimitive.Content>;

/** The panel of links revealed by a `Trigger`. Rendered inside the shared `Viewport`. */
const NavigationMenuContent = (props: NavigationMenuContentProps) => {
  const { className, ...contentProps } = props;
  return (
    <NavigationMenuPrimitive.Content className={classNames('fui-NavigationMenuContent', className)} {...contentProps} />
  );
};
NavigationMenuContent.displayName = 'NavigationMenuContent';

type NavigationMenuLinkProps = React.ComponentProps<typeof NavigationMenuPrimitive.Link>;

/** A navigable link, either in the bar itself or inside a panel. */
const NavigationMenuLink = (props: NavigationMenuLinkProps) => {
  const { className, ...linkProps } = props;
  return <NavigationMenuPrimitive.Link className={classNames('fui-NavigationMenuLink', className)} {...linkProps} />;
};
NavigationMenuLink.displayName = 'NavigationMenuLink';

type NavigationMenuViewportProps = React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>;

/**
 * The shared surface every panel renders into. Place it once, after the `List` — without it, no
 * content is shown.
 */
const NavigationMenuViewport = (props: NavigationMenuViewportProps) => {
  const { className, ...viewportProps } = props;
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner className="fui-NavigationMenuPositioner" sideOffset={8}>
        <NavigationMenuPrimitive.Popup className={classNames('fui-NavigationMenuPopup', className)}>
          <NavigationMenuPrimitive.Viewport className="fui-NavigationMenuViewport" {...viewportProps} />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
};
NavigationMenuViewport.displayName = 'NavigationMenuViewport';

export {
  NavigationMenuContent as Content,
  NavigationMenuItem as Item,
  NavigationMenuLink as Link,
  NavigationMenuList as List,
  NavigationMenuRoot as Root,
  NavigationMenuTrigger as Trigger,
  NavigationMenuViewport as Viewport,
};
export type {
  NavigationMenuContentProps as ContentProps,
  NavigationMenuItemProps as ItemProps,
  NavigationMenuLinkProps as LinkProps,
  NavigationMenuListProps as ListProps,
  NavigationMenuRootProps as RootProps,
  NavigationMenuTriggerProps as TriggerProps,
  NavigationMenuViewportProps as ViewportProps,
};
