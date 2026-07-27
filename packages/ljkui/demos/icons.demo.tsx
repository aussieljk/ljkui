import React from 'react';
import { Button, IconButton, IconProvider, Icons } from 'ljkui';
import { lucideAdapter } from 'ljkui/icons/lucide';

export default function IconsDemo() {
  return (
    <IconProvider library={lucideAdapter}>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="surface">
          <Icons.Search />
          Search
        </Button>
        <IconButton variant="soft" aria-label="Settings">
          <Icons.Settings />
        </IconButton>
        <Icons.Bell />
        <Icons.Heart />
        <Icons.Star />
        <Icons.Calendar />
      </div>
    </IconProvider>
  );
}
