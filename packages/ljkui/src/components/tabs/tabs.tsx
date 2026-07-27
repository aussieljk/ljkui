'use client';

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import classNames from 'classnames';
import * as React from 'react';

import { tabsListPropDefs } from './tabs.props';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';

type TabsRootProps = Omit<PropsWithoutColor<typeof TabsPrimitive.Root>, 'className' | 'render' | 'orientation'> &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'>;

/**
 * Container for a set of tabs that switch between panels of content.
 *
 * Wraps Base UI's Tabs primitive; selection is controlled via `value` /
 * `defaultValue` / `onValueChange`.
 *
 * @example
 * ```tsx
 * <Tabs.Root defaultValue="members">
 *   <Tabs.List>
 *     <Tabs.Trigger value="members">Members</Tabs.Trigger>
 *     <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="members">Members panel</Tabs.Content>
 *   <Tabs.Content value="settings">Settings panel</Tabs.Content>
 * </Tabs.Root>
 * ```
 */
const TabsRoot = (props: TabsRootProps) => {
  const { className, ...rootProps } = props;
  return <TabsPrimitive.Root {...rootProps} className={classNames('fui-TabsRoot', className)} />;
};
TabsRoot.displayName = 'TabsRoot';

type TabsListOwnProps = GetPropDefTypes<typeof tabsListPropDefs>;
type TabsListProps = Omit<PropsWithoutColor<typeof TabsPrimitive.List>, 'className' | 'render'> &
  React.HTMLAttributes<HTMLDivElement> &
  TabsListOwnProps;

/**
 * The row of tab triggers, rendered with `role="tablist"` semantics.
 *
 * `size`, `color` and `highContrast` control the styling of all triggers inside.
 */
const TabsList = (props: TabsListProps) => {
  const {
    className,
    size = tabsListPropDefs.size.default,
    color = tabsListPropDefs.color.default,
    highContrast = tabsListPropDefs.highContrast.default,
    ...listProps
  } = props;
  return (
    <TabsPrimitive.List
      {...listProps}
      data-accent-color={color}
      className={classNames('fui-BaseTabsList', 'fui-TabsList', className, `fui-r-size-${size}`, {
        'fui-high-contrast': highContrast,
      })}
    />
  );
};
TabsList.displayName = 'TabsList';

type TabsTriggerProps = Omit<PropsWithoutColor<typeof TabsPrimitive.Tab>, 'className' | 'render'> &
  React.HTMLAttributes<HTMLButtonElement>;

/**
 * The button that activates the `Content` panel with the matching `value`.
 */
const TabsTrigger = (props: TabsTriggerProps) => {
  const { className, children, ...triggerProps } = props;
  return (
    <TabsPrimitive.Tab
      {...triggerProps}
      className={classNames('fui-reset', 'fui-BaseTabsTrigger', 'fui-TabsTrigger', className)}
    >
      <span className="fui-BaseTabsTriggerInner fui-TabsTriggerInner">{children}</span>
    </TabsPrimitive.Tab>
  );
};
TabsTrigger.displayName = 'TabsTrigger';

type TabsContentProps = Omit<PropsWithoutColor<typeof TabsPrimitive.Panel>, 'className' | 'render'> &
  React.HTMLAttributes<HTMLDivElement>;

/**
 * The panel shown when the `Trigger` with the matching `value` is selected.
 */
const TabsContent = (props: TabsContentProps) => (
  <TabsPrimitive.Panel {...props} className={classNames('fui-TabsContent', props.className)} />
);
TabsContent.displayName = 'TabsContent';

export { TabsContent as Content, TabsList as List, TabsRoot as Root, TabsTrigger as Trigger };
export type {
  TabsContentProps as ContentProps,
  TabsListProps as ListProps,
  TabsRootProps as RootProps,
  TabsTriggerProps as TriggerProps,
};
