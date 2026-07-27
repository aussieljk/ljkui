import React from 'react';
import { Spinner, Switch } from 'ljkui';

export default function SpinnerDemo() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="1" />
      <Spinner size="3" />
      <Spinner size="5" />
      {/* `loading` swaps children for a spinner while preserving their dimensions */}
      <Spinner loading>
        <Switch defaultChecked />
      </Spinner>
    </div>
  );
}
