import React from 'react';
import { Typography } from 'ljkui';

export default function BlockquoteDemo() {
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
}
