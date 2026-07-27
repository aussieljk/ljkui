import React from 'react';
import { Switch, Typography } from 'ljkui';

export default function SwitchDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Switch size="1" defaultChecked />
      <Switch size="2" defaultChecked />
      <Switch size="3" defaultChecked />
      <Typography.Text render={<label />} size="2" className="flex items-center gap-2">
        <Switch color="orange" defaultChecked />
        Notifications
      </Typography.Text>
    </div>
  );
}
