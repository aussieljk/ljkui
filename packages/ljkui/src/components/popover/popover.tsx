'use client';

import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import classNames from 'classnames';
import * as React from 'react';
import { Theme } from '../../theme';
import { popoverContentPropDefs } from './popover.props';

import type { GetPropDefTypes } from '../../helpers';

// Handle type - extracts the return type of createHandle with a generic
type PopoverHandle<T = unknown> = ReturnType<typeof PopoverPrimitive.createHandle<T>>;

// Root - generic to infer payload type from handle
type PopoverRootOwnProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Root>,
  'className' | 'render' | 'children' | 'handle'
>;
interface PopoverRootProps<T = unknown> extends PopoverRootOwnProps {
  /**
   * Popover parts, or a render function that receives the `payload` passed by the trigger
   * that opened the popover (when using a detached `handle`).
   */
  children?: React.ReactNode | ((props: { payload: T | undefined }) => React.ReactNode);
  /**
   * Handle created with `Popover.createHandle()` used to control this popover from detached
   * triggers; its generic parameter types the trigger `payload`.
   */
  handle?: PopoverHandle<T>;
}
/**
 * Groups the popover parts and manages open state. Wraps Base UI's `Popover.Root`;
 * supports controlled (`open` + `onOpenChange`) and uncontrolled (`defaultOpen`) usage.
 *
 * @example
 * ```tsx
 * <Popover.Root>
 *   <Popover.Trigger>
 *     <Button>Open</Button>
 *   </Popover.Trigger>
 *   <Popover.Content>Popover content</Popover.Content>
 * </Popover.Root>
 * ```
 */
function PopoverRoot<T = unknown>(props: PopoverRootProps<T>) {
  return <PopoverPrimitive.Root {...(props as React.ComponentProps<typeof PopoverPrimitive.Root>)} />;
}
PopoverRoot.displayName = 'PopoverRoot';

// Trigger - generic to infer payload type from handle
interface PopoverTriggerProps<T = unknown> extends Omit<
  React.ComponentProps<typeof PopoverPrimitive.Trigger>,
  'render' | 'className' | 'handle' | 'payload'
> {
  className?: string;
  /**
   * Handle created with `Popover.createHandle()` linking this trigger to a popover rendered
   * elsewhere in the tree.
   */
  handle?: PopoverHandle<T>;
  /** Arbitrary data passed to the popover's `children` render function when this trigger opens it. */
  payload?: T;
}

/**
 * The element that toggles the popover. Merges its props onto the child element passed as
 * `children` (via Base UI's `render` prop) instead of rendering its own button.
 */
function PopoverTrigger<T = unknown>({ children, ...props }: PopoverTriggerProps<T>) {
  return (
    <PopoverPrimitive.Trigger
      {...(props as React.ComponentProps<typeof PopoverPrimitive.Trigger>)}
      render={children as React.ReactElement}
    />
  );
}
PopoverTrigger.displayName = 'PopoverTrigger';

type PopoverContentOwnProps = GetPropDefTypes<typeof popoverContentPropDefs>;
interface PopoverContentProps extends Omit<
  React.ComponentProps<typeof PopoverPrimitive.Popup>,
  'className' | 'render' | 'style'
> {
  className?: string;
  style?: React.CSSProperties;
  /** Element (or getter) the portal renders into instead of the document body. */
  container?: React.ComponentProps<typeof PopoverPrimitive.Portal>['container'];
  /** Keeps the popup in the DOM while closed. */
  keepMounted?: React.ComponentProps<typeof PopoverPrimitive.Portal>['keepMounted'];
  // Positioner props
  /** Element or virtual element the popup is positioned against instead of the trigger. */
  anchor?: React.ComponentProps<typeof PopoverPrimitive.Positioner>['anchor'];
  /**
   * How the popup is aligned along the anchor's chosen side.
   * @default 'center'
   */
  align?: React.ComponentProps<typeof PopoverPrimitive.Positioner>['align'];
  /** Which side of the anchor the popup is placed against. */
  side?: React.ComponentProps<typeof PopoverPrimitive.Positioner>['side'];
  /**
   * Distance in pixels between the anchor and the popup.
   * @default 8
   */
  sideOffset?: React.ComponentProps<typeof PopoverPrimitive.Positioner>['sideOffset'];
  /** Additional offset in pixels along the alignment axis. */
  alignOffset?: React.ComponentProps<typeof PopoverPrimitive.Positioner>['alignOffset'];
  /**
   * Minimum distance in pixels kept from the edges of the collision boundary.
   * @default 10
   */
  collisionPadding?: React.ComponentProps<typeof PopoverPrimitive.Positioner>['collisionPadding'];
  /** Element(s) the popup is kept within when avoiding collisions. */
  collisionBoundary?: React.ComponentProps<typeof PopoverPrimitive.Positioner>['collisionBoundary'];
  /** How the popup flips or shifts to stay inside the collision boundary. */
  collisionAvoidance?: React.ComponentProps<typeof PopoverPrimitive.Positioner>['collisionAvoidance'];
  /** Minimum distance in pixels the arrow keeps from the popup corners. */
  arrowPadding?: React.ComponentProps<typeof PopoverPrimitive.Positioner>['arrowPadding'];
  /** Keeps the popup within the viewport while its anchor scrolls out of view. */
  sticky?: React.ComponentProps<typeof PopoverPrimitive.Positioner>['sticky'];
  /** Stops repositioning the popup when the anchor moves. */
  disableAnchorTracking?: React.ComponentProps<typeof PopoverPrimitive.Positioner>['disableAnchorTracking'];
}

/**
 * The panel that pops up. Composes Base UI's Portal, Positioner and Popup: the panel is
 * portalled (to the document body by default), positioned against the trigger or `anchor`,
 * and wrapped in a nested `Theme` so theme tokens resolve inside the portal.
 */
const PopoverContent = (props: PopoverContentProps & PopoverContentOwnProps) => {
  const {
    className,
    keepMounted,
    container,
    size = popoverContentPropDefs.size.default,
    variant = popoverContentPropDefs.variant.default,
    // Positioner props
    anchor,
    align = 'center',
    side,
    sideOffset = 8,
    alignOffset,
    collisionPadding = 10,
    collisionBoundary,
    collisionAvoidance,
    arrowPadding,
    sticky,
    disableAnchorTracking,
    // Popup props
    ...popupProps
  } = props;

  return (
    <PopoverPrimitive.Portal container={container} keepMounted={keepMounted}>
      <PopoverPrimitive.Positioner
        className="fui-PopoverPositioner"
        anchor={anchor}
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
        collisionBoundary={collisionBoundary}
        collisionAvoidance={collisionAvoidance}
        arrowPadding={arrowPadding}
        sticky={sticky}
        disableAnchorTracking={disableAnchorTracking}
      >
        <Theme
          render={<PopoverPrimitive.Popup />}
          {...popupProps}
          className={classNames('fui-PopoverContent', `fui-variant-${variant}`, className, `fui-r-size-${size}`)}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
};
PopoverContent.displayName = 'PopoverContent';

interface PopoverCloseProps extends Omit<React.ComponentProps<typeof PopoverPrimitive.Close>, 'className' | 'render'> {}

/**
 * Closes the popover when activated. Merges its props onto the child element passed as
 * `children` instead of rendering its own button.
 */
const PopoverClose = ({ children, ...props }: PopoverCloseProps) => (
  <PopoverPrimitive.Close {...props} render={children as React.ReactElement} />
);
PopoverClose.displayName = 'PopoverClose';

/**
 * Creates a detached popover handle for connecting `Popover.Trigger`s to a `Popover.Root`
 * rendered elsewhere in the tree (re-exported from Base UI).
 */
const createHandle = PopoverPrimitive.createHandle;

export {
  PopoverClose as Close,
  PopoverContent as Content,
  createHandle,
  PopoverRoot as Root,
  PopoverTrigger as Trigger,
};
export type {
  PopoverCloseProps as CloseProps,
  PopoverContentProps as ContentProps,
  PopoverHandle as Handle,
  PopoverRootProps as RootProps,
  PopoverTriggerProps as TriggerProps,
};
