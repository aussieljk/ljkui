'use client';

import { NavigationMenu } from '@base-ui/react/navigation-menu';
import classNames from 'classnames';
import * as React from 'react';

type ToggleGroupNavRootProps = Omit<React.ComponentProps<typeof NavigationMenu.Root>, 'className' | 'render'> &
  React.ComponentProps<'nav'>;

/**
 * A toggle-group-styled navigation bar for linking between pages.
 *
 * Wraps Base UI's NavigationMenu primitive and renders a `<nav>` landmark; unlike
 * `ToggleGroup`, selection is driven by links (mark the current one with
 * `active` on `Link`) rather than internal tab state.
 *
 * @example
 * ```tsx
 * <ToggleGroupNav.Root>
 *   <ToggleGroupNav.Link href="/inbox" active>
 *     Inbox
 *   </ToggleGroupNav.Link>
 *   <ToggleGroupNav.Link href="/archive">Archive</ToggleGroupNav.Link>
 * </ToggleGroupNav.Root>
 * ```
 */
const ToggleGroupNavRoot = (props: ToggleGroupNavRootProps) => {
  const { children, className, ...rootProps } = props;

  return (
    <NavigationMenu.Root className="fui-ToggleGroupNavRoot" {...rootProps}>
      <NavigationMenu.List className={classNames('fui-reset', 'fui-BaseSegmentedControlList', className)}>
        {children}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
ToggleGroupNavRoot.displayName = 'ToggleGroupNavRoot';

interface ToggleGroupNavLinkOwnProps {
  /** Additional CSS class name */
  className?: string;
}
type ToggleGroupNavLinkProps = Omit<React.ComponentProps<typeof NavigationMenu.Link>, 'className'> &
  Omit<React.ComponentProps<'a'>, 'className'> &
  ToggleGroupNavLinkOwnProps;

/**
 * A navigation link rendered as a segment in the control.
 *
 * Renders an anchor by default; pass `render` to integrate with a router's link
 * component and `active` (from the Base UI primitive) to mark the current page.
 */
const ToggleGroupNavLink = (props: ToggleGroupNavLinkProps) => {
  const { render, children, className, ...linkProps } = props;

  return (
    <NavigationMenu.Item className="fui-ToggleGroupNavItem">
      <NavigationMenu.Link
        {...linkProps}
        render={render}
        className={classNames('fui-reset', 'fui-BaseSegmentedControlTrigger', 'fui-ToggleGroupNavLink', className)}
      >
        <span className="fui-BaseSegmentedControlTriggerInner">{children}</span>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
};

ToggleGroupNavLink.displayName = 'ToggleGroupNavLink';

export { ToggleGroupNavLink as Link, ToggleGroupNavRoot as Root };
export type { ToggleGroupNavLinkProps as LinkProps, ToggleGroupNavRootProps as RootProps };
