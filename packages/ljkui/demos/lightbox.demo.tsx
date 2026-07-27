import React from 'react';
import { IconButton, IconProvider, Icons, Lightbox, Typography } from 'ljkui';
import { lucideAdapter } from 'ljkui/icons/lucide';

const images = [
  { seed: 'lb1', alt: 'Mountain landscape at sunrise' },
  { seed: 'lb2', alt: 'Ocean waves crashing on rocks' },
  { seed: 'lb3', alt: 'Forest path in autumn' },
];

const navButton = <IconButton size="2" variant="ghost" color="gray" highContrast className="text-white" />;

export default function LightboxDemo() {
  return (
    <IconProvider library={lucideAdapter}>
      <Lightbox.Root viewTransition>
        <div className="grid max-w-105 grid-cols-3 gap-3">
          {images.map((img, i) => (
            <Lightbox.Trigger
              key={img.seed}
              index={i}
              crossfade
              className="cursor-pointer border-none bg-transparent p-0"
            >
              <img
                src={`https://picsum.photos/seed/${img.seed}/200/200`}
                alt={img.alt}
                className="block h-25 w-full rounded-xl object-cover"
              />
            </Lightbox.Trigger>
          ))}
        </div>

        <Lightbox.Content aria-label="Photo gallery">
          <div className="absolute top-4 right-4 z-1">
            <Lightbox.Close aria-label="Close" render={navButton}>
              <Icons.Close />
            </Lightbox.Close>
          </div>

          <Lightbox.ItemGroup>
            {images.map((img, i) => (
              <Lightbox.Item key={img.seed} index={i}>
                <img
                  src={`https://picsum.photos/seed/${img.seed}/1200/800`}
                  alt={img.alt}
                  className="max-h-[75vh] max-w-[90vw] rounded-lg object-contain"
                />
              </Lightbox.Item>
            ))}
          </Lightbox.ItemGroup>

          <div className="flex items-center gap-3 p-3">
            <Lightbox.Previous aria-label="Previous" render={navButton}>
              <Icons.ChevronLeft />
            </Lightbox.Previous>
            <Lightbox.Counter>
              {({ current, total }) => (
                <Typography.Text size="2" className="min-w-12 text-center text-white/70">
                  {current} / {total}
                </Typography.Text>
              )}
            </Lightbox.Counter>
            <Lightbox.Next aria-label="Next" render={navButton}>
              <Icons.ChevronRight />
            </Lightbox.Next>
          </div>
        </Lightbox.Content>
      </Lightbox.Root>
    </IconProvider>
  );
}
