import { mergeProps, useRender } from '@base-ui/react';
import classNames from 'classnames';
import * as React from 'react';

import { cardPropDefs } from './card.props';

import type { GetPropDefTypes } from '../../helpers';

type CardOwnProps = GetPropDefTypes<typeof cardPropDefs>;
interface CardProps extends Omit<React.ComponentProps<'div'>, 'children'>, CardOwnProps {
  /** Renders the card as a different element or component, e.g. `render={<a href="..." />}`. Defaults to `<div>`. */
  render?: useRender.ComponentProps<'div'>['render'];
  children?: React.ReactNode;
}

/**
 * A content container with padding, rounded corners and a surface background.
 *
 * @example
 * ```tsx
 * <Card size="2">
 *   <Text>Card content</Text>
 * </Card>
 * ```
 */
const Card = (props: CardProps) => {
  const {
    render,
    children,
    className,
    size = cardPropDefs.size.default,
    variant = cardPropDefs.variant.default,
    ...cardProps
  } = props;

  return useRender({
    render,
    props: mergeProps(
      cardProps as React.ComponentProps<'div'>,
      {
        className: classNames('fui-reset', 'fui-Card', className, `fui-r-size-${size}`, `fui-variant-${variant}`),
        children,
      } as React.ComponentProps<'div'>,
    ),
    defaultTagName: 'div',
  });
};
Card.displayName = 'Card';

export { Card };
export type { CardProps };
