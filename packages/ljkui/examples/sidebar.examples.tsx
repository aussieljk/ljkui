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

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      height: 420,
      borderRadius: 'var(--radius-3)',
      overflow: 'hidden',
      boxShadow: '0 0 0 1px var(--gray-alpha-300) inset',
    }}
  >
    {children}
  </div>
);

const projects = ['Design system', 'Marketing site', 'Mobile app'];

const RichShell = () => {
  const [active, setActive] = React.useState('Design system');
  return (
    <Frame>
      <Sidebar.Provider>
        <Sidebar.Root collapsible="icon">
          <Sidebar.Header>
            <Sidebar.Input placeholder="Search…" />
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
              <Sidebar.GroupAction aria-label="Add project">+</Sidebar.GroupAction>
              <Sidebar.GroupContent>
                <Sidebar.Menu>
                  {projects.map((item) => (
                    <Sidebar.MenuItem key={item}>
                      <Sidebar.MenuButton tooltip={item} isActive={item === active} onClick={() => setActive(item)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden style={{ flexShrink: 0 }}>
                          <rect x="2" y="2" width="12" height="12" rx="3" fill="currentColor" opacity="0.5" />
                        </svg>
                        <span>{item}</span>
                      </Sidebar.MenuButton>
                      <Sidebar.MenuBadge>3</Sidebar.MenuBadge>
                      <Sidebar.MenuAction showOnHover aria-label="More">
                        ⋯
                      </Sidebar.MenuAction>
                    </Sidebar.MenuItem>
                  ))}
                </Sidebar.Menu>
              </Sidebar.GroupContent>
            </Sidebar.Group>

            <Sidebar.Group>
              <Sidebar.GroupLabel>Documents</Sidebar.GroupLabel>
              <Sidebar.GroupContent>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton tooltip="Reports">
                      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden style={{ flexShrink: 0 }}>
                        <rect x="3" y="2" width="10" height="12" rx="2" fill="currentColor" opacity="0.5" />
                      </svg>
                      <span>Reports</span>
                    </Sidebar.MenuButton>
                    <Sidebar.MenuSub>
                      <Sidebar.MenuSubItem>
                        <Sidebar.MenuSubButton href="#" isActive>
                          Q1
                        </Sidebar.MenuSubButton>
                      </Sidebar.MenuSubItem>
                      <Sidebar.MenuSubItem>
                        <Sidebar.MenuSubButton href="#" size="sm">
                          Q2
                        </Sidebar.MenuSubButton>
                      </Sidebar.MenuSubItem>
                    </Sidebar.MenuSub>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.GroupContent>
            </Sidebar.Group>

            <Sidebar.Group>
              <Sidebar.GroupLabel>Loading</Sidebar.GroupLabel>
              <Sidebar.GroupContent>
                <Sidebar.Menu>
                  {[0, 1, 2].map((i) => (
                    <Sidebar.MenuItem key={i}>
                      <Sidebar.MenuSkeleton showIcon />
                    </Sidebar.MenuItem>
                  ))}
                </Sidebar.Menu>
              </Sidebar.GroupContent>
            </Sidebar.Group>
          </Sidebar.Content>
          <Sidebar.Rail />
        </Sidebar.Root>

        <Sidebar.Inset>
          <HStack alignment="center" spacing={8} style={{ padding: 'var(--space-3)' }}>
            <Sidebar.Trigger />
            <Typography.Text size="2" weight="medium">
              {active}
            </Typography.Text>
          </HStack>
        </Sidebar.Inset>
      </Sidebar.Provider>
    </Frame>
  );
};

export const examples = {
  Default: <Shell />,
  'Collapse to icon rail': <Shell collapsible="icon" />,
  'Not collapsible': <Shell collapsible="none" />,
  'Sub-menus, actions, badges & skeletons': <RichShell />,
};
