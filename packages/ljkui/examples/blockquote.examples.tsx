import React from 'react';
import { Typography } from 'ljkui';

const { Blockquote } = Typography;

function BlockquoteFixture() {
  const children = 'I love how we have the freedom to explore skeuomorphism';
  const props = {};
  return <Blockquote {...props}>{children}</Blockquote>;
}

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Typography', layout: 'centered' } as const;

export const examples = {
  Overview() {
    return (
      <div className="flex max-w-120 flex-col gap-4">
        <Typography.Blockquote>
          Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.
        </Typography.Blockquote>
        <Typography.Blockquote size="2" color="indigo">
          Styles come and go. Good design is a language, not a style.
        </Typography.Blockquote>
      </div>
    );
  },
  Example: BlockquoteFixture,
};
