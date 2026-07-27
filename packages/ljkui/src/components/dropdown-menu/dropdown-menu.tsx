'use client';

import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import classNames from 'classnames';
import * as React from 'react';
import { ThickCheckIcon, ThickChevronRightIcon } from '../../icons';
import { Theme, useThemeContext } from '../../theme';
import { ScrollArea } from '../scroll-area';
import {
  dropdownMenuCheckboxItemPropDefs,
  dropdownMenuContentPropDefs,
  dropdownMenuItemPropDefs,
} from './dropdown-menu.props';

import type { GetPropDefTypes } from '../../helpers';

// Re-export createHandle for detached triggers
/** Creates a detached handle for opening a dropdown menu imperatively, optionally with a typed payload. */
const createHandle = MenuPrimitive.createHandle;

// Types from Base UI
type RootProps = React.ComponentProps<typeof MenuPrimitive.Root>;

// Handle type - extracts the return type of createHandle with a generic
type DropdownMenuHandle<T = unknown> = ReturnType<typeof MenuPrimitive.createHandle<T>>;

// Root - generic to infer payload type from handle
interface DropdownMenuRootProps<T = unknown> extends Omit<RootProps, 'className' | 'render' | 'children' | 'handle'> {
  /** Menu parts, or a render function that receives the `payload` passed by the opening trigger or handle. */
  children?: React.ReactNode | ((props: { payload: T | undefined }) => React.ReactNode);
  /** A handle created with `DropdownMenu.createHandle()` for opening the menu imperatively with a typed payload. */
  handle?: DropdownMenuHandle<T>;
}

/**
 * A menu of actions opened from a trigger button. Can be controlled via `open`/`onOpenChange` or left
 * uncontrolled.
 *
 * @example
 * ```tsx
 * <DropdownMenu.Root>
 *   <DropdownMenu.Trigger>
 *     <Button variant="soft">Options</Button>
 *   </DropdownMenu.Trigger>
 *   <DropdownMenu.Content>
 *     <DropdownMenu.Item onClick={rename}>Rename</DropdownMenu.Item>
 *     <DropdownMenu.Separator />
 *     <DropdownMenu.Item color="danger" onClick={remove}>Delete</DropdownMenu.Item>
 *   </DropdownMenu.Content>
 * </DropdownMenu.Root>
 * ```
 */
function DropdownMenuRoot<T = unknown>(props: DropdownMenuRootProps<T>) {
  return <MenuPrimitive.Root {...(props as RootProps)} />;
}
DropdownMenuRoot.displayName = 'DropdownMenuRoot';

// Trigger - generic to infer payload type from handle
interface DropdownMenuTriggerProps<T = unknown> extends Omit<
  React.ComponentProps<typeof MenuPrimitive.Trigger>,
  'render' | 'className' | 'handle' | 'payload'
> {
  className?: string;
  /** A handle created with `DropdownMenu.createHandle()`, for opening a menu rendered elsewhere. */
  handle?: DropdownMenuHandle<T>;
  /** Data passed to the menu's `children` render function when this trigger opens it. */
  payload?: T;
}

/**
 * The button that opens the menu. Renders its child element as the trigger, so pass exactly one element
 * (e.g. a `Button`).
 */
function DropdownMenuTrigger<T = unknown>({ children, ...props }: DropdownMenuTriggerProps<T>) {
  return (
    <MenuPrimitive.Trigger
      {...(props as React.ComponentProps<typeof MenuPrimitive.Trigger>)}
      render={children as React.ReactElement}
    />
  );
}
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

type DropdownMenuContentOwnProps = GetPropDefTypes<typeof dropdownMenuContentPropDefs>;
type DropdownMenuContentContextValue = DropdownMenuContentOwnProps;
const DropdownMenuContentContext = React.createContext<DropdownMenuContentContextValue>({});

interface DropdownMenuContentProps
  extends
    Omit<React.ComponentProps<typeof MenuPrimitive.Popup>, 'className' | 'render' | 'style'>,
    DropdownMenuContentContextValue {
  className?: string;
  style?: React.CSSProperties;
  /** The element the menu portal is appended to. Defaults to the document body. */
  container?: React.ComponentProps<typeof MenuPrimitive.Portal>['container'];
  /** Keeps the portal content mounted in the DOM while the menu is closed. */
  keepMounted?: React.ComponentProps<typeof MenuPrimitive.Portal>['keepMounted'];
  // Positioner props
  /**
   * The side of the trigger the menu is placed on.
   * @default 'bottom'
   */
  side?: React.ComponentProps<typeof MenuPrimitive.Positioner>['side'];
  /**
   * Distance in pixels between the menu and the trigger.
   * @default 4
   */
  sideOffset?: React.ComponentProps<typeof MenuPrimitive.Positioner>['sideOffset'];
  /**
   * How the menu is aligned along the trigger.
   * @default 'start'
   */
  align?: React.ComponentProps<typeof MenuPrimitive.Positioner>['align'];
  /** Additional offset in pixels along the alignment axis. */
  alignOffset?: React.ComponentProps<typeof MenuPrimitive.Positioner>['alignOffset'];
  /**
   * Minimum distance in pixels kept from the viewport edges when avoiding collisions.
   * @default 10
   */
  collisionPadding?: React.ComponentProps<typeof MenuPrimitive.Positioner>['collisionPadding'];
}

/**
 * The menu popup. Rendered in a portal with a scrollable viewport, positioned against the trigger, and
 * re-wrapped in the current `Theme`. Its `size`, `color` and `variant` are shared with items and submenus.
 */
const DropdownMenuContent = (props: DropdownMenuContentProps) => {
  const themeContext = useThemeContext();
  const {
    className,
    children,
    size = dropdownMenuContentPropDefs.size.default,
    color = dropdownMenuItemPropDefs.color.default,
    variant = dropdownMenuContentPropDefs.variant.default,
    container,
    keepMounted,
    // Positioner props
    side = 'bottom',
    sideOffset = 4,
    align = 'start',
    alignOffset,
    collisionPadding = 10,
    ...popupProps
  } = props;
  const resolvedColor = color ?? (themeContext.accentColor as NonNullable<typeof color>); // custom accents only feed data-accent-color
  return (
    <MenuPrimitive.Portal container={container} keepMounted={keepMounted}>
      <MenuPrimitive.Positioner
        className="fui-DropdownMenuPositioner"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
      >
        <Theme
          render={<MenuPrimitive.Popup />}
          data-accent-color={resolvedColor}
          {...popupProps}
          className={classNames(
            'fui-BaseMenuContent',
            'fui-DropdownMenuContent',
            `fui-variant-${variant}`,
            className,
            `fui-r-size-${size}`,
          )}
        >
          <ScrollArea type="auto">
            <div className={classNames('fui-BaseMenuViewport', 'fui-DropdownMenuViewport')}>
              <DropdownMenuContentContext.Provider
                value={React.useMemo(() => ({ size, color: resolvedColor, variant }), [size, resolvedColor, variant])}
              >
                {children}
              </DropdownMenuContentContext.Provider>
            </div>
          </ScrollArea>
        </Theme>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
};
DropdownMenuContent.displayName = 'DropdownMenuContent';

interface DropdownMenuGroupLabelProps extends Omit<
  React.ComponentProps<typeof MenuPrimitive.GroupLabel>,
  'className' | 'render'
> {
  className?: string;
}

/** An accessible label for a `Group` of items. Must be rendered inside `Group`. */
const DropdownMenuGroupLabel = (props: DropdownMenuGroupLabelProps) => (
  <MenuPrimitive.GroupLabel
    {...props}
    className={classNames('fui-BaseMenuGroupLabel', 'fui-DropdownMenuGroupLabel', props.className)}
  />
);
DropdownMenuGroupLabel.displayName = 'DropdownMenuGroupLabel';

type DropdownMenuItemOwnProps = GetPropDefTypes<typeof dropdownMenuItemPropDefs>;
interface DropdownMenuItemProps
  extends Omit<React.ComponentProps<typeof MenuPrimitive.Item>, 'className' | 'color'>, DropdownMenuItemOwnProps {
  className?: string;
}

/** A clickable menu action. Use `color` for emphasis (e.g. destructive) and `shortcut` for a hint label. */
const DropdownMenuItem = (props: DropdownMenuItemProps) => {
  const { className, children, color = dropdownMenuItemPropDefs.color.default, shortcut, ...itemProps } = props;
  return (
    <MenuPrimitive.Item
      data-accent-color={color}
      {...itemProps}
      className={classNames('fui-reset', 'fui-BaseMenuItem', 'fui-DropdownMenuItem', className)}
    >
      {children}
      {shortcut && <div className="fui-BaseMenuShortcut fui-DropdownMenuShortcut">{shortcut}</div>}
    </MenuPrimitive.Item>
  );
};
DropdownMenuItem.displayName = 'DropdownMenuItem';

interface DropdownMenuGroupProps extends Omit<
  React.ComponentProps<typeof MenuPrimitive.Group>,
  'className' | 'render'
> {
  className?: string;
}

/** Groups related items, typically labelled with `GroupLabel`. */
const DropdownMenuGroup = (props: DropdownMenuGroupProps) => (
  <MenuPrimitive.Group
    {...props}
    className={classNames('fui-BaseMenuGroup', 'fui-DropdownMenuGroup', props.className)}
  />
);
DropdownMenuGroup.displayName = 'DropdownMenuGroup';

interface DropdownMenuRadioGroupProps extends Omit<
  React.ComponentProps<typeof MenuPrimitive.RadioGroup>,
  'className' | 'render'
> {
  className?: string;
}

/** A single-selection group of `RadioItem`s, controlled via `value`/`onValueChange`. */
const DropdownMenuRadioGroup = (props: DropdownMenuRadioGroupProps) => (
  <MenuPrimitive.RadioGroup
    {...props}
    className={classNames('fui-BaseMenuRadioGroup', 'fui-DropdownMenuRadioGroup', props.className)}
  />
);
DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';

interface DropdownMenuRadioItemProps extends Omit<
  React.ComponentProps<typeof MenuPrimitive.RadioItem>,
  'className' | 'render'
> {
  className?: string;
}

/** A selectable option within a `RadioGroup`, showing a check indicator when selected. */
const DropdownMenuRadioItem = (props: DropdownMenuRadioItemProps) => {
  const { children, className, ...itemProps } = props;
  return (
    <MenuPrimitive.RadioItem
      {...itemProps}
      className={classNames(
        'fui-BaseMenuItem',
        'fui-BaseMenuRadioItem',
        'fui-DropdownMenuItem',
        'fui-DropdownMenuRadioItem',
        className,
      )}
    >
      {children}
      <MenuPrimitive.RadioItemIndicator className="fui-BaseMenuItemIndicator fui-DropdownMenuItemIndicator">
        <ThickCheckIcon className="fui-BaseMenuItemIndicatorIcon fui-DropdownMenuItemIndicatorIcon" />
      </MenuPrimitive.RadioItemIndicator>
    </MenuPrimitive.RadioItem>
  );
};
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

type DropdownMenuCheckboxItemOwnProps = GetPropDefTypes<typeof dropdownMenuCheckboxItemPropDefs>;
interface DropdownMenuCheckboxItemProps
  extends
    Omit<React.ComponentProps<typeof MenuPrimitive.CheckboxItem>, 'className' | 'render'>,
    DropdownMenuCheckboxItemOwnProps {
  className?: string;
}

/** A toggleable menu item with a check indicator, controlled via `checked`/`onCheckedChange`. */
const DropdownMenuCheckboxItem = (props: DropdownMenuCheckboxItemProps) => {
  const { children, className, shortcut, ...itemProps } = props;
  return (
    <MenuPrimitive.CheckboxItem
      {...itemProps}
      className={classNames(
        'fui-BaseMenuItem',
        'fui-BaseMenuCheckboxItem',
        'fui-DropdownMenuItem',
        'fui-DropdownMenuCheckboxItem',
        className,
      )}
    >
      {children}
      <MenuPrimitive.CheckboxItemIndicator className="fui-BaseMenuItemIndicator fui-DropdownMenuItemIndicator">
        <ThickCheckIcon className="fui-BaseMenuItemIndicatorIcon fui-DropdownMenuItemIndicatorIcon" />
      </MenuPrimitive.CheckboxItemIndicator>
      {shortcut && <div className="fui-BaseMenuShortcut fui-DropdownMenuShortcut">{shortcut}</div>}
    </MenuPrimitive.CheckboxItem>
  );
};
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

interface DropdownMenuSubProps extends Omit<React.ComponentProps<typeof MenuPrimitive.SubmenuRoot>, 'className'> {}
/** Groups a `SubTrigger` and `SubContent` into a nested submenu. */
const DropdownMenuSub: React.FC<DropdownMenuSubProps> = (props) => <MenuPrimitive.SubmenuRoot {...props} />;
DropdownMenuSub.displayName = 'DropdownMenuSub';

interface DropdownMenuSubTriggerProps extends Omit<
  React.ComponentProps<typeof MenuPrimitive.SubmenuTrigger>,
  'className' | 'render'
> {
  className?: string;
}

/** The item that opens a submenu on hover or arrow-key navigation, suffixed with a chevron. */
const DropdownMenuSubTrigger = (props: DropdownMenuSubTriggerProps) => {
  const { className, children, ...subTriggerProps } = props;
  return (
    <MenuPrimitive.SubmenuTrigger
      {...subTriggerProps}
      className={classNames(
        'fui-BaseMenuItem',
        'fui-BaseMenuSubTrigger',
        'fui-DropdownMenuItem',
        'fui-DropdownMenuSubTrigger',
        className,
      )}
    >
      {children}
      <div className="fui-BaseMenuShortcut fui-DropdownMenuShortcut">
        <ThickChevronRightIcon className="fui-BaseMenuSubTriggerIcon fui-DropdownMenuSubTriggerIcon" />
      </div>
    </MenuPrimitive.SubmenuTrigger>
  );
};
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

interface DropdownMenuSubContentProps extends Omit<
  React.ComponentProps<typeof MenuPrimitive.Popup>,
  'className' | 'render' | 'style'
> {
  className?: string;
  style?: React.CSSProperties;
  /** The element the submenu portal is appended to. Defaults to the document body. */
  container?: React.ComponentProps<typeof MenuPrimitive.Portal>['container'];
  /** Keeps the portal content mounted in the DOM while the submenu is closed. */
  keepMounted?: React.ComponentProps<typeof MenuPrimitive.Portal>['keepMounted'];
  // Positioner props
  /**
   * Distance in pixels between the submenu and its trigger.
   * @default 2
   */
  sideOffset?: React.ComponentProps<typeof MenuPrimitive.Positioner>['sideOffset'];
  /**
   * Additional offset in pixels along the alignment axis.
   * @default -4
   */
  alignOffset?: React.ComponentProps<typeof MenuPrimitive.Positioner>['alignOffset'];
  /**
   * Minimum distance in pixels kept from the viewport edges when avoiding collisions.
   * @default 10
   */
  collisionPadding?: React.ComponentProps<typeof MenuPrimitive.Positioner>['collisionPadding'];
}

/** The submenu popup. Inherits `size`, `color` and `variant` from the parent `Content`. */
const DropdownMenuSubContent = (props: DropdownMenuSubContentProps) => {
  const {
    className,
    children,
    container,
    keepMounted,
    sideOffset = 2,
    alignOffset = -4,
    collisionPadding = 10,
    ...popupProps
  } = props;
  const { size, color, variant } = React.useContext(DropdownMenuContentContext);
  return (
    <MenuPrimitive.Portal container={container} keepMounted={keepMounted}>
      <MenuPrimitive.Positioner
        className="fui-DropdownMenuPositioner"
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
      >
        <Theme
          render={<MenuPrimitive.Popup />}
          data-accent-color={color}
          {...popupProps}
          className={classNames(
            'fui-BaseMenuContent',
            'fui-BaseMenuSubContent',
            'fui-DropdownMenuContent',
            'fui-DropdownMenuSubContent',
            `fui-variant-${variant}`,
            className,
            `fui-r-size-${size}`,
          )}
        >
          <ScrollArea type="auto">
            <div className={classNames('fui-BaseMenuViewport', 'fui-DropdownMenuViewport')}>{children}</div>
          </ScrollArea>
        </Theme>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
};
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

interface DropdownMenuSeparatorProps extends Omit<
  React.ComponentProps<typeof MenuPrimitive.Separator>,
  'className' | 'render'
> {
  className?: string;
}

/** A visual divider between items or groups. */
const DropdownMenuSeparator = (props: DropdownMenuSeparatorProps) => (
  <MenuPrimitive.Separator
    {...props}
    className={classNames('fui-BaseMenuSeparator', 'fui-DropdownMenuSeparator', props.className)}
  />
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export {
  DropdownMenuCheckboxItem as CheckboxItem,
  DropdownMenuContent as Content,
  createHandle,
  DropdownMenuGroup as Group,
  DropdownMenuGroupLabel as GroupLabel,
  DropdownMenuItem as Item,
  DropdownMenuRadioGroup as RadioGroup,
  DropdownMenuRadioItem as RadioItem,
  DropdownMenuRoot as Root,
  DropdownMenuSeparator as Separator,
  DropdownMenuSub as Sub,
  DropdownMenuSubContent as SubContent,
  DropdownMenuSubTrigger as SubTrigger,
  DropdownMenuTrigger as Trigger,
};

export type {
  DropdownMenuCheckboxItemProps as CheckboxItemProps,
  DropdownMenuContentProps as ContentProps,
  DropdownMenuGroupLabelProps as GroupLabelProps,
  DropdownMenuGroupProps as GroupProps,
  DropdownMenuHandle as Handle,
  DropdownMenuItemProps as ItemProps,
  DropdownMenuRadioGroupProps as RadioGroupProps,
  DropdownMenuRadioItemProps as RadioItemProps,
  DropdownMenuRootProps as RootProps,
  DropdownMenuSeparatorProps as SeparatorProps,
  DropdownMenuSubContentProps as SubContentProps,
  DropdownMenuSubProps as SubProps,
  DropdownMenuSubTriggerProps as SubTriggerProps,
  DropdownMenuTriggerProps as TriggerProps,
};
