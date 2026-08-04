'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import * as React from 'react';

import { filterChipPropDefs } from './filter-chip.props';

import { rootClassName } from '../../helpers';
import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';

type FilterChipOwnProps = GetPropDefTypes<typeof filterChipPropDefs>;
type FilterChipProps = Omit<PropsWithoutColor<typeof CheckboxPrimitive.Root>, 'className' | 'render' | 'nativeButton'> &
  Omit<React.HTMLAttributes<HTMLButtonElement>, 'color'> &
  FilterChipOwnProps & {
    /** The chip's label content. */
    children: React.ReactNode;
  };

/**
 * A toggleable pill-shaped chip for filtering, backed by a checkbox. Can be controlled via
 * `checked`/`onCheckedChange` or left uncontrolled with `defaultChecked`.
 *
 * @example
 * ```tsx
 * <FilterChip checked={showArchived} onCheckedChange={setShowArchived}>
 *   Archived
 * </FilterChip>
 * ```
 */
const FilterChip = (props: FilterChipProps) => {
  const {
    children,
    className,
    style,
    size = filterChipPropDefs.size.default,
    color = filterChipPropDefs.color.default,
    ...checkboxProps
  } = props;

  return (
    <CheckboxPrimitive.Root
      {...checkboxProps}
      data-accent-color={color}
      className={rootClassName('fui-BaseChip', className, { size }, 'fui-reset')}
      style={style}
    >
      {children}
    </CheckboxPrimitive.Root>
  );
};
FilterChip.displayName = 'FilterChip';

export { FilterChip };
export type { FilterChipProps };
