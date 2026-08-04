import React from 'react';
import { Select } from 'ljkui';

export default function SelectDemo() {
  return (
    <Select.Root defaultValue="apple" size="2">
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.GroupLabel>Fruits</Select.GroupLabel>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="orange">Orange</Select.Item>
          <Select.Item value="grape" disabled>
            Grape
          </Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.GroupLabel>Vegetables</Select.GroupLabel>
          <Select.Item value="carrot">Carrot</Select.Item>
          <Select.Item value="potato">Potato</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
