import classNames from 'classnames';
import * as React from 'react';
import { BaseButton } from '../base-button';

interface ButtonProps extends React.ComponentProps<typeof BaseButton> {}

/**
 * A clickable button with size, variant and color options, and a built-in `loading` state.
 * Use `render` to compose it with another element, e.g. `render={<a href="..." />}`.
 *
 * @example
 * ```tsx
 * <Button variant="solid" color="success" onClick={save}>
 *   Save changes
 * </Button>
 * ```
 */
const Button = (props: ButtonProps) => <BaseButton {...props} className={classNames('fui-Button', props.className)} />;

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
