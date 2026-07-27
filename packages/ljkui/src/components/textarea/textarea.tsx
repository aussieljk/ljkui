import classNames from 'classnames';
import * as React from 'react';
import { textareaPropDefs } from './textarea.props';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';

type TextareaOwnProps = GetPropDefTypes<typeof textareaPropDefs>;
interface TextareaProps extends Omit<PropsWithoutColor<'textarea'>, 'size'>, TextareaOwnProps {}

/**
 * A multi-line text input, rendered as a styled `<textarea>`.
 *
 * All standard textarea attributes (`value`, `onChange`, `rows`, `placeholder`, ...)
 * are forwarded to the inner `<textarea>` element.
 *
 * @example
 * ```tsx
 * <Textarea placeholder="Leave a comment…" rows={4} />
 * ```
 */
const Textarea = (props: TextareaProps) => {
  const {
    className,
    size = textareaPropDefs.size.default,
    variant = textareaPropDefs.variant.default,
    color = textareaPropDefs.color.default,
    style,
    ...textareaProps
  } = props;
  return (
    <div
      data-accent-color={color}
      style={style}
      className={classNames('fui-TextareaRoot', className, `fui-r-size-${size}`, `fui-variant-${variant}`)}
    >
      <textarea className="fui-TextareaInput" {...textareaProps} />
      <div className="fui-TextareaChrome" />
    </div>
  );
};
Textarea.displayName = 'Textarea';

export { Textarea };
export type { TextareaProps };
