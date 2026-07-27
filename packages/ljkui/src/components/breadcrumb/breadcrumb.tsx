import { mergeProps, useRender } from '@base-ui/react';
import classNames from 'classnames';
import * as React from 'react';
import { breadcrumbPropDefs } from './breadcrumb.props';

import { Button, DropdownMenu, Typography } from '../';
import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';
import { ChevronRightIcon } from '../../icons';

type BreadcrumbRootChildrenTypes = React.ReactElement<BreadcrumbItemProps | BreadcrumbDropdownProps>;

type BreadcrumbRootOwnProps = GetPropDefTypes<typeof breadcrumbPropDefs>;
interface BreadcrumbRootProps extends PropsWithoutColor<'nav'>, BreadcrumbRootOwnProps {
  /** Renders the breadcrumb as a different element or component. Defaults to `<nav>`. */
  render?: useRender.ComponentProps<'nav'>['render'];
}

/**
 * A navigation trail of `Breadcrumb.Item` (and optionally `Breadcrumb.Dropdown`) children, separated
 * by chevrons. The last child without an `onClick` is rendered as plain text for the current page.
 *
 * @example
 * ```tsx
 * <Breadcrumb.Root>
 *   <Breadcrumb.Item onClick={() => navigate('/')}>Home</Breadcrumb.Item>
 *   <Breadcrumb.Item onClick={() => navigate('/docs')}>Docs</Breadcrumb.Item>
 *   <Breadcrumb.Item>Components</Breadcrumb.Item>
 * </Breadcrumb.Root>
 * ```
 */
const BreadcrumbRoot = (props: BreadcrumbRootProps) => {
  const { className, children, render, color = breadcrumbPropDefs.color.default, ...baseButtonProps } = props;
  const count = React.Children.count(children);

  const breadcrumbChildren = React.Children.map(children as BreadcrumbRootChildrenTypes, (child, index) => {
    const isLastItem = index === count - 1;

    const separator = <ChevronRightIcon className="fui-BreadcrumbSeparator" />;
    if (isLastItem && !child.props.onClick) {
      return (
        <>
          {index > 0 ? separator : null}
          <Typography.Text
            render={<div />}
            data-accent-color={color}
            size={'1'}
            className={classNames('fui-reset', 'fui-BreadcrumbLastItem', child.props.className)}
          >
            {child.props.children}
          </Typography.Text>
        </>
      );
    } else {
      const breadcrumbChild = React.cloneElement(child, {
        color,
        ...child.props,
      });
      return (
        <>
          {index > 0 ? separator : null}
          {breadcrumbChild}
        </>
      );
    }
  });

  return useRender({
    render,
    props: mergeProps(
      baseButtonProps as React.ComponentProps<'nav'>,
      {
        'data-accent-color': color,
        className: classNames('fui-BreadcrumbRoot', className),
        children: breadcrumbChildren,
      } as React.ComponentProps<'nav'>,
    ),
    defaultTagName: 'nav',
  });
};
BreadcrumbRoot.displayName = 'BreadcrumbRoot';

interface BreadcrumbItemProps extends Omit<React.ComponentProps<typeof Button>, 'variant' | 'size'> {}

/** A single clickable crumb, rendered as a small ghost `Button`. */
const BreadcrumbItem = (props: BreadcrumbItemProps) => (
  <Button {...props} size="1" variant={'ghost'} className={classNames('fui-BreadcrumbItem', props.className)} />
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

interface BreadcrumbDropdownProps extends Omit<React.ComponentProps<typeof DropdownMenu.Content>, 'variant' | 'size'> {}

/** A collapsed "..." crumb that opens a dropdown menu of `Breadcrumb.DropdownItem` children. */
const BreadcrumbDropdown = ({ color, ...props }: BreadcrumbDropdownProps) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <BreadcrumbItem color={color}>...</BreadcrumbItem>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content {...props} size="2" color={color}>
      {props.children}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
);

BreadcrumbDropdown.displayName = 'BreadcrumbDropdown';

interface BreadcrumbDropdownItemProps extends Omit<React.ComponentProps<typeof DropdownMenu.Item>, 'color'> {}

/** A menu item inside `Breadcrumb.Dropdown`. */
const BreadcrumbDropdownItem = (props: BreadcrumbDropdownItemProps) => <DropdownMenu.Item {...props} />;

BreadcrumbDropdownItem.displayName = 'BreadcrumbDropdownItem';

export {
  BreadcrumbDropdown as Dropdown,
  BreadcrumbDropdownItem as DropdownItem,
  BreadcrumbItem as Item,
  BreadcrumbRoot as Root,
};

export type {
  BreadcrumbDropdownItemProps as DropdownItemProps,
  BreadcrumbDropdownProps as DropdownProps,
  BreadcrumbItemProps as ItemProps,
  BreadcrumbRootProps as RootProps,
};
