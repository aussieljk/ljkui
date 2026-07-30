import classNames from 'classnames';
import * as React from 'react';

import { bleedPropDefs } from './bleed.props';
import { withBreakpoints } from '../../helpers';

import type { GetPropDefTypes } from '../../helpers';

type BleedOwnProps = GetPropDefTypes<typeof bleedPropDefs>;
interface BleedProps extends React.ComponentProps<'div'>, BleedOwnProps {}

/**
 * The inverse of `Inset`: applies negative margins so its content breaks full-bleed out of a
 * padded parent (typically a `Card`).
 *
 * @example
 * ```tsx
 * <Card>
 *   <Bleed side="x">
 *     <img src="/cover.png" alt="" />
 *   </Bleed>
 * </Card>
 * ```
 */
const Bleed = (props: BleedProps) => {
  const { className, side = bleedPropDefs.side.default, size = bleedPropDefs.size.default, ...bleedProps } = props;
  return (
    <div
      {...bleedProps}
      className={classNames('fui-Bleed', className, `fui-r-side-${side}`, withBreakpoints(size, 'fui-r-size'))}
    />
  );
};
Bleed.displayName = 'Bleed';

export { Bleed };
export type { BleedProps };
