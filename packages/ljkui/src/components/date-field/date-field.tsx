'use client';

import classNames from 'classnames';
import React from 'react';
import type { DateFieldProps as AriaDateFieldProps, DateValue as AriaDateValue } from 'react-aria-components';
import {
  DateField as AriaDateField,
  DateInput as AriaDateInput,
  DateSegment as AriaDateSegment,
} from 'react-aria-components';
import { type GetPropDefTypes } from '../../helpers';
import { dateFieldPropDefs } from './date-field.props';

type DateFieldFUIProps = GetPropDefTypes<typeof dateFieldPropDefs>;
interface DateFieldProps<T extends AriaDateValue> extends AriaDateFieldProps<T>, DateFieldFUIProps {
  className?: string;
}

/**
 * A segmented date input where each part (day, month, year) is edited and stepped individually with the
 * keyboard. Built on React Aria, so it accepts its date field props (`value`, `onChange`, `minValue`,
 * `granularity`, ...) using `@internationalized/date` values.
 *
 * @example
 * ```tsx
 * <DateField value={date} onChange={setDate} aria-label="Birth date" />
 * ```
 */
function DateField<T extends AriaDateValue>(props: DateFieldProps<T>) {
  const {
    className,
    color = dateFieldPropDefs.color.default,
    size = dateFieldPropDefs.size.default,
    ...dateFieldProps
  } = props;

  return (
    <AriaDateField
      data-accent-color={color}
      className={classNames('fui-DateFieldRoot', className, `fui-r-size-${size}`)}
      {...dateFieldProps}
    >
      <AriaDateInput className="fui-DateFieldInput">
        {(segment) => (
          <AriaDateSegment
            segment={segment}
            className="fui-DateFieldSegment"
            style={{
              minWidth: segment.maxValue != null ? String(segment.maxValue).length + 'ch' : '',
            }}
          />
        )}
      </AriaDateInput>
    </AriaDateField>
  );
}

export { DateField };
export type { DateFieldProps };
