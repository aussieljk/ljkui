import React from 'react';
import { Typography, codePropDefs } from 'ljkui';

const { Code } = Typography;

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Typography', layout: 'centered', enumerate: 'Typography.Code' } as const;

export const examples = {
  /** The canonical usage — was `demos/code.demo.tsx` before demos folded into examples. */
  Overview() {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Typography.Code variant="solid">console.log()</Typography.Code>
        <Typography.Code variant="soft">console.log()</Typography.Code>
        <Typography.Code variant="outline">console.log()</Typography.Code>
        <Typography.Code variant="ghost">console.log()</Typography.Code>
        <Typography.Code variant="soft" color="orange">
          console.log()
        </Typography.Code>
        <Typography.Code variant="soft" size="4">
          console.log()
        </Typography.Code>
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
