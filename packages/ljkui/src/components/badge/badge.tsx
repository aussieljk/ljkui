import * as React from 'react';

import { badgePropDefs } from './badge.props';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';
import { rootClassName } from '../../helpers';

type BadgeOwnProps = GetPropDefTypes<typeof badgePropDefs>;
interface BadgeProps extends PropsWithoutColor<'span'>, BadgeOwnProps {}

/**
 * A stylized inline label for statuses, counts, and categories.
 *
 * @example
 * ```tsx
 * <Badge color="success">Active</Badge>
 * ```
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const {
    className,
    size = badgePropDefs.size.default,
    variant = badgePropDefs.variant.default,
    color = badgePropDefs.color.default,
    highContrast = badgePropDefs.highContrast.default,
    ...badgeProps
  } = props;
  return (
    <span
      ref={ref}
      {...badgeProps}
      data-accent-color={color}
      className={rootClassName('fui-Badge', className, { size, variant, highContrast })}
    />
  );
});
Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps };
