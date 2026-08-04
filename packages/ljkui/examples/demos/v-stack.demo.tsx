import React from 'react';
import { VStack } from 'ljkui';

const box = (width: number): React.CSSProperties => ({
  width,
  height: 40,
  display: 'grid',
  placeItems: 'center',
  borderRadius: 8,
  background: 'var(--accent-alpha-200)',
});

export default function VStackDemo() {
  return (
    <VStack spacing={12} alignment="leading">
      <div style={box(64)}>1</div>
      <div style={box(128)}>2</div>
      <div style={box(96)}>3</div>
    </VStack>
  );
}
