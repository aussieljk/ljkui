import React from 'react';
import { HStack } from 'ljkui';

const box = (height: number): React.CSSProperties => ({
  height,
  width: 64,
  display: 'grid',
  placeItems: 'center',
  borderRadius: 8,
  background: 'var(--accent-alpha-200)',
});

export default function HStackDemo() {
  return (
    <HStack spacing={12} alignment="center">
      <div style={box(40)}>1</div>
      <div style={box(80)}>2</div>
      <div style={box(56)}>3</div>
    </HStack>
  );
}
