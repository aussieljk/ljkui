'use client';

import classNames from 'classnames';
import * as React from 'react';
import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';
import { Avatar } from '../avatar';
import { avatarStackPropDefs } from './avatar-stack.props';

const AvatarStackContext = React.createContext<{
  size: (typeof avatarStackPropDefs.size.values)[number];
}>({
  size: avatarStackPropDefs.size.default,
});

type AvatarStackRootOwnProps = GetPropDefTypes<typeof avatarStackPropDefs>;

interface AvatarStackRootProps extends PropsWithoutColor<'div'>, AvatarStackRootOwnProps {}

/**
 * A stack of overlapping avatars where the first child appears on top. Children are rendered in reverse
 * DOM order so that stacking follows source order visually.
 *
 * @example
 * ```tsx
 * <AvatarStack.Root>
 *   <AvatarStack.Avatar src="/a.png" fallback="Ada Lovelace" />
 *   <AvatarStack.Avatar src="/b.png" fallback="Grace Hopper" />
 * </AvatarStack.Root>
 * ```
 */
const AvatarStackRoot = (props: AvatarStackRootProps) => {
  const {
    className,
    children,
    size = avatarStackPropDefs.size.default,

    ...rootProps
  } = props;

  // Convert children to array and reverse it only once during render
  const reversedChildren = React.useMemo(() => React.Children.toArray(children).reverse(), [children]);

  return (
    <div {...rootProps} className={classNames('fui-AvatarStackRoot', className, `fui-r-size-${size}`)}>
      <AvatarStackContext.Provider value={{ size }}>{reversedChildren}</AvatarStackContext.Provider>
    </div>
  );
};

AvatarStackRoot.displayName = 'AvatarStackRoot';

type AvatarStackAvatarProps = Omit<React.ComponentProps<typeof Avatar>, 'size'>;

/** An avatar within `AvatarStack.Root`. Its `size` is inherited from the stack. */
const AvatarStackAvatar = ({ className, ...props }: AvatarStackAvatarProps) => {
  const { size } = React.useContext(AvatarStackContext);
  return <Avatar size={size} className={classNames('fui-AvatarStackAvatar', className)} {...props} />;
};

AvatarStackAvatar.displayName = 'AvatarStackAvatar';

export { AvatarStackAvatar as Avatar, AvatarStackRoot as Root };
export type { AvatarStackAvatarProps as AvatarProps, AvatarStackRootProps as RootProps };
