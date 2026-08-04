import React from 'react';
import { Combobox, ScrollArea } from 'ljkui';

const fruits = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grape', 'Mango', 'Strawberry'];

export default function ComboboxDemo() {
  return (
    <div className="w-75">
      <Combobox.Root items={fruits} defaultValue="Apple">
        <Combobox.InputRoot showClear>
          <Combobox.Input placeholder="Choose a fruit..." />
        </Combobox.InputRoot>
        <Combobox.Content>
          <ScrollArea type="auto" className="max-h-75">
            <Combobox.Empty>No fruits found.</Combobox.Empty>
            <Combobox.List>
              {(item) => (
                <Combobox.Item key={item} value={item}>
                  {item}
                </Combobox.Item>
              )}
            </Combobox.List>
          </ScrollArea>
        </Combobox.Content>
      </Combobox.Root>
    </div>
  );
}
