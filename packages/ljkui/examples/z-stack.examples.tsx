import React from 'react';
import { ZStack } from 'ljkui';

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

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Layout', layout: 'padded' } as const;

export const examples = { Example: ZStackFixture };
