import classNames from 'classnames';
import * as React from 'react';

import { vStackPropDefs } from './v-stack.props';

import type { GetPropDefTypes } from '../../helpers';

type VStackOwnProps = GetPropDefTypes<typeof vStackPropDefs>;
interface VStackProps extends React.ComponentProps<'div'>, VStackOwnProps {
  /** The spacing between children, in pixels. Falls back to the stack's default 8px gap when omitted. */
  spacing?: number;
}

/**
 * Arranges children in a vertical line, mirroring SwiftUI's `VStack` with
 * SwiftUI-style `alignment` and `spacing` semantics (a flex column with an
 * 8px default gap).
 *
 * @example
 * <VStack alignment="leading" spacing={12}>
 *   <Heading>Title</Heading>
 *   <Text>Description</Text>
 * </VStack>
 */
const VStack = (props: VStackProps) => {
  const { className, style, spacing, alignment = vStackPropDefs.alignment.default, ...stackProps } = props;
  return (
    <div
      {...stackProps}
      className={classNames('fui-VStack', className, `fui-r-alignment-${alignment}`)}
      style={spacing !== undefined ? { gap: spacing, ...style } : style}
    />
  );
};
VStack.displayName = 'VStack';

export { VStack };
export type { VStackProps };
