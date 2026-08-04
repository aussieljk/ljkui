import React from 'react';
import { Avatar } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'centered' } as const;

export const examples = {
  Shape() {
    const args = {
      fallback: 'Cameron Zoub',
      color: 'blue',
      onLoadingStatusChange: () => {},
    } as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Avatar
            {...args}
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            shape="circle"
          />
          <Avatar {...args} shape="circle" />
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Avatar
            {...args}
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            shape="square"
          />
          <Avatar {...args} shape="square" />
        </div>
      </div>
    );
  },

  Size() {
    const args = {
      fallback: 'Cameron Zoub',
      src: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop',
      color: 'blue',
      onLoadingStatusChange: () => {},
    } as const;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <Avatar {...args} size="0" />
        <Avatar {...args} size="1" />
        <Avatar {...args} size="2" />
        <Avatar {...args} size="3" />
        <Avatar {...args} size="4" />
        <Avatar {...args} size="5" />
        <Avatar {...args} size="6" />
        <Avatar {...args} size="7" />
        <Avatar {...args} size="8" />
      </div>
    );
  },

  Color() {
    const args = { fallback: 'Cameron Zoub', onLoadingStatusChange: () => {} };
    return (
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <Avatar {...args} color="indigo" />
        <Avatar {...args} color="cyan" />
        <Avatar {...args} color="orange" />
        <Avatar {...args} color="rose" />
      </div>
    );
  },

  HighContrast() {
    const args = { fallback: 'Cameron Zoub', onLoadingStatusChange: () => {} };
    return (
      <div style={{ display: 'inline-grid', gridTemplateRows: 'repeat(2, 1fr)', gap: '8px', gridAutoFlow: 'column' }}>
        <Avatar {...args} color="indigo" />
        <Avatar {...args} color="indigo" highContrast />
        <Avatar {...args} color="cyan" />
        <Avatar {...args} color="cyan" highContrast />
        <Avatar {...args} color="orange" />
        <Avatar {...args} color="orange" highContrast />
        <Avatar {...args} color="rose" />
        <Avatar {...args} color="rose" highContrast />
      </div>
    );
  },

  Fallback() {
    const args = { onLoadingStatusChange: () => {} };
    return (
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <Avatar {...args} fallback={<>AB</>} />
        <Avatar {...args} fallback="Ilya Miskov" />
        <Avatar {...args} fallback="John von Neumann" />
        <Avatar {...args} fallback="Grace Hopper 123" />
        <Avatar {...args} fallback="artur_bien" />
        <Avatar
          {...args}
          fallback={
            <div style={{ width: 20, height: 20 }}>
              <svg viewBox="0 0 64 64" fill="currentColor">
                <path d="M41.5 14c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S33 27.962 33 23 36.813 14 41.5 14zM56.289 43.609C57.254 46.21 55.3 49 52.506 49c-2.759 0-11.035 0-11.035 0 .689-5.371-4.525-10.747-8.541-13.03 2.388-1.171 5.149-1.834 8.07-1.834C48.044 34.136 54.187 37.944 56.289 43.609zM37.289 46.609C38.254 49.21 36.3 52 33.506 52c-5.753 0-17.259 0-23.012 0-2.782 0-4.753-2.779-3.783-5.392 2.102-5.665 8.245-9.472 15.289-9.472S35.187 40.944 37.289 46.609zM21.5 17c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S13 30.962 13 26 16.813 17 21.5 17z" />
              </svg>
            </div>
          }
        />
      </div>
    );
  },
};
