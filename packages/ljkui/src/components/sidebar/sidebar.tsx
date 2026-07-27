'use client';

import classNames from 'classnames';
import * as React from 'react';

import type { GetPropDefTypes } from '../../helpers';
import { IconButton } from '../icon-button';
import { Separator as SeparatorComponent } from '../separator';
import { Sheet } from '../sheet';
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

  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openProp === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

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
}

/** The clickable target of a menu entry. */
const SidebarMenuButton = (props: SidebarMenuButtonProps) => {
  const { className, isActive, render, ...buttonProps } = props;
  const sharedProps = {
    'data-active': isActive ? '' : undefined,
    'aria-current': isActive ? ('page' as const) : undefined,
    className: classNames('fui-reset', 'fui-SidebarMenuButton', className),
  };

  if (render) {
    return React.cloneElement(render, {
      ...buttonProps,
      ...sharedProps,
      className: classNames(sharedProps.className, render.props.className),
    });
  }
  return <button type="button" {...buttonProps} {...sharedProps} />;
};
SidebarMenuButton.displayName = 'SidebarMenuButton';

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
  SidebarGroupLabel as GroupLabel,
  SidebarHeader as Header,
  SidebarInset as Inset,
  SidebarMenu as Menu,
  SidebarMenuButton as MenuButton,
  SidebarMenuItem as MenuItem,
  SidebarProvider as Provider,
  SidebarRail as Rail,
  SidebarRoot as Root,
  SidebarSeparator as Separator,
  SidebarTrigger as Trigger,
  useSidebar,
};
export type {
  SidebarInsetProps as InsetProps,
  SidebarMenuButtonProps as MenuButtonProps,
  SidebarMenuItemProps as MenuItemProps,
  SidebarMenuProps as MenuProps,
  SidebarProviderProps as ProviderProps,
  SidebarRailProps as RailProps,
  SidebarRootProps as RootProps,
  SidebarSectionProps as SectionProps,
  SidebarSeparatorProps as SeparatorProps,
  SidebarTriggerProps as TriggerProps,
};
