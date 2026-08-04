import React from 'react';
import { Textarea } from 'ljkui';

export default function TextareaDemo() {
  return (
    <div className="flex w-75 flex-col gap-3">
      <Textarea placeholder="Reply to comment…" />
      <Textarea variant="soft" placeholder="Soft variant" />
      <Textarea variant="soft" color="blue" size="3" placeholder="Blue, size 3" />
      <Textarea disabled placeholder="Disabled" />
    </div>
  );
}
