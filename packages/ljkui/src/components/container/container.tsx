import { mergeProps, useRender } from '@base-ui/react';
import classNames from 'classnames';
import * as React from 'react';

import { containerPropDefs } from './container.props';
import { withBreakpoints } from '../../helpers';

import type { GetPropDefTypes } from '../../helpers';

type ContainerOwnProps = GetPropDefTypes<typeof containerPropDefs>;
interface ContainerProps extends Omit<React.ComponentProps<'div'>, 'children'>, ContainerOwnProps {
  /** Renders the container as a different element or component, e.g. `render={<main />}`. Defaults to `<div>`. */
  render?: useRender.ComponentProps<'div'>['render'];
  children?: React.ReactNode;
}

/**
 * A max-width, horizontally-centered page wrapper with gutters.
 *
 * @example
 * ```tsx
 * <Container size="3" render={<main />}>
 *   <Text>Centered page content.</Text>
 * </Container>
 * ```
 */
const Container = (props: ContainerProps) => {
  const {
    render,
    children,
    className,
    size = containerPropDefs.size.default,
    align = containerPropDefs.align.default,
    ...containerProps
  } = props;

  return useRender({
    render,
    props: mergeProps(
      containerProps as React.ComponentProps<'div'>,
      {
        className: classNames('fui-Container', className, withBreakpoints(size, 'fui-r-size'), `fui-r-align-${align}`),
        children,
      } as React.ComponentProps<'div'>,
    ),
    defaultTagName: 'div',
  });
};
Container.displayName = 'Container';

export { Container };
export type { ContainerProps };
