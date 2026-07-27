import React from 'react';
import { RadioButtonGroup, Typography } from 'ljkui';

const plans = ['Hobby', 'Pro', 'Enterprise'];

export default function RadioButtonGroupDemo() {
  return (
    <RadioButtonGroup.Root defaultValue="Pro">
      <div className="flex gap-2">
        {plans.map((plan) => (
          <RadioButtonGroup.Item key={plan} value={plan}>
            <div className="flex items-center gap-2 rounded-lg border border-gray-alpha-500 px-4 py-2">
              <RadioButtonGroup.Icon />
              <Typography.Text size="2">{plan}</Typography.Text>
            </div>
          </RadioButtonGroup.Item>
        ))}
      </div>
    </RadioButtonGroup.Root>
  );
}
