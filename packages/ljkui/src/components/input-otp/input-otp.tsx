'use client';

import { OTPField as InputOTPPrimitive } from '@base-ui/react/otp-field';
import classNames from 'classnames';
import * as React from 'react';
import { inputOTPPropDefs } from './input-otp.props';

import { type GetPropDefTypes, type PropsWithoutColor } from '../../helpers';

// TODO: margin props, variant and size support

type InputOTPContextValue = GetPropDefTypes<typeof inputOTPPropDefs>;
const InputOTPContext = React.createContext<InputOTPContextValue | undefined>(undefined);

/**
 * Legacy slot info kept for backwards compatibility with the previous `input-otp`
 * implementation. Slots are now real `<input>` elements (Base UI `InputOTP.Input`)
 * that render their own character and native caret, so these values are static
 * placeholders and are ignored by `InputOTP.Slot`.
 */
interface InputOTPSlotState {
  isActive: boolean;
  char: string | null;
  placeholderChar: string | null;
  hasFakeCaret: boolean;
}

interface InputOTPRenderProps {
  slots: InputOTPSlotState[];
  isFocused: boolean;
  isHovering: boolean;
}

type PrimitiveRootProps = React.ComponentProps<typeof InputOTPPrimitive.Root>;

interface InputOTPRootOwnProps extends Omit<PrimitiveRootProps, 'render' | 'length' | 'children' | 'className'> {
  className?: string;
  /** The number of OTP slots. */
  maxLength: number;
  /** Callback fired with the new OTP value when it changes. */
  onChange?: (newValue: string) => unknown;
  /** Callback fired when all slots are filled. */
  onComplete?: (...args: any[]) => unknown;
  /**
   * Regex source string used to reject unwanted characters
   * (e.g. `'^\\d+$'`, the old `REGEXP_ONLY_DIGITS` from `input-otp`).
   * Characters that don't match are stripped from the value.
   */
  pattern?: string;
  /** Class name applied to the root container element. */
  containerClassName?: string;
  /** Render function receiving the slots array (legacy `input-otp` API). */
  render?: (props: InputOTPRenderProps) => React.ReactNode;
  children?: React.ReactNode;
}
type InputOTPRootProps = InputOTPRootOwnProps & InputOTPContextValue;

/**
 * One-time password input split into individual character slots. Wraps Base UI's
 * `InputOTP.Root` while keeping the legacy `input-otp`-style API (`maxLength`, `onChange`,
 * `onComplete`, `pattern`, `render`).
 *
 * Supports controlled (`value` + `onValueChange`) and uncontrolled (`defaultValue`) usage
 * via the underlying Base UI props.
 *
 * @example
 * ```tsx
 * <OtpField.Root maxLength={6} onComplete={(code) => verify(code)}>
 *   <OtpField.Group>
 *     {Array.from({ length: 6 }, (_, i) => (
 *       <OtpField.Slot key={i} />
 *     ))}
 *   </OtpField.Group>
 * </OtpField.Root>
 * ```
 */
const InputOTPRoot = ({
  containerClassName,
  className,
  color = inputOTPPropDefs.color.default,
  maxLength,
  onChange,
  onComplete,
  pattern,
  render,
  children,
  normalizeValue,
  validationType = 'none',
  inputMode = 'numeric',
  ...props
}: InputOTPRootProps) => {
  const patternRegExp = React.useMemo(() => (pattern ? new RegExp(pattern) : undefined), [pattern]);

  const combinedNormalizeValue = React.useMemo(() => {
    if (!patternRegExp && !normalizeValue) return undefined;
    return (value: string) => {
      const normalized = normalizeValue ? normalizeValue(value) : value;
      if (!patternRegExp) return normalized;
      return normalized
        .split('')
        .filter((char) => patternRegExp.test(char))
        .join('');
    };
  }, [patternRegExp, normalizeValue]);

  const slots = React.useMemo<InputOTPSlotState[]>(
    () =>
      Array.from({ length: maxLength }, () => ({
        isActive: false,
        char: null,
        placeholderChar: null,
        hasFakeCaret: false,
      })),
    [maxLength],
  );

  return (
    <InputOTPContext.Provider value={{ color }}>
      <InputOTPPrimitive.Root
        length={maxLength}
        className={classNames('fui-InputOTPRoot', containerClassName, className)}
        validationType={validationType}
        inputMode={inputMode}
        normalizeValue={combinedNormalizeValue}
        onValueChange={onChange && ((value) => onChange(value))}
        onValueComplete={onComplete && ((value) => onComplete(value))}
        {...props}
      >
        {render ? render({ slots, isFocused: false, isHovering: false }) : children}
      </InputOTPPrimitive.Root>
    </InputOTPContext.Provider>
  );
};

InputOTPRoot.displayName = 'InputOTPRoot';

type InputOTPGroupProps = PropsWithoutColor<'div'> & Partial<InputOTPContextValue>;

/**
 * Visually groups adjacent slots and applies the accent color from the surrounding Root
 * (overridable via its own `color` prop).
 */
const InputOTPGroup = ({ className, color, ...props }: InputOTPGroupProps) => {
  const context = React.useContext(InputOTPContext);
  const resolvedColor = color ?? context?.color ?? inputOTPPropDefs.color.default;
  return <div data-accent-color={resolvedColor} className={classNames('fui-InputOTPGroup', className)} {...props} />;
};
InputOTPGroup.displayName = 'InputOTPGroup';

interface InputOTPSlotProps
  extends
    Omit<React.ComponentProps<typeof InputOTPPrimitive.Input>, 'children' | 'className'>,
    Partial<InputOTPSlotState> {
  className?: string;
}

/**
 * A single character input of the OTP field. Wraps Base UI's `InputOTP.Input`, so each slot is
 * a real `<input>` with a native caret. Legacy `input-otp` slot-state props (`char`, `isActive`,
 * `placeholderChar`, `hasFakeCaret`) are accepted for backwards compatibility but ignored.
 */
// The legacy slot state props are intentionally destructured away: slots now render their own character.
const InputOTPSlot = ({ char, hasFakeCaret, isActive, placeholderChar, className, ...props }: InputOTPSlotProps) => {
  return <InputOTPPrimitive.Input className={classNames('fui-InputOTPSlot', className)} {...props} />;
};
InputOTPSlot.displayName = 'InputOTPSlot';

type InputOTPSeparatorProps = React.ComponentProps<'div'>;

/** Decorative separator (with `role="separator"`) rendered between slot groups. */
const InputOTPSeparator = ({ ...props }: InputOTPSeparatorProps) => (
  <div role="separator" className="fui-InputOTPSeparator" {...props}></div>
);
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTPGroup as Group, InputOTPRoot as Root, InputOTPSeparator as Separator, InputOTPSlot as Slot };
export type {
  InputOTPGroupProps as GroupProps,
  InputOTPRootProps as RootProps,
  InputOTPSeparatorProps as SeparatorProps,
  InputOTPSlotProps as SlotProps,
};
