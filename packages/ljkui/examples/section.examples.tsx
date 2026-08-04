import React from 'react';
import { Section, Typography } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Layout', layout: 'centered' } as const;

export const examples = {
  'As another element'() {
    return (
      <Section size="2" render={<section />}>
        <Typography.Text>
          Use the <Typography.Code>render</Typography.Code> prop to render the section as a{' '}
          <Typography.Code>&lt;section&gt;</Typography.Code> with vertical padding rhythm.
        </Typography.Text>
      </Section>
    );
  },
};
