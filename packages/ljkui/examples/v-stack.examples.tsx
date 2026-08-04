import React from 'react';
import { VStack } from 'ljkui';

const Box = ({ width, children }: { width: number; children: React.ReactNode }) => (
  <div
    style={{
      width,
      height: 40,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 8,
      background: 'var(--accent-alpha-200)',
    }}
  >
    {children}
  </div>
);

function VStackFixture() {
  const props = { spacing: 8 };
  return (
    <VStack {...props}>
      <Box width={64}>1</Box>
      <Box width={128}>2</Box>
      <Box width={96}>3</Box>
    </VStack>
  );
}

const box = (width: number): React.CSSProperties => ({
  width,
  height: 40,
  display: 'grid',
  placeItems: 'center',
  borderRadius: 8,
  background: 'var(--accent-alpha-200)',
});

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Layout', layout: 'padded' } as const;

export const examples = {
  Overview() {
    return (
      <VStack spacing={12} alignment="leading">
        <div style={box(64)}>1</div>
        <div style={box(128)}>2</div>
        <div style={box(96)}>3</div>
      </VStack>
    );
  },
  Example: VStackFixture,
};
