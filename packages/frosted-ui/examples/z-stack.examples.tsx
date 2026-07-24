import React from 'react';
import { ZStack } from '@aussieljk/frosted';

function ZStackFixture() {
  const props = { alignment: 'bottomTrailing' } as const;
  return (
    <ZStack {...props}>
      <div style={{ width: 160, height: 160, borderRadius: 16, background: 'var(--accent-alpha-200)' }} />
      <div style={{ width: 96, height: 96, borderRadius: 16, background: 'var(--accent-alpha-400)' }} />
      <div style={{ width: 40, height: 40, borderRadius: 16, background: 'var(--accent-alpha-700)' }} />
    </ZStack>
  );
}

export const examples = { Example: ZStackFixture };
