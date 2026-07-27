'use client';

import { Input as InputPrimitive } from '@base-ui/react/input';
import classNames from 'classnames';
import * as React from 'react';
import { inputPropDefs, inputSlotPropDefs } from './input.props';

import { composeEventHandlers, type GetPropDefTypes, type PropsWithoutColor } from '../../helpers';

type InputContextValue = GetPropDefTypes<typeof inputPropDefs>;
const InputContext = React.createContext<InputContextValue | undefined>(undefined);

interface InputRootProps extends PropsWithoutColor<'div'>, InputContextValue {}

/**
 * The container for a text field, composing an `Input` with optional `Slot`s
 * for icons or buttons on either side.
 *
 * Clicking anywhere on the field (outside interactive children) focuses the
 * input and places the caret at the nearest end. `size`, `variant` and `color`
 * set here are shared with children via context.
 *
 * @example
 * ```tsx
 * <Input.Root>
 *   <Input.Slot>
 *     <MagnifyingGlassIcon />
 *   </Input.Slot>
 *   <Input.Control placeholder="Search…" />
 * </Input.Root>
 * ```
 */
const InputRoot = (props: InputRootProps) => {
  const {
    children,
    className,
    size = inputPropDefs.size.default,
    variant = inputPropDefs.variant.default,
    color = inputPropDefs.color.default,
    ...rootProps
  } = props;
  return (
    <div
      data-accent-color={color}
      {...rootProps}
      className={classNames('fui-InputRoot', `fui-r-size-${size}`, `fui-variant-${variant}`, className)}
      onPointerDown={composeEventHandlers(rootProps.onPointerDown, (event) => {
        const target = event.target as HTMLElement;
        if (target.closest('input, button, a')) return;

        const input = event.currentTarget.querySelector('.fui-InputControl') as HTMLInputElement | null;
        if (!input) return;

        const position = input.compareDocumentPosition(target);
        const targetIsBeforeInput = (position & Node.DOCUMENT_POSITION_PRECEDING) !== 0;
        const cursorPosition = targetIsBeforeInput ? 0 : input.value.length;

        requestAnimationFrame(() => {
          const selectableTypes = ['text', 'search', 'url', 'tel', 'password'];
          if (selectableTypes.includes(input.type)) {
            input.setSelectionRange(cursorPosition, cursorPosition);
          }
          input.focus();
        });
      })}
    >
      <InputContext.Provider value={{ size, variant, color }}>{children}</InputContext.Provider>
    </div>
  );
};
InputRoot.displayName = 'InputRoot';

type InputSlotElement = React.ElementRef<'div'>;
type InputSlotOwnProps = GetPropDefTypes<typeof inputSlotPropDefs>;
interface InputSlotProps extends PropsWithoutColor<'div'>, InputSlotOwnProps {}
/**
 * Decorative or interactive content (icons, buttons) placed before or after the
 * input, inside `Input.Root`.
 */
const InputSlot = React.forwardRef<InputSlotElement, InputSlotProps>((props, forwardedRef) => {
  const { className, color = inputSlotPropDefs.color.default, ...slotProps } = props;
  const context = React.useContext(InputContext);
  return (
    <div
      data-accent-color={color}
      {...slotProps}
      ref={forwardedRef}
      className={classNames('fui-InputSlot', className, `fui-r-size-${context?.size}`)}
    />
  );
});
InputSlot.displayName = 'InputSlot';

type InputControlElement = React.ElementRef<'input'>;
type InputControlOwnProps = GetPropDefTypes<typeof inputPropDefs>;
interface InputControlProps
  extends Omit<PropsWithoutColor<typeof InputPrimitive>, 'size' | 'className'>, InputControlOwnProps {
  className?: string;
}
/**
 * The `<input>` element of a text field, wrapping Base UI's Input primitive.
 *
 * Can be used standalone — when rendered outside a `Input.Root` it wraps
 * itself in one automatically; inside a Root it inherits the Root's `size`,
 * `variant` and `color`.
 */
const InputControl = React.forwardRef<InputControlElement, InputControlProps>((props, forwardedRef) => {
  const context = React.useContext(InputContext);
  const hasRoot = context !== undefined;
  const {
    className,
    size = context?.size ?? inputPropDefs.size.default,
    variant = context?.variant ?? inputPropDefs.variant.default,
    color = context?.color ?? inputPropDefs.color.default,
    ...inputProps
  } = props;
  const input = (
    <InputPrimitive
      data-accent-color={color}
      spellCheck="false"
      {...inputProps}
      ref={forwardedRef}
      className={classNames('fui-InputControl', className, `fui-r-size-${size}`, `fui-variant-${variant}`)}
    />
  );

  return hasRoot ? (
    input
  ) : (
    <InputRoot size={size} variant={variant} color={color}>
      {input}
    </InputRoot>
  );
});
InputControl.displayName = 'InputControl';

export { InputControl as Control, InputRoot as Root, InputSlot as Slot };
export type { InputControlProps as ControlProps, InputRootProps as RootProps, InputSlotProps as SlotProps };
