import classNames from 'classnames';
import * as React from 'react';
import { BaseButton } from '../base-button';

interface IconButtonProps extends React.ComponentProps<typeof BaseButton> {}

/**
 * A square button that holds a single icon. Shares `Button`'s sizes, variants, colors and `loading`
 * state; provide an accessible name via `aria-label`.
 *
 * @example
 * ```tsx
 * <IconButton variant="ghost" aria-label="Search">
 *   <MagnifyingGlassIcon />
 * </IconButton>
 * ```
 */
const IconButton = (props: IconButtonProps) => (
  <BaseButton {...props} className={classNames('fui-IconButton', props.className)} />
);
IconButton.displayName = 'IconButton';

export { IconButton };
export type { IconButtonProps };
