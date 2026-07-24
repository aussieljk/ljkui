import React from 'react';
import { Button, Drawer, Input, Textarea, ToggleGroup, Typography } from '@aussieljk/frosted';

export const examples = {
  Default() {
    const args = {};
    return (
      <div style={{ width: 'auto' }}>
        <ToggleGroup.Root defaultValue="account">
          <ToggleGroup.List {...args}>
            <ToggleGroup.Trigger value="account">Account</ToggleGroup.Trigger>
            <ToggleGroup.Trigger value="documents">Documents</ToggleGroup.Trigger>
            <ToggleGroup.Trigger value="settings">Settings</ToggleGroup.Trigger>
          </ToggleGroup.List>

          <ToggleGroup.Content value="account" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Your account.</Typography.Text>
          </ToggleGroup.Content>

          <ToggleGroup.Content value="documents" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Your documents.</Typography.Text>
          </ToggleGroup.Content>

          <ToggleGroup.Content value="settings" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Your profile.</Typography.Text>
          </ToggleGroup.Content>
        </ToggleGroup.Root>
      </div>
    );
  },

  'In a drawer'() {
    const args = {};
    return (
      <Drawer.Root defaultOpen>
        <Drawer.Trigger>
          <Button>View users</Button>
        </Drawer.Trigger>
        <Drawer.Content style={{ width: 400 }}>
          <Drawer.Header>
            <Drawer.Title>Users</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <ToggleGroup.Root defaultValue="account">
              <ToggleGroup.List {...args}>
                <ToggleGroup.Trigger value="account">Account</ToggleGroup.Trigger>
                <ToggleGroup.Trigger value="documents">Documents</ToggleGroup.Trigger>
                <ToggleGroup.Trigger value="settings">Settings</ToggleGroup.Trigger>
              </ToggleGroup.List>

              <div style={{ padding: '12px 16px 8px 16px' }}>
                <ToggleGroup.Content value="account">
                  <Typography.Text size="2">Make changes to your account.</Typography.Text>
                </ToggleGroup.Content>

                <ToggleGroup.Content value="documents">
                  <Typography.Text size="2">Access and update your documents.</Typography.Text>
                </ToggleGroup.Content>

                <ToggleGroup.Content value="settings">
                  <Typography.Text size="2">Edit your profile.</Typography.Text>
                </ToggleGroup.Content>
              </div>
            </ToggleGroup.Root>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    );
  },

  'Activate on Focus'() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 400 }}>
        <Typography.Text>
          The <Typography.Code>activateOnFocus</Typography.Code> prop controls whether segments are activated
          immediately when focused via keyboard navigation, or only when explicitly clicked/pressed. Try using{' '}
          <Typography.Code>Tab</Typography.Code> to focus the control, then <Typography.Code>Arrow</Typography.Code>{' '}
          keys to navigate.
        </Typography.Text>

        <div>
          <Typography.Text size="2" weight="medium" style={{ marginBottom: 'var(--space-2)', display: 'block' }}>
            activateOnFocus={'{true}'}
          </Typography.Text>
          <ToggleGroup.Root defaultValue="day">
            <ToggleGroup.List {...args} activateOnFocus>
              <ToggleGroup.Trigger value="day">Day</ToggleGroup.Trigger>
              <ToggleGroup.Trigger value="week">Week</ToggleGroup.Trigger>
              <ToggleGroup.Trigger value="month">Month</ToggleGroup.Trigger>
            </ToggleGroup.List>

            <ToggleGroup.Content value="day" style={{ padding: '12px 16px 8px 16px' }}>
              <Typography.Text size="2">Daily view — Activates immediately on arrow key navigation.</Typography.Text>
            </ToggleGroup.Content>
            <ToggleGroup.Content value="week" style={{ padding: '12px 16px 8px 16px' }}>
              <Typography.Text size="2">Weekly view — Activates immediately on arrow key navigation.</Typography.Text>
            </ToggleGroup.Content>
            <ToggleGroup.Content value="month" style={{ padding: '12px 16px 8px 16px' }}>
              <Typography.Text size="2">Monthly view — Activates immediately on arrow key navigation.</Typography.Text>
            </ToggleGroup.Content>
          </ToggleGroup.Root>
        </div>

        <div>
          <Typography.Text size="2" weight="medium" style={{ marginBottom: 'var(--space-2)', display: 'block' }}>
            activateOnFocus={'{false}'} (default)
          </Typography.Text>
          <ToggleGroup.Root defaultValue="day">
            <ToggleGroup.List {...args} activateOnFocus={false}>
              <ToggleGroup.Trigger value="day">Day</ToggleGroup.Trigger>
              <ToggleGroup.Trigger value="week">Week</ToggleGroup.Trigger>
              <ToggleGroup.Trigger value="month">Month</ToggleGroup.Trigger>
            </ToggleGroup.List>

            <ToggleGroup.Content value="day" style={{ padding: '12px 16px 8px 16px' }}>
              <Typography.Text size="2">
                Daily view — Must press Enter/Space to activate after focusing.
              </Typography.Text>
            </ToggleGroup.Content>
            <ToggleGroup.Content value="week" style={{ padding: '12px 16px 8px 16px' }}>
              <Typography.Text size="2">
                Weekly view — Must press Enter/Space to activate after focusing.
              </Typography.Text>
            </ToggleGroup.Content>
            <ToggleGroup.Content value="month" style={{ padding: '12px 16px 8px 16px' }}>
              <Typography.Text size="2">
                Monthly view — Must press Enter/Space to activate after focusing.
              </Typography.Text>
            </ToggleGroup.Content>
          </ToggleGroup.Root>
        </div>

        <Typography.Text size="1" color="gray">
          Use <Typography.Code>activateOnFocus={'{true}'}</Typography.Code> for a more fluid experience. The default (
          <Typography.Code>false</Typography.Code>) follows WAI-ARIA best practices, requiring explicit activation which
          is better for accessibility.
        </Typography.Text>
      </div>
    );
  },

  'Keep Mounted'() {
    const args = {};
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [bio, setBio] = React.useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 400 }}>
        <Typography.Text>
          The <Typography.Code>keepMounted</Typography.Code> prop on{' '}
          <Typography.Code>ToggleGroup.Content</Typography.Code> keeps panels in the DOM even when hidden. This
          preserves component state like form inputs, scroll position, and avoids re-mounting expensive components.
        </Typography.Text>

        <Typography.Text size="2" weight="medium">
          With keepMounted={'{true}'} — Form state is preserved
        </Typography.Text>
        <ToggleGroup.Root defaultValue="profile">
          <ToggleGroup.List {...args}>
            <ToggleGroup.Trigger value="profile">Profile</ToggleGroup.Trigger>
            <ToggleGroup.Trigger value="contact">Contact</ToggleGroup.Trigger>
            <ToggleGroup.Trigger value="about">About</ToggleGroup.Trigger>
          </ToggleGroup.List>
          <div
            style={{
              padding: '16px',
              background: 'var(--gray-50)',
              borderRadius: 'var(--radius-2)',
              marginTop: 'var(--space-2)',
            }}
          >
            <ToggleGroup.Content value="profile" keepMounted>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <Typography.Text render={<label />} size="2">
                  Username
                </Typography.Text>
                <Input.Control
                  size="3"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
                <Typography.Text size="1" color="gray">
                  Type something, switch segments, then come back — your input is preserved!
                </Typography.Text>
              </div>
            </ToggleGroup.Content>
            <ToggleGroup.Content value="contact" keepMounted>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <Typography.Text render={<label />} size="2">
                  Email
                </Typography.Text>
                <Input.Control
                  size="3"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </ToggleGroup.Content>
            <ToggleGroup.Content value="about" keepMounted>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <Typography.Text render={<label />} size="2">
                  Bio
                </Typography.Text>
                <Textarea
                  size="3"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself"
                  rows={3}
                />
              </div>
            </ToggleGroup.Content>
          </div>
        </ToggleGroup.Root>

        <Typography.Text size="1" color="gray">
          Use <Typography.Code>keepMounted</Typography.Code> on <Typography.Code>ToggleGroup.Content</Typography.Code>{' '}
          for multi-step forms, preserving video/audio playback state, or panels with expensive initialization. Without
          it, panels unmount when hidden and lose their state.
        </Typography.Text>
      </div>
    );
  },
};
