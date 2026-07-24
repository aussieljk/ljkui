import React from 'react';
import { Input, Tabs, Textarea, Typography, tabsListPropDefs } from '@aussieljk/frosted';

export const examples = {
  // TODO: Tabs content jumping in size due to font-weight change
  // This doesn't happen in @aussieljk/frosted (might be due to a font in use?)
  Default() {
    const args = {
      size: tabsListPropDefs.size.default,
      color: tabsListPropDefs.color.default,
      highContrast: tabsListPropDefs.highContrast.default,
    };
    return (
      <div style={{ width: 600 }}>
        <Tabs.Root defaultValue="account">
          <Tabs.List {...args}>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="account" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Make changes to your account.</Typography.Text>
          </Tabs.Content>

          <Tabs.Content value="documents" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Access and update your documents.</Typography.Text>
          </Tabs.Content>

          <Tabs.Content value="settings" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Edit your profile or update contact information.</Typography.Text>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    );
  },

  Size() {
    const args = {
      color: tabsListPropDefs.color.default,
      highContrast: tabsListPropDefs.highContrast.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', width: 600 }}>
        <Tabs.Root defaultValue="account">
          <Tabs.List {...args} size="1">
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="account" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Size 1.</Typography.Text>
          </Tabs.Content>
          <Tabs.Content value="documents" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Documents.</Typography.Text>
          </Tabs.Content>
          <Tabs.Content value="settings" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Settings.</Typography.Text>
          </Tabs.Content>
        </Tabs.Root>

        <Tabs.Root defaultValue="tab1">
          <Tabs.List {...args} size="2">
            <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Analytics</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Reports</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Size 2.</Typography.Text>
          </Tabs.Content>
          <Tabs.Content value="tab2" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Analytics.</Typography.Text>
          </Tabs.Content>
          <Tabs.Content value="tab3" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Reports.</Typography.Text>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    );
  },

  Color() {
    const args = {
      size: tabsListPropDefs.size.default,
      highContrast: tabsListPropDefs.highContrast.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', width: 600 }}>
        <Tabs.Root defaultValue="account">
          <Tabs.List {...args} color="indigo">
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="account" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Indigo accent.</Typography.Text>
          </Tabs.Content>
          <Tabs.Content value="documents" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Documents.</Typography.Text>
          </Tabs.Content>
          <Tabs.Content value="settings" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Settings.</Typography.Text>
          </Tabs.Content>
        </Tabs.Root>

        <Tabs.Root defaultValue="tab1">
          <Tabs.List {...args} color="cyan">
            <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Analytics</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Reports</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Cyan accent.</Typography.Text>
          </Tabs.Content>
          <Tabs.Content value="tab2" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Analytics.</Typography.Text>
          </Tabs.Content>
          <Tabs.Content value="tab3" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Reports.</Typography.Text>
          </Tabs.Content>
        </Tabs.Root>

        <Tabs.Root defaultValue="one">
          <Tabs.List {...args} color="rose">
            <Tabs.Trigger value="one">One</Tabs.Trigger>
            <Tabs.Trigger value="two">Two</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="one" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Crimson accent.</Typography.Text>
          </Tabs.Content>
          <Tabs.Content value="two" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Two.</Typography.Text>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    );
  },

  'High Contrast'() {
    const args = {
      size: tabsListPropDefs.size.default,
      color: tabsListPropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', width: 600 }}>
        <Tabs.Root defaultValue="account">
          <Tabs.List {...args} highContrast={false}>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="account" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Default indicator (accent-10).</Typography.Text>
          </Tabs.Content>
          <Tabs.Content value="documents" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Documents.</Typography.Text>
          </Tabs.Content>
          <Tabs.Content value="settings" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Settings.</Typography.Text>
          </Tabs.Content>
        </Tabs.Root>

        <Tabs.Root defaultValue="tab1">
          <Tabs.List {...args} highContrast>
            <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Analytics</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Reports</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">High contrast indicator (accent-12).</Typography.Text>
          </Tabs.Content>
          <Tabs.Content value="tab2" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Analytics.</Typography.Text>
          </Tabs.Content>
          <Tabs.Content value="tab3" style={{ padding: '12px 16px 8px 16px' }}>
            <Typography.Text size="2">Reports.</Typography.Text>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    );
  },

  'Activate on Focus'() {
    const args = {
      size: tabsListPropDefs.size.default,
      color: tabsListPropDefs.color.default,
      highContrast: tabsListPropDefs.highContrast.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 600 }}>
        <Typography.Text>
          The <Typography.Code>activateOnFocus</Typography.Code> prop controls whether tabs are activated immediately
          when focused via keyboard navigation, or only when explicitly clicked/pressed. Try using{' '}
          <Typography.Code>Tab</Typography.Code> to focus the tabs, then <Typography.Code>Arrow</Typography.Code> keys
          to navigate.
        </Typography.Text>

        <div>
          <Typography.Text size="2" weight="medium" style={{ marginBottom: 'var(--space-2)', display: 'block' }}>
            activateOnFocus={'{true}'}
          </Typography.Text>
          <Tabs.Root defaultValue="tab1">
            <Tabs.List {...args} activateOnFocus>
              <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Analytics</Tabs.Trigger>
              <Tabs.Trigger value="tab3">Reports</Tabs.Trigger>
            </Tabs.List>
            <div style={{ padding: '12px 16px 8px 16px' }}>
              <Tabs.Content value="tab1">
                <Typography.Text size="2">
                  Overview content — Tab activates immediately on arrow key navigation.
                </Typography.Text>
              </Tabs.Content>
              <Tabs.Content value="tab2">
                <Typography.Text size="2">
                  Analytics content — Tab activates immediately on arrow key navigation.
                </Typography.Text>
              </Tabs.Content>
              <Tabs.Content value="tab3">
                <Typography.Text size="2">
                  Reports content — Tab activates immediately on arrow key navigation.
                </Typography.Text>
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>

        <div>
          <Typography.Text size="2" weight="medium" style={{ marginBottom: 'var(--space-2)', display: 'block' }}>
            activateOnFocus={'{false}'} (default)
          </Typography.Text>
          <Tabs.Root defaultValue="tab1">
            <Tabs.List {...args} activateOnFocus={false}>
              <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Analytics</Tabs.Trigger>
              <Tabs.Trigger value="tab3">Reports</Tabs.Trigger>
            </Tabs.List>
            <div style={{ padding: '12px 16px 8px 16px' }}>
              <Tabs.Content value="tab1">
                <Typography.Text size="2">
                  Overview content — Must press Enter/Space to activate after focusing.
                </Typography.Text>
              </Tabs.Content>
              <Tabs.Content value="tab2">
                <Typography.Text size="2">
                  Analytics content — Must press Enter/Space to activate after focusing.
                </Typography.Text>
              </Tabs.Content>
              <Tabs.Content value="tab3">
                <Typography.Text size="2">
                  Reports content — Must press Enter/Space to activate after focusing.
                </Typography.Text>
              </Tabs.Content>
            </div>
          </Tabs.Root>
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
    const args = {
      size: tabsListPropDefs.size.default,
      color: tabsListPropDefs.color.default,
      highContrast: tabsListPropDefs.highContrast.default,
    };
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [bio, setBio] = React.useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 500 }}>
        <Typography.Text>
          The <Typography.Code>keepMounted</Typography.Code> prop on <Typography.Code>Tabs.Content</Typography.Code>{' '}
          keeps tab panels in the DOM even when hidden. This preserves component state like form inputs, scroll
          position, and avoids re-mounting expensive components.
        </Typography.Text>

        <Typography.Text size="2" weight="medium">
          With keepMounted={'{true}'} — Form state is preserved
        </Typography.Text>
        <Tabs.Root defaultValue="profile">
          <Tabs.List {...args}>
            <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
            <Tabs.Trigger value="contact">Contact</Tabs.Trigger>
            <Tabs.Trigger value="about">About</Tabs.Trigger>
          </Tabs.List>
          <div
            style={{
              padding: '16px',
              background: 'var(--gray-50)',
              borderRadius: '0 0 var(--radius-2) var(--radius-2)',
            }}
          >
            <Tabs.Content value="profile" keepMounted>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <Typography.Text render={<label />} size="2">
                  Name
                </Typography.Text>
                <Input.Control
                  size="3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
                <Typography.Text size="1" color="gray">
                  Type something, switch tabs, then come back — your input is preserved!
                </Typography.Text>
              </div>
            </Tabs.Content>
            <Tabs.Content value="contact" keepMounted>
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
            </Tabs.Content>
            <Tabs.Content value="about" keepMounted>
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
            </Tabs.Content>
          </div>
        </Tabs.Root>

        <Typography.Text size="1" color="gray">
          Use <Typography.Code>keepMounted</Typography.Code> on <Typography.Code>Tabs.Content</Typography.Code> for
          multi-step forms, preserving video/audio playback state, or panels with expensive initialization. Without it,
          panels unmount when hidden and lose their state.
        </Typography.Text>
      </div>
    );
  },
};
