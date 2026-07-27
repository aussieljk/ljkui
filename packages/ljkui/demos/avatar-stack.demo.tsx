import React from 'react';
import { AvatarStack } from 'ljkui';

export default function AvatarStackDemo() {
  return (
    <AvatarStack.Root size="3">
      <AvatarStack.Avatar
        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
        fallback="Ada Lovelace"
      />
      <AvatarStack.Avatar fallback="GH" color="indigo" />
      <AvatarStack.Avatar fallback="AT" color="teal" />
      <AvatarStack.Avatar fallback="ML" color="orange" />
    </AvatarStack.Root>
  );
}
