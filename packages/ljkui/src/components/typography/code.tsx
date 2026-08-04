import { rootClassName } from '../../helpers';
import * as React from 'react';

import { codePropDefs } from './code.props';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';

type CodeOwnProps = GetPropDefTypes<typeof codePropDefs>;
interface CodeProps extends PropsWithoutColor<'code'>, CodeOwnProps {}

/**
 * An inline code snippet, rendered as a `<code>` element in the monospace font.
 *
 * @example
 * ```tsx
 * <Code>console.log()</Code>
 * ```
 */
const Code = (props: CodeProps) => {
  const {
    className,
    size = codePropDefs.size.default,
    variant = codePropDefs.variant.default,
    weight = codePropDefs.weight.default,
    color = codePropDefs.color.default,
    highContrast = codePropDefs.highContrast.default,
    ...codeProps
  } = props;
  return (
    <code
      {...codeProps}
      data-accent-color={color}
      className={rootClassName('fui-Code', className, { size, variant, highContrast }, `fui-r-weight-${weight}`)}
    />
  );
};
Code.displayName = 'Code';

export { Code };
export type { CodeProps };
