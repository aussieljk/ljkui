'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import classNames from 'classnames';
import * as React from 'react';

import { radioGroupPropDefs } from './radio-group.props';

import type { GetPropDefTypes } from '../../helpers';

type RadioGroupOwnProps = GetPropDefTypes<typeof radioGroupPropDefs>;

interface RadioGroupRootProps<Value = unknown>
  extends Omit<RadioGroupPrimitive.Props<Value>, 'className' | 'style' | 'render'>, RadioGroupOwnProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A set of mutually exclusive radio buttons. Wraps Base UI's `RadioGroup`; supports
 * controlled (`value` + `onValueChange`) and uncontrolled (`defaultValue`) usage.
 *
 * @example
 * ```tsx
 * <RadioGroup.Root defaultValue="1">
 *   <RadioGroup.Item value="1">Option one</RadioGroup.Item>
 *   <RadioGroup.Item value="2">Option two</RadioGroup.Item>
 * </RadioGroup.Root>
 * ```
 */
function RadioGroupRoot<Value = unknown>(props: RadioGroupRootProps<Value>) {
  const {
    className,
    size = radioGroupPropDefs.size.default,
    color = radioGroupPropDefs.color.default,
    highContrast = radioGroupPropDefs.highContrast.default,
    ...rootProps
  } = props;
  return (
    <RadioGroupPrimitive
      data-accent-color={color}
      {...(rootProps as RadioGroupPrimitive.Props<Value>)}
      className={classNames('fui-RadioGroupRoot', className, `fui-r-size-${size}`, {
        'fui-high-contrast': highContrast,
      })}
    />
  );
}
RadioGroupRoot.displayName = 'RadioGroupRoot';

interface RadioGroupItemProps extends Omit<
  React.ComponentProps<typeof RadioPrimitive.Root>,
  'children' | 'className' | 'style' | 'render'
> {
  /** Optional label content to display next to the radio button */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A single radio button within the group. Wraps Base UI's `Radio.Root`; when `children` is
 * provided the item renders as a `<label>` so clicking the label selects the radio.
 */
const RadioGroupItem = (props: RadioGroupItemProps) => {
  const { children, className, style, ...itemProps } = props;

  const Comp = children ? 'label' : 'span';

  return (
    <Comp className={classNames('fui-RadioGroupItem', className)} style={style}>
      <RadioPrimitive.Root {...itemProps} className={classNames('fui-reset', 'fui-RadioGroupButton')}>
        <RadioPrimitive.Indicator className="fui-RadioGroupIndicator" />
      </RadioPrimitive.Root>
      {children}
    </Comp>
  );
};
RadioGroupItem.displayName = 'RadioGroupItem';

/** Re-export types from Base UI for typing onValueChange handlers */
type ChangeEventDetails = RadioGroupPrimitive.ChangeEventDetails;
type ChangeEventReason = RadioGroupPrimitive.ChangeEventReason;

export { RadioGroupItem as Item, RadioGroupRoot as Root };
export type {
  ChangeEventDetails,
  ChangeEventReason,
  RadioGroupItemProps as ItemProps,
  RadioGroupRootProps as RootProps,
};
