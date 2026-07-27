import classNames from 'classnames';
import * as React from 'react';
import { GetPropDefTypes } from '../../helpers';
import { kbdPropDefs } from './kbd.props';

type KbdOwnProps = GetPropDefTypes<typeof kbdPropDefs>;
interface KbdProps extends React.ComponentProps<'kbd'>, KbdOwnProps {}

/**
 * Displays a keyboard key or shortcut as a styled key cap,
 * rendered with the semantic `<kbd>` element.
 *
 * @example
 * ```tsx
 * <Kbd>⌘ K</Kbd>
 * ```
 */
const Kbd = (props: KbdProps) => {
  const { className, size = kbdPropDefs.size.default, ...kbdProps } = props;
  return <kbd {...kbdProps} className={classNames('fui-Kbd', className, `fui-r-size-${size}`)} />;
};
Kbd.displayName = 'Kbd';

export { Kbd };
export type { KbdProps };
