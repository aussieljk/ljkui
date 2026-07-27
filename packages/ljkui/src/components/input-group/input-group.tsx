'use client';

import classNames from 'classnames';
import * as React from 'react';

import { IconButton } from '../icon-button';
import { Control as InputControl, Root as InputRoot, Slot as InputSlot } from '../input/input';
import { Textarea } from '../textarea';

type InputGroupRootProps = React.ComponentProps<typeof InputRoot>;

/**
 * An input with addons attached to it — icons, labels or buttons that sit inside the field's border
 * and share its focus ring.
 *
 * This is the shadcn-compatible surface over `Input`: `InputGroup.Root` is an `Input.Root`, and
 * `InputGroup.Addon` an `Input.Slot`. Reach for whichever naming your codebase already uses.
 *
 * @example
 * ```tsx
 * <InputGroup.Root>
 *   <InputGroup.Addon><SearchIcon /></InputGroup.Addon>
 *   <InputGroup.Input placeholder="Search…" />
 *   <InputGroup.Addon><InputGroup.Button>Clear</InputGroup.Button></InputGroup.Addon>
 * </InputGroup.Root>
 * ```
 */
const InputGroupRoot = (props: InputGroupRootProps) => {
  const { className, ...rootProps } = props;
  return <InputRoot {...rootProps} className={classNames('fui-InputGroupRoot', className)} />;
};
InputGroupRoot.displayName = 'InputGroupRoot';

type InputGroupAddonProps = React.ComponentProps<typeof InputSlot>;

/** Content attached to one end of the field — an icon, a unit, or an `InputGroup.Button`. */
const InputGroupAddon = (props: InputGroupAddonProps) => {
  const { className, ...addonProps } = props;
  return <InputSlot {...addonProps} className={classNames('fui-InputGroupAddon', className)} />;
};
InputGroupAddon.displayName = 'InputGroupAddon';

type InputGroupInputProps = React.ComponentProps<typeof InputControl>;

/** The `<input>` element of the group. */
const InputGroupInput = (props: InputGroupInputProps) => {
  const { className, ...inputProps } = props;
  return <InputControl {...inputProps} className={classNames('fui-InputGroupInput', className)} />;
};
InputGroupInput.displayName = 'InputGroupInput';

type InputGroupTextareaProps = React.ComponentProps<typeof Textarea>;

/** A multi-line control for groups whose addons sit above or below the field. */
const InputGroupTextarea = (props: InputGroupTextareaProps) => {
  const { className, ...textareaProps } = props;
  return <Textarea {...textareaProps} className={classNames('fui-InputGroupTextarea', className)} />;
};
InputGroupTextarea.displayName = 'InputGroupTextarea';

type InputGroupButtonProps = React.ComponentProps<typeof IconButton>;

/** A compact button sized to sit inside the field. */
const InputGroupButton = (props: InputGroupButtonProps) => {
  const { className, size = '1', variant = 'ghost', ...buttonProps } = props;
  return (
    <IconButton
      size={size}
      variant={variant}
      {...buttonProps}
      className={classNames('fui-InputGroupButton', className)}
    />
  );
};
InputGroupButton.displayName = 'InputGroupButton';

interface InputGroupTextProps extends React.ComponentPropsWithoutRef<'span'> {}

/** A static label inside the field, such as a currency symbol or unit. */
const InputGroupText = (props: InputGroupTextProps) => {
  const { className, ...textProps } = props;
  return <span {...textProps} className={classNames('fui-InputGroupText', className)} />;
};
InputGroupText.displayName = 'InputGroupText';

export {
  InputGroupAddon as Addon,
  InputGroupButton as Button,
  InputGroupInput as Input,
  InputGroupRoot as Root,
  InputGroupText as Text,
  InputGroupTextarea as Textarea,
};
export type {
  InputGroupAddonProps as AddonProps,
  InputGroupButtonProps as ButtonProps,
  InputGroupInputProps as InputProps,
  InputGroupRootProps as RootProps,
  InputGroupTextProps as TextProps,
  InputGroupTextareaProps as TextareaProps,
};
