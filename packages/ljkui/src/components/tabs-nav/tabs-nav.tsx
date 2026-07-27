'use client';

import { NavigationMenu } from '@base-ui/react/navigation-menu';
import classNames from 'classnames';
import * as React from 'react';
import { GetPropDefTypes } from '../../helpers';
import { tabsNavPropDefs } from './tabs-nav.props';

type TabsNavOwnProps = GetPropDefTypes<typeof tabsNavPropDefs>;
type TabsNavRootProps = Omit<React.ComponentProps<typeof NavigationMenu.Root>, 'className' | 'render' | 'orientation'> &
  React.ComponentProps<'nav'> &
  TabsNavOwnProps;

/**
 * A tabs-styled navigation bar for linking between pages.
 *
 * Wraps Base UI's NavigationMenu primitive and renders a `<nav>` landmark; unlike
 * `Tabs`, selection is driven by links (mark the current one with `active` on
 * `Link`) rather than internal tab state.
 *
 * @example
 * ```tsx
 * <TabsNav.Root>
 *   <TabsNav.Link href="/overview" active>
 *     Overview
 *   </TabsNav.Link>
 *   <TabsNav.Link href="/analytics">Analytics</TabsNav.Link>
 * </TabsNav.Root>
 * ```
 */
const TabsNavRoot = (props: TabsNavRootProps) => {
  const {
    children,
    className,
    size = tabsNavPropDefs.size.default,
    color = tabsNavPropDefs.color.default,
    highContrast = tabsNavPropDefs.highContrast.default,
    ...rootProps
  } = props;

  // Base UI requires both Root (context + <nav>) and List (<ul> + CompositeRoot). We apply tab-list
  // styling to Root and use display:contents on List so the nav is the single layout container.
  return (
    <NavigationMenu.Root
      data-accent-color={color}
      className={classNames(
        'fui-TabsNavRoot',
        'fui-reset',
        'fui-BaseTabsList',
        'fui-TabsNavList',
        className,
        `fui-r-size-${size}`,
        { 'fui-high-contrast': highContrast },
      )}
      {...rootProps}
    >
      <NavigationMenu.List className="fui-reset fui-TabsNavListContents">{children}</NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
TabsNavRoot.displayName = 'TabsNavRoot';

interface TabsNavLinkOwnProps {
  /** Additional CSS class name */
  className?: string;
}
type TabsNavLinkProps = Omit<React.ComponentProps<typeof NavigationMenu.Link>, 'className'> &
  Omit<React.ComponentProps<'a'>, 'className'> &
  TabsNavLinkOwnProps;

/**
 * A navigation link rendered as a tab.
 *
 * Renders an anchor by default; pass `render` to integrate with a router's link
 * component and `active` (from the Base UI primitive) to mark the current page.
 */
const TabsNavLink = (props: TabsNavLinkProps) => {
  const { render, children, className, ...linkProps } = props;

  return (
    <NavigationMenu.Item className="fui-TabsNavItem">
      <NavigationMenu.Link
        {...linkProps}
        render={render}
        className={classNames('fui-reset', 'fui-BaseTabsTrigger', 'fui-TabsNavLink', className)}
      >
        <span className="fui-BaseTabsTriggerInner fui-TabsNavLinkInner">{children}</span>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
};

TabsNavLink.displayName = 'TabsNavLink';

export { TabsNavLink as Link, TabsNavRoot as Root };
export type { TabsNavLinkProps as LinkProps, TabsNavRootProps as RootProps };
