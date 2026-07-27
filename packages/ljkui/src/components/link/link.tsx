import { useRender } from '@base-ui/react';
import classNames from 'classnames';
import * as React from 'react';
import { Text } from '../typography/text';
import { linkPropDefs } from './link.props';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';

type LinkOwnProps = GetPropDefTypes<typeof linkPropDefs>;
interface LinkProps extends PropsWithoutColor<'a'>, LinkOwnProps {
  /**
   * Use the `render` prop to override the default rendered element,
   * e.g. to render a router-specific link component instead of `<a>`.
   */
  render?: useRender.ComponentProps<'a'>['render'];
}

/**
 * A semantic text link with themed typography, styled as an `<a>` element
 * by default (override via the `render` prop).
 *
 * @example
 * ```tsx
 * <Link href="/pricing" underline="hover">
 *   View pricing
 * </Link>
 * ```
 */
const Link = (props: LinkProps) => {
  const { children, className, render, underline = linkPropDefs.underline.default, ...linkProps } = props;
  return (
    <Text
      {...linkProps}
      render={render ?? <a />}
      className={classNames('fui-reset', 'fui-Link', className, `fui-underline-${underline}`)}
    >
      {children}
    </Text>
  );
};
Link.displayName = 'Link';

export { Link };
export type { LinkProps };
