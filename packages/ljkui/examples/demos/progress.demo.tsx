import React from 'react';
import { Progress } from 'ljkui';

export default function ProgressDemo() {
  return (
    <div className="flex w-70 flex-col gap-4">
      <Progress value={25} size="1" aria-label="25% complete" />
      <Progress value={60} size="2" aria-label="60% complete" />
      <Progress value={85} size="3" color="green" aria-label="85% complete" />
    </div>
  );
}
