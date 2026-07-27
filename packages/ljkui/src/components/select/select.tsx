'use client';

import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import classNames from 'classnames';
import * as React from 'react';

import { ThickCheckIcon } from '../../icons';
import { Theme } from '../../theme';
import { selectContentPropDefs, selectRootPropDefs, selectTriggerPropDefs } from './select.props';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';

type SelectRootOwnProps = GetPropDefTypes<typeof selectRootPropDefs>;

// Internal context for passing values from Root to children
interface SelectContextValue extends SelectRootOwnProps {
  // Store items for label lookup in trigger. Mirrors Base UI's broadened `items` type
  // (record, array of `{ value, label }`, or array of grouped items).
  itemsForLabelLookup?: SelectPrimitive.Root.Props<unknown>['items'];
  // Store itemToStringLabel for label lookup when items is not provided
  valueLabelFormatter?: (value: unknown) => string;
}
const SelectContext = React.createContext<SelectContextValue>({});

// Re-export Base UI types for consumers
type SelectRootChangeEventDetails = SelectPrimitive.Root.ChangeEventDetails;
type SelectRootChangeEventReason = SelectPrimitive.Root.ChangeEventReason;

// Conditional value type based on multiple prop
type SelectValue<Value, Multiple extends boolean | undefined> = Multiple extends true ? Value[] : Value;

interface SelectRootPropsBase<Value, Multiple extends boolean | undefined = false>
  extends Omit<SelectPrimitive.Root.Props<Value, Multiple>, 'className' | 'render'>, SelectContextValue {}

// Overloaded types for better inference
type SelectRootProps<Value = unknown, Multiple extends boolean | undefined = false> = SelectRootPropsBase<
  Value,
  Multiple
>;

/**
 * A dropdown for picking a value (or multiple values) from a list of options.
 *
 * Wraps Base UI's Select primitive. Supports controlled (`value`) and uncontrolled
 * (`defaultValue`) usage, generic item values, and `multiple` selection; the
 * `size` set here is shared with `Trigger` and `Content` via context.
 *
 * @example
 * ```tsx
 * <Select.Root defaultValue="apple">
 *   <Select.Trigger placeholder="Pick a fruit" />
 *   <Select.Content>
 *     <Select.Item value="apple">Apple</Select.Item>
 *     <Select.Item value="orange">Orange</Select.Item>
 *   </Select.Content>
 * </Select.Root>
 * ```
 */
function SelectRoot<Value = unknown, Multiple extends boolean | undefined = false>(
  props: SelectRootProps<Value, Multiple>,
) {
  const { children, size = selectRootPropDefs.size.default, items, itemToStringLabel, ...rootProps } = props;
  return (
    <SelectPrimitive.Root
      items={items}
      itemToStringLabel={itemToStringLabel}
      {...(rootProps as SelectPrimitive.Root.Props<Value, Multiple>)}
    >
      <SelectContext.Provider
        value={React.useMemo(
          () => ({
            size,
            itemsForLabelLookup: items,
            valueLabelFormatter: itemToStringLabel as ((value: unknown) => string) | undefined,
          }),
          [size, items, itemToStringLabel],
        )}
      >
        {children}
      </SelectContext.Provider>
    </SelectPrimitive.Root>
  );
}
SelectRoot.displayName = 'SelectRoot';

type SelectTriggerOwnProps = GetPropDefTypes<typeof selectTriggerPropDefs>;
interface SelectTriggerProps
  extends
    Omit<PropsWithoutColor<typeof SelectPrimitive.Trigger>, 'render' | 'className' | 'children'>,
    SelectTriggerOwnProps {
  className?: string;
  /** Content shown in the trigger while no value is selected. */
  placeholder?: React.ReactNode;
  /** Custom render function for the selected value. Useful for multiple selection. */
  renderValue?: React.ComponentProps<typeof SelectPrimitive.Value>['children'];
}

/**
 * The button that opens the dropdown and displays the currently selected value.
 *
 * Shows `placeholder` while empty, resolving selected-value labels from the
 * Root's `items` / `itemToStringLabel` when provided.
 */
const SelectTrigger = (props: SelectTriggerProps) => {
  const {
    className,
    variant = selectTriggerPropDefs.variant.default,
    color = selectTriggerPropDefs.color.default,
    placeholder,
    renderValue,
    ...triggerProps
  } = props;
  const { size, itemsForLabelLookup, valueLabelFormatter } = React.useContext(SelectContext);

  // Handle placeholder and renderValue: Base UI's Select.Value uses children as a render function
  // Per Base UI docs: placeholder is overridden by children if specified
  const valueChildren = React.useMemo(() => {
    // renderValue takes full control (matches Base UI: "placeholder is overridden by children if specified")
    if (renderValue) return renderValue;

    // If placeholder is provided, create a render function that handles label lookup
    if (placeholder) {
      return (value: unknown) => {
        // Use items for label lookup if available (checked BEFORE placeholder fallback)
        // This matches Base UI behavior where a null item's label overrides placeholder
        if (itemsForLabelLookup) {
          // items can be an array of { value, label } or a Record<string, label>
          if (Array.isArray(itemsForLabelLookup)) {
            const item = itemsForLabelLookup.find((i) => i.value === value);
            if (item?.label != null) return item.label;
          } else if (value != null) {
            // Record format: keys are values, values are labels (only for non-null keys)
            const label = (itemsForLabelLookup as Record<string, React.ReactNode>)[value as string];
            if (label != null) return label;
          }
        }

        // Fallback to placeholder if no value or no matching item found
        if (value == null) return placeholder;

        // Use itemToStringLabel if provided (for custom value-to-label conversion)
        if (valueLabelFormatter) return valueLabelFormatter(value);

        return String(value);
      };
    }

    return undefined;
  }, [renderValue, placeholder, itemsForLabelLookup, valueLabelFormatter]);

  return (
    <SelectPrimitive.Trigger
      data-accent-color={color || (variant === 'surface' ? 'gray' : color)}
      {...triggerProps}
      className={classNames(
        'fui-reset',
        'fui-SelectTrigger',
        className,
        `fui-r-size-${size}`,
        `fui-variant-${variant}`,
      )}
    >
      <SelectPrimitive.Value className="fui-SelectTriggerValue">{valueChildren}</SelectPrimitive.Value>

      <SelectPrimitive.Icon>
        <svg className="fui-SelectIcon" xmlns="http://www.w3.org/2000/svg" viewBox="3.25 5.25 9.5 5.5" fill="none">
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};
SelectTrigger.displayName = 'SelectTrigger';

type SelectContentOwnProps = GetPropDefTypes<typeof selectContentPropDefs>;
interface SelectContentProps
  extends
    Omit<React.ComponentProps<typeof SelectPrimitive.Popup>, 'className' | 'render' | 'style'>,
    SelectContentOwnProps {
  className?: string;
  style?: React.CSSProperties;
  /** Element the portalled dropdown is appended to (defaults to the document body). */
  container?: React.ComponentProps<typeof SelectPrimitive.Portal>['container'];
  /** @deprecated Use alignItemWithTrigger={false} instead */
  position?: 'item-aligned' | 'popper';
  /**
   * Whether to align the selected item with the trigger (native select-like behavior).
   * @default true
   */
  alignItemWithTrigger?: boolean;
  /**
   * Side of the trigger the dropdown is placed on when not aligning with the trigger.
   * @default 'bottom'
   */
  side?: React.ComponentProps<typeof SelectPrimitive.Positioner>['side'];
  /**
   * Distance in pixels between the trigger and the dropdown.
   * @default 4
   */
  sideOffset?: React.ComponentProps<typeof SelectPrimitive.Positioner>['sideOffset'];
  /**
   * Alignment of the dropdown against the trigger.
   * @default 'start'
   */
  align?: React.ComponentProps<typeof SelectPrimitive.Positioner>['align'];
  /** Additional offset in pixels along the alignment axis. */
  alignOffset?: React.ComponentProps<typeof SelectPrimitive.Positioner>['alignOffset'];
  /**
   * Minimum distance in pixels kept from the viewport edges when avoiding collisions.
   * @default 10
   */
  collisionPadding?: React.ComponentProps<typeof SelectPrimitive.Positioner>['collisionPadding'];
}

/**
 * The dropdown popup containing the select's options.
 *
 * Rendered in a portal with its own scroll area. By default the selected item is
 * aligned over the trigger like a native `<select>`; pass
 * `alignItemWithTrigger={false}` for regular popover-style positioning.
 */
const SelectContent = (props: SelectContentProps) => {
  const {
    className,
    children,
    highContrast = selectContentPropDefs.highContrast.default,
    container,
    position,
    alignItemWithTrigger: alignItemWithTriggerProp,
    side = 'bottom',
    sideOffset = 4,
    align = 'start',
    alignOffset,
    collisionPadding = 10,
    ...popupProps
  } = props;
  const { size } = React.useContext(SelectContext);

  // Handle deprecated position prop
  const alignItemWithTrigger = alignItemWithTriggerProp ?? (position === 'popper' ? false : true);

  return (
    <SelectPrimitive.Portal container={container}>
      <SelectPrimitive.Positioner
        className="fui-SelectPositioner"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
        alignItemWithTrigger={alignItemWithTrigger}
      >
        <Theme
          render={<SelectPrimitive.Popup />}
          {...popupProps}
          className={classNames(
            { 'fui-PopperContent': !alignItemWithTrigger },
            'fui-SelectContent',
            className,
            `fui-r-size-${size}`,
            { 'fui-high-contrast': highContrast },
          )}
        >
          <ScrollAreaPrimitive.Root className="fui-ScrollAreaRoot">
            <SelectPrimitive.List
              render={<ScrollAreaPrimitive.Viewport className="fui-ScrollAreaViewport" tabIndex={undefined} />}
            >
              <ScrollAreaPrimitive.Content>
                <div className="fui-SelectViewport">{children}</div>
              </ScrollAreaPrimitive.Content>
            </SelectPrimitive.List>
            <ScrollAreaPrimitive.Scrollbar
              orientation="vertical"
              className="fui-ScrollAreaScrollbar fui-r-size-1"
              data-type="auto"
            >
              <ScrollAreaPrimitive.Thumb className="fui-ScrollAreaThumb" />
            </ScrollAreaPrimitive.Scrollbar>
          </ScrollAreaPrimitive.Root>
        </Theme>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
};
SelectContent.displayName = 'SelectContent';

interface SelectItemProps extends Omit<React.ComponentProps<typeof SelectPrimitive.Item>, 'className' | 'render'> {
  className?: string;
}

/**
 * A selectable option; shows a check indicator when it is the selected value.
 */
const SelectItem = (props: SelectItemProps) => {
  const { className, children, ...itemProps } = props;
  return (
    <SelectPrimitive.Item {...itemProps} className={classNames('fui-SelectItem', className)}>
      <SelectPrimitive.ItemIndicator className="fui-SelectItemIndicator">
        <ThickCheckIcon className="fui-SelectItemIndicatorIcon" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};
SelectItem.displayName = 'SelectItem';

interface SelectGroupProps extends Omit<React.ComponentProps<typeof SelectPrimitive.Group>, 'className' | 'render'> {
  className?: string;
}

/**
 * Groups related options, typically together with a `GroupLabel`.
 */
const SelectGroup = (props: SelectGroupProps) => (
  <SelectPrimitive.Group {...props} className={classNames('fui-SelectGroup', props.className)} />
);
SelectGroup.displayName = 'SelectGroup';

interface SelectGroupLabelProps extends Omit<
  React.ComponentProps<typeof SelectPrimitive.GroupLabel>,
  'className' | 'render'
> {
  className?: string;
}

/**
 * A non-selectable heading for a `Group` of options.
 */
const SelectGroupLabel = (props: SelectGroupLabelProps) => (
  <SelectPrimitive.GroupLabel {...props} className={classNames('fui-SelectLabel', props.className)} />
);
SelectGroupLabel.displayName = 'SelectGroupLabel';

interface SelectSeparatorProps extends Omit<
  React.ComponentProps<typeof SelectPrimitive.Separator>,
  'className' | 'render'
> {
  className?: string;
}

/**
 * A visual divider between options or groups in the dropdown.
 */
const SelectSeparator = (props: SelectSeparatorProps) => (
  <SelectPrimitive.Separator {...props} className={classNames('fui-SelectSeparator', props.className)} />
);
SelectSeparator.displayName = 'SelectSeparator';

export {
  SelectContent as Content,
  SelectGroup as Group,
  SelectGroupLabel as GroupLabel,
  SelectItem as Item,
  SelectRoot as Root,
  SelectSeparator as Separator,
  SelectTrigger as Trigger,
};

export type {
  SelectContentProps as ContentProps,
  SelectGroupLabelProps as GroupLabelProps,
  SelectGroupProps as GroupProps,
  SelectItemProps as ItemProps,
  SelectRootChangeEventDetails as RootChangeEventDetails,
  SelectRootChangeEventReason as RootChangeEventReason,
  SelectRootProps as RootProps,
  SelectValue,
  SelectSeparatorProps as SeparatorProps,
  SelectTriggerProps as TriggerProps,
};
