import React from 'react';
import { IconButton, Typography, WidgetStack } from 'ljkui';

const itemClass = 'grid size-full place-items-center';

export default function WidgetStackDemo() {
  return (
    <WidgetStack.Root orientation="horizontal">
      <div className="flex items-center gap-4">
        <WidgetStack.Prev render={<IconButton variant="soft" color="gray" className="rounded-full" />}>
          {'<'}
        </WidgetStack.Prev>

        <WidgetStack.Stack className="h-40 w-80">
          <WidgetStack.Item>
            <div className={`${itemClass} bg-linear-to-b from-blue-700 to-blue-400 text-blue-700-contrast`}>
              <Typography.Text weight="bold" size="5">
                Sunny, 24°
              </Typography.Text>
            </div>
          </WidgetStack.Item>
          <WidgetStack.Item>
            <div className={`${itemClass} bg-green-700 text-[64px]`}>🏝️</div>
          </WidgetStack.Item>
          <WidgetStack.Item>
            <div className={`${itemClass} bg-gray-50`}>
              <Typography.Text weight="medium" size="3">
                Swipe or use the arrows
              </Typography.Text>
            </div>
          </WidgetStack.Item>
        </WidgetStack.Stack>

        <WidgetStack.Next render={<IconButton variant="soft" color="gray" className="rounded-full" />}>
          {'>'}
        </WidgetStack.Next>
      </div>
    </WidgetStack.Root>
  );
}
