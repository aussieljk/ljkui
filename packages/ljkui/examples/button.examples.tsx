import { Download as DownloadIcon } from 'lucide-react';
import React from 'react';
import { Button, Spinner, Typography, buttonPropDefs } from 'ljkui';

const ExampleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V13.5C12 13.6818 11.9014 13.8492 11.7424 13.9373C11.5834 14.0254 11.3891 14.0203 11.235 13.924L7.5 11.5896L3.765 13.924C3.61087 14.0203 3.41659 14.0254 3.25762 13.9373C3.09864 13.8492 3 13.6818 3 13.5V2.5ZM4 3V12.5979L6.97 10.7416C7.29427 10.539 7.70573 10.539 8.03 10.7416L11 12.5979V3H4Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls', layout: 'centered' } as const;

export const examples = {
  Size() {
    const args = {
      children: 'Button',
      variant: buttonPropDefs.variant.default,
      color: buttonPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <Button {...args} size="4" />
        <Button {...args} size="3" />
        <Button {...args} size="2" />
        <Button {...args} size="1" />
      </div>
    );
  },

  Variant() {
    const args = {
      children: 'Button',
      size: buttonPropDefs.size.default,
      color: buttonPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <Button {...args} variant="classic" />
        <Button {...args} variant="solid" />
        <Button {...args} variant="soft" />
        <Button {...args} variant="surface" />
        <Button {...args} variant="ghost" />
      </div>
    );
  },

  Color() {
    const args = { children: 'Button', size: buttonPropDefs.size.default, disabled: false };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <Button {...args} color="indigo" />
        <Button {...args} color="cyan" />
        <Button {...args} color="orange" />
        <Button {...args} color="rose" />
      </div>
    );
  },

  'Semantic color'() {
    const args = { size: buttonPropDefs.size.default, disabled: false };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <Button {...args} color="info">
          Info
        </Button>
        <Button {...args} color="success">
          Success
        </Button>
        <Button {...args} color="warning">
          Warning
        </Button>
        <Button {...args} color="danger">
          Danger
        </Button>
      </div>
    );
  },

  'High Contrast'() {
    const args = { children: 'Button', disabled: false };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button {...args} highContrast={false} variant="classic" />
          <Button {...args} highContrast={false} variant="solid" />
          <Button {...args} highContrast={false} variant="soft" />
          <Button {...args} highContrast={false} variant="surface" />
          <Button {...args} highContrast={false} variant="ghost" />
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button {...args} variant="classic" highContrast />
          <Button {...args} variant="solid" highContrast />
          <Button {...args} variant="soft" highContrast />
          <Button {...args} variant="surface" highContrast />
          <Button {...args} variant="ghost" highContrast />
        </div>
      </div>
    );
  },

  'With Icons'() {
    const args = { size: buttonPropDefs.size.default, disabled: false };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <Button {...args}>
          <ExampleIcon /> With icon
        </Button>
      </div>
    );
  },

  Loading() {
    const args = {
      children: 'Button',
      size: buttonPropDefs.size.default,
      color: buttonPropDefs.color.default,
      loading: true,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: 650 }}>
        <Typography.Text>
          Buttons have their own <Typography.Code>loading</Typography.Code> prop that automatically composes a spinner.
        </Typography.Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Button {...args} variant="classic" />
          <Button {...args} variant="solid" />
          <Button {...args} variant="soft" />
          <Button {...args} variant="surface" />
          <Button {...args} variant="ghost" />
        </div>
        <Typography.Text>
          If you have an icon inside the button, you can use the button`s <Typography.Code>disabled</Typography.Code>{' '}
          state and wrap the icon in a standalone <Typography.Code>{`<Spinner>`}</Typography.Code> to achieve a more
          sophisticated design.
        </Typography.Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Button {...args} loading={false} variant="classic">
            <Spinner loading={false}>
              <DownloadIcon size={16} />
            </Spinner>
            Download
          </Button>
          <Button {...args} loading={false} variant="classic" disabled>
            <Spinner loading>
              <DownloadIcon size={16} />
            </Spinner>
            Download
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Button {...args} loading={false} variant="soft">
            <Spinner loading={false}>
              <DownloadIcon size={16} />
            </Spinner>
            Download
          </Button>
          <Button {...args} loading={false} variant="soft" disabled>
            <Spinner loading>
              <DownloadIcon size={16} />
            </Spinner>
            Download
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Button {...args} loading={false} variant="solid">
            <Spinner loading={false}>
              <DownloadIcon size={16} />
            </Spinner>
            Download
          </Button>
          <Button {...args} loading={false} variant="solid" disabled>
            <Spinner loading>
              <DownloadIcon size={16} />
            </Spinner>
            Download
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Button {...args} loading={false} variant="surface">
            <Spinner loading={false}>
              <DownloadIcon size={16} />
            </Spinner>
            Download
          </Button>
          <Button {...args} loading={false} variant="surface" disabled>
            <Spinner loading>
              <DownloadIcon size={16} />
            </Spinner>
            Download
          </Button>
        </div>
      </div>
    );
  },

  'Render as Different Element'() {
    const args = {
      size: buttonPropDefs.size.default,
      variant: buttonPropDefs.variant.default,
      color: buttonPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 550 }}>
        <Typography.Text>
          Use the <Typography.Code>render</Typography.Code> prop to render the button as a different element, such as an
          anchor tag for navigation links or a span for non-interactive styling.
        </Typography.Text>
        <Typography.Text weight="bold">As a link:</Typography.Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Button {...args} render={<a href="https://example.com" target="_blank" rel="noopener noreferrer" />}>
            Visit Example
          </Button>
          <Button
            {...args}
            variant="soft"
            render={<a href="https://example.com" target="_blank" rel="noopener noreferrer" />}
          >
            Soft Link
          </Button>
          <Button
            {...args}
            variant="ghost"
            render={<a href="https://example.com" target="_blank" rel="noopener noreferrer" />}
          >
            Ghost Link
          </Button>
        </div>
        <Typography.Text weight="bold">As a span:</Typography.Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Button {...args} render={<span />}>
            Span Button
          </Button>
          <Button {...args} variant="soft" render={<span />}>
            Soft Span
          </Button>
          <Button {...args} variant="surface" render={<span />}>
            Surface Span
          </Button>
        </div>
      </div>
    );
  },
};
