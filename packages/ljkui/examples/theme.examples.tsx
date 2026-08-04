import React from 'react';
import {
  Badge,
  Button,
  Card,
  Switch,
  Theme,
  ThemePanel,
  Typography,
  dangerColors,
  infoColors,
  successColors,
  tailwindColorScalesChromatic,
  tailwindGrayScales,
  themePropDefs,
  warningColors,
} from 'ljkui';

const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' };
const column: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' };

/** A representative slice of the library, so a theme change is visible at a glance. */
const Sampler = () => (
  <div style={column}>
    <div style={row}>
      <Button variant="solid">Solid</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="surface">Surface</Button>
    </div>
    <div style={row}>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="surface">Surface</Badge>
      <Switch defaultChecked />
    </div>
    <Typography.Text size="2" color="gray">
      Body copy on the theme background.
    </Typography.Text>
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <Typography.Text render={<div />} size="1" color="gray" style={{ marginBottom: 'var(--space-2)' }}>
    {children}
  </Typography.Text>
);

const Swatch = ({ color }: { color: string }) => (
  <div style={{ textAlign: 'center' }}>
    <div
      style={{
        width: 'var(--space-6)',
        height: 'var(--space-6)',
        borderRadius: '100%',
        backgroundColor: `var(--${color}-700)`,
      }}
    />
    <Typography.Text render={<div />} size="1" color="gray" style={{ marginTop: 'var(--space-1)' }}>
      {color}
    </Typography.Text>
  </div>
);

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Utilities', layout: 'centered' } as const;

export const examples = {
  Appearance() {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
        <Theme appearance="light" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-4)' }}>
          <Label>appearance=&quot;light&quot;</Label>
          <Sampler />
        </Theme>
        <Theme appearance="dark" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-4)' }}>
          <Label>appearance=&quot;dark&quot;</Label>
          <Sampler />
        </Theme>
      </div>
    );
  },

  'Accent color'() {
    const accents = ['blue', 'indigo', 'violet', 'cyan', 'green', 'amber', 'orange', 'rose'] as const;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
        {accents.map((accentColor) => (
          <Theme key={accentColor} accentColor={accentColor}>
            <Label>{accentColor}</Label>
            <div style={row}>
              <Button variant="solid" size="1">
                Button
              </Button>
              <Badge variant="soft">Badge</Badge>
            </div>
          </Theme>
        ))}
      </div>
    );
  },

  'Every accent'() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', maxWidth: 640 }}>
        {tailwindColorScalesChromatic.map((color) => (
          <Swatch key={color} color={color} />
        ))}
      </div>
    );
  },

  'Gray color'() {
    // `auto` picks the gray that matches the accent; the rest are Tailwind's neutrals.
    const grays = ['auto', ...tailwindGrayScales] as const;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
        {grays.map((grayColor) => (
          <Theme key={grayColor} accentColor="blue" grayColor={grayColor}>
            <Label>{grayColor}</Label>
            <Card size="1">
              <Typography.Text size="2" color="gray">
                Gray text
              </Typography.Text>
            </Card>
          </Theme>
        ))}
      </div>
    );
  },

  'Semantic colors'() {
    // Each semantic slot is itself themeable — `infoColor`, `successColor`, …
    return (
      <div style={column}>
        <div style={row}>
          <Typography.Code size="1">infoColor</Typography.Code>
          {infoColors.map((value) => (
            <Theme key={value} infoColor={value}>
              <Badge color="info" variant="solid">
                {value}
              </Badge>
            </Theme>
          ))}
        </div>
        <div style={row}>
          <Typography.Code size="1">successColor</Typography.Code>
          {successColors.map((value) => (
            <Theme key={value} successColor={value}>
              <Badge color="success" variant="solid">
                {value}
              </Badge>
            </Theme>
          ))}
        </div>
        <div style={row}>
          <Typography.Code size="1">warningColor</Typography.Code>
          {warningColors.map((value) => (
            <Theme key={value} warningColor={value}>
              <Badge color="warning" variant="solid">
                {value}
              </Badge>
            </Theme>
          ))}
        </div>
        <div style={row}>
          <Typography.Code size="1">dangerColor</Typography.Code>
          {dangerColors.map((value) => (
            <Theme key={value} dangerColor={value}>
              <Badge color="danger" variant="solid">
                {value}
              </Badge>
            </Theme>
          ))}
        </div>
      </div>
    );
  },

  'Nested themes'() {
    return (
      <Theme accentColor="blue" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-4)' }}>
        <Label>accentColor=&quot;blue&quot;</Label>
        <div style={row}>
          <Button>Outer</Button>
          <Theme accentColor="green" style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-3)' }}>
            <Label>nested accentColor=&quot;green&quot;</Label>
            <div style={row}>
              <Button>Inner</Button>
              <Theme accentColor="rose" style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-2)' }}>
                <Label>nested accentColor=&quot;rose&quot;</Label>
                <Button>Innermost</Button>
              </Theme>
            </div>
          </Theme>
        </div>
      </Theme>
    );
  },

  'Custom accent color'() {
    // Anything that isn't a named scale is treated as a CSS color and the full
    // 12-step scale is derived from it.
    const customs = ['#7c3aed', 'oklch(0.62 0.18 25)', 'rgb(0 150 136)'];
    return (
      <div style={column}>
        {customs.map((accentColor) => (
          <Theme key={accentColor} accentColor={accentColor}>
            <Label>accentColor={accentColor}</Label>
            <div style={row}>
              <Button variant="solid">Solid</Button>
              <Button variant="soft">Soft</Button>
              <Badge variant="surface">Badge</Badge>
            </div>
          </Theme>
        ))}
      </div>
    );
  },

  'Has background'() {
    // A nested `Theme` only paints a background when it changes appearance or gray,
    // unless `hasBackground` says otherwise.
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-4)' }}>
        <Theme
          appearance="dark"
          hasBackground={false}
          style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-4)' }}
        >
          <Label>hasBackground=&#123;false&#125;</Label>
          <Sampler />
        </Theme>
        <Theme
          appearance="dark"
          hasBackground={themePropDefs.hasBackground.default}
          style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-4)' }}
        >
          <Label>hasBackground=&#123;true&#125;</Label>
          <Sampler />
        </Theme>
      </div>
    );
  },

  'Theme panel'() {
    // `ThemePanel` edits the surrounding `Theme` live and copies the resulting props.
    return <ThemePanel defaultOpen />;
  },

  Colors() {
    // Every chromatic accent, each wrapping the same sampler — the point is that a
    // component's look is entirely a function of the `Theme` it sits in, not of props
    // passed to the component. `Every accent` above shows the raw swatches instead.
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'var(--space-6)' }}>
        {tailwindColorScalesChromatic.map((accentColor) => (
          <Theme key={accentColor} accentColor={accentColor}>
            <Label>accentColor=&quot;{accentColor}&quot;</Label>
            <Sampler />
          </Theme>
        ))}
      </div>
    );
  },
};
