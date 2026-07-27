import React from 'react';
import { Accordion } from 'ljkui';

export default function AccordionDemo() {
  return (
    <Accordion.Root type="single" defaultValue={['item-1']} className="w-full max-w-125">
      <div className="flex flex-col gap-4">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
          <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Trigger>Can it open multiple items?</Accordion.Trigger>
          <Accordion.Content>Yes. Set type to multiple to allow several open panels at once.</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <Accordion.Trigger>Can it be animated?</Accordion.Trigger>
          <Accordion.Content>Yes! Panels animate open and closed by default.</Accordion.Content>
        </Accordion.Item>
      </div>
    </Accordion.Root>
  );
}
