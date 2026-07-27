import React from 'react';
import { Separator, Typography } from 'ljkui';

export default function SeparatorDemo() {
  return (
    <Typography.Text size="2">
      Tools for building high-quality, accessible UI.
      <Separator size="4" className="my-3" />
      <div className="flex items-center gap-3">
        Themes
        <Separator orientation="vertical" />
        Primitives
        <Separator orientation="vertical" />
        Icons
        <Separator orientation="vertical" />
        Colors
      </div>
    </Typography.Text>
  );
}
