'use client';

import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card';
import classNames from 'classnames';
import * as React from 'react';
import { Theme } from '../../theme';
import { hoverCardContentPropDefs } from './hover-card.props';

import type { GetPropDefTypes } from '../../helpers';

/** Creates a detached handle for opening a hover card imperatively, optionally with a typed payload. */
const createHandle = PreviewCardPrimitive.createHandle;

type HoverCardHandle<T = unknown> = ReturnType<typeof PreviewCardPrimitive.createHandle<T>>;

interface HoverCardRootProps<T = unknown> extends Omit<
  React.ComponentProps<typeof PreviewCardPrimitive.Root>,
  'className' | 'render' | 'children' | 'handle'
> {
  /** Card parts, or a render function that receives the `payload` passed by the opening trigger or handle. */
  children?: React.ReactNode | ((props: { payload: T | undefined }) => React.ReactNode);
  /** A handle created with `HoverCard.createHandle()` for opening the card imperatively with a typed payload. */
  handle?: HoverCardHandle<T>;
}

/**
 * A rich preview card that opens when hovering or focusing a trigger, e.g. a user profile preview on a
 * mention. Can be controlled via `open`/`onOpenChange` or left uncontrolled.
 *
 * @example
 * ```tsx
 * <HoverCard.Root>
 *   <HoverCard.Trigger>
 *     <Link href="/users/jane">@jane</Link>
 *   </HoverCard.Trigger>
 *   <HoverCard.Content>
 *     <Text>Jane Doe, Engineer</Text>
 *   </HoverCard.Content>
 * </HoverCard.Root>
 * ```
 */
function HoverCardRoot<T = unknown>(props: HoverCardRootProps<T>) {
  return <PreviewCardPrimitive.Root {...(props as React.ComponentProps<typeof PreviewCardPrimitive.Root>)} />;
}
HoverCardRoot.displayName = 'HoverCardRoot';

interface HoverCardTriggerProps<T = unknown> extends Omit<
  React.ComponentProps<typeof PreviewCardPrimitive.Trigger>,
  'render' | 'className' | 'handle' | 'payload'
> {
  className?: string;
  /** The single element rendered as the trigger, e.g. a `Link`. */
  children: React.ReactElement;
  /** A handle created with `HoverCard.createHandle()`, for opening a card rendered elsewhere. */
  handle?: HoverCardHandle<T>;
  /** Data passed to the card's `children` render function when this trigger opens it. */
  payload?: T;
  /**
   * How long to wait before the preview card opens. Specified in milliseconds.
   * @default 200
   */
  delay?: number;
  /**
   * How long to wait before closing the preview card. Specified in milliseconds.
   * @default 150
   */
  closeDelay?: number;
}

/**
 * The element that opens the card on hover or keyboard focus. Renders its child element as the trigger,
 * so pass exactly one element.
 */
function HoverCardTrigger<T = unknown>(props: HoverCardTriggerProps<T>) {
  const { children, delay = 200, closeDelay = 150, ...rest } = props;
  return (
    <PreviewCardPrimitive.Trigger
      className="fui-HoverCardTrigger"
      delay={delay}
      closeDelay={closeDelay}
      render={children}
      {...(rest as React.ComponentProps<typeof PreviewCardPrimitive.Trigger>)}
    />
  );
}
HoverCardTrigger.displayName = 'HoverCardTrigger';

type PositionerProps = React.ComponentProps<typeof PreviewCardPrimitive.Positioner>;
type PortalProps = React.ComponentProps<typeof PreviewCardPrimitive.Portal>;
type PopupProps = React.ComponentProps<typeof PreviewCardPrimitive.Popup>;

type HoverCardContentOwnProps = GetPropDefTypes<typeof hoverCardContentPropDefs>;
interface HoverCardContentProps
  extends
    Omit<PopupProps, 'className' | 'render' | 'style'>,
    Pick<
      PositionerProps,
      | 'side'
      | 'sideOffset'
      | 'collisionPadding'
      | 'collisionBoundary'
      | 'collisionAvoidance'
      | 'arrowPadding'
      | 'sticky'
      | 'anchor'
      | 'disableAnchorTracking'
    >,
    HoverCardContentOwnProps {
  className?: string;
  style?: React.CSSProperties;
  /** The element the card portal is appended to. Defaults to the document body. */
  container?: PortalProps['container'];
  /** Keeps the portal content mounted in the DOM while the card is closed. */
  keepMounted?: PortalProps['keepMounted'];
  /**
   * The alignment of the content relative to the trigger.
   * @default 'center'
   */
  align?: PositionerProps['align'];
  /** The offset from the alignment edge in pixels. */
  alignOffset?: PositionerProps['alignOffset'];
}

/**
 * The floating card panel. Rendered in a portal, positioned against the trigger, and re-wrapped in the
 * current `Theme`.
 */
const HoverCardContent = (props: HoverCardContentProps) => {
  const {
    className,
    keepMounted,
    container,
    size = hoverCardContentPropDefs.size.default,
    variant = hoverCardContentPropDefs.variant.default,
    align = 'center',
    side,
    sideOffset = 8,
    alignOffset,
    collisionPadding = 10,
    collisionBoundary,
    collisionAvoidance,
    arrowPadding,
    sticky,
    anchor,
    disableAnchorTracking,
    children,
    ...contentProps
  } = props;
  return (
    <PreviewCardPrimitive.Portal container={container} keepMounted={keepMounted}>
      <PreviewCardPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
        collisionBoundary={collisionBoundary}
        collisionAvoidance={collisionAvoidance}
        arrowPadding={arrowPadding}
        sticky={sticky}
        anchor={anchor}
        disableAnchorTracking={disableAnchorTracking}
        className="fui-HoverCardPositioner"
      >
        <Theme
          render={<PreviewCardPrimitive.Popup />}
          {...contentProps}
          className={classNames('fui-HoverCardContent', `fui-variant-${variant}`, className, `fui-r-size-${size}`)}
        >
          {children}
        </Theme>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
};
HoverCardContent.displayName = 'HoverCardContent';

export { HoverCardContent as Content, createHandle, HoverCardRoot as Root, HoverCardTrigger as Trigger };
export type {
  HoverCardContentProps as ContentProps,
  HoverCardHandle as Handle,
  HoverCardRootProps as RootProps,
  HoverCardTriggerProps as TriggerProps,
};
