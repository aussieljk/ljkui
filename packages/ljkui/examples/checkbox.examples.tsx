import CheckboxOverview from './demos/checkbox.demo';
import React from 'react';
import { Button, Checkbox, Typography, checkboxPropDefs } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/checkbox.demo.tsx` before demos folded into examples. */
  Overview: CheckboxOverview,

  Default() {
    const args = {
      size: checkboxPropDefs.size.default,
      color: checkboxPropDefs.color.default,
      highContrast: checkboxPropDefs.highContrast.default,
    };
    return (
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexDirection: 'column' }}>
        <Checkbox checked {...args}>
          Checked
        </Checkbox>
        <Checkbox checked disabled {...args}>
          Checked disabled
        </Checkbox>
        <Checkbox checked={false} {...args}>
          Unchecked
        </Checkbox>
        <Checkbox checked={false} disabled {...args}>
          Unchecked disabled
        </Checkbox>
        <Checkbox indeterminate {...args}>
          Indeterminate
        </Checkbox>
        <Checkbox indeterminate disabled {...args}>
          Indeterminate disabled
        </Checkbox>
      </div>
    );
  },

  Composed() {
    const args = {
      size: checkboxPropDefs.size.default,
      color: checkboxPropDefs.color.default,
      highContrast: checkboxPropDefs.highContrast.default,
    };
    return (
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexDirection: 'column' }}>
        <Typography.Text render={<label />} size="2">
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Checkbox defaultChecked {...args} />
            Default
          </div>
        </Typography.Text>
        <Typography.Text render={<label />} size="2">
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Checkbox defaultChecked={true} disabled {...args} />
            Disabled checked
          </div>
        </Typography.Text>
        <Typography.Text render={<label />} size="2">
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Checkbox defaultChecked={false} disabled {...args} />
            Disabled unchecked
          </div>
        </Typography.Text>
      </div>
    );
  },

  Size() {
    const args = {};
    return (
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <Checkbox defaultChecked {...args} size="1" />
        <Checkbox defaultChecked {...args} size="2" />
        <Checkbox defaultChecked {...args} size="3" />
      </div>
    );
  },

  Color() {
    const args = {};
    return (
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <Checkbox {...args} color="indigo" defaultChecked />
        <Checkbox {...args} color="cyan" defaultChecked />
        <Checkbox {...args} color="orange" defaultChecked />
        <Checkbox {...args} color="rose" defaultChecked />
      </div>
    );
  },

  'High Contrast'() {
    const args = {};
    return (
      <div
        style={{
          display: 'inline-grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px',
        }}
      >
        <Checkbox {...args} color="indigo" defaultChecked />
        <Checkbox {...args} color="indigo" defaultChecked highContrast />
        <Checkbox {...args} color="cyan" defaultChecked />
        <Checkbox {...args} color="cyan" defaultChecked highContrast />
        <Checkbox {...args} color="orange" defaultChecked />
        <Checkbox {...args} color="orange" defaultChecked highContrast />
        <Checkbox {...args} color="rose" defaultChecked />
        <Checkbox {...args} color="rose" defaultChecked highContrast />
      </div>
    );
  },

  'Alignment with text'() {
    const args = {};
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Typography.Text style={{ marginBottom: 12 }}>
          Composing <Typography.Code>Checkbox</Typography.Code> within <Typography.Code>Text</Typography.Code>{' '}
          automatically centers it with the first line of text.
        </Typography.Text>
        <Typography.Text render={<label />} size="3">
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Checkbox {...args} size="1" defaultChecked /> Agree to Terms and Conditions
          </div>
        </Typography.Text>

        <Typography.Text render={<label />} size="4">
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Checkbox {...args} size="2" defaultChecked /> Agree to Terms and Conditions
          </div>
        </Typography.Text>

        <Typography.Text render={<label />} size="5">
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Checkbox {...args} size="3" defaultChecked /> Agree to Terms and Conditions
          </div>
        </Typography.Text>

        <div style={{ maxWidth: 300 }}>
          <Typography.Text render={<label />} size="4">
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Checkbox defaultChecked /> It is automatically well-aligned with multi-line text too.
            </div>
          </Typography.Text>
        </div>
      </div>
    );
  },

  'Form with value & uncheckedValue'() {
    const args = {};
    const [formData, setFormData] = React.useState<Record<string, FormDataEntryValue>>({});
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.currentTarget).entries());
      setFormData(data);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 550 }}>
        <Typography.Text>
          Base UI's Checkbox provides <Typography.Code>value</Typography.Code> and{' '}
          <Typography.Code>uncheckedValue</Typography.Code> props for form submissions. By default, a checked checkbox
          submits <Typography.Code>"on"</Typography.Code> and an unchecked checkbox submits nothing (standard HTML
          behavior). These props let you customize both values.
        </Typography.Text>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Typography.Text render={<label />} size="2">
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <Checkbox {...args} name="newsletter" defaultChecked value="subscribed" uncheckedValue="unsubscribed" />
              Subscribe to newsletter
            </div>
          </Typography.Text>
          <Typography.Text render={<label />} size="2">
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <Checkbox {...args} name="terms" value="accepted" uncheckedValue="declined" />
              Accept terms and conditions
            </div>
          </Typography.Text>
          <Typography.Text render={<label />} size="2">
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <Checkbox {...args} name="marketing" defaultChecked />
              Marketing emails (no custom values)
            </div>
          </Typography.Text>
          <Button variant="solid" type="submit" style={{ marginTop: 'var(--space-2)', alignSelf: 'flex-start' }}>
            Submit Form
          </Button>
        </form>
        <div>
          <Typography.Text size="2" weight="medium">
            Submitted Data:
          </Typography.Text>
          <Typography.Code style={{ display: 'block', marginTop: 'var(--space-2)', whiteSpace: 'pre' }}>
            {JSON.stringify(formData, null, 2)}
          </Typography.Code>
        </div>
      </div>
    );
  },

  'Read Only'() {
    const args = {};
    const [isPremium] = React.useState(true);
    const [preferences] = React.useState({
      emailDigest: true,
      smsAlerts: false,
      pushNotifications: true,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 500 }}>
        <Typography.Text>
          The <Typography.Code>readOnly</Typography.Code> prop prevents users from changing a checkbox while still
          showing its current state. Unlike <Typography.Code>disabled</Typography.Code>, read-only checkboxes remain
          focusable and their values are submitted with forms. This is useful for displaying user preferences they
          cannot modify, or showing computed/derived states.
        </Typography.Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Typography.Text size="2" weight="medium">
            Your Subscription Features (Premium Plan)
          </Typography.Text>
          <Typography.Text render={<label />} size="2">
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <Checkbox {...args} checked={isPremium} readOnly /> Unlimited storage
            </div>
          </Typography.Text>
          <Typography.Text render={<label />} size="2">
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <Checkbox {...args} checked={isPremium} readOnly /> Priority support
            </div>
          </Typography.Text>
          <Typography.Text render={<label />} size="2">
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <Checkbox {...args} checked={isPremium} readOnly /> Advanced analytics
            </div>
          </Typography.Text>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Typography.Text size="2" weight="medium">
            Notification Settings (set by admin)
          </Typography.Text>
          <Typography.Text render={<label />} size="2">
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <Checkbox {...args} checked={preferences.emailDigest} readOnly /> Daily email digest
            </div>
          </Typography.Text>
          <Typography.Text render={<label />} size="2">
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <Checkbox {...args} checked={preferences.smsAlerts} readOnly /> SMS alerts
            </div>
          </Typography.Text>
          <Typography.Text render={<label />} size="2">
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <Checkbox {...args} checked={preferences.pushNotifications} readOnly /> Push notifications
            </div>
          </Typography.Text>
        </div>
      </div>
    );
  },

  'Input Ref'() {
    const args = {};
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [info, setInfo] = React.useState<string>('Click a button to inspect the input');

    const focusInput = () => {
      inputRef.current?.focus();
      setInfo('Input focused programmatically');
    };

    const checkValidity = () => {
      const input = inputRef.current;
      if (input) {
        const isValid = input.validity.valid;
        const isChecked = input.checked;
        setInfo(`Checked: ${isChecked}, Valid: ${isValid}`);
      }
    };

    const toggleChecked = () => {
      const input = inputRef.current;
      if (input) {
        input.click();
        setInfo(`Toggled via native click. New state: ${!input.checked}`);
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 500 }}>
        <Typography.Text>
          The <Typography.Code>inputRef</Typography.Code> prop provides direct access to the hidden native{' '}
          <Typography.Code>&lt;input&gt;</Typography.Code> element. This is useful for programmatic focus management,
          form validation, or integrating with third-party libraries that need direct DOM access.
        </Typography.Text>
        <form>
          <Typography.Text render={<label />} size="2">
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <Checkbox {...args} inputRef={inputRef} name="agreement" required /> I agree to the terms (required)
            </div>
          </Typography.Text>
        </form>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button variant="soft" size="1" onClick={focusInput}>
            Focus Input
          </Button>
          <Button variant="soft" size="1" onClick={checkValidity}>
            Check Validity
          </Button>
          <Button variant="soft" size="1" onClick={toggleChecked}>
            Toggle via Ref
          </Button>
        </div>
        <Typography.Code style={{ padding: 'var(--space-2)' }}>{info}</Typography.Code>
      </div>
    );
  },
};
