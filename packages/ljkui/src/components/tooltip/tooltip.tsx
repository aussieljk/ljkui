'use client';

import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import classNames from 'classnames';
import * as React from 'react';
import { ReversedTheme } from '../../theme';
import { Text } from '../typography/text';
import { tooltipPropDefs } from './tooltip.props';

import type { GetPropDefTypes } from '../../helpers';

type TooltipOwnProps = GetPropDefTypes<typeof tooltipPropDefs>;
type TooltipActions = React.ComponentProps<typeof TooltipPrimitive.Root>['actionsRef'] extends
  | React.RefObject<infer T>
  | undefined
  ? T
  : never;

interface TooltipProps extends TooltipOwnProps {
  /** The trigger element the tooltip is attached to. Must be a single React element. */
  children: React.ReactElement;
  // TODO: See if we can automate making prop defs with `required: true` non nullable
  /** The content displayed inside the tooltip popup. */
  content: NonNullable<TooltipOwnProps['content']>;
  className?: string;
  style?: React.CSSProperties;
  // Root props
  /** Controlled open state of the tooltip. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Event handler called when the tooltip opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Event handler called after any animations complete when the tooltip is opened or closed.
   */
  onOpenChangeComplete?: (open: boolean) => void;
  /**
   * Delay in milliseconds before the tooltip opens on hover/focus.
   * @default 400
   */
  delay?: number;
  /** Delay in milliseconds before the tooltip closes after the pointer leaves. */
  closeDelay?: number;
  /**
   * Whether the tooltip should close when the trigger is clicked.
   * @default true
   */
  closeOnClick?: boolean;
  /**
   * Whether the tooltip is disabled. When disabled, the tooltip will not open
   * regardless of trigger interactions.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the tooltip contents can be hovered without closing the tooltip.
   * @default false
   */
  disableHoverablePopup?: boolean;
  /**
   * Determines which axis the tooltip should track the cursor on.
   * @default 'none'
   */
  trackCursorAxis?: 'none' | 'x' | 'y' | 'both';
  /**
   * A ref to imperative actions.
   * - `close`: Closes the tooltip imperatively when called.
   * - `unmount`: Unmounts the tooltip manually (useful with external animation libraries).
   */
  actionsRef?: React.RefObject<TooltipActions>;
  // Portal props
  /** Element the portalled tooltip is appended to (defaults to the document body). */
  container?: React.ComponentProps<typeof TooltipPrimitive.Portal>['container'];
  /** Keeps the tooltip mounted in the DOM while closed (useful with external animation libraries). */
  keepMounted?: boolean;
  // Positioner props
  /** Side of the trigger the tooltip is placed on. */
  side?: React.ComponentProps<typeof TooltipPrimitive.Positioner>['side'];
  /**
   * Distance in pixels between the trigger and the tooltip.
   * @default 4
   */
  sideOffset?: React.ComponentProps<typeof TooltipPrimitive.Positioner>['sideOffset'];
  /** Alignment of the tooltip against the trigger. */
  align?: React.ComponentProps<typeof TooltipPrimitive.Positioner>['align'];
  /** Additional offset in pixels along the alignment axis. */
  alignOffset?: React.ComponentProps<typeof TooltipPrimitive.Positioner>['alignOffset'];
  /**
   * Minimum distance in pixels kept from the viewport edges when avoiding collisions.
   * @default 10
   */
  collisionPadding?: React.ComponentProps<typeof TooltipPrimitive.Positioner>['collisionPadding'];
  /** Keeps the tooltip within the viewport even after the trigger is scrolled out of view. */
  sticky?: React.ComponentProps<typeof TooltipPrimitive.Positioner>['sticky'];
}

/**
 * A small popup that shows `content` when its child element is hovered or focused.
 *
 * Wraps Base UI's Tooltip primitive: the child becomes the trigger (via the
 * render prop), and the popup renders in a portal with a reversed theme and an
 * arrow.
 */
const TooltipImpl = (props: TooltipProps) => {
  const {
    children,
    className,
    open,
    defaultOpen,
    onOpenChange,
    onOpenChangeComplete,
    delay = 400,
    closeDelay,
    closeOnClick,
    disabled,
    disableHoverablePopup,
    trackCursorAxis,
    actionsRef,
    content,
    container,
    keepMounted,
    // Positioner props
    side,
    sideOffset = 4,
    align,
    alignOffset,
    collisionPadding = 10,
    sticky,
    ...tooltipProps
  } = props;

  const rootProps = {
    open,
    defaultOpen,
    onOpenChange,
    onOpenChangeComplete,
    disabled,
    disableHoverablePopup,
    trackCursorAxis,
    actionsRef,
  };

  const triggerProps = {
    delay,
    closeDelay,
    closeOnClick,
  };

  const positionerProps = {
    side,
    sideOffset,
    align,
    alignOffset,
    collisionPadding,
    sticky,
  };

  return (
    <TooltipPrimitive.Root {...rootProps}>
      <TooltipPrimitive.Trigger render={children} {...triggerProps} />
      <TooltipPrimitive.Portal container={container} keepMounted={keepMounted}>
        <TooltipPrimitive.Positioner className="fui-TooltipPositioner" {...positionerProps}>
          <ReversedTheme
            render={<TooltipPrimitive.Popup />}
            {...tooltipProps}
            className={classNames('fui-TooltipContent', className)}
          >
            <Text render={<p />} className="fui-TooltipText" size="2">
              {content}
            </Text>
            <TooltipPrimitive.Arrow className="fui-TooltipArrow" />
          </ReversedTheme>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};
TooltipImpl.displayName = 'Tooltip';

// Create compound component with Provider
/**
 * A small popup that shows `content` when its child element is hovered or focused.
 *
 * `Tooltip.Provider` (Base UI's Tooltip.Provider) can wrap a group of tooltips
 * to share a hover delay, so moving between triggers opens instantly.
 *
 * @example
 * ```tsx
 * <Tooltip content="Add to library">
 *   <IconButton>
 *     <PlusIcon />
 *   </IconButton>
 * </Tooltip>
 * ```
 */
const Tooltip = Object.assign(TooltipImpl, {
  Provider: TooltipPrimitive.Provider,
});

export { Tooltip, type TooltipActions };
export type { TooltipProps };
