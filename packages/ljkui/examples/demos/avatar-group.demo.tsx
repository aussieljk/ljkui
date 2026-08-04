import React from 'react';
import { AvatarGroup } from 'ljkui';

export default function AvatarGroupDemo() {
  return (
    <AvatarGroup.Root size="3">
      <AvatarGroup.Avatar
        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
        fallback="Ada Lovelace"
      />
      <AvatarGroup.Avatar fallback="GH" color="indigo" />
      <AvatarGroup.Avatar fallback="AT" color="teal" />
      <AvatarGroup.Avatar fallback="+3" color="gray" />
    </AvatarGroup.Root>
  );
}
