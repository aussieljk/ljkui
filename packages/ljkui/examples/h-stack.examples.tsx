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

export const examples = { Example: HStackFixture, Separator: SeparatorFixture };
