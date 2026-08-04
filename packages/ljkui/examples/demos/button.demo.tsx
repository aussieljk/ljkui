import React from 'react';
import { Button } from 'ljkui';

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="classic">Classic</Button>
      <Button variant="solid">Solid</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="surface">Surface</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="solid" color="red">
        Red
      </Button>
      <Button variant="solid" size="4">
        Large
      </Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}
