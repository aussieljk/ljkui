'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import * as React from 'react';

import { switchPropDefs } from './switch.props';

import { rootClassName } from '../../helpers';
import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';

type SwitchOwnProps = GetPropDefTypes<typeof switchPropDefs>;
type SwitchProps = Omit<
  PropsWithoutColor<typeof SwitchPrimitive.Root>,
  'children' | 'className' | 'render' | 'nativeButton'
> &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> &
  SwitchOwnProps;

/**
 * A toggle control for switching between checked and unchecked states. Wraps Base UI's
 * `Switch` (renders a `role="switch"` button); supports controlled (`checked` +
 * `onCheckedChange`) and uncontrolled (`defaultChecked`) usage.
 *
 * @example
 * ```tsx
 * <Switch defaultChecked onCheckedChange={(checked) => setEnabled(checked)} />
 * ```
 */
const Switch = (props: SwitchProps) => {
  const {
    className,
    style,
    size = switchPropDefs.size.default,
    color = switchPropDefs.color.default,
    highContrast = switchPropDefs.highContrast.default,
    ...switchProps
  } = props;
  return (
    <span className={rootClassName('fui-SwitchRoot', className, { size, highContrast })} style={style}>
      <SwitchPrimitive.Root
        {...switchProps}
        data-accent-color={color}
        className={rootClassName('fui-SwitchButton', undefined, { highContrast }, 'fui-reset')}
      >
        <SwitchPrimitive.Thumb className={rootClassName('fui-SwitchThumb', undefined, { highContrast })} />
      </SwitchPrimitive.Root>
    </span>
  );
};
Switch.displayName = 'Switch';

export { Switch };
export type { SwitchProps };
