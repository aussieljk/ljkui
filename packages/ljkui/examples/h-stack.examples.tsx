import React from 'react';
import { HStack } from 'ljkui';

const Box = ({ height, children }: { height: number; children: React.ReactNode }) => (
  <div
    style={{
      height,
      width: 64,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 8,
      background: 'var(--accent-alpha-200)',
    }}
  >
    {children}
  </div>
);

function HStackFixture() {
  const props = { spacing: 8 };
  return (
    <HStack {...props}>
      <Box height={40}>1</Box>
      <Box height={80}>2</Box>
      <Box height={56}>3</Box>
    </HStack>
  );
}

function SeparatorFixture() {
  const divider = <div style={{ alignSelf: 'stretch', width: 1, background: 'var(--gray-a5)' }} />;
  return (
    <HStack spacing={8} separator={divider}>
      <Box height={40}>1</Box>
      <Box height={40}>2</Box>
      <Box height={40}>3</Box>
    </HStack>
  );
}

const box = (height: number): React.CSSProperties => ({
  height,
  width: 64,
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
      <HStack spacing={12} alignment="center">
        <div style={box(40)}>1</div>
        <div style={box(80)}>2</div>
        <div style={box(56)}>3</div>
      </HStack>
    );
  },
  Example: HStackFixture,
  Separator: SeparatorFixture,
};
