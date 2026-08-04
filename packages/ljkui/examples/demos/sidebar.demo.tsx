import React from 'react';
import { HStack, Sidebar, Typography } from 'ljkui';

export default function SidebarDemo() {
  return (
    <div
      style={{
        height: 320,
        borderRadius: 'var(--radius-3)',
        overflow: 'hidden',
        boxShadow: '0 0 0 1px var(--gray-alpha-300) inset',
      }}
    >
      <Sidebar.Provider>
        <Sidebar.Root collapsible="icon">
          <Sidebar.Header>
            <Typography.Text size="2" weight="medium">
              Acme Inc.
            </Typography.Text>
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
              <Sidebar.Menu>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton isActive>Dashboard</Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton>Projects</Sidebar.MenuButton>
                </Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.Group>
          </Sidebar.Content>
          <Sidebar.Rail />
        </Sidebar.Root>

        <Sidebar.Inset>
          <HStack spacing={8} style={{ padding: 'var(--space-3)' }}>
            <Sidebar.Trigger />
            <Typography.Text size="2" weight="medium">
              Dashboard
            </Typography.Text>
          </HStack>
        </Sidebar.Inset>
      </Sidebar.Provider>
    </div>
  );
}
