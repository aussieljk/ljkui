import React from 'react';
import { Resizable, Typography } from 'ljkui';

export default function ResizableDemo() {
  return (
    <div
      style={{
        height: 200,
        width: 480,
        borderRadius: 'var(--radius-3)',
        boxShadow: '0 0 0 1px var(--gray-alpha-300) inset',
      }}
    >
      <Resizable.Root direction="horizontal">
        <Resizable.Panel defaultSize={30} minSize={15}>
          <div style={{ padding: 'var(--space-4)' }}>
            <Typography.Text size="2">Sidebar</Typography.Text>
          </div>
        </Resizable.Panel>
        <Resizable.Handle withHandle />
        <Resizable.Panel defaultSize={70}>
          <div style={{ padding: 'var(--space-4)' }}>
            <Typography.Text size="2">Editor</Typography.Text>
          </div>
        </Resizable.Panel>
      </Resizable.Root>
    </div>
  );
}
