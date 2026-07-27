'use client';

import classNames from 'classnames';
import * as React from 'react';

import type { GetPropDefTypes } from '../../helpers';
import { ThickChevronRightIcon } from '../../icons';
import { paginationPropDefs } from './pagination.props';

type PaginationSize = NonNullable<GetPropDefTypes<typeof paginationPropDefs>['size']>;
const PaginationContext = React.createContext<PaginationSize>(paginationPropDefs.size.default);

type PaginationRootOwnProps = GetPropDefTypes<typeof paginationPropDefs>;
interface PaginationRootProps extends React.ComponentPropsWithoutRef<'nav'>, PaginationRootOwnProps {}

/**
 * Navigation between pages of a result set.
 *
 * Renders as a labelled `<nav>` containing a list of links — mark the current page with `isActive` so
 * it is announced as the current item.
 *
 * @example
 * ```tsx
 * <Pagination.Root>
 *   <Pagination.Content>
 *     <Pagination.Item><Pagination.Previous href="?page=1" /></Pagination.Item>
 *     <Pagination.Item><Pagination.Link href="?page=1">1</Pagination.Link></Pagination.Item>
 *     <Pagination.Item><Pagination.Link href="?page=2" isActive>2</Pagination.Link></Pagination.Item>
 *     <Pagination.Item><Pagination.Ellipsis /></Pagination.Item>
 *     <Pagination.Item><Pagination.Next href="?page=3" /></Pagination.Item>
 *   </Pagination.Content>
 * </Pagination.Root>
 * ```
 */
const PaginationRoot = (props: PaginationRootProps) => {
  const { className, size = paginationPropDefs.size.default, ...rootProps } = props;
  return (
    <PaginationContext.Provider value={size}>
      <nav
        aria-label="Pagination"
        {...rootProps}
        className={classNames('fui-PaginationRoot', className, `fui-r-size-${size}`)}
      />
    </PaginationContext.Provider>
  );
};
PaginationRoot.displayName = 'PaginationRoot';

interface PaginationContentProps extends React.ComponentPropsWithoutRef<'ul'> {}

/** The list of pagination items. */
const PaginationContent = (props: PaginationContentProps) => {
  const { className, ...contentProps } = props;
  return <ul {...contentProps} className={classNames('fui-PaginationContent', className)} />;
};
PaginationContent.displayName = 'PaginationContent';

interface PaginationItemProps extends React.ComponentPropsWithoutRef<'li'> {}

/** A single slot in the pagination list. */
const PaginationItem = (props: PaginationItemProps) => {
  const { className, ...itemProps } = props;
  return <li {...itemProps} className={classNames('fui-PaginationItem', className)} />;
};
PaginationItem.displayName = 'PaginationItem';

interface PaginationLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  /** Marks this link as the page currently being viewed. */
  isActive?: boolean;
}

/** A link to a single page. */
const PaginationLink = (props: PaginationLinkProps) => {
  const { className, isActive, ...linkProps } = props;
  const size = React.useContext(PaginationContext);
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-active={isActive ? '' : undefined}
      {...linkProps}
      className={classNames('fui-PaginationLink', className, `fui-r-size-${size}`)}
    />
  );
};
PaginationLink.displayName = 'PaginationLink';

interface PaginationPreviousProps extends PaginationLinkProps {}

/** A link to the previous page. */
const PaginationPrevious = (props: PaginationPreviousProps) => {
  const { className, children, ...previousProps } = props;
  return (
    <PaginationLink
      aria-label="Go to previous page"
      {...previousProps}
      className={classNames('fui-PaginationPrevious', className)}
    >
      <ThickChevronRightIcon className="fui-PaginationChevronStart" />
      {children ?? 'Previous'}
    </PaginationLink>
  );
};
PaginationPrevious.displayName = 'PaginationPrevious';

interface PaginationNextProps extends PaginationLinkProps {}

/** A link to the next page. */
const PaginationNext = (props: PaginationNextProps) => {
  const { className, children, ...nextProps } = props;
  return (
    <PaginationLink aria-label="Go to next page" {...nextProps} className={classNames('fui-PaginationNext', className)}>
      {children ?? 'Next'}
      <ThickChevronRightIcon />
    </PaginationLink>
  );
};
PaginationNext.displayName = 'PaginationNext';

interface PaginationEllipsisProps extends React.ComponentPropsWithoutRef<'span'> {}

/** Stands in for a run of skipped pages. Hidden from assistive technology. */
const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const { className, children, ...ellipsisProps } = props;
  return (
    <span aria-hidden {...ellipsisProps} className={classNames('fui-PaginationEllipsis', className)}>
      {children ?? '…'}
    </span>
  );
};
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  PaginationContent as Content,
  PaginationEllipsis as Ellipsis,
  PaginationItem as Item,
  PaginationLink as Link,
  PaginationNext as Next,
  PaginationPrevious as Previous,
  PaginationRoot as Root,
};
export type {
  PaginationContentProps as ContentProps,
  PaginationEllipsisProps as EllipsisProps,
  PaginationItemProps as ItemProps,
  PaginationLinkProps as LinkProps,
  PaginationNextProps as NextProps,
  PaginationPreviousProps as PreviousProps,
  PaginationRootProps as RootProps,
};
