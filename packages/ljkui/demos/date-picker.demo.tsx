import React from 'react';
import { DatePicker } from 'ljkui';
import { parseDate } from '@internationalized/date';

export default function DatePickerDemo() {
  return (
    <DatePicker
      aria-label="Appointment date"
      defaultValue={parseDate('2020-02-03')}
      minValue={parseDate('2020-01-01')}
      maxValue={parseDate('2020-12-31')}
    />
  );
}
