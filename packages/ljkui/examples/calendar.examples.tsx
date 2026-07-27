import { DateValue, getLocalTimeZone, isWeekend, parseDate, today } from '@internationalized/date';
import { useLocale } from '@react-aria/i18n';
import React from 'react';
import { Calendar } from 'ljkui';

export const examples = {
  Default() {
    const args = {
      isDisabled: false,
    };
    return (
      <div>
        <Calendar.Root
          {...args}
          minValue={parseDate('1900-02-03')}
          defaultValue={parseDate('2020-02-03')}
          onChange={(date) => console.log(date.toString())}
        />
      </div>
    );
  },

  Disabled() {
    const args = {
      isDisabled: false,
    };
    return (
      <div>
        <Calendar.Root
          {...args}
          isDisabled
          defaultValue={parseDate('2020-02-03')}
          onChange={(date) => console.log(date.toString())}
        />
      </div>
    );
  },

  'Unavailable Dates'() {
    const args = {
      isDisabled: false,
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
        <Calendar.Root
          {...args}
          aria-label="Appointment date"
          minValue={today(getLocalTimeZone())}
          isDateUnavailable={isDateUnavailable}
        />
      </div>
    );
  },
};
