'use client';

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import classNames from 'classnames';
import * as React from 'react';

type ToggleGroupRootProps = Omit<
  React.ComponentProps<typeof TabsPrimitive.Root>,
  'className' | 'render' | 'orientation'
> &
  React.ComponentProps<'div'>;

/**
 * Container for a segmented control that switches between panels of content.
 *
 * Wraps Base UI's Tabs primitive; selection is controlled via `value` / `defaultValue` /
 * `onValueChange` and each `Trigger` is associated with a matching `Content` panel.
 *
 * @example
 * ```tsx
 * <ToggleGroup.Root defaultValue="account">
 *   <ToggleGroup.List>
 *     <ToggleGroup.Trigger value="account">Account</ToggleGroup.Trigger>
 *     <ToggleGroup.Trigger value="settings">Settings</ToggleGroup.Trigger>
 *   </ToggleGroup.List>
 *   <ToggleGroup.Content value="account">Account panel</ToggleGroup.Content>
 *   <ToggleGroup.Content value="settings">Settings panel</ToggleGroup.Content>
 * </ToggleGroup.Root>
 * ```
 */
const ToggleGroupRoot = (props: ToggleGroupRootProps) => {
  const { className, ...rootProps } = props;
  return <TabsPrimitive.Root {...rootProps} className={classNames('fui-BaseSegmentedControlRoot', className)} />;
};
ToggleGroupRoot.displayName = 'ToggleGroupRoot';

type ToggleGroupListProps = Omit<React.ComponentProps<typeof TabsPrimitive.List>, 'className' | 'render'> &
  React.ComponentProps<'div'>;

/**
 * Groups the segmented control's triggers into the visual "pill" strip.
 *
 * Rendered with `role="tablist"` semantics by the underlying Base UI Tabs primitive.
 */
const ToggleGroupList = (props: ToggleGroupListProps) => {
  const { className, ...listProps } = props;
  return <TabsPrimitive.List {...listProps} className={classNames('fui-BaseSegmentedControlList', className)} />;
};
ToggleGroupList.displayName = 'ToggleGroupList';

type ToggleGroupTriggerProps = Omit<React.ComponentProps<typeof TabsPrimitive.Tab>, 'className' | 'render'> &
  React.ComponentProps<'button'>;

/**
 * A single selectable segment (tab button) that activates its matching `Content` panel.
 */
const ToggleGroupTrigger = (props: ToggleGroupTriggerProps) => {
  const { className, children, ...triggerProps } = props;
  return (
    <TabsPrimitive.Tab
      {...triggerProps}
      className={classNames('fui-reset', 'fui-BaseSegmentedControlTrigger', className)}
    >
      <span className="fui-BaseSegmentedControlTriggerInner">{children}</span>
    </TabsPrimitive.Tab>
  );
};
ToggleGroupTrigger.displayName = 'ToggleGroupTrigger';

type ToggleGroupContentProps = Omit<React.ComponentProps<typeof TabsPrimitive.Panel>, 'className' | 'render'> &
  React.ComponentProps<'div'>;

/**
 * The panel shown when the `Trigger` with the matching `value` is selected.
 */
const ToggleGroupContent = (props: ToggleGroupContentProps) => (
  <TabsPrimitive.Panel {...props} className={classNames('fui-ToggleGroupContent', props.className)} />
);
ToggleGroupContent.displayName = 'ToggleGroupContent';

export {
  ToggleGroupContent as Content,
  ToggleGroupList as List,
  ToggleGroupRoot as Root,
  ToggleGroupTrigger as Trigger,
};
export type {
  ToggleGroupContentProps as ContentProps,
  ToggleGroupListProps as ListProps,
  ToggleGroupRootProps as RootProps,
  ToggleGroupTriggerProps as TriggerProps,
};
