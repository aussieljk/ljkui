import React from 'react';
import { DateField } from 'ljkui';
import { parseDate } from '@internationalized/date';

export default function DateFieldDemo() {
  return (
    <div className="w-75">
      <DateField aria-label="Birth date" defaultValue={parseDate('2020-02-03')} />
    </div>
  );
}
