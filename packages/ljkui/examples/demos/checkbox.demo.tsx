import React from 'react';
import { Checkbox, Typography } from 'ljkui';

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Typography.Text render={<label />} size="2" className="flex items-center gap-2">
        <Checkbox defaultChecked />
        Agree to terms and conditions
      </Typography.Text>
      <Typography.Text render={<label />} size="2" className="flex items-center gap-2">
        <Checkbox color="green" defaultChecked />
        Subscribe to the newsletter
      </Typography.Text>
      <Typography.Text render={<label />} size="2" color="gray" className="flex items-center gap-2">
        <Checkbox disabled />
        Disabled option
      </Typography.Text>
    </div>
  );
}
