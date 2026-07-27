'use client';

import classNames from 'classnames';
import * as React from 'react';

import { colorProp, type GetPropDefTypes } from '../../helpers';
import { Text, type TextProps } from '../typography/text';

// ============================================================================
// Types
// ============================================================================

type EmptyMediaVariant = 'ghost' | 'soft';
type EmptyMediaColor = GetPropDefTypes<{ color: typeof colorProp }>['color'];

// ============================================================================
// Root
// ============================================================================

interface EmptyRootProps extends React.ComponentProps<'div'> {}

/**
 * The root container for an empty state. Renders a `<div>` element.
 *
 * Groups all parts of the empty state with centered flex layout.
 *
 * @example
 * ```tsx
 * <Empty.Root>
 *   <Empty.Header>
 *     <Empty.Media>
 *       <InboxIcon />
 *     </Empty.Media>
 *     <Empty.Title>No messages</Empty.Title>
 *     <Empty.Description>You don't have any messages yet.</Empty.Description>
 *   </Empty.Header>
 *   <Empty.Content>
 *     <Button>Compose</Button>
 *   </Empty.Content>
 * </Empty.Root>
 * ```
 */
const EmptyRoot = React.forwardRef<HTMLDivElement, EmptyRootProps>((props, forwardedRef) => {
  const { className, ...rootProps } = props;
  return <div ref={forwardedRef} {...rootProps} className={classNames('fui-EmptyRoot', className)} />;
});
EmptyRoot.displayName = 'EmptyRoot';

// ============================================================================
// Header
// ============================================================================

interface EmptyHeaderProps extends React.ComponentProps<'div'> {}

/**
 * The header section of an empty state. Renders a `<div>` element.
 *
 * Contains the media, title, and description.
 *
 * @example
 * ```tsx
 * <Empty.Header>
 *   <Empty.Title>No results</Empty.Title>
 *   <Empty.Description>Try a different search term.</Empty.Description>
 * </Empty.Header>
 * ```
 */
const EmptyHeader = React.forwardRef<HTMLDivElement, EmptyHeaderProps>((props, forwardedRef) => {
  const { className, ...headerProps } = props;
  return <div ref={forwardedRef} {...headerProps} className={classNames('fui-EmptyHeader', className)} />;
});
EmptyHeader.displayName = 'EmptyHeader';

// ============================================================================
// Media
// ============================================================================

interface EmptyMediaProps extends Omit<React.ComponentProps<'div'>, 'color'> {
  /**
   * The visual variant of the media container.
   * - `'ghost'` - Transparent background (use for avatars, emojis)
   * - `'soft'` - Subtle accent background with rounded corners
   *
   * @default 'soft'
   */
  variant?: EmptyMediaVariant;
  /**
   * The accent color of the media container background (visible with the 'soft' variant).
   * @default 'gray'
   */
  color?: EmptyMediaColor;
}

/**
 * A container for icons or images in an empty state. Renders a `<div>` element.
 *
 * @example
 * ```tsx
 * <Empty.Media color="blue">
 *   <SearchIcon />
 * </Empty.Media>
 * ```
 */
const EmptyMedia = React.forwardRef<HTMLDivElement, EmptyMediaProps>((props, forwardedRef) => {
  const { className, variant = 'soft', color = 'gray', ...mediaProps } = props;
  return (
    <div
      ref={forwardedRef}
      data-accent-color={color}
      {...mediaProps}
      className={classNames('fui-EmptyMedia', `fui-variant-${variant}`, className)}
    />
  );
});
EmptyMedia.displayName = 'EmptyMedia';

// ============================================================================
// Title
// ============================================================================

type EmptyTitleProps = TextProps;

/**
 * The title of an empty state. Renders a `<div>` element styled with `<Text>`, defaulting to size '4'
 * and semi-bold weight.
 *
 * @example
 * ```tsx
 * <Empty.Title>No items found</Empty.Title>
 * ```
 */
const EmptyTitle = (props: EmptyTitleProps) => {
  const { className, size = '4', weight = 'semi-bold', ...titleProps } = props;
  return (
    <Text
      render={<div />}
      size={size}
      weight={weight}
      {...titleProps}
      className={classNames('fui-EmptyTitle', className)}
    />
  );
};
EmptyTitle.displayName = 'EmptyTitle';

// ============================================================================
// Description
// ============================================================================

type EmptyDescriptionProps = TextProps;

/**
 * The description text of an empty state. Renders a `<p>` element styled with `<Text>`, defaulting to
 * size '2' and gray color.
 *
 * @example
 * ```tsx
 * <Empty.Description>
 *   Get started by creating your first item.
 * </Empty.Description>
 * ```
 */
const EmptyDescription = (props: EmptyDescriptionProps) => {
  const { className, size = '2', color = 'gray', ...descriptionProps } = props;
  return (
    <Text
      render={<p />}
      size={size}
      color={color}
      {...descriptionProps}
      className={classNames('fui-EmptyDescription', className)}
    />
  );
};
EmptyDescription.displayName = 'EmptyDescription';

// ============================================================================
// Actions
// ============================================================================

interface EmptyActionsProps extends React.ComponentProps<'div'> {}

/**
 * A container for actions in an empty state. Renders a `<div>` element.
 *
 * Typically used for buttons or other interactive elements.
 *
 * @example
 * ```tsx
 * <Empty.Actions>
 *   <Button>Create item</Button>
 *   <Button variant="ghost">Learn more</Button>
 * </Empty.Actions>
 * ```
 */
const EmptyActions = React.forwardRef<HTMLDivElement, EmptyActionsProps>((props, forwardedRef) => {
  const { className, ...actionsProps } = props;
  return <div ref={forwardedRef} {...actionsProps} className={classNames('fui-EmptyActions', className)} />;
});
EmptyActions.displayName = 'EmptyActions';

// ============================================================================
// Exports
// ============================================================================

export {
  EmptyActions as Actions,
  EmptyDescription as Description,
  EmptyHeader as Header,
  EmptyMedia as Media,
  EmptyRoot as Root,
  EmptyTitle as Title,
};

export type {
  EmptyActionsProps as ActionsProps,
  EmptyDescriptionProps as DescriptionProps,
  EmptyHeaderProps as HeaderProps,
  EmptyMediaColor as MediaColor,
  EmptyMediaProps as MediaProps,
  EmptyMediaVariant as MediaVariant,
  EmptyRootProps as RootProps,
  EmptyTitleProps as TitleProps,
};
