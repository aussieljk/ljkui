import { mergeProps, useRender } from '@base-ui/react';
import classNames from 'classnames';
import * as React from 'react';

import { headingPropDefs } from './heading.props';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';

type HeadingOwnProps = GetPropDefTypes<typeof headingPropDefs>;

interface HeadingProps extends HeadingOwnProps, PropsWithoutColor<'h1'> {
  /** Renders the heading as a different element or component, e.g. `render={<h2 />}`. Defaults to `<h1>`. */
  render?: useRender.ComponentProps<'h1'>['render'];
}

/**
 * A semantic heading with size, weight, alignment and color options. Renders an `<h1>` by default;
 * use `render` to change the heading level.
 *
 * @example
 * ```tsx
 * <Heading size="8" render={<h2 />}>
 *   Account settings
 * </Heading>
 * ```
 */
const Heading = (props: HeadingProps) => {
  const {
    children,
    className,
    render,
    size = headingPropDefs.size.default,
    weight = headingPropDefs.weight.default,
    align = headingPropDefs.align.default,
    trim = headingPropDefs.trim.default,
    color = headingPropDefs.color.default,
    highContrast = headingPropDefs.highContrast.default,
    ...headingProps
  } = props;

  return useRender({
    render,
    props: mergeProps(
      headingProps as React.ComponentProps<'h1'>,
      {
        'data-accent-color': color,
        className: classNames(
          'fui-Heading',
          className,
          size ? `fui-r-size-${size}` : undefined,
          weight ? `fui-r-weight-${weight}` : undefined,
          align ? `fui-r-ta-${align}` : undefined,
          trim ? `fui-r-lt-${trim}` : undefined,
          { 'fui-high-contrast': highContrast },
        ),
        children,
      } as React.ComponentProps<'h1'>,
    ),
    defaultTagName: 'h1',
  });
};
Heading.displayName = 'Heading';

export { Heading };
export type { HeadingProps };
