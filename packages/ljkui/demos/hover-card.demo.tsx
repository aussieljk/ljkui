import React from 'react';
import { Avatar, HoverCard, Link, Typography } from 'ljkui';

export default function HoverCardDemo() {
  return (
    <Typography.Text>
      Follow{' '}
      <HoverCard.Root>
        <HoverCard.Trigger>
          <Link href="https://github.com/aussieljk/ljkui" target="_blank">
            ljkui
          </Link>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div className="flex gap-4">
            <Avatar size="3" fallback="AF" />
            <div>
              <Typography.Heading size="3">ljkui</Typography.Heading>
              <Typography.Text render={<div />} size="2" color="gray">
                aussieljk
              </Typography.Text>
              <Typography.Text render={<div />} size="2" className="mt-3 max-w-75">
                React components library built on top of Base UI primitives.
              </Typography.Text>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard.Root>{' '}
      for updates.
    </Typography.Text>
  );
}
