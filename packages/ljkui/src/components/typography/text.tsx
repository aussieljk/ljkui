import { mergeProps, useRender } from '@base-ui/react';
import classNames from 'classnames';
import * as React from 'react';

import { textPropDefs } from './text.props';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';

type TextOwnProps = GetPropDefTypes<typeof textPropDefs>;

interface TextProps extends TextOwnProps, PropsWithoutColor<'span'> {
  /** Replaces the rendered `<span>` with a custom element or render function (Base UI render prop). */
  render?: useRender.ComponentProps<'span'>['render'];
}

/**
 * The base typography component for a piece of text.
 *
 * Renders a `<span>` by default; use `render` to output another element
 * (e.g. `render={<p />}`). Size, weight, alignment, trim and color all inherit
 * from the surrounding text when not set.
 *
 * @example
 * ```tsx
 * <Text size="3" weight="medium" color="gray">
 *   A short description
 * </Text>
 * ```
 */
const Text = (props: TextProps) => {
  const {
    children,
    className,
    render,
    size = textPropDefs.size.default,
    weight = textPropDefs.weight.default,
    align = textPropDefs.align.default,
    trim = textPropDefs.trim.default,
    color = textPropDefs.color.default,
    highContrast = textPropDefs.highContrast.default,
    ...textProps
  } = props;

  return useRender({
    render,
    props: mergeProps(
      textProps as React.ComponentProps<'span'>,
      {
        'data-accent-color': color,
        className: classNames(
          'fui-Text',
          className,
          size ? `fui-r-size-${size}` : undefined,
          weight ? `fui-r-weight-${weight}` : undefined,
          align ? `fui-r-ta-${align}` : undefined,
          trim ? `fui-r-lt-${trim}` : undefined,
          { 'fui-high-contrast': highContrast },
        ),
        children,
      } as React.ComponentProps<'span'>,
    ),
    defaultTagName: 'span',
  });
};
Text.displayName = 'Text';

export { Text };
export type { TextProps };
