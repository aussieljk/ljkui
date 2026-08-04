import React from 'react';
import { Link, Typography } from 'ljkui';

export default function LinkDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Typography.Text size="3">
        Read the <Link href="#">documentation</Link> to get started.
      </Typography.Text>
      <div className="flex items-center gap-4">
        <Link href="#" underline="auto">
          Auto underline
        </Link>
        <Link href="#" underline="hover">
          Hover underline
        </Link>
        <Link href="#" underline="always">
          Always underlined
        </Link>
        <Link href="#" color="orange">
          Orange link
        </Link>
      </div>
    </div>
  );
}
