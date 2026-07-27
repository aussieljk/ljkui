import React from 'react';
import { Calendar } from 'ljkui';
import { parseDate } from '@internationalized/date';

export default function CalendarDemo() {
  return <Calendar.Root aria-label="Appointment date" defaultValue={parseDate('2020-02-03')} />;
}
