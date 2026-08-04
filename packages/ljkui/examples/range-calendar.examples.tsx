import { DateValue, getLocalTimeZone, isWeekend, parseDate, today } from '@internationalized/date';
import { useLocale } from '@react-aria/i18n';
import React from 'react';
import { Calendar } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls/Dates', layout: 'centered' } as const;

export const examples = {
  Default() {
    const args = {
      defaultValue: {
        start: parseDate('2020-02-03'),
        end: parseDate('2020-02-08'),
      },
      onChange: (dateRange: { start: DateValue; end: DateValue } | null) =>
        console.log(dateRange ? dateRange.start.toString() + ' - ' + dateRange.end.toString() : dateRange),
    };
    return (
      <div>
        <Calendar.Range {...args} minValue={parseDate('1900-02-03')} />
      </div>
    );
  },

  Disabled() {
    const args = {
      defaultValue: {
        start: parseDate('2020-02-03'),
        end: parseDate('2020-02-08'),
      },
      onChange: (dateRange: { start: DateValue; end: DateValue } | null) =>
        console.log(dateRange ? dateRange.start.toString() + ' - ' + dateRange.end.toString() : dateRange),
    };
    return (
      <div>
        <Calendar.Range {...args} isDisabled />
      </div>
    );
  },

  'Unavailable Dates'() {
    const args = {
      defaultValue: {
        start: parseDate('2020-02-03'),
        end: parseDate('2020-02-08'),
      },
      onChange: (dateRange: { start: DateValue; end: DateValue } | null) =>
        console.log(dateRange ? dateRange.start.toString() + ' - ' + dateRange.end.toString() : dateRange),
    };
    const now = today(getLocalTimeZone());
    const disabledRanges = [
      [now, now.add({ days: 5 })],
      [now.add({ days: 14 }), now.add({ days: 16 })],
      [now.add({ days: 23 }), now.add({ days: 24 })],
    ];

    const { locale } = useLocale();
    const isDateUnavailable = (date: DateValue) =>
      isWeekend(date, locale) ||
      disabledRanges.some((interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0);

    return (
      <div style={{ width: 300 }}>
        <Calendar.Range {...args} minValue={today(getLocalTimeZone())} isDateUnavailable={isDateUnavailable} />
      </div>
    );
  },
};
