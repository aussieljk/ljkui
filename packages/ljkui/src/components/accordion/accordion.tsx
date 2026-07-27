'use client';

import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import classNames from 'classnames';
import * as React from 'react';
import type { PropsWithoutColor } from '../../helpers';

type BaseAccordionRootProps = React.ComponentProps<typeof AccordionPrimitive.Root>;
interface AccordionRootProps extends Omit<BaseAccordionRootProps, 'multiple'> {
  /** @deprecated Use `multiple` instead. Kept for backwards compatibility with radix-ui API. */
  type?: 'single' | 'multiple';
  /**
   * Whether multiple items can be open at the same time. When omitted, falls back to the deprecated
   * `type` prop (`type="multiple"`).
   * @default false
   */
  multiple?: boolean;
}

/**
 * Groups a set of vertically stacked, collapsible items. Can be controlled via `value`/`onValueChange`
 * or left uncontrolled.
 *
 * @example
 * ```tsx
 * <Accordion.Root>
 *   <Accordion.Item value="shipping">
 *     <Accordion.Trigger>Shipping</Accordion.Trigger>
 *     <Accordion.Content>Free shipping on orders over $50.</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion.Root>
 * ```
 */
const AccordionRoot = (props: AccordionRootProps) => {
  const { className, type, multiple, ...accordionRootProps } = props;
  // Support radix-ui's `type` prop for backwards compatibility
  const isMultiple = multiple ?? type === 'multiple';

  return (
    <AccordionPrimitive.Root
      className={classNames('fui-AccordionRoot', className)}
      multiple={isMultiple}
      {...accordionRootProps}
    />
  );
};
AccordionRoot.displayName = 'Root';

interface AccordionItemProps extends PropsWithoutColor<typeof AccordionPrimitive.Item> {}

/** A single collapsible section within `Accordion.Root`, identified by its `value`. */
const AccordionItem = (props: AccordionItemProps) => {
  const { className, ...accordionItemProps } = props;

  return <AccordionPrimitive.Item className={classNames('fui-AccordionItem', className)} {...accordionItemProps} />;
};
AccordionItem.displayName = 'Item';

type AccordionTriggerProps = React.ComponentProps<typeof AccordionPrimitive.Trigger>;

/**
 * The button that toggles its item open and closed. Rendered inside an accordion header element and
 * prefixed with a rotating chevron icon.
 */
const AccordionTrigger = (props: AccordionTriggerProps) => {
  const { className, children, ...accordionTriggerProps } = props;
  return (
    <AccordionPrimitive.Header className="fui-AccordionHeader">
      <AccordionPrimitive.Trigger
        className={classNames('fui-AccordionTrigger', 'fui-reset', className)}
        {...accordionTriggerProps}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fui-AccordionTriggerIcon"
        >
          <path
            d="M6 12L9.64645 8.35355C9.84171 8.15829 10.1583 8.15829 10.3536 8.35355L14 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};
AccordionTrigger.displayName = 'AccordionTrigger';

type AccordionContentProps = React.ComponentProps<typeof AccordionPrimitive.Panel>;

/**
 * The collapsible panel of an item. Stays mounted while closed by default (`keepMounted` defaults to
 * `true`) so its height can be animated.
 */
const AccordionContent = ({ className, children, keepMounted = true, ...props }: AccordionContentProps) => (
  <AccordionPrimitive.Panel className="fui-AccordionContent" keepMounted={keepMounted} {...props}>
    <div className={classNames('fui-AccordionContentInner', className)}>{children}</div>
  </AccordionPrimitive.Panel>
);
AccordionContent.displayName = 'AccordionContent';

export { AccordionContent as Content, AccordionItem as Item, AccordionRoot as Root, AccordionTrigger as Trigger };

export type {
  AccordionContentProps as ContentProps,
  AccordionItemProps as ItemProps,
  AccordionRootProps as RootProps,
  AccordionTriggerProps as TriggerProps,
};
