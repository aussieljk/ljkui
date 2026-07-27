import React from 'react';
import { Input } from 'ljkui';

export default function InputDemo() {
  return (
    <div className="flex w-70 flex-col gap-3">
      <Input.Root>
        <Input.Slot>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </Input.Slot>
        <Input.Control placeholder="Search the docs…" />
      </Input.Root>

      <Input.Root variant="soft" size="3">
        <Input.Control placeholder="Soft variant, size 3" />
      </Input.Root>
    </div>
  );
}
