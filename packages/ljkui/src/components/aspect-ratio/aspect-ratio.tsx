import classNames from 'classnames';
import * as React from 'react';

interface AspectRatioProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * The desired width-to-height ratio, e.g. `16 / 9`.
   * @default 1
   */
  ratio?: number;
}

/**
 * Constrains its content to a fixed width-to-height ratio, reserving the space before the content
 * loads so the surrounding layout never shifts.
 *
 * @example
 * ```tsx
 * <AspectRatio ratio={16 / 9}>
 *   <img src="/cover.jpg" alt="" />
 * </AspectRatio>
 * ```
 */
const AspectRatio = (props: AspectRatioProps) => {
  const { className, ratio = 1, style, ...rootProps } = props;
  return (
    <div
      {...rootProps}
      className={classNames('fui-AspectRatio', className)}
      style={{ ...style, aspectRatio: String(ratio) }}
    />
  );
};
AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
export type { AspectRatioProps };
