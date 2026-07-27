import React from 'react';
import { AvatarGroup, colorProp } from 'ljkui';
import { Button } from 'react-aria-components';

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

export const examples = {
  Default() {
    const args = {};
    const [users, setUsers] = React.useState(availableUsers);

    return (
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <AvatarGroup.Root {...args} size="3">
          {users.map((user) => (
            <AvatarGroup.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarGroup.Root>
        <AvatarGroup.Root {...args} size="9">
          {users.map((user) => (
            <AvatarGroup.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarGroup.Root>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {availableUsers.map((user) => (
            <Button
              key={user.name}
              onPress={() => {
                setUsers((prev) =>
                  prev.map((a) => a.name).includes(user.name)
                    ? prev.filter((u) => u.name !== user.name)
                    : [...prev, user],
                );
              }}
            >
              Toggle {user.name}
            </Button>
          ))}
        </div>
      </div>
    );
  },

  Size() {
    const args = {};
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <AvatarGroup.Root {...args} size="1">
          {availableUsers.map((user) => (
            <AvatarGroup.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarGroup.Root>
        <AvatarGroup.Root {...args} size="2">
          {availableUsers.map((user) => (
            <AvatarGroup.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarGroup.Root>
        <AvatarGroup.Root {...args} size="3">
          {availableUsers.map((user) => (
            <AvatarGroup.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarGroup.Root>
        <AvatarGroup.Root {...args} size="4">
          {availableUsers.map((user) => (
            <AvatarGroup.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarGroup.Root>
        <AvatarGroup.Root {...args} size="5">
          {availableUsers.map((user) => (
            <AvatarGroup.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarGroup.Root>
        <AvatarGroup.Root {...args} size="6">
          {availableUsers.map((user) => (
            <AvatarGroup.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarGroup.Root>
        <AvatarGroup.Root {...args} size="7">
          {availableUsers.map((user) => (
            <AvatarGroup.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarGroup.Root>
        <AvatarGroup.Root {...args} size="8">
          {availableUsers.map((user) => (
            <AvatarGroup.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarGroup.Root>
        <AvatarGroup.Root {...args} size="9">
          {availableUsers.map((user) => (
            <AvatarGroup.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarGroup.Root>
      </div>
    );
  },

  Color() {
    const args = {};
    return (
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <AvatarGroup.Root size="5" {...args} color="indigo">
          {availableUsers.map((user) => (
            <AvatarGroup.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarGroup.Root>
        <AvatarGroup.Root size="5" {...args} color="cyan">
          {availableUsers.map((user) => (
            <AvatarGroup.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarGroup.Root>
        <AvatarGroup.Root size="5" {...args} color="orange">
          {availableUsers.map((user) => (
            <AvatarGroup.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarGroup.Root>
        <AvatarGroup.Root size="5" {...args} color="yellow">
          {availableUsers.map((user) => (
            <AvatarGroup.Avatar fallback={user.name} color={user.color} key={user.name} src={user.src} />
          ))}
        </AvatarGroup.Root>
      </div>
    );
  },
};
