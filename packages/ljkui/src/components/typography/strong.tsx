import classNames from 'classnames';
import * as React from 'react';

interface StrongProps extends React.ComponentProps<'strong'> {}

/**
 * Marks text with strong importance, rendered with the semantic `<strong>` element.
 *
 * @example
 * ```tsx
 * <Text>
 *   Payment is due <Strong>today</Strong>.
 * </Text>
 * ```
 */
const Strong = (props: StrongProps) => <strong {...props} className={classNames('fui-Strong', props.className)} />;
Strong.displayName = 'Strong';

export { Strong };
export type { StrongProps };
