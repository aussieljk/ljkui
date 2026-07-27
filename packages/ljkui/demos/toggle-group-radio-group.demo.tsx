import React from 'react';
import { ToggleGroupRadioGroup, Typography } from 'ljkui';

export default function ToggleGroupRadioGroupDemo() {
  const [view, setView] = React.useState('day');

  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleGroupRadioGroup.Root value={view} onValueChange={setView}>
        <ToggleGroupRadioGroup.Item value="day">Day</ToggleGroupRadioGroup.Item>
        <ToggleGroupRadioGroup.Item value="week">Week</ToggleGroupRadioGroup.Item>
        <ToggleGroupRadioGroup.Item value="month">Month</ToggleGroupRadioGroup.Item>
      </ToggleGroupRadioGroup.Root>
      <Typography.Text size="2" color="gray">
        Selected view: {view}
      </Typography.Text>
    </div>
  );
}
