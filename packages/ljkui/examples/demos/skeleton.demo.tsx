import React from 'react';
import { Card, Skeleton } from 'ljkui';

export default function SkeletonDemo() {
  return (
    <Card size="2" className="max-w-80">
      <div className="flex items-center gap-3">
        <Skeleton.Avatar size="3" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton.Text size="2" className="w-[60%]" />
          <Skeleton.Text size="2" className="w-[90%]" />
        </div>
      </div>
      <Skeleton.Rect className="mt-3 h-24" />
    </Card>
  );
}
