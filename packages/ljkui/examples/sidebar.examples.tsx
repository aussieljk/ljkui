import React from 'react';
import { HStack, Sidebar, Typography } from 'ljkui';

const nav = {
  Workspace: ['Dashboard', 'Projects', 'Reports'],
  Account: ['Members', 'Billing', 'Settings'],
};

const Shell = ({ collapsible }: { collapsible?: 'offcanvas' | 'icon' | 'none' }) => {
  const [active, setActive] = React.useState('Dashboard');
  return (
    <div
      style={{
        height: 380,
        borderRadius: 'var(--radius-3)',
        overflow: 'hidden',
        boxShadow: '0 0 0 1px var(--gray-alpha-300) inset',
      }}
    >
      <Sidebar.Provider>
        <Sidebar.Root collapsible={collapsible}>
          <Sidebar.Header>
            <Typography.Text size="2" weight="medium">
              Acme Inc.
            </Typography.Text>
          </Sidebar.Header>
          <Sidebar.Content>
            {Object.entries(nav).map(([group, items]) => (
              <Sidebar.Group key={group}>
                <Sidebar.GroupLabel>{group}</Sidebar.GroupLabel>
                <Sidebar.Menu>
                  {items.map((item) => (
                    <Sidebar.MenuItem key={item}>
                      <Sidebar.MenuButton isActive={item === active} onClick={() => setActive(item)}>
                        {item}
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  ))}
                </Sidebar.Menu>
              </Sidebar.Group>
            ))}
          </Sidebar.Content>
          <Sidebar.Footer>
            <Typography.Text size="1" color="gray">
              ada@example.com
            </Typography.Text>
          </Sidebar.Footer>
          <Sidebar.Rail />
        </Sidebar.Root>

        <Sidebar.Inset>
          <HStack alignment="center" spacing={8} style={{ padding: 'var(--space-3)' }}>
            <Sidebar.Trigger />
            <Typography.Text size="2" weight="medium">
              {active}
            </Typography.Text>
          </HStack>
          <HStack alignment="center" style={{ flex: 1, justifyContent: 'center' }}>
            <Typography.Text size="2" color="gray">
              Press ⌘B to toggle the sidebar
            </Typography.Text>
          </HStack>
        </Sidebar.Inset>
      </Sidebar.Provider>
    </div>
  );
};

export const examples = {
  Default: <Shell />,
  'Collapse to icon rail': <Shell collapsible="icon" />,
  'Not collapsible': <Shell collapsible="none" />,
};
