'use client';

import classNames from 'classnames';
import * as React from 'react';

import type { GetPropDefTypes } from '../../helpers';
import { useControllableState } from '../../helpers';
import { IconButton } from '../icon-button';
import { Input } from '../input';
import { Separator as SeparatorComponent } from '../separator';
import { Sheet } from '../sheet';
import { Skeleton } from '../skeleton';
import { Tooltip } from '../tooltip';
import { sidebarPropDefs } from './sidebar.props';

const MOBILE_BREAKPOINT = '(max-width: 767px)';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

/**
 * Reads the sidebar's open state. Use it to swap labels, icons or `aria-expanded` on your own
 * controls.
 */
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be called inside Sidebar.Provider');
  return context;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia(MOBILE_BREAKPOINT);
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return isMobile;
}

interface SidebarProviderProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Whether the sidebar starts expanded. */
  defaultOpen?: boolean;
  /** The open state, when you control it yourself. */
  open?: boolean;
  /** Called when the sidebar opens or closes. */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Holds the sidebar's open state and lays out the sidebar beside the page.
 *
 * Wrap the whole application shell in it. Below 768px the sidebar becomes a `Sheet` instead of a
 * docked column, and ⌘B / Ctrl+B toggles it.
 *
 * @example
 * ```tsx
 * <Sidebar.Provider>
 *   <Sidebar.Root>…</Sidebar.Root>
 *   <Sidebar.Inset>{children}</Sidebar.Inset>
 * </Sidebar.Provider>
 * ```
 */
const SidebarProvider = (props: SidebarProviderProps) => {
  const { className, defaultOpen = true, open: openProp, onOpenChange, children, ...providerProps } = props;

  const [openState, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const open = openState ?? defaultOpen;
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  const toggle = React.useCallback(() => {
    if (isMobile) setOpenMobile(!openMobile);
    else setOpen(!open);
  }, [isMobile, openMobile, open, setOpen]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggle]);

  const context: SidebarContextValue = { open, setOpen, toggle, isMobile, openMobile, setOpenMobile };

  return (
    <SidebarContext.Provider value={context}>
      <div
        data-state={open ? 'expanded' : 'collapsed'}
        {...providerProps}
        className={classNames('fui-SidebarProvider', className)}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
};
SidebarProvider.displayName = 'SidebarProvider';

type SidebarRootOwnProps = GetPropDefTypes<typeof sidebarPropDefs>;
interface SidebarRootProps extends React.ComponentPropsWithoutRef<'div'>, SidebarRootOwnProps {}

/** The sidebar itself. Renders as a `Sheet` on small screens and a docked column above them. */
const SidebarRoot = (props: SidebarRootProps) => {
  const {
    className,
    side = sidebarPropDefs.side.default,
    variant = sidebarPropDefs.variant.default,
    collapsible = sidebarPropDefs.collapsible.default,
    children,
    ...rootProps
  } = props;
  const { open, isMobile, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet.Root open={openMobile} onOpenChange={setOpenMobile}>
        <Sheet.Content
          aria-label="Sidebar"
          className={classNames('fui-SidebarRoot', 'fui-SidebarRootMobile', className)}
        >
          {children}
        </Sheet.Content>
      </Sheet.Root>
    );
  }

  return (
    <div
      data-side={side}
      data-variant={variant}
      data-collapsible={collapsible}
      data-state={open ? 'expanded' : 'collapsed'}
      {...rootProps}
      className={classNames('fui-SidebarRoot', className)}
    >
      <div className="fui-SidebarInner">{children}</div>
    </div>
  );
};
SidebarRoot.displayName = 'SidebarRoot';

type SidebarTriggerProps = React.ComponentProps<typeof IconButton>;

/** Toggles the sidebar. */
const SidebarTrigger = (props: SidebarTriggerProps) => {
  const { className, onClick, size = '2', variant = 'ghost', ...triggerProps } = props;
  const { toggle, open } = useSidebar();
  return (
    <IconButton
      aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
      aria-expanded={open}
      size={size}
      variant={variant}
      {...triggerProps}
      onClick={(event) => {
        onClick?.(event);
        toggle();
      }}
      className={classNames('fui-SidebarTrigger', className)}
    >
      {props.children ?? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="1.75" y="2.75" width="12.5" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 3v10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
    </IconButton>
  );
};
SidebarTrigger.displayName = 'SidebarTrigger';

interface SidebarRailProps extends React.ComponentPropsWithoutRef<'button'> {}

/** A thin strip along the sidebar's outer edge that toggles it when clicked. */
const SidebarRail = (props: SidebarRailProps) => {
  const { className, onClick, ...railProps } = props;
  const { toggle } = useSidebar();
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden
      {...railProps}
      onClick={(event) => {
        onClick?.(event);
        toggle();
      }}
      className={classNames('fui-reset', 'fui-SidebarRail', className)}
    />
  );
};
SidebarRail.displayName = 'SidebarRail';

interface SidebarInsetProps extends React.ComponentPropsWithoutRef<'main'> {}

/** The main content area beside the sidebar. */
const SidebarInset = (props: SidebarInsetProps) => {
  const { className, ...insetProps } = props;
  return <main {...insetProps} className={classNames('fui-SidebarInset', className)} />;
};
SidebarInset.displayName = 'SidebarInset';

interface SidebarSectionProps extends React.ComponentPropsWithoutRef<'div'> {}

/** Pinned to the top of the sidebar — a workspace switcher or logo. */
const SidebarHeader = (props: SidebarSectionProps) => {
  const { className, ...headerProps } = props;
  return <div {...headerProps} className={classNames('fui-SidebarHeader', className)} />;
};
SidebarHeader.displayName = 'SidebarHeader';

/** The scrollable middle of the sidebar. */
const SidebarContent = (props: SidebarSectionProps) => {
  const { className, ...contentProps } = props;
  return <div {...contentProps} className={classNames('fui-SidebarContent', className)} />;
};
SidebarContent.displayName = 'SidebarContent';

/** Pinned to the bottom of the sidebar — the account menu, usually. */
const SidebarFooter = (props: SidebarSectionProps) => {
  const { className, ...footerProps } = props;
  return <div {...footerProps} className={classNames('fui-SidebarFooter', className)} />;
};
SidebarFooter.displayName = 'SidebarFooter';

/** A titled block of navigation. */
const SidebarGroup = (props: SidebarSectionProps) => {
  const { className, ...groupProps } = props;
  return <div role="group" {...groupProps} className={classNames('fui-SidebarGroup', className)} />;
};
SidebarGroup.displayName = 'SidebarGroup';

/** The label above a group. Hidden when the sidebar is collapsed to a rail. */
const SidebarGroupLabel = (props: SidebarSectionProps) => {
  const { className, ...labelProps } = props;
  return <div {...labelProps} className={classNames('fui-SidebarGroupLabel', className)} />;
};
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

interface SidebarMenuProps extends React.ComponentPropsWithoutRef<'ul'> {}

/** A list of navigation entries. */
const SidebarMenu = (props: SidebarMenuProps) => {
  const { className, ...menuProps } = props;
  return <ul {...menuProps} className={classNames('fui-SidebarMenu', className)} />;
};
SidebarMenu.displayName = 'SidebarMenu';

interface SidebarMenuItemProps extends React.ComponentPropsWithoutRef<'li'> {}

/** One entry in a `Menu`. */
const SidebarMenuItem = (props: SidebarMenuItemProps) => {
  const { className, ...itemProps } = props;
  return <li {...itemProps} className={classNames('fui-SidebarMenuItem', className)} />;
};
SidebarMenuItem.displayName = 'SidebarMenuItem';

interface SidebarMenuButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Marks this entry as the current page. */
  isActive?: boolean;
  /** Replaces the `<button>` with your own element — a router `Link`, typically. */
  render?: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  /**
   * A label shown in a tooltip on the right when the sidebar is collapsed to its icon rail.
   * Ignored while the sidebar is expanded.
   */
  tooltip?: React.ReactNode;
}

/** The clickable target of a menu entry. */
const SidebarMenuButton = (props: SidebarMenuButtonProps) => {
  const { className, isActive, render, tooltip, ...buttonProps } = props;
  const { open, isMobile } = useSidebar();
  const sharedProps = {
    'data-active': isActive ? '' : undefined,
    'aria-current': isActive ? ('page' as const) : undefined,
    className: classNames('fui-reset', 'fui-SidebarMenuButton', className),
  };

  const button = render ? (
    React.cloneElement(render, {
      ...buttonProps,
      ...sharedProps,
      className: classNames(sharedProps.className, render.props.className),
    })
  ) : (
    <button type="button" {...buttonProps} {...sharedProps} />
  );

  if (tooltip == null) return button;

  return (
    <Tooltip content={tooltip} side="right" disabled={open || isMobile}>
      {button}
    </Tooltip>
  );
};
SidebarMenuButton.displayName = 'SidebarMenuButton';

interface SidebarGroupActionProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Replaces the `<button>` with your own element. */
  render?: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

/** An action button pinned to the top-right corner of a `Group` — an "add" affordance, usually. */
const SidebarGroupAction = (props: SidebarGroupActionProps) => {
  const { className, render, ...actionProps } = props;
  const sharedProps = { className: classNames('fui-reset', 'fui-SidebarGroupAction', className) };

  if (render) {
    return React.cloneElement(render, {
      ...actionProps,
      ...sharedProps,
      className: classNames(sharedProps.className, render.props.className),
    });
  }
  return <button type="button" {...actionProps} {...sharedProps} />;
};
SidebarGroupAction.displayName = 'SidebarGroupAction';

/** A wrapper around a group's content, below its label. */
const SidebarGroupContent = (props: SidebarSectionProps) => {
  const { className, ...contentProps } = props;
  return <div {...contentProps} className={classNames('fui-SidebarGroupContent', className)} />;
};
SidebarGroupContent.displayName = 'SidebarGroupContent';

interface SidebarMenuActionProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Only reveal the action when the menu row is hovered or focused. */
  showOnHover?: boolean;
  /** Replaces the `<button>` with your own element. */
  render?: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

/** An action button pinned to the right edge of a `MenuButton` row — a "more" menu, usually. */
const SidebarMenuAction = (props: SidebarMenuActionProps) => {
  const { className, showOnHover, render, ...actionProps } = props;
  const sharedProps = {
    'data-show-on-hover': showOnHover ? '' : undefined,
    className: classNames('fui-reset', 'fui-SidebarMenuAction', className),
  };

  if (render) {
    return React.cloneElement(render, {
      ...actionProps,
      ...sharedProps,
      className: classNames(sharedProps.className, render.props.className),
    });
  }
  return <button type="button" {...actionProps} {...sharedProps} />;
};
SidebarMenuAction.displayName = 'SidebarMenuAction';

interface SidebarMenuBadgeProps extends React.ComponentPropsWithoutRef<'div'> {}

/** A count or label pinned to the right edge of a menu row. */
const SidebarMenuBadge = (props: SidebarMenuBadgeProps) => {
  const { className, ...badgeProps } = props;
  return <div {...badgeProps} className={classNames('fui-SidebarMenuBadge', className)} />;
};
SidebarMenuBadge.displayName = 'SidebarMenuBadge';

interface SidebarMenuSkeletonProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Also render a placeholder for the leading icon. */
  showIcon?: boolean;
}

/** A placeholder menu row shown while navigation data loads. */
const SidebarMenuSkeleton = (props: SidebarMenuSkeletonProps) => {
  const { className, showIcon, ...skeletonProps } = props;
  return (
    <div {...skeletonProps} className={classNames('fui-SidebarMenuSkeleton', className)}>
      {showIcon ? <Skeleton.Rect className="fui-SidebarMenuSkeletonIcon" /> : null}
      <Skeleton.Text className="fui-SidebarMenuSkeletonText" size="2" />
    </div>
  );
};
SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton';

interface SidebarMenuSubProps extends React.ComponentPropsWithoutRef<'ul'> {}

/** A nested, indented list of sub-entries beneath a menu row. Hidden in the icon rail. */
const SidebarMenuSub = (props: SidebarMenuSubProps) => {
  const { className, ...subProps } = props;
  return <ul {...subProps} className={classNames('fui-SidebarMenuSub', className)} />;
};
SidebarMenuSub.displayName = 'SidebarMenuSub';

interface SidebarMenuSubItemProps extends React.ComponentPropsWithoutRef<'li'> {}

/** One entry in a `MenuSub`. */
const SidebarMenuSubItem = (props: SidebarMenuSubItemProps) => {
  const { className, ...itemProps } = props;
  return <li {...itemProps} className={classNames('fui-SidebarMenuSubItem', className)} />;
};
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem';

interface SidebarMenuSubButtonProps extends React.ComponentPropsWithoutRef<'a'> {
  /** Marks this sub-entry as the current page. */
  isActive?: boolean;
  /** The row height. */
  size?: 'sm' | 'md';
  /** Replaces the `<a>` with your own element — a router `Link`, typically. */
  render?: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

/** The clickable target of a sub-menu entry. */
const SidebarMenuSubButton = (props: SidebarMenuSubButtonProps) => {
  const { className, isActive, size = 'md', render, ...buttonProps } = props;
  const sharedProps = {
    'data-active': isActive ? '' : undefined,
    'data-size': size,
    'aria-current': isActive ? ('page' as const) : undefined,
    className: classNames('fui-reset', 'fui-SidebarMenuSubButton', className),
  };

  if (render) {
    return React.cloneElement(render, {
      ...buttonProps,
      ...sharedProps,
      className: classNames(sharedProps.className, render.props.className),
    });
  }
  return <a {...buttonProps} {...sharedProps} />;
};
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton';

type SidebarInputProps = React.ComponentProps<typeof Input.Control>;

/** A text field styled for the sidebar header — a search box, usually. Wraps the library `Input`. */
const SidebarInput = (props: SidebarInputProps) => {
  const { className, ...inputProps } = props;
  return (
    <Input.Root className="fui-SidebarInput">
      <Input.Control {...inputProps} className={className} />
    </Input.Root>
  );
};
SidebarInput.displayName = 'SidebarInput';

type SidebarSeparatorProps = React.ComponentProps<typeof SeparatorComponent>;

/** A divider between sidebar sections. */
const SidebarSeparator = (props: SidebarSeparatorProps) => {
  const { className, size = '4', ...separatorProps } = props;
  return (
    <SeparatorComponent size={size} {...separatorProps} className={classNames('fui-SidebarSeparator', className)} />
  );
};
SidebarSeparator.displayName = 'SidebarSeparator';

export {
  SidebarContent as Content,
  SidebarFooter as Footer,
  SidebarGroup as Group,
  SidebarGroupAction as GroupAction,
  SidebarGroupContent as GroupContent,
  SidebarGroupLabel as GroupLabel,
  SidebarHeader as Header,
  SidebarInput as Input,
  SidebarInset as Inset,
  SidebarMenu as Menu,
  SidebarMenuAction as MenuAction,
  SidebarMenuBadge as MenuBadge,
  SidebarMenuButton as MenuButton,
  SidebarMenuItem as MenuItem,
  SidebarMenuSkeleton as MenuSkeleton,
  SidebarMenuSub as MenuSub,
  SidebarMenuSubButton as MenuSubButton,
  SidebarMenuSubItem as MenuSubItem,
  SidebarProvider as Provider,
  SidebarRail as Rail,
  SidebarRoot as Root,
  SidebarSeparator as Separator,
  SidebarTrigger as Trigger,
  useSidebar,
};
export type {
  SidebarGroupActionProps as GroupActionProps,
  SidebarInputProps as InputProps,
  SidebarInsetProps as InsetProps,
  SidebarMenuActionProps as MenuActionProps,
  SidebarMenuBadgeProps as MenuBadgeProps,
  SidebarMenuButtonProps as MenuButtonProps,
  SidebarMenuItemProps as MenuItemProps,
  SidebarMenuProps as MenuProps,
  SidebarMenuSkeletonProps as MenuSkeletonProps,
  SidebarMenuSubButtonProps as MenuSubButtonProps,
  SidebarMenuSubItemProps as MenuSubItemProps,
  SidebarMenuSubProps as MenuSubProps,
  SidebarProviderProps as ProviderProps,
  SidebarRailProps as RailProps,
  SidebarRootProps as RootProps,
  SidebarSectionProps as SectionProps,
  SidebarSeparatorProps as SeparatorProps,
  SidebarTriggerProps as TriggerProps,
};
