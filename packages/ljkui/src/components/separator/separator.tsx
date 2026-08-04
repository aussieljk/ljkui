'use client';

import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';
import * as React from 'react';

import { separatorPropDefs } from './separator.props';

import { rootClassName } from '../../helpers';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';

type SeparatorOwnProps = GetPropDefTypes<typeof separatorPropDefs>;
interface SeparatorProps extends PropsWithoutColor<typeof SeparatorPrimitive>, SeparatorOwnProps {}

/**
 * A visual divider between sections of content or groups of items.
 *
 * Wraps Base UI's Separator primitive (rendered with `role="separator"`);
 * pass `orientation="vertical"` for a vertical line.
 *
 * @example
 * ```tsx
 * <Separator size="4" />
 * ```
 */
const Separator = (props: SeparatorProps) => {
  const {
    className,
    size = separatorPropDefs.size.default,
    color = separatorPropDefs.color.default,
    ...separatorProps
  } = props;
  return (
    <SeparatorPrimitive
      {...separatorProps}
      data-accent-color={color}
      className={rootClassName('fui-Separator', className, { size })}
    />
  );
};
Separator.displayName = 'Separator';

export { Separator };
export type { SeparatorProps };
