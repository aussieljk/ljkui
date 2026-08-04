import CodeOverview from './demos/code.demo';
import React from 'react';
import { Typography, codePropDefs } from 'ljkui';

const { Code } = Typography;

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Typography', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/code.demo.tsx` before demos folded into examples. */
  Overview: CodeOverview,

  Variant() {
    const args = { children: 'Code', size: codePropDefs.size.default };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 'var(--space-2)' }}>
        <Code {...args} variant="solid">
          console.log()
        </Code>
        <Code {...args} variant="soft">
          console.log()
        </Code>
        <Code {...args} variant="outline">
          console.log()
        </Code>
        <Code {...args} variant="ghost">
          console.log()
        </Code>
      </div>
    );
  },

  Size() {
    const args = { children: 'Code' };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Code {...args} size="1">
          console.log()
        </Code>
        <Code {...args} size="2">
          console.log()
        </Code>
        <Code {...args} size="3">
          console.log()
        </Code>
        <Code {...args} size="4">
          console.log()
        </Code>
        <Code {...args} size="5">
          console.log()
        </Code>
        <Code {...args} size="6">
          console.log()
        </Code>
        <Code {...args} size="7">
          console.log()
        </Code>
        <Code {...args} size="8">
          console.log()
        </Code>
        <Code {...args} size="9">
          console.log()
        </Code>
      </div>
    );
  },

  Color() {
    const args = { children: 'Code', size: codePropDefs.size.default };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 'var(--space-2)' }}>
        <Code {...args} color="indigo">
          console.log()
        </Code>
        <Code {...args} color="rose">
          console.log()
        </Code>
        <Code {...args} color="cyan">
          console.log()
        </Code>
        <Code {...args} color="orange">
          console.log()
        </Code>
      </div>
    );
  },

  'High Contrast'() {
    const args = { children: 'Code', size: codePropDefs.size.default };
    return (
      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 'var(--space-2)' }}>
          <Code {...args} variant="solid">
            console.log()
          </Code>
          <Code {...args} variant="soft">
            console.log()
          </Code>
          <Code {...args} variant="outline">
            console.log()
          </Code>
          <Code {...args} variant="ghost">
            console.log()
          </Code>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 'var(--space-2)' }}>
          <Code {...args} variant="solid" highContrast>
            console.log()
          </Code>
          <Code {...args} variant="soft" highContrast>
            console.log()
          </Code>
          <Code {...args} variant="outline" highContrast>
            console.log()
          </Code>
          <Code {...args} variant="ghost" highContrast>
            console.log()
          </Code>
        </div>
      </div>
    );
  },
};
