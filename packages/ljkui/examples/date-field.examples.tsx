import { getLocalTimeZone, parseDate, parseZonedDateTime, today } from '@internationalized/date';
import React from 'react';
import { DateField, dateFieldPropDefs } from 'ljkui';

export const examples = {
  Size() {
    const args = {
      size: dateFieldPropDefs.size.default,
      color: dateFieldPropDefs.color.default,
      'aria-label': 'Birth date',
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: 300 }}>
        <DateField {...args} defaultValue={parseDate('2020-02-03')} size="1" />
        <DateField {...args} defaultValue={parseDate('2020-02-03')} size="2" />
        <DateField {...args} defaultValue={parseDate('2020-02-03')} size="3" />
        <DateField {...args} defaultValue={parseDate('2020-02-03')} size="4" />
      </div>
    );
  },

  MinValue() {
    const args = {
      size: dateFieldPropDefs.size.default,
      color: dateFieldPropDefs.color.default,
      'aria-label': 'Birth date',
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: 300 }}>
        <DateField
          {...args}
          minValue={today(getLocalTimeZone())}
          defaultValue={parseDate('2020-02-03')}
          validationBehavior="aria"
        />
      </div>
    );
  },

  'With time'() {
    const args = {
      size: dateFieldPropDefs.size.default,
      color: dateFieldPropDefs.color.default,
      'aria-label': 'Birth date',
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: 300 }}>
        <DateField {...args} defaultValue={parseZonedDateTime('2022-11-07T00:45[America/Los_Angeles]')} />
        <DateField {...args} defaultValue={parseZonedDateTime('2022-11-07T00:45[America/Los_Angeles]')} hideTimeZone />
        <DateField
          {...args}
          defaultValue={parseZonedDateTime('2022-11-07T00:45[America/Los_Angeles]')}
          hideTimeZone
          granularity="second"
        />
      </div>
    );
  },
};
