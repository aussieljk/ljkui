'use client';

import { AlertDialog as AlertDialogPrimitive, AlertDialogRootActions } from '@base-ui/react/alert-dialog';
import classNames from 'classnames';
import * as React from 'react';
import { Theme } from '../../theme';
import { Heading } from '../typography/heading';
import { Text } from '../typography/text';
import { alertDialogContentPropDefs } from './alert-dialog.props';

import type { GetPropDefTypes } from '../../helpers';
import type { TextProps } from '../typography/text';

// Handle type - extracts the return type of createHandle with a generic
type AlertDialogHandle<T = unknown> = ReturnType<typeof AlertDialogPrimitive.createHandle<T>>;

// Root - generic to infer payload type from handle
type AlertDialogRootOwnProps = Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Root>,
  'className' | 'render' | 'children' | 'handle'
>;
interface AlertDialogRootProps<T = unknown> extends AlertDialogRootOwnProps {
  /** Dialog content, or a render function that receives the `payload` passed by the opening trigger or handle. */
  children?: React.ReactNode | ((props: { payload: T | undefined }) => React.ReactNode);
  /** A handle created with `AlertDialog.createHandle()` for opening the dialog imperatively with a typed payload. */
  handle?: AlertDialogHandle<T>;
}

/**
 * A modal dialog for interrupting confirmations that require a response. Unlike `Dialog`, it cannot be
 * dismissed by clicking outside. Can be controlled via `open`/`onOpenChange` or left uncontrolled.
 *
 * @example
 * ```tsx
 * <AlertDialog.Root>
 *   <AlertDialog.Trigger>
 *     <Button color="danger">Delete</Button>
 *   </AlertDialog.Trigger>
 *   <AlertDialog.Content>
 *     <AlertDialog.Title>Delete post?</AlertDialog.Title>
 *     <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
 *     <AlertDialog.Cancel>
 *       <Button variant="soft">Cancel</Button>
 *     </AlertDialog.Cancel>
 *     <AlertDialog.Action>
 *       <Button color="danger">Delete</Button>
 *     </AlertDialog.Action>
 *   </AlertDialog.Content>
 * </AlertDialog.Root>
 * ```
 */
function AlertDialogRoot<T = unknown>(props: AlertDialogRootProps<T>) {
  return <AlertDialogPrimitive.Root {...(props as React.ComponentProps<typeof AlertDialogPrimitive.Root>)} />;
}
AlertDialogRoot.displayName = 'AlertDialogRoot';

// Trigger - generic to infer payload type from handle
interface AlertDialogTriggerProps<T = unknown> extends Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Trigger>,
  'render' | 'className' | 'handle' | 'payload'
> {
  className?: string;
  /** A handle created with `AlertDialog.createHandle()`, for opening a dialog rendered elsewhere. */
  handle?: AlertDialogHandle<T>;
  /** Data passed to the dialog's `children` render function when this trigger opens it. */
  payload?: T;
}

/**
 * The button that opens the alert dialog. Renders its child element as the trigger, so pass exactly one
 * element (e.g. a `Button`).
 */
function AlertDialogTrigger<T = unknown>({ children, ...props }: AlertDialogTriggerProps<T>) {
  return (
    <AlertDialogPrimitive.Trigger
      {...(props as React.ComponentProps<typeof AlertDialogPrimitive.Trigger>)}
      render={children as React.ReactElement}
    />
  );
}
AlertDialogTrigger.displayName = 'AlertDialogTrigger';

// Content
type AlertDialogContentOwnProps = GetPropDefTypes<typeof alertDialogContentPropDefs>;

type AlertDialogContentContextValue = {
  size: AlertDialogContentOwnProps['size'];
};
const AlertDialogContentContext = React.createContext<AlertDialogContentContextValue>({
  size: alertDialogContentPropDefs.size.default,
});

type PopupProps = React.ComponentProps<typeof AlertDialogPrimitive.Popup>;
type PortalProps = React.ComponentProps<typeof AlertDialogPrimitive.Portal>;

interface AlertDialogContentProps
  extends Omit<PopupProps, 'className' | 'render' | 'style'>, AlertDialogContentOwnProps {
  className?: string;
  style?: React.CSSProperties;
  /** The element the dialog portal is appended to. Defaults to the document body. */
  container?: PortalProps['container'];
  /** Keeps the portal content mounted in the DOM while the dialog is closed. */
  keepMounted?: PortalProps['keepMounted'];
}

/**
 * The alert dialog panel. Rendered in a portal with a backdrop, and re-wrapped in the current `Theme`.
 * Keyboard events do not propagate past it, so parent floating components (e.g. menus) ignore typing
 * inside the dialog.
 */
const AlertDialogContent = (props: AlertDialogContentProps) => {
  const {
    className,
    children,
    keepMounted,
    container,
    size = alertDialogContentPropDefs.size.default,
    ...popupProps
  } = props;

  // Stop keyboard events from propagating to parent floating UI components (e.g., DropdownMenu).
  // This prevents the menu's typeahead from capturing keystrokes when typing in alert dialog inputs.
  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    event.stopPropagation();
  }, []);

  return (
    <AlertDialogPrimitive.Portal container={container} keepMounted={keepMounted}>
      <AlertDialogPrimitive.Backdrop className="fui-DialogBackdrop fui-AlertDialogBackdrop" />
      <AlertDialogPrimitive.Viewport className="fui-DialogOverlay fui-AlertDialogOverlay" onKeyDown={handleKeyDown}>
        <Theme
          render={<AlertDialogPrimitive.Popup />}
          {...popupProps}
          className={classNames('fui-DialogContent', 'fui-AlertDialogContent', className, `fui-r-size-${size}`)}
        >
          <AlertDialogContentContext.Provider value={React.useMemo(() => ({ size }), [size])}>
            {children}
          </AlertDialogContentContext.Provider>
        </Theme>
      </AlertDialogPrimitive.Viewport>
    </AlertDialogPrimitive.Portal>
  );
};
AlertDialogContent.displayName = 'AlertDialogContent';

// Title
type AlertDialogTitleProps = React.ComponentProps<typeof Heading>;

/**
 * The dialog's accessible title, rendered as a `Heading`. Its size is derived from the `Content` size
 * unless overridden with the `size` prop.
 */
const AlertDialogTitle = ({ size: sizeProp, className, ...props }: AlertDialogTitleProps) => {
  const { size: contextSize } = React.useContext(AlertDialogContentContext);
  let size: AlertDialogTitleProps['size'];

  if (contextSize) {
    size = (
      {
        '1': '3',
        '2': '5',
        '3': '5',
        '4': '6',
      } as const
    )[contextSize];
  }

  return (
    <AlertDialogPrimitive.Title
      render={
        <Heading size={sizeProp || size} trim="start" className={classNames('fui-DialogTitle', className)} {...props} />
      }
    />
  );
};
AlertDialogTitle.displayName = 'AlertDialogTitle';

// Description
type AlertDialogDescriptionProps = TextProps;

/**
 * The dialog's accessible description, rendered as a paragraph of `Text`. Its size is derived from the
 * `Content` size unless overridden with the `size` prop.
 */
const AlertDialogDescription = ({ size: sizeProp, className, ...props }: AlertDialogDescriptionProps) => {
  const { size: contextSize } = React.useContext(AlertDialogContentContext);
  let size: AlertDialogDescriptionProps['size'];

  if (contextSize) {
    size = (
      {
        '1': '1',
        '2': '2',
        '3': '2',
        '4': '3',
      } as const
    )[contextSize];
  }

  return (
    <AlertDialogPrimitive.Description
      render={
        <Text
          render={<p />}
          size={sizeProp || size}
          className={classNames('fui-DialogDescription', className)}
          {...props}
        />
      }
    />
  );
};
AlertDialogDescription.displayName = 'AlertDialogDescription';

// Close (new Base UI component)
interface AlertDialogCloseProps extends Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Close>,
  'render' | 'className'
> {
  className?: string;
}

/** Closes the dialog when activated. Renders its child element as the close button, so pass exactly one element. */
const AlertDialogClose = ({ children, ...props }: AlertDialogCloseProps) => (
  <AlertDialogPrimitive.Close {...props} render={children as React.ReactElement} />
);
AlertDialogClose.displayName = 'AlertDialogClose';

// Action (backwards compatibility alias for Close)
interface AlertDialogActionProps extends AlertDialogCloseProps {}
/** The confirming action button. Alias of `Close`, kept for radix-ui API compatibility. */
const AlertDialogAction = AlertDialogClose;
AlertDialogAction.displayName = 'AlertDialogAction';

// Cancel (backwards compatibility alias for Close)
interface AlertDialogCancelProps extends AlertDialogCloseProps {}
/** The cancelling action button. Alias of `Close`, kept for radix-ui API compatibility. */
const AlertDialogCancel = AlertDialogClose;
AlertDialogCancel.displayName = 'AlertDialogCancel';

// createHandle export
/** Creates a detached handle for opening an alert dialog imperatively, optionally with a typed payload. */
const createHandle = AlertDialogPrimitive.createHandle;

export {
  AlertDialogAction as Action,
  AlertDialogCancel as Cancel,
  AlertDialogClose as Close,
  AlertDialogContent as Content,
  createHandle,
  AlertDialogDescription as Description,
  AlertDialogRoot as Root,
  AlertDialogTitle as Title,
  AlertDialogTrigger as Trigger,
};

export type {
  AlertDialogActionProps as ActionProps,
  AlertDialogRootActions as Actions,
  AlertDialogCancelProps as CancelProps,
  AlertDialogCloseProps as CloseProps,
  AlertDialogContentProps as ContentProps,
  AlertDialogDescriptionProps as DescriptionProps,
  AlertDialogHandle as Handle,
  AlertDialogRootProps as RootProps,
  AlertDialogTitleProps as TitleProps,
  AlertDialogTriggerProps as TriggerProps,
};
