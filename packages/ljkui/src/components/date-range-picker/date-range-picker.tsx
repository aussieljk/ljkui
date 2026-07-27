'use client';

import { AriaDateRangePickerProps, DateValue, useDateRangePicker } from '@react-aria/datepicker';

import { useDateRangePickerState } from '@react-stately/datepicker';
import classNames from 'classnames';
import React, { useRef } from 'react';
import { Popover } from '../';
import { GetPropDefTypes } from '../../helpers';
import { CalendarIcon } from '../../icons';
import { Calendar, type MappedDateValue } from '../calendar';
import { DateField } from '../date-field';
import { datePickerPropDefs } from '../date-picker/date-picker.props';
import { IconButton } from '../icon-button';

interface RangeValue<T> {
  /** The start value of the range. */
  start: T;
  /** The end value of the range. */
  end: T;
}

type DateRangePickerFUIProps = GetPropDefTypes<typeof datePickerPropDefs>;

interface DateRangePickerProps<T extends DateValue> extends AriaDateRangePickerProps<T>, DateRangePickerFUIProps {
  className?: string;
  /** Called with the new `{ start, end }` range when both dates are set, or `null` when cleared. */
  onChange?: (value: RangeValue<MappedDateValue<T>> | null) => void;
}

/**
 * Two `DateField`s (start and end) combined with a calendar button that opens a `Calendar.Range` in a
 * popover. Built on React Aria, so it accepts its date range picker props (`value`, `onChange`,
 * `minValue`, ...) using `@internationalized/date` values.
 *
 * @example
 * ```tsx
 * <DateRangePicker value={range} onChange={setRange} aria-label="Booking dates" />
 * ```
 */
export function DateRangePicker<T extends DateValue>(props: DateRangePickerProps<T>) {
  const { className, ...otherProps } = props;

  const {
    color = datePickerPropDefs.color.default,
    size = datePickerPropDefs.size.default,
    ...datePickerProps
  } = otherProps;
  const state = useDateRangePickerState({
    ...datePickerProps,
    // shouldCloseOnSelect: false,
  });

  const ref = useRef<HTMLDivElement>(null);
  const {
    groupProps,
    startFieldProps: { onChange: onStartChange, ...startFieldProps },
    endFieldProps: { onChange: onEndChange, ...endFieldProps },
    buttonProps: { isDisabled: isButtonDisabled, onPress: onButtonClick, ...otherButtonProps },
    calendarProps,
  } = useDateRangePicker(props, state, ref);

  return (
    <div {...groupProps} ref={ref} className={classNames('fui-DateRangePickerRoot', className)}>
      <DateField {...startFieldProps} color={color} size={size} onChange={onStartChange} />
      <DateField {...endFieldProps} color={color} size={size} onChange={onEndChange} />
      <Popover.Root open={state.isOpen} onOpenChange={(open) => state.setOpen(open)}>
        <Popover.Trigger>
          <IconButton
            {...otherButtonProps}
            disabled={isButtonDisabled}
            // @ts-expect-error fix mismatching onPress and onClick types
            onClick={onButtonClick}
            onKeyDown={(e) => {
              // Radix and Aria keyboard event handlers are clashing
              // when pressing space or enter on the button.
              // Stop propagation to avoid that.
              if (e.code === 'Space' || e.code === 'Enter') {
                e.stopPropagation();
              }
            }}
            size={size}
          >
            <CalendarIcon size={size} />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content variant="translucent" align="center">
          <Calendar.Range {...calendarProps} />
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}
