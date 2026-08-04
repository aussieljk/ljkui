import AvatarStackOverview from './demos/avatar-stack.demo';
import React from 'react';
import { AvatarStack, colorProp } from 'ljkui';

const availableUsers: Array<{
  name: string;
  color: (typeof colorProp.values)[number];
  src: string;
}> = [
  {
    name: 'Artur Bień',
    color: 'blue',
    src: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop',
  },
  {
    name: 'Cameron Zoub',
    color: 'green',
    src: '',
  },
  {
    name: 'Carlos Whitt',
    color: 'pink',
    src: '',
  },
  {
    name: 'Ilya Miskov',
    color: 'yellow',
    src: '',
  },
  {
    name: 'Guillermo',
    color: 'stone',
    src: '',
  },
  {
    name: 'Steven Schwartz',
    color: 'lime',
    src: '',
  },
  {
    name: 'FJ',
    color: 'red',
    src: '',
  },
];

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/avatar-stack.demo.tsx` before demos folded into examples. */
  Overview: AvatarStackOverview,

  Default() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <AvatarStack.Root {...args} size="3">
          {availableUsers.map((user, index) => (
            <AvatarStack.Avatar
              shape={index % 2 === 0 ? 'circle' : 'square'}
              fallback={user.name}
              color={user.color}
              key={user.name}
              src={user.src}
            />
          ))}
        </AvatarStack.Root>
        <AvatarStack.Root {...args} size="3">
          {availableUsers.map((user) => (
            <AvatarStack.Avatar shape="square" fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarStack.Root>
        <AvatarStack.Root {...args} size="3">
          <AvatarStack.Avatar
            fallback={availableUsers[0].name}
            color={availableUsers[0].color}
            src={availableUsers[0].src}
          />
        </AvatarStack.Root>
      </div>
    );
  },

  Size() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <AvatarStack.Root {...args} size="0">
          {availableUsers.map((user) => (
            <AvatarStack.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarStack.Root>
        <AvatarStack.Root {...args} size="1">
          {availableUsers.map((user) => (
            <AvatarStack.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarStack.Root>
        <AvatarStack.Root {...args} size="2">
          {availableUsers.map((user) => (
            <AvatarStack.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarStack.Root>
        <AvatarStack.Root {...args} size="3">
          {availableUsers.map((user) => (
            <AvatarStack.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarStack.Root>
        <AvatarStack.Root {...args} size="4">
          {availableUsers.map((user) => (
            <AvatarStack.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarStack.Root>
        <AvatarStack.Root {...args} size="5">
          {availableUsers.map((user) => (
            <AvatarStack.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarStack.Root>
        <AvatarStack.Root {...args} size="6">
          {availableUsers.map((user) => (
            <AvatarStack.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarStack.Root>
        <AvatarStack.Root {...args} size="7">
          {availableUsers.map((user) => (
            <AvatarStack.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarStack.Root>
        <AvatarStack.Root {...args} size="8">
          {availableUsers.map((user) => (
            <AvatarStack.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarStack.Root>
        <AvatarStack.Root {...args} size="9">
          {availableUsers.map((user) => (
            <AvatarStack.Avatar
              shape={'square'}
              fallback={user.name}
              color={user.color}
              key={user.name}
              src={user.src}
            />
          ))}
        </AvatarStack.Root>
      </div>
    );
  },
};
