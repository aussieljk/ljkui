import React from 'react';
import { Chart } from 'ljkui';

export default function ChartDemo() {
  return (
    <div className="w-80">
      <Chart
        data={[
          { label: 'Completed', value: 60, color: 'green' },
          { label: 'In progress', value: 25, color: 'blue' },
          { label: 'Failed', value: 15, color: 'red' },
        ]}
      />
    </div>
  );
}
