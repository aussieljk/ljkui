import React from 'react';
import { IconButton, IconProvider, Icons, Typography, VisuallyHidden } from 'ljkui';
import { lucideAdapter } from 'ljkui/icons/lucide';

export default function VisuallyHiddenDemo() {
  return (
    <IconProvider library={lucideAdapter}>
      <div className="flex items-center gap-3">
        <IconButton variant="soft">
          <VisuallyHidden>Settings</VisuallyHidden>
          <Icons.Settings />
        </IconButton>
        <Typography.Text size="2" color="gray">
          Screen readers announce this button as &quot;Settings&quot;.
        </Typography.Text>
      </div>
    </IconProvider>
  );
}
