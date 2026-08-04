import React from 'react';
import { ZStack } from 'ljkui';

export default function ZStackDemo() {
  return (
    <ZStack alignment="bottomTrailing">
      <div className="size-40 rounded-2xl bg-accent-alpha-200" />
      <div className="size-24 rounded-2xl bg-accent-alpha-400" />
      <div className="size-10 rounded-2xl bg-accent-alpha-700" />
    </ZStack>
  );
}
