'use client';

import classNames from 'classnames';
import * as React from 'react';
import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';
import { Avatar } from '../avatar';
import { avatarGroupPropDefs } from './avatar-group.props';

type AvatarGroupRootOwnProps = GetPropDefTypes<typeof avatarGroupPropDefs>;

interface AvatarGroupRootProps extends PropsWithoutColor<'div'>, AvatarGroupRootOwnProps {}

/**
 * A row of overlapping avatars, e.g. for showing members of a group. Size, shape and color are set on
 * the root and applied to every `AvatarGroup.Avatar` inside.
 *
 * @example
 * ```tsx
 * <AvatarGroup.Root>
 *   <AvatarGroup.Avatar src="/a.png" fallback="Ada Lovelace" />
 *   <AvatarGroup.Avatar src="/b.png" fallback="Grace Hopper" />
 * </AvatarGroup.Root>
 * ```
 */
const AvatarGroupRoot = (props: AvatarGroupRootProps) => {
  const {
    className,
    children,
    size = avatarGroupPropDefs.size.default,
    shape = avatarGroupPropDefs.shape.default,
    color = avatarGroupPropDefs.color.default,
    ...rootProps
  } = props;

  return (
    <div
      data-accent-color={color}
      {...rootProps}
      className={classNames('fui-AvatarGroupRoot', className, `fui-r-size-${size}`, `fui-shape-${shape}`)}
    >
      <div className="fui-AvatarGroupRootInner">{children}</div>
    </div>
  );
};

AvatarGroupRoot.displayName = 'AvatarGroupRoot';

type AvatarGroupAvatarProps = Omit<React.ComponentProps<typeof Avatar>, 'size' | 'shape'>;

/** An avatar within `AvatarGroup.Root`. Its `size` and `shape` come from the group's CSS, not per-avatar props. */
const AvatarGroupAvatar = ({ className, ...props }: AvatarGroupAvatarProps) => {
  return <Avatar size="3" className={classNames('fui-AvatarGroupAvatar', className)} {...props} />;
};

AvatarGroupAvatar.displayName = 'AvatarGroupAvatar';

export { AvatarGroupAvatar as Avatar, AvatarGroupRoot as Root };
export type { AvatarGroupAvatarProps as AvatarProps, AvatarGroupRootProps as RootProps };
