import React from 'react';
import { Badge } from 'ljkui';

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="solid" color="blue">
        Solid
      </Badge>
      <Badge variant="soft" color="green">
        Soft
      </Badge>
      <Badge variant="surface" color="orange">
        Surface
      </Badge>
      <Badge variant="outline" color="rose">
        Outline
      </Badge>
      <Badge size="2" color="purple">
        Size 2
      </Badge>
    </div>
  );
}
