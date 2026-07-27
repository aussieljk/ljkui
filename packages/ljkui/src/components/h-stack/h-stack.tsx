import classNames from 'classnames';
import * as React from 'react';

import { hStackPropDefs } from './h-stack.props';

import type { GetPropDefTypes } from '../../helpers';

type HStackOwnProps = GetPropDefTypes<typeof hStackPropDefs>;
interface HStackProps extends React.ComponentProps<'div'>, HStackOwnProps {
  /** The spacing between children, in pixels. */
  spacing?: number;
}

/**
 * A horizontal flex row that lays out its children side by side, in the style of SwiftUI's HStack.
 *
 * @example
 * ```tsx
 * <HStack spacing={8} alignment="center">
 *   <Avatar fallback="JD" />
 *   <Text>Jane Doe</Text>
 * </HStack>
 * ```
 */
const HStack = (props: HStackProps) => {
  const { className, style, spacing, alignment = hStackPropDefs.alignment.default, ...stackProps } = props;
  return (
    <div
      {...stackProps}
      className={classNames('fui-HStack', className, `fui-r-alignment-${alignment}`)}
      style={spacing !== undefined ? { gap: spacing, ...style } : style}
    />
  );
};
HStack.displayName = 'HStack';

export { HStack };
export type { HStackProps };
