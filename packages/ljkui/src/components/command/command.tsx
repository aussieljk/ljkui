'use client';

import classNames from 'classnames';
import * as React from 'react';

import { Dialog } from '../dialog';

type CommandContextValue = {
  search: string;
  setSearch: (value: string) => void;
  activeValue: string | null;
  setActiveValue: (value: string | null) => void;
  register: (value: string, onSelect?: () => void) => () => void;
  matches: (value: string) => boolean;
  select: (value: string) => void;
  visibleCount: number;
  listId: string;
};

const CommandContext = React.createContext<CommandContextValue | null>(null);

function useCommand(part: string) {
  const context = React.useContext(CommandContext);
  if (!context) throw new Error(`Command.${part} must be rendered inside Command.Root`);
  return context;
}

/** Case- and whitespace-insensitive substring match — the same rule cmdk applies. */
function defaultFilter(itemValue: string, search: string) {
  return itemValue.toLowerCase().includes(search.trim().toLowerCase());
}

interface CommandRootProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  /** The search text, when controlling the filter yourself. */
  value?: string;
  /** Called when the search text changes. */
  onValueChange?: (value: string) => void;
  /**
   * Decides whether an item matches the current search. Return `true` to keep the item visible.
   * @default case-insensitive substring match
   */
  filter?: (itemValue: string, search: string) => boolean;
}

/**
 * A searchable list of commands, driven from the keyboard.
 *
 * Typing filters the items, the arrow keys move the highlight, and Enter runs the highlighted item.
 * Wrap it in `Command.Dialog` for the familiar ⌘K palette.
 *
 * @example
 * ```tsx
 * <Command.Root>
 *   <Command.Input placeholder="Type a command…" />
 *   <Command.List>
 *     <Command.Empty>No results found.</Command.Empty>
 *     <Command.Group heading="Actions">
 *       <Command.Item onSelect={createInvoice}>Create invoice</Command.Item>
 *     </Command.Group>
 *   </Command.List>
 * </Command.Root>
 * ```
 */
const CommandRoot = (props: CommandRootProps) => {
  const { className, value, onValueChange, filter = defaultFilter, children, onKeyDown, ...rootProps } = props;

  const [uncontrolledSearch, setUncontrolledSearch] = React.useState('');
  const search = value ?? uncontrolledSearch;
  const setSearch = React.useCallback(
    (next: string) => {
      if (value === undefined) setUncontrolledSearch(next);
      onValueChange?.(next);
    },
    [value, onValueChange],
  );

  const listId = React.useId();
  const [activeValue, setActiveValue] = React.useState<string | null>(null);
  // Registration order is DOM order, which is the order the arrow keys should follow.
  const items = React.useRef<Array<{ value: string; onSelect?: () => void }>>([]);
  const [, forceUpdate] = React.useReducer((n: number) => n + 1, 0);

  const register = React.useCallback((itemValue: string, onSelect?: () => void) => {
    items.current = [...items.current, { value: itemValue, onSelect }];
    forceUpdate();
    return () => {
      items.current = items.current.filter((item) => item.value !== itemValue);
      forceUpdate();
    };
  }, []);

  const matches = React.useCallback((itemValue: string) => filter(itemValue, search), [filter, search]);

  const visible = items.current.filter((item) => matches(item.value));
  const visibleCount = visible.length;

  const select = React.useCallback((itemValue: string) => {
    items.current.find((item) => item.value === itemValue)?.onSelect?.();
  }, []);

  // Keep the highlight on a visible item as the search narrows the list.
  React.useEffect(() => {
    if (activeValue && visible.some((item) => item.value === activeValue)) return;
    setActiveValue(visible[0]?.value ?? null);
  }, [activeValue, visible]);

  const move = (delta: number) => {
    if (visible.length === 0) return;
    const index = visible.findIndex((item) => item.value === activeValue);
    const next = (index + delta + visible.length) % visible.length;
    setActiveValue(visible[next].value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      move(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveValue(visible[0]?.value ?? null);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActiveValue(visible[visible.length - 1]?.value ?? null);
    } else if (event.key === 'Enter' && activeValue) {
      event.preventDefault();
      select(activeValue);
    }
  };

  const context: CommandContextValue = {
    search,
    setSearch,
    activeValue,
    setActiveValue,
    register,
    matches,
    select,
    visibleCount,
    listId,
  };

  return (
    <CommandContext.Provider value={context}>
      <div {...rootProps} onKeyDown={handleKeyDown} className={classNames('fui-CommandRoot', className)}>
        {children}
      </div>
    </CommandContext.Provider>
  );
};
CommandRoot.displayName = 'CommandRoot';

interface CommandInputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'value' | 'onChange'> {}

/** The search field. Owns focus for the whole palette — the list is never focused itself. */
const CommandInput = (props: CommandInputProps) => {
  const { className, ...inputProps } = props;
  const { search, setSearch, activeValue, listId } = useCommand('Input');
  return (
    <div className="fui-CommandInputWrapper">
      <input
        type="text"
        autoComplete="off"
        spellCheck="false"
        role="combobox"
        aria-expanded
        aria-controls={listId}
        aria-activedescendant={activeValue ? `${listId}-${CSS.escape(activeValue)}` : undefined}
        {...inputProps}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className={classNames('fui-reset', 'fui-CommandInput', className)}
      />
    </div>
  );
};
CommandInput.displayName = 'CommandInput';

interface CommandListProps extends React.ComponentPropsWithoutRef<'div'> {}

/** The scrollable list of results. */
const CommandList = (props: CommandListProps) => {
  const { className, ...listProps } = props;
  const { listId } = useCommand('List');
  return <div role="listbox" id={listId} {...listProps} className={classNames('fui-CommandList', className)} />;
};
CommandList.displayName = 'CommandList';

interface CommandEmptyProps extends React.ComponentPropsWithoutRef<'div'> {}

/** Shown only while no item matches the search. */
const CommandEmpty = (props: CommandEmptyProps) => {
  const { className, ...emptyProps } = props;
  const { visibleCount } = useCommand('Empty');
  if (visibleCount > 0) return null;
  return <div role="presentation" {...emptyProps} className={classNames('fui-CommandEmpty', className)} />;
};
CommandEmpty.displayName = 'CommandEmpty';

interface CommandGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  /** The label shown above the group. */
  heading?: React.ReactNode;
}

/** A labelled section of items. Hides itself when every item in it is filtered out. */
const CommandGroup = (props: CommandGroupProps) => {
  const { className, heading, children, ...groupProps } = props;
  const headingId = React.useId();
  const ref = React.useRef<HTMLDivElement>(null);
  const { search, visibleCount } = useCommand('Group');
  const [hasVisibleItems, setHasVisibleItems] = React.useState(true);

  // Items decide their own visibility, so ask the DOM whether any survived the filter.
  React.useEffect(() => {
    setHasVisibleItems((ref.current?.querySelectorAll('[role="option"]').length ?? 0) > 0);
  }, [search, visibleCount]);

  return (
    <div
      role="group"
      aria-labelledby={heading ? headingId : undefined}
      hidden={!hasVisibleItems || undefined}
      {...groupProps}
      ref={ref}
      className={classNames('fui-CommandGroup', className)}
    >
      {heading && (
        <div id={headingId} className="fui-CommandGroupHeading">
          {heading}
        </div>
      )}
      {children}
    </div>
  );
};
CommandGroup.displayName = 'CommandGroup';

interface CommandItemProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  /** The text matched against the search. Defaults to the item's text content. */
  value?: string;
  /** Called when the item is clicked or activated with Enter. */
  onSelect?: () => void;
  /** Whether the item can be selected. */
  disabled?: boolean;
}

/** A single command. Filtered by `value`, or by its own text when `value` is omitted. */
const CommandItem = (props: CommandItemProps) => {
  const { className, value, onSelect, disabled, children, ...itemProps } = props;
  const { activeValue, setActiveValue, register, matches, select, listId } = useCommand('Item');

  const itemValue = value ?? (typeof children === 'string' ? children : '');
  const onSelectRef = React.useRef(onSelect);
  onSelectRef.current = onSelect;

  React.useEffect(() => {
    if (disabled) return;
    return register(itemValue, () => onSelectRef.current?.());
  }, [register, itemValue, disabled]);

  if (!matches(itemValue)) return null;

  const isActive = activeValue === itemValue;

  return (
    <div
      role="option"
      id={`${listId}-${CSS.escape(itemValue)}`}
      aria-selected={isActive}
      aria-disabled={disabled || undefined}
      data-active={isActive ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      {...itemProps}
      onPointerMove={(event) => {
        itemProps.onPointerMove?.(event);
        if (!disabled) setActiveValue(itemValue);
      }}
      onClick={(event) => {
        itemProps.onClick?.(event);
        if (!disabled) select(itemValue);
      }}
      className={classNames('fui-CommandItem', className)}
    >
      {children}
    </div>
  );
};
CommandItem.displayName = 'CommandItem';

interface CommandSeparatorProps extends React.ComponentPropsWithoutRef<'div'> {}

/** A divider between groups. */
const CommandSeparator = (props: CommandSeparatorProps) => {
  const { className, ...separatorProps } = props;
  return <div role="separator" {...separatorProps} className={classNames('fui-CommandSeparator', className)} />;
};
CommandSeparator.displayName = 'CommandSeparator';

interface CommandShortcutProps extends React.ComponentPropsWithoutRef<'span'> {}

/** The keyboard shortcut shown at the end of an item. */
const CommandShortcut = (props: CommandShortcutProps) => {
  const { className, ...shortcutProps } = props;
  return <span {...shortcutProps} className={classNames('fui-CommandShortcut', className)} />;
};
CommandShortcut.displayName = 'CommandShortcut';

type CommandDialogProps = Omit<React.ComponentProps<typeof Dialog.Root>, 'children'> & {
  /** The palette to show inside the dialog. */
  children?: React.ReactNode;
  /** Accessible title for the dialog. Visually hidden. */
  title?: string;
};

/** The palette in a modal dialog — the ⌘K pattern. Compose `Command.Root` inside it. */
const CommandDialog = (props: CommandDialogProps) => {
  const { children, title = 'Command palette', ...dialogProps } = props;
  return (
    <Dialog.Root {...dialogProps}>
      <Dialog.Content className="fui-CommandDialogContent" aria-label={title}>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
};
CommandDialog.displayName = 'CommandDialog';

export {
  CommandDialog as Dialog,
  CommandEmpty as Empty,
  CommandGroup as Group,
  CommandInput as Input,
  CommandItem as Item,
  CommandList as List,
  CommandRoot as Root,
  CommandSeparator as Separator,
  CommandShortcut as Shortcut,
};
export type {
  CommandDialogProps as DialogProps,
  CommandEmptyProps as EmptyProps,
  CommandGroupProps as GroupProps,
  CommandInputProps as InputProps,
  CommandItemProps as ItemProps,
  CommandListProps as ListProps,
  CommandRootProps as RootProps,
  CommandSeparatorProps as SeparatorProps,
  CommandShortcutProps as ShortcutProps,
};
