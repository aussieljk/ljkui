import React from 'react';
import { Avatar } from 'ljkui';

export default function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar
        size="4"
        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
        fallback="A"
      />
      <Avatar size="4" fallback="LK" color="indigo" />
      <Avatar size="4" shape="square" fallback="SQ" color="teal" />
      <Avatar size="2" fallback="S" color="orange" />
      <Avatar size="6" fallback="L" color="rose" highContrast />
    </div>
  );
}
