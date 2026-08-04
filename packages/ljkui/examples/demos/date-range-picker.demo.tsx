import React from 'react';
import { DateRangePicker } from 'ljkui';
import { parseDate } from '@internationalized/date';

export default function DateRangePickerDemo() {
  return (
    <DateRangePicker
      aria-label="Trip dates"
      defaultValue={{
        start: parseDate('2020-02-03'),
        end: parseDate('2020-02-08'),
      }}
    />
  );
}
