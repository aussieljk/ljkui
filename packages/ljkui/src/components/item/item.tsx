'use client';

import classNames from 'classnames';
import * as React from 'react';

import type { GetPropDefTypes } from '../../helpers';
import { Separator } from '../separator';
import { itemPropDefs } from './item.props';

type ItemRootOwnProps = GetPropDefTypes<typeof itemPropDefs>;
interface ItemRootProps extends React.ComponentPropsWithoutRef<'div'>, ItemRootOwnProps {}

/**
 * A generic row: leading media, a title and description, and trailing actions.
 *
 * The building block for settings lists, search results and pickers — anywhere the same shape repeats
 * and a full `Card` would be too heavy.
 *
 * @example
 * ```tsx
 * <Item.Root>
 *   <Item.Media><Avatar src={user.avatar} /></Item.Media>
 *   <Item.Content>
 *     <Item.Title>{user.name}</Item.Title>
 *     <Item.Description>{user.email}</Item.Description>
 *   </Item.Content>
 *   <Item.Actions><Button>Invite</Button></Item.Actions>
 * </Item.Root>
 * ```
 */
const ItemRoot = (props: ItemRootProps) => {
  const { className, size = itemPropDefs.size.default, variant = itemPropDefs.variant.default, ...rootProps } = props;
  return (
    <div
      {...rootProps}
      className={classNames('fui-ItemRoot', className, `fui-r-size-${size}`, `fui-variant-${variant}`)}
    />
  );
};
ItemRoot.displayName = 'ItemRoot';

interface ItemMediaProps extends React.ComponentPropsWithoutRef<'div'> {}

/** Leading visual — an avatar, icon or thumbnail. */
const ItemMedia = (props: ItemMediaProps) => {
  const { className, ...mediaProps } = props;
  return <div {...mediaProps} className={classNames('fui-ItemMedia', className)} />;
};
ItemMedia.displayName = 'ItemMedia';

interface ItemContentProps extends React.ComponentPropsWithoutRef<'div'> {}

/** The flexible middle column holding the title and description. */
const ItemContent = (props: ItemContentProps) => {
  const { className, ...contentProps } = props;
  return <div {...contentProps} className={classNames('fui-ItemContent', className)} />;
};
ItemContent.displayName = 'ItemContent';

interface ItemTitleProps extends React.ComponentPropsWithoutRef<'div'> {}

/** The item's primary line. */
const ItemTitle = (props: ItemTitleProps) => {
  const { className, ...titleProps } = props;
  return <div {...titleProps} className={classNames('fui-ItemTitle', className)} />;
};
ItemTitle.displayName = 'ItemTitle';

interface ItemDescriptionProps extends React.ComponentPropsWithoutRef<'div'> {}

/** Supporting text below the title. */
const ItemDescription = (props: ItemDescriptionProps) => {
  const { className, ...descriptionProps } = props;
  return <div {...descriptionProps} className={classNames('fui-ItemDescription', className)} />;
};
ItemDescription.displayName = 'ItemDescription';

interface ItemActionsProps extends React.ComponentPropsWithoutRef<'div'> {}

/** Trailing controls, pinned to the end of the row. */
const ItemActions = (props: ItemActionsProps) => {
  const { className, ...actionsProps } = props;
  return <div {...actionsProps} className={classNames('fui-ItemActions', className)} />;
};
ItemActions.displayName = 'ItemActions';

interface ItemGroupProps extends React.ComponentPropsWithoutRef<'div'> {}

/** A list of items sharing one surface. */
const ItemGroup = (props: ItemGroupProps) => {
  const { className, ...groupProps } = props;
  return <div role="list" {...groupProps} className={classNames('fui-ItemGroup', className)} />;
};
ItemGroup.displayName = 'ItemGroup';

type ItemSeparatorProps = React.ComponentProps<typeof Separator>;

/** A divider between items in a group. */
const ItemSeparator = (props: ItemSeparatorProps) => {
  const { className, size = '4', ...separatorProps } = props;
  return <Separator size={size} {...separatorProps} className={classNames('fui-ItemSeparator', className)} />;
};
ItemSeparator.displayName = 'ItemSeparator';

export {
  ItemActions as Actions,
  ItemContent as Content,
  ItemDescription as Description,
  ItemGroup as Group,
  ItemMedia as Media,
  ItemRoot as Root,
  ItemSeparator as Separator,
  ItemTitle as Title,
};
export type {
  ItemActionsProps as ActionsProps,
  ItemContentProps as ContentProps,
  ItemDescriptionProps as DescriptionProps,
  ItemGroupProps as GroupProps,
  ItemMediaProps as MediaProps,
  ItemRootProps as RootProps,
  ItemSeparatorProps as SeparatorProps,
  ItemTitleProps as TitleProps,
};
