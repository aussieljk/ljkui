import React from 'react';
import { Typography } from 'ljkui';

export default function CodeDemo() {
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
}
