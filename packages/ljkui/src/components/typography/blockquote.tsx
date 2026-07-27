import classNames from 'classnames';
import * as React from 'react';
import { Text } from './text';
import { blockquotePropDefs } from './blockquote.props';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';

type BlockQuoteOwnProps = GetPropDefTypes<typeof blockquotePropDefs>;
interface BlockquoteProps extends PropsWithoutColor<'blockquote'>, BlockQuoteOwnProps {}

/**
 * A quoted block of text, rendered as a `<blockquote>` element with a leading border.
 *
 * @example
 * ```tsx
 * <Blockquote>Perfect typography is certainly the most elusive of all arts.</Blockquote>
 * ```
 */
const Blockquote = (props: BlockquoteProps) => {
  const { children, className, ...blockquoteProps } = props;
  return (
    <Text render={<blockquote />} {...blockquoteProps} className={classNames('fui-Blockquote', className)}>
      {children}
    </Text>
  );
};
Blockquote.displayName = 'Blockquote';

export { Blockquote };
export type { BlockquoteProps };
