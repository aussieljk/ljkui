import classNames from 'classnames';
import * as React from 'react';

interface EmProps extends React.ComponentProps<'em'> {}

/**
 * Renders an `<em>` element with the library's italic emphasis styling.
 *
 * @example
 * ```tsx
 * <Text>
 *   The <Em>only</Em> thing left to do.
 * </Text>
 * ```
 */
const Em = (props: EmProps) => <em {...props} className={classNames('fui-Em', props.className)} />;
Em.displayName = 'Em';

export { Em };
export type { EmProps };
