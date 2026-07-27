'use client';

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';
import classNames from 'classnames';
import * as React from 'react';

type CollapsibleRootProps = React.ComponentProps<typeof CollapsiblePrimitive.Root>;

/**
 * A single expandable section of content, toggled by its `Trigger`.
 *
 * Unlike `Accordion`, a collapsible has no item list and no shared open state — reach for it when one
 * region shows and hides on its own, such as "advanced options".
 *
 * @example
 * ```tsx
 * <Collapsible.Root>
 *   <Collapsible.Trigger>Advanced options</Collapsible.Trigger>
 *   <Collapsible.Content>…</Collapsible.Content>
 * </Collapsible.Root>
 * ```
 */
const CollapsibleRoot = (props: CollapsibleRootProps) => {
  const { className, ...rootProps } = props;
  return <CollapsiblePrimitive.Root className={classNames('fui-CollapsibleRoot', className)} {...rootProps} />;
};
CollapsibleRoot.displayName = 'CollapsibleRoot';

type CollapsibleTriggerProps = React.ComponentProps<typeof CollapsiblePrimitive.Trigger>;

/** The button that opens and closes the collapsible. */
const CollapsibleTrigger = (props: CollapsibleTriggerProps) => {
  const { className, ...triggerProps } = props;
  return (
    <CollapsiblePrimitive.Trigger
      className={classNames('fui-reset', 'fui-CollapsibleTrigger', className)}
      {...triggerProps}
    />
  );
};
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

type CollapsibleContentProps = React.ComponentProps<typeof CollapsiblePrimitive.Panel>;

/** The panel revealed when open. Stays mounted while closed so its height can animate. */
const CollapsibleContent = (props: CollapsibleContentProps) => {
  const { className, children, keepMounted = true, ...contentProps } = props;
  return (
    <CollapsiblePrimitive.Panel className="fui-CollapsibleContent" keepMounted={keepMounted} {...contentProps}>
      <div className={classNames('fui-CollapsibleContentInner', className)}>{children}</div>
    </CollapsiblePrimitive.Panel>
  );
};
CollapsibleContent.displayName = 'CollapsibleContent';

export { CollapsibleContent as Content, CollapsibleRoot as Root, CollapsibleTrigger as Trigger };
export type {
  CollapsibleContentProps as ContentProps,
  CollapsibleRootProps as RootProps,
  CollapsibleTriggerProps as TriggerProps,
};
