import * as React from 'react';
import { GetPropDefTypes, rootClassName } from '../../helpers';
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
  return <kbd {...kbdProps} className={rootClassName('fui-Kbd', className, { size })} />;
};
Kbd.displayName = 'Kbd';

export { Kbd };
export type { KbdProps };
