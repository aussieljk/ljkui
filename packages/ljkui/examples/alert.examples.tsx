import AlertOverview from './demos/alert.demo';
import { Info } from 'lucide-react';
import React from 'react';
import { Alert, Link, Typography } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = {
  group: 'Components',
  layout: 'centered',
  // `Alert` is a namespace, so nothing is auto-detected; drive the root directly.
  playground: { export: 'Alert.Root' },
} as const;

/** Inner content for the Playground. Not an example — see `PlaygroundHint`. */
export const playgroundChildren = (
  <>
    <Alert.Icon>
      <Info size={16} />
    </Alert.Icon>
    <Alert.Title>Your trial ends in 3 days</Alert.Title>
    <Alert.Description>Upgrade to Pro to keep analytics, webhooks and priority support.</Alert.Description>
  </>
);

export const examples = {
  /** The canonical usage — was `demos/alert.demo.tsx` before demos folded into examples. */
  Overview: AlertOverview,

  Default() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Alert.Root {...args}>
          <Alert.Icon>
            <Info size={16} />
          </Alert.Icon>
          <Alert.Title>Your trial ends in 3 days</Alert.Title>
          <Alert.Description>
            Upgrade to Pro to keep access to analytics, webhooks, and priority support. Compare{' '}
            <Link href="#">plans and pricing</Link>.
          </Alert.Description>
          <Alert.Actions>
            <Alert.Action>Upgrade to Pro</Alert.Action>
            <Alert.Action variant="secondary">Remind me later</Alert.Action>
          </Alert.Actions>
        </Alert.Root>
        <Alert.Root {...args}>
          <Alert.Icon>
            <Info size={16} />
          </Alert.Icon>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <Alert.Title>2 members are waiting for approval</Alert.Title>
              <Alert.Description>Review pending requests to give them access to your community.</Alert.Description>
            </div>
            <Alert.Actions>
              <Alert.Action>Review requests</Alert.Action>
            </Alert.Actions>
          </div>
        </Alert.Root>

        <Alert.Root {...args}>
          <Alert.Icon>
            <Info size={16} />
          </Alert.Icon>
          <Alert.Title>
            Your domain was verified. <Link href="#">Manage DNS settings</Link>.
          </Alert.Title>
        </Alert.Root>
      </div>
    );
  },

  Color() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Alert.Root {...args} color="blue">
          <Alert.Icon>
            <Info size={16} />
          </Alert.Icon>
          <Alert.Title>New feature available</Alert.Title>
          <Alert.Description>You can now accept crypto payments directly from your checkout page.</Alert.Description>
          <Alert.Actions>
            <Alert.Action>Enable crypto payments</Alert.Action>
            <Alert.Action variant="secondary">Learn more</Alert.Action>
          </Alert.Actions>
        </Alert.Root>

        <Alert.Root {...args} color="green">
          <Alert.Icon>
            <Info size={16} />
          </Alert.Icon>
          <Alert.Title>Payout sent</Alert.Title>
          <Alert.Description>
            Your $1,250.00 payout was deposited to your bank account ending in 4821.
          </Alert.Description>
          <Alert.Actions>
            <Alert.Action>View payout details</Alert.Action>
            <Alert.Action variant="secondary">Dismiss</Alert.Action>
          </Alert.Actions>
        </Alert.Root>

        <Alert.Root {...args} color="red">
          <Alert.Icon>
            <Info size={16} />
          </Alert.Icon>
          <Alert.Title>Payment failed</Alert.Title>
          <Alert.Description>
            The card on file was declined. Update your <Link href="#">billing details</Link> to avoid service
            interruption.
          </Alert.Description>
          <Alert.Actions>
            <Alert.Action>Update billing</Alert.Action>
            <Alert.Action variant="secondary">Try again</Alert.Action>
          </Alert.Actions>
        </Alert.Root>
      </div>
    );
  },

  'Semantic color'() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Alert.Root {...args} color="info">
          <Alert.Icon>
            <Info size={16} />
          </Alert.Icon>
          <Alert.Title>API maintenance scheduled</Alert.Title>
          <Alert.Description>
            Our REST API will be read-only on March 15 from 2–4 AM UTC. See the <Link href="#">status page</Link> for
            details.
          </Alert.Description>
          <Alert.Actions>
            <Alert.Action>View status page</Alert.Action>
            <Alert.Action variant="secondary">Dismiss</Alert.Action>
          </Alert.Actions>
        </Alert.Root>

        <Alert.Root {...args} color="success">
          <Alert.Icon>
            <Info size={16} />
          </Alert.Icon>
          <Alert.Title>Store connected</Alert.Title>
          <Alert.Description>Stripe is now linked and ready to accept payments.</Alert.Description>
          <Alert.Actions>
            <Alert.Action>Go to dashboard</Alert.Action>
            <Alert.Action variant="secondary">Dismiss</Alert.Action>
          </Alert.Actions>
        </Alert.Root>

        <Alert.Root {...args} color="warning">
          <Alert.Icon>
            <Info size={16} />
          </Alert.Icon>
          <Alert.Title>Action required</Alert.Title>
          <Alert.Description>Verify your business address by April 1 to continue receiving payouts.</Alert.Description>
          <Alert.Actions>
            <Alert.Action>Verify address</Alert.Action>
            <Alert.Action variant="secondary">Remind me later</Alert.Action>
          </Alert.Actions>
        </Alert.Root>

        <Alert.Root {...args} color="danger">
          <Alert.Icon>
            <Info size={16} />
          </Alert.Icon>
          <Alert.Title>Account restricted</Alert.Title>
          <Alert.Description>
            Payouts are paused until you submit updated <Link href="#">tax documentation</Link>.
          </Alert.Description>
          <Alert.Actions>
            <Alert.Action>Submit documents</Alert.Action>
            <Alert.Action variant="secondary">Contact support</Alert.Action>
          </Alert.Actions>
        </Alert.Root>
      </div>
    );
  },

  'Action render prop'() {
    const args = {};
    return (
      <>
        <div style={{ maxWidth: 500, marginBottom: 'var(--space-4)' }}>
          <Typography.Text>
            Use the <Typography.Code>render</Typography.Code> prop on <Typography.Code>Alert.Action</Typography.Code> to
            render actions as links for navigation without losing alert action styling.
          </Typography.Text>
        </div>
        <Alert.Root {...args}>
          <Alert.Icon>
            <Info size={16} />
          </Alert.Icon>
          <Alert.Title>Your trial ends in 3 days</Alert.Title>
          <Alert.Description>
            Upgrade to Pro to keep access to analytics, webhooks, and priority support.
          </Alert.Description>
          <Alert.Actions>
            <Alert.Action render={<a href="/billing" />}>Upgrade to Pro</Alert.Action>
            <Alert.Action variant="secondary">Remind me later</Alert.Action>
          </Alert.Actions>
        </Alert.Root>
      </>
    );
  },

  'Action loading'() {
    const args = {};
    const [loading, setLoading] = React.useState(false);

    return (
      <>
        <div style={{ maxWidth: 500, marginBottom: 'var(--space-4)' }}>
          <Typography.Text>
            Use the <Typography.Code>loading</Typography.Code> prop on <Typography.Code>Alert.Action</Typography.Code>{' '}
            to show a spinner and disable the action while an async task is in progress.
          </Typography.Text>
        </div>
        <Alert.Root {...args}>
          <Alert.Icon>
            <Info size={16} />
          </Alert.Icon>
          <Alert.Title>Action required</Alert.Title>
          <Alert.Description>Verify your business address by April 1 to continue receiving payouts.</Alert.Description>
          <Alert.Actions>
            <Alert.Action
              loading={loading}
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 2000);
              }}
            >
              Verify address
            </Alert.Action>
            <Alert.Action variant="secondary">Remind me later</Alert.Action>
          </Alert.Actions>
        </Alert.Root>
      </>
    );
  },

  'Action disabled'() {
    const args = {};
    return (
      <>
        <div style={{ maxWidth: 500, marginBottom: 'var(--space-4)' }}>
          <Typography.Text>
            Use the <Typography.Code>disabled</Typography.Code> prop on <Typography.Code>Alert.Action</Typography.Code>{' '}
            to prevent interaction, for example while a prerequisite step is incomplete.
          </Typography.Text>
        </div>
        <Alert.Root {...args}>
          <Alert.Icon>
            <Info size={16} />
          </Alert.Icon>
          <Alert.Title>Finish setting up your store</Alert.Title>
          <Alert.Description>
            Connect a payment provider before you can publish your store to customers.
          </Alert.Description>
          <Alert.Actions>
            <Alert.Action disabled>Publish store</Alert.Action>
            <Alert.Action variant="secondary" disabled>
              Preview
            </Alert.Action>
          </Alert.Actions>
        </Alert.Root>
      </>
    );
  },

  'As Alert'() {
    const args = {};
    return (
      <>
        <div style={{ maxWidth: 500 }}>
          <Typography.Text>
            Add a native{' '}
            <Link
              href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role"
              target="_blank"
            >
              WAI-ARIA <Typography.Code>alert</Typography.Code> role
            </Link>{' '}
            to the alert when the user's immediate attention is required, like when an error message appears. The screen
            reader will be interrupted, announcing the new content immediately.
          </Typography.Text>
        </div>
        <br />
        <div style={{ display: 'inline-block' }}>
          <Alert.Root {...args} color="danger" role="alert">
            <Alert.Icon>🚨</Alert.Icon>
            <Alert.Title>Unable to load dashboard</Alert.Title>
            <Alert.Description>
              You don&apos;t have permission to view this page. Contact your workspace admin for access.
            </Alert.Description>
            <Alert.Actions>
              <Alert.Action>Request access</Alert.Action>
              <Alert.Action variant="secondary">Go back</Alert.Action>
            </Alert.Actions>
          </Alert.Root>
        </div>
      </>
    );
  },
};
