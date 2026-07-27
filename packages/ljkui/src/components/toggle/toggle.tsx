'use client';

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import classNames from 'classnames';
import * as React from 'react';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';
import { togglePropDefs } from './toggle.props';

type ToggleOwnProps = GetPropDefTypes<typeof togglePropDefs>;
interface ToggleProps extends Omit<PropsWithoutColor<typeof TogglePrimitive>, 'className'>, ToggleOwnProps {
  className?: string;
}

/**
 * A two-state button that stays pressed once activated — bold, italic, "mute notifications".
 *
 * For a set of mutually exclusive options use `ToggleGroup`; for an on/off setting that reads as a
 * form field, use `Switch`.
 *
 * @example
 * ```tsx
 * <Toggle aria-label="Bold">
 *   <BoldIcon />
 * </Toggle>
 * ```
 */
const Toggle = (props: ToggleProps) => {
  const {
    className,
    size = togglePropDefs.size.default,
    variant = togglePropDefs.variant.default,
    color = togglePropDefs.color.default,
    highContrast = togglePropDefs.highContrast.default,
    ...toggleProps
  } = props;

  return (
    <TogglePrimitive
      data-accent-color={color}
      {...toggleProps}
      className={classNames('fui-reset', 'fui-Toggle', className, `fui-r-size-${size}`, `fui-variant-${variant}`, {
        'fui-high-contrast': highContrast,
      })}
    />
  );
};
Toggle.displayName = 'Toggle';

export { Toggle };
export type { ToggleProps };
