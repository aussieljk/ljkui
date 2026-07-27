import React from 'react';
import { HStack, Resizable, Typography } from 'ljkui';

const Pane = ({ label }: { label: string }) => (
  <HStack alignment="center" style={{ height: '100%', padding: 'var(--space-4)', justifyContent: 'center' }}>
    <Typography.Text size="2" color="gray">
      {label}
    </Typography.Text>
  </HStack>
);

const frame = {
  height: 260,
  borderRadius: 'var(--radius-3)',
  boxShadow: '0 0 0 1px var(--gray-alpha-300) inset',
} as const;

export const examples = {
  Horizontal: (
    <div style={{ ...frame, width: 520 }}>
      <Resizable.Root direction="horizontal">
        <Resizable.Panel defaultSize={30} minSize={15}>
          <Pane label="Sidebar" />
        </Resizable.Panel>
        <Resizable.Handle withHandle />
        <Resizable.Panel defaultSize={70}>
          <Pane label="Editor" />
        </Resizable.Panel>
      </Resizable.Root>
    </div>
  ),

  Vertical: (
    <div style={{ ...frame, width: 420 }}>
      <Resizable.Root direction="vertical">
        <Resizable.Panel defaultSize={60}>
          <Pane label="Preview" />
        </Resizable.Panel>
        <Resizable.Handle withHandle />
        <Resizable.Panel defaultSize={40} minSize={20}>
          <Pane label="Console" />
        </Resizable.Panel>
      </Resizable.Root>
    </div>
  ),

  'Three panels': (
    <div style={{ ...frame, width: 640 }}>
      <Resizable.Root direction="horizontal">
        <Resizable.Panel defaultSize={25} minSize={15}>
          <Pane label="Files" />
        </Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel defaultSize={50}>
          <Pane label="Editor" />
        </Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel defaultSize={25} minSize={15}>
          <Pane label="Outline" />
        </Resizable.Panel>
      </Resizable.Root>
    </div>
  ),
};
