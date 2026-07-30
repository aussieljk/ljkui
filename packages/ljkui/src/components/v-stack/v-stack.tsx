import * as React from 'react';

import { vStackPropDefs } from './v-stack.props';

import { interleaveSeparator, rootClassName } from '../../helpers';

import type { GetPropDefTypes } from '../../helpers';

type VStackOwnProps = GetPropDefTypes<typeof vStackPropDefs>;
interface VStackProps extends React.ComponentProps<'div'>, VStackOwnProps {
  /** The spacing between children, in pixels. Falls back to the stack's default 8px gap when omitted. */
  spacing?: number;
  /** When true, children wrap onto new lines instead of overflowing (`flex-wrap: wrap`). */
  wrap?: boolean;
  /** A node rendered between each child (never before the first or after the last). */
  separator?: React.ReactNode;
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
  const {
    className,
    style,
    spacing,
    wrap,
    separator,
    children,
    ref,
    alignment = vStackPropDefs.alignment.default,
    ...stackProps
  } = props;
  const content = separator !== undefined ? interleaveSeparator(children, separator) : children;
  return (
    <div
      ref={ref}
      {...stackProps}
      className={rootClassName('fui-VStack', className, { alignment }, wrap && 'fui-wrap')}
      style={spacing !== undefined ? { gap: spacing, ...style } : style}
    >
      {content}
    </div>
  );
};
VStack.displayName = 'VStack';

export { VStack };
export type { VStackProps };
