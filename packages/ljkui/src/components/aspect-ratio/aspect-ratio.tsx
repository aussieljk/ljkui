import classNames from 'classnames';
import * as React from 'react';

type AspectRatioPreset = 'square' | 'video' | 'portrait' | 'wide' | 'classic';

const RATIO_PRESETS: Record<AspectRatioPreset, number> = {
  square: 1,
  video: 16 / 9,
  portrait: 3 / 4,
  wide: 21 / 9,
  classic: 4 / 3,
};

interface AspectRatioProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * The desired width-to-height ratio, either a number (e.g. `16 / 9`) or a named preset:
   * `'square'` (1), `'video'` (16/9), `'portrait'` (3/4), `'wide'` (21/9), `'classic'` (4/3).
   * @default 1
   */
  ratio?: number | AspectRatioPreset;
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
  const resolvedRatio = typeof ratio === 'number' ? ratio : RATIO_PRESETS[ratio];
  return (
    <div
      {...rootProps}
      className={classNames('fui-AspectRatio', className)}
      style={{ ...style, aspectRatio: String(resolvedRatio) }}
    />
  );
};
AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
export type { AspectRatioProps, AspectRatioPreset };
