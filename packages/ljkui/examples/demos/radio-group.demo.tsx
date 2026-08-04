import React from 'react';
import { RadioGroup } from 'ljkui';

export default function RadioGroupDemo() {
  return (
    <div className="flex gap-8">
      <RadioGroup.Root defaultValue="1">
        <RadioGroup.Item value="1">Default</RadioGroup.Item>
        <RadioGroup.Item value="2">Comfortable</RadioGroup.Item>
        <RadioGroup.Item value="3">Compact</RadioGroup.Item>
      </RadioGroup.Root>

      <RadioGroup.Root defaultValue="1" color="green" size="3">
        <RadioGroup.Item value="1">Green</RadioGroup.Item>
        <RadioGroup.Item value="2">Size 3</RadioGroup.Item>
      </RadioGroup.Root>
    </div>
  );
}
