import React from 'react';
import { Card, Carousel, IconButton, IconProvider, Icons, Typography } from 'ljkui';
import { lucideAdapter } from 'ljkui/icons/lucide';

const items = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

export default function CarouselDemo() {
  return (
    <IconProvider library={lucideAdapter}>
      <Carousel.Root defaultValue={0}>
        <Carousel.Viewport
          aria-label="Gallery"
          className="flex gap-3 overflow-x-auto [overscroll-behavior-x:contain] [scroll-snap-type:x_mandatory] [scrollbar-width:none]"
        >
          {items.map((label) => (
            <Carousel.Item key={label} className="shrink-0 [scroll-snap-align:start]">
              <Card size="2" className="grid h-25 w-45 place-items-center">
                <Typography.Text size="3" weight="bold">
                  {label}
                </Typography.Text>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel.Viewport>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-2">
            <Carousel.Previous aria-label="Previous" render={<IconButton variant="soft" size="1" color="gray" />}>
              <Icons.ChevronLeft />
            </Carousel.Previous>
            <Carousel.Next aria-label="Next" render={<IconButton variant="soft" size="1" color="gray" />}>
              <Icons.ChevronRight />
            </Carousel.Next>
          </div>

          <Carousel.ScrollMarkerGroup aria-label="Go to item" className="flex gap-1">
            {items.map((label, i) => (
              <Carousel.ScrollMarker
                key={label}
                index={i}
                render={(props, state) => (
                  <button
                    {...props}
                    className={`size-2 cursor-pointer rounded-full border-[1.5px] border-gray-600 p-0 ${
                      state.active ? 'bg-gray-950' : 'bg-transparent'
                    }`}
                  />
                )}
              />
            ))}
          </Carousel.ScrollMarkerGroup>
        </div>
      </Carousel.Root>
    </IconProvider>
  );
}
