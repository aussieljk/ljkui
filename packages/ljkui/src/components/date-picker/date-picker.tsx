'use client';

import { AriaDatePickerProps, DateValue, useDatePicker } from '@react-aria/datepicker';

import { useDatePickerState } from '@react-stately/datepicker';
import classNames from 'classnames';
import React, { useRef } from 'react';
import { Popover } from '../';
import { GetPropDefTypes } from '../../helpers';
import { CalendarIcon } from '../../icons';
import { Calendar } from '../calendar';
import { DateField } from '../date-field';
import { IconButton } from '../icon-button';
import { datePickerPropDefs } from './date-picker.props';

type DatePickerFUIProps = GetPropDefTypes<typeof datePickerPropDefs>;

interface DatePickerProps<T extends DateValue> extends AriaDatePickerProps<T>, DatePickerFUIProps {
  className?: string;
}

/**
 * A `DateField` combined with a calendar button: typing and picking from the popover calendar both
 * update the same value. Built on React Aria, so it accepts its date picker props (`value`, `onChange`,
 * `minValue`, ...) using `@internationalized/date` values.
 *
 * @example
 * ```tsx
 * <DatePicker value={date} onChange={setDate} aria-label="Due date" />
 * ```
 */
export function DatePicker<T extends DateValue>(props: DatePickerProps<T>) {
  const {
    className,
    color = datePickerPropDefs.color.default,
    size = datePickerPropDefs.size.default,
    ...datePickerProps
  } = props;

  const state = useDatePickerState(datePickerProps);

  const ref = useRef<HTMLDivElement>(null);
  const {
    groupProps,
    fieldProps: { onChange, ...otherFieldProps },
    buttonProps: { isDisabled: isButtonDisabled, onPress: onButtonClick, ...buttonProps },
    calendarProps,
  } = useDatePicker(props, state, ref);

  return (
    <div {...groupProps} ref={ref} className={classNames('fui-DatePickerRoot', className)}>
      <DateField {...otherFieldProps} color={color} size={size} onChange={onChange} />
      <Popover.Root open={state.isOpen} onOpenChange={(open) => state.setOpen(open)}>
        <Popover.Trigger
          {...buttonProps}
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
        >
          <IconButton size={size}>
            <CalendarIcon size={size} />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content variant="translucent" align="center">
          <Calendar.Root {...calendarProps} />
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}
