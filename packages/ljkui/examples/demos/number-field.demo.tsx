import React from 'react';
import { NumberField } from 'ljkui';

export default function NumberFieldDemo() {
  return (
    <div className="flex w-45 flex-col gap-3">
      <NumberField.Root defaultValue={50} min={0} max={100}>
        <NumberField.Input />
      </NumberField.Root>

      <NumberField.Root defaultValue={5} buttonLayout="split">
        <NumberField.Slot>Qty</NumberField.Slot>
        <NumberField.Input />
      </NumberField.Root>

      <NumberField.Root defaultValue={99} buttonLayout="none">
        <NumberField.Slot>$</NumberField.Slot>
        <NumberField.Input />
      </NumberField.Root>
    </div>
  );
}
