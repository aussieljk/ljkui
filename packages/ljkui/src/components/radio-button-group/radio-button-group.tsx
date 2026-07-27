'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioButtonGroupPrimitive } from '@base-ui/react/radio-group';
import classNames from 'classnames';
import * as React from 'react';

import { radioButtonGroupPropDefs } from './radio-button-group.props';

import { type GetPropDefTypes } from '../../helpers';
import { useIsomorphicLayoutEffect } from '../../helpers/use-isomorphic-layout-effect';

type RadioButtonGroupOwnProps = GetPropDefTypes<typeof radioButtonGroupPropDefs>;

type RadioButtonGroupContextValue = RadioButtonGroupOwnProps;
const RadioButtonGroupContext = React.createContext<RadioButtonGroupContextValue>({});

interface RadioButtonGroupRootProps<Value = unknown>
  extends Omit<RadioButtonGroupPrimitive.Props<Value>, 'className' | 'style' | 'render'>, RadioButtonGroupOwnProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A single-select group whose options render as card/button-like elements instead of small
 * radio circles. Wraps Base UI's `RadioGroup`; supports controlled (`value` + `onValueChange`)
 * and uncontrolled (`defaultValue`) usage.
 *
 * @example
 * ```tsx
 * <RadioButtonGroup.Root defaultValue="monthly">
 *   <RadioButtonGroup.Item value="monthly">
 *     <div>
 *       Monthly <RadioButtonGroup.Icon />
 *     </div>
 *   </RadioButtonGroup.Item>
 *   <RadioButtonGroup.Item value="yearly">
 *     <div>
 *       Yearly <RadioButtonGroup.Icon />
 *     </div>
 *   </RadioButtonGroup.Item>
 * </RadioButtonGroup.Root>
 * ```
 */
function RadioButtonGroupRoot<Value = unknown>(props: RadioButtonGroupRootProps<Value>) {
  const {
    className,
    color = radioButtonGroupPropDefs.color.default,
    highContrast = radioButtonGroupPropDefs.highContrast.default,
    children,
    ...rootProps
  } = props;
  return (
    <RadioButtonGroupPrimitive
      data-accent-color={color}
      {...(rootProps as RadioButtonGroupPrimitive.Props<Value>)}
      className={classNames('fui-RadioButtonGroupRoot', className, { 'fui-high-contrast': highContrast })}
    >
      <RadioButtonGroupContext.Provider value={React.useMemo(() => ({ color, highContrast }), [color, highContrast])}>
        {children}
      </RadioButtonGroupContext.Provider>
    </RadioButtonGroupPrimitive>
  );
}
RadioButtonGroupRoot.displayName = 'RadioButtonGroupRoot';

interface RadioButtonGroupItemProps extends Omit<
  React.ComponentProps<typeof RadioPrimitive.Root>,
  'className' | 'style' | 'render'
> {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A selectable option in the group. Wraps Base UI's `Radio.Root` and merges radio behavior
 * onto its single child element; a selection-outline overlay matching the child's border is
 * appended to that child automatically.
 */
const RadioButtonGroupItem = (props: RadioButtonGroupItemProps) => {
  const { children, className, style, ...itemProps } = props;

  const updatedChildren = addOverlayToChildren(children);
  return (
    <RadioPrimitive.Root
      style={style}
      {...itemProps}
      className={classNames('fui-reset', 'fui-RadioButtonGroupButton', 'fui-RadioButtonGroupItem', className)}
      render={updatedChildren as React.ReactElement}
    />
  );
};
RadioButtonGroupItem.displayName = 'RadioButtonGroupItem';

interface RadioButtonGroupIconProps extends Omit<React.ComponentProps<'div'>, 'children' | 'color'> {}

/**
 * Decorative checkmark indicator (hidden from assistive technology) shown inside an item
 * when it is selected, colored with the group's accent color.
 */
const RadioButtonGroupIcon = (props: RadioButtonGroupIconProps) => {
  const { color, highContrast } = React.useContext(RadioButtonGroupContext);

  const { className, ...itemProps } = props;
  return (
    <div
      data-accent-color={color}
      className={classNames('fui-RadioButtonGroupIcon', { 'fui-high-contrast': highContrast }, className)}
      aria-hidden
      {...itemProps}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M6 10.5L8.5 13L14 7.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
RadioButtonGroupIcon.displayName = 'RadioButtonGroupIcon';

const addOverlayToChildren = (children: React.ReactNode): React.ReactNode => {
  if (React.Children.count(children) === 1) {
    const child = React.Children.only(children) as React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    return React.cloneElement(
      child,
      {},
      React.Children.toArray(child.props.children).concat(<RadioButtonGroupOverlay key="radio-button-group-overlay" />),
    );
  }
  return children;
};

const RadioButtonGroupOverlay = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const parentElement = ref.current?.parentElement;
    if (!parentElement) return;
    const parentElementComputedStyles = getComputedStyle(parentElement);
    ref.current?.style.setProperty('--parent-border-width', parentElementComputedStyles.borderWidth);
    ref.current?.style.setProperty('--parent-border-radius', parentElementComputedStyles.borderRadius);
  }, [ref]);

  return <div ref={ref} className="fui-RadioButtonGroupOverlay" aria-hidden />;
};

/** Re-export types from Base UI for typing onValueChange handlers */
type ChangeEventDetails = RadioButtonGroupPrimitive.ChangeEventDetails;
type ChangeEventReason = RadioButtonGroupPrimitive.ChangeEventReason;

export { RadioButtonGroupIcon as Icon, RadioButtonGroupItem as Item, RadioButtonGroupRoot as Root };
export type {
  ChangeEventDetails,
  ChangeEventReason,
  RadioButtonGroupIconProps as IconProps,
  RadioButtonGroupItemProps as ItemProps,
  RadioButtonGroupRootProps as RootProps,
};
