'use client';

import classNames from 'classnames';
import * as React from 'react';

import type { GetPropDefTypes } from '../../helpers';
import { Separator } from '../separator';
import { buttonGroupPropDefs } from './button-group.props';

type ButtonGroupRootOwnProps = GetPropDefTypes<typeof buttonGroupPropDefs>;
interface ButtonGroupRootProps extends React.ComponentPropsWithoutRef<'div'>, ButtonGroupRootOwnProps {}

/**
 * Joins related buttons into a single control, squaring off the inner corners so the group reads as
 * one unit.
 *
 * For a set of mutually exclusive choices use `ToggleGroup` instead — a button group runs independent
 * actions.
 *
 * @example
 * ```tsx
 * <ButtonGroup.Root>
 *   <Button>Save</Button>
 *   <Button>Save and publish</Button>
 * </ButtonGroup.Root>
 * ```
 */
const ButtonGroupRoot = (props: ButtonGroupRootProps) => {
  const { className, orientation = buttonGroupPropDefs.orientation.default, ...rootProps } = props;
  return (
    <div
      role="group"
      data-orientation={orientation}
      {...rootProps}
      className={classNames('fui-ButtonGroupRoot', className)}
    />
  );
};
ButtonGroupRoot.displayName = 'ButtonGroupRoot';

interface ButtonGroupTextProps extends React.ComponentPropsWithoutRef<'div'> {}

/** A non-interactive segment inside the group, for a unit or prefix such as "https://". */
const ButtonGroupText = (props: ButtonGroupTextProps) => {
  const { className, ...textProps } = props;
  return <div {...textProps} className={classNames('fui-ButtonGroupText', className)} />;
};
ButtonGroupText.displayName = 'ButtonGroupText';

type ButtonGroupSeparatorProps = React.ComponentProps<typeof Separator>;

/** A divider between segments of the group. */
const ButtonGroupSeparator = (props: ButtonGroupSeparatorProps) => {
  const { className, orientation = 'vertical', ...separatorProps } = props;
  return (
    <Separator
      orientation={orientation}
      {...separatorProps}
      className={classNames('fui-ButtonGroupSeparator', className)}
    />
  );
};
ButtonGroupSeparator.displayName = 'ButtonGroupSeparator';

export { ButtonGroupRoot as Root, ButtonGroupSeparator as Separator, ButtonGroupText as Text };
export type {
  ButtonGroupRootProps as RootProps,
  ButtonGroupSeparatorProps as SeparatorProps,
  ButtonGroupTextProps as TextProps,
};
