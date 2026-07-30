import * as React from 'react';

import { hStackPropDefs } from './h-stack.props';

import { interleaveSeparator, rootClassName } from '../../helpers';

import type { GetPropDefTypes } from '../../helpers';

type HStackOwnProps = GetPropDefTypes<typeof hStackPropDefs>;
interface HStackProps extends React.ComponentProps<'div'>, HStackOwnProps {
  /** The spacing between children, in pixels. */
  spacing?: number;
  /** When true, children wrap onto new lines instead of overflowing (`flex-wrap: wrap`). */
  wrap?: boolean;
  /** A node rendered between each child (never before the first or after the last). */
  separator?: React.ReactNode;
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
  const {
    className,
    style,
    spacing,
    wrap,
    separator,
    children,
    ref,
    alignment = hStackPropDefs.alignment.default,
    ...stackProps
  } = props;
  const content = separator !== undefined ? interleaveSeparator(children, separator) : children;
  return (
    <div
      ref={ref}
      {...stackProps}
      className={rootClassName('fui-HStack', className, { alignment }, wrap && 'fui-wrap')}
      style={spacing !== undefined ? { gap: spacing, ...style } : style}
    >
      {content}
    </div>
  );
};
HStack.displayName = 'HStack';

export { HStack };
export type { HStackProps };
