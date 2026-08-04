import React from 'react';
import { HStack, Toggle } from 'ljkui';

export default function ToggleDemo() {
  return (
    <HStack spacing={8}>
      <Toggle defaultPressed>Bold</Toggle>
      <Toggle>Italic</Toggle>
      <Toggle>Underline</Toggle>
    </HStack>
  );
}
