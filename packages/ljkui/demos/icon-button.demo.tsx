import React from 'react';
import { IconButton, IconProvider, Icons } from 'ljkui';
import { lucideAdapter } from 'ljkui/icons/lucide';

export default function IconButtonDemo() {
  return (
    <IconProvider library={lucideAdapter}>
      <div className="flex flex-wrap items-center gap-3">
        <IconButton variant="classic" aria-label="Search">
          <Icons.Search />
        </IconButton>
        <IconButton variant="solid" aria-label="Add">
          <Icons.Plus />
        </IconButton>
        <IconButton variant="soft" aria-label="Favorite">
          <Icons.Heart />
        </IconButton>
        <IconButton variant="surface" aria-label="Settings">
          <Icons.Settings />
        </IconButton>
        <IconButton variant="ghost" aria-label="Notifications">
          <Icons.Bell />
        </IconButton>
        <IconButton variant="solid" color="red" aria-label="Delete">
          <Icons.Trash />
        </IconButton>
        <IconButton variant="soft" loading aria-label="Loading">
          <Icons.Star />
        </IconButton>
      </div>
    </IconProvider>
  );
}
