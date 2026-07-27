import classNames from 'classnames';
import * as React from 'react';

interface SpacerProps extends React.ComponentProps<'div'> {
  /**
   * The minimum length of the spacer along its stack's axis, in pixels.
   * This is the minimum amount of space that the spacer will take up.
   */
  minLength?: number;
}

/**
 * A flexible, invisible element that expands along its stack's main axis to
 * push siblings apart, like SwiftUI's `Spacer`. Use `minLength` to guarantee
 * a minimum amount of space.
 *
 * @example
 * <HStack>
 *   <Logo />
 *   <Spacer minLength={16} />
 *   <Button>Sign in</Button>
 * </HStack>
 */
const Spacer = (props: SpacerProps) => {
  const { className, style, minLength, ...spacerProps } = props;
  return (
    <div
      {...spacerProps}
      className={classNames('fui-Spacer', className)}
      style={minLength !== undefined ? { flexBasis: minLength, ...style } : style}
    />
  );
};
Spacer.displayName = 'Spacer';

export { Spacer };
export type { SpacerProps };
