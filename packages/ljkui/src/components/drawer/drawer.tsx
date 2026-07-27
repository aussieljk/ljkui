'use client';

import { DialogRootActions, Dialog as DrawerPrimitive } from '@base-ui/react/dialog';
import classNames from 'classnames';
import * as React from 'react';
import { Theme } from '../../theme';
import { Heading } from '../typography/heading';

// Re-export createHandle for detached triggers
/** Creates a detached handle for opening a drawer imperatively, optionally with a typed payload. */
const createHandle = DrawerPrimitive.createHandle;

// Types from Base UI
type RootProps = React.ComponentProps<typeof DrawerPrimitive.Root>;
type PortalProps = React.ComponentProps<typeof DrawerPrimitive.Portal>;
type PopupProps = React.ComponentProps<typeof DrawerPrimitive.Popup>;

// Handle type - extracts the return type of createHandle with a generic
type DrawerHandle<T = unknown> = ReturnType<typeof DrawerPrimitive.createHandle<T>>;

// Root - generic to infer payload type from handle
interface DrawerRootProps<T = unknown> extends Omit<RootProps, 'modal' | 'children' | 'handle'> {
  /** Drawer content, or a render function that receives the `payload` passed by the opening trigger or handle. */
  children?: React.ReactNode | ((props: { payload: T | undefined }) => React.ReactNode);
  /** A handle created with `Drawer.createHandle()` for opening the drawer imperatively with a typed payload. */
  handle?: DrawerHandle<T>;
}

/**
 * A modal panel that slides in from the edge of the screen. Always rendered as modal; can be controlled
 * via `open`/`onOpenChange` or left uncontrolled.
 *
 * @example
 * ```tsx
 * <Drawer.Root>
 *   <Drawer.Trigger>
 *     <Button>Open settings</Button>
 *   </Drawer.Trigger>
 *   <Drawer.Content>
 *     <Drawer.Header>
 *       <Drawer.Title>Settings</Drawer.Title>
 *     </Drawer.Header>
 *     <Drawer.Body>...</Drawer.Body>
 *     <Drawer.StickyFooter>
 *       <Drawer.Close>
 *         <Button variant="soft">Close</Button>
 *       </Drawer.Close>
 *     </Drawer.StickyFooter>
 *   </Drawer.Content>
 * </Drawer.Root>
 * ```
 */
function DrawerRoot<T = unknown>(props: DrawerRootProps<T>) {
  return <DrawerPrimitive.Root {...(props as RootProps)} modal />;
}
DrawerRoot.displayName = 'DrawerRoot';

// Trigger - generic to infer payload type from handle
interface DrawerTriggerProps<T = unknown> extends Omit<
  React.ComponentProps<typeof DrawerPrimitive.Trigger>,
  'render' | 'handle' | 'payload'
> {
  className?: string;
  /** The single element rendered as the trigger button, e.g. a `Button`. */
  children: React.ReactElement;
  /** A handle created with `Drawer.createHandle()`, for opening a drawer rendered elsewhere. */
  handle?: DrawerHandle<T>;
  /** Data passed to the drawer's `children` render function when this trigger opens it. */
  payload?: T;
}

/** The button that opens the drawer. Renders its child element as the trigger, so pass exactly one element. */
function DrawerTrigger<T = unknown>({ children, ...props }: DrawerTriggerProps<T>) {
  return (
    <DrawerPrimitive.Trigger
      {...(props as React.ComponentProps<typeof DrawerPrimitive.Trigger>)}
      render={children as React.ReactElement}
    />
  );
}
DrawerTrigger.displayName = 'DrawerTrigger';

// Content
interface DrawerContentProps extends Omit<PopupProps, 'className' | 'render' | 'style'> {
  className?: string;
  style?: React.CSSProperties;
  /** The element the drawer portal is appended to. Defaults to the document body. */
  container?: PortalProps['container'];
  /** Keeps the portal content mounted in the DOM while the drawer is closed. */
  keepMounted?: PortalProps['keepMounted'];
}

/**
 * The sliding drawer panel. Rendered in a portal with a backdrop, and re-wrapped in the current `Theme`.
 * Keyboard events do not propagate past it, so parent floating components (e.g. menus) ignore typing
 * inside the drawer.
 */
const DrawerContent = (props: DrawerContentProps) => {
  const { className, children, keepMounted, container, ...popupProps } = props;

  // Stop keyboard events from propagating to parent floating UI components (e.g., DropdownMenu).
  // This prevents the menu's typeahead from capturing keystrokes when typing in drawer inputs.
  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    event.stopPropagation();
  }, []);

  return (
    <DrawerPrimitive.Portal container={container} keepMounted={keepMounted}>
      <DrawerPrimitive.Backdrop className="fui-DialogBackdrop fui-DrawerBackdrop" />
      <DrawerPrimitive.Viewport className="fui-DrawerOverlay" onKeyDown={handleKeyDown}>
        <Theme
          render={<DrawerPrimitive.Popup />}
          {...popupProps}
          aria-describedby={undefined}
          className={classNames('fui-DrawerContent', className)}
        >
          {children}
        </Theme>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  );
};
DrawerContent.displayName = 'DrawerContent';

// Title
type DrawerTitleProps = React.ComponentProps<typeof Heading>;

/** The drawer's accessible title, rendered as a size-4 semi-bold `Heading` by default. */
const DrawerTitle = (props: DrawerTitleProps) => (
  <DrawerPrimitive.Title render={<Heading size="4" weight="semi-bold" {...props} />} />
);
DrawerTitle.displayName = 'DrawerTitle';

// Close
interface DrawerCloseProps extends Omit<React.ComponentProps<typeof DrawerPrimitive.Close>, 'render'> {
  className?: string;
  /** The single element rendered as the close button, e.g. a `Button`. */
  children: React.ReactElement;
}

/** Closes the drawer when activated. Renders its child element as the close button, so pass exactly one element. */
const DrawerClose = ({ children, ...props }: DrawerCloseProps) => (
  <DrawerPrimitive.Close {...props} render={children as React.ReactElement} />
);
DrawerClose.displayName = 'DrawerClose';

// Sticky Footer
type DrawerStickyFooterProps = React.ComponentProps<'div'>;

/** A footer pinned to the bottom of the drawer, typically holding primary actions. */
const DrawerStickyFooter = ({ children, className, ...props }: DrawerStickyFooterProps) => (
  <div className={classNames('fui-DrawerStickyFooter', className)} {...props}>
    {children}
  </div>
);
DrawerStickyFooter.displayName = 'DrawerStickyFooter';

// Header
type DrawerHeaderProps = React.ComponentProps<'div'>;

/** The header area at the top of the drawer, typically holding the `Title`. */
const DrawerHeader = ({ children, className, ...props }: DrawerHeaderProps) => (
  <div className={classNames('fui-DrawerHeader', className)} {...props}>
    {children}
  </div>
);
DrawerHeader.displayName = 'DrawerHeader';

// Body
type DrawerBodyProps = React.ComponentProps<'div'>;

/** The scrollable main content area of the drawer. */
const DrawerBody = ({ children, className, ...props }: DrawerBodyProps) => {
  const localRef = React.useRef<HTMLDivElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div className="fui-BodyScrollArea" {...props} ref={localRef}>
      <div className={classNames('fui-DrawerBody', className)} ref={contentRef}>
        {children}
      </div>
    </div>
  );
};
DrawerBody.displayName = 'DrawerBody';

export {
  DrawerBody as Body,
  DrawerClose as Close,
  DrawerContent as Content,
  createHandle,
  DrawerHeader as Header,
  DrawerRoot as Root,
  DrawerStickyFooter as StickyFooter,
  DrawerTitle as Title,
  DrawerTrigger as Trigger,
};

export type {
  DialogRootActions as Actions,
  DrawerBodyProps as BodyProps,
  DrawerCloseProps as CloseProps,
  DrawerContentProps as ContentProps,
  DrawerHandle as Handle,
  DrawerHeaderProps as HeaderProps,
  DrawerRootProps as RootProps,
  DrawerStickyFooterProps as StickyFooterProps,
  DrawerTitleProps as TitleProps,
  DrawerTriggerProps as TriggerProps,
};
