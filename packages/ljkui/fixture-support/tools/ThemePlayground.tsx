import {
  Avatar,
  Badge,
  Button,
  Card,
  dangerColors,
  infoColors,
  Switch,
  successColors,
  Theme,
  themeAccentColorsOrdered,
  Typography,
  warningColors,
} from 'ljkui';
import * as React from 'react';

/*
 * An interactive playground for the `<Theme>` component. The root decorator
 * (fixture-support/theme-decorator.tsx) already wraps every fixture in one `<Theme>`
 * driven by the appearance/accent fixture inputs; this fixture renders its OWN
 * nested `<Theme {...state}>` around a small showcase so the selectors below re-theme
 * just that panel, live, without touching the rest of the explorer. Every control maps to a real prop from `themePropDefs`
 * (src/theme-options.tsx) and offers only that prop's real value list. The output panel
 * mirrors the exact `<Theme>` JSX and the data-attributes ljkui stamps on the element,
 * each with a copy button, so a tuned theme can be reproduced verbatim in a consumer app.
 */

const APPEARANCES = ['inherit', 'light', 'dark'] as const;
const ACCENT_COLORS = themeAccentColorsOrdered as readonly string[];

/** The 12 role-scale steps ljkui computes for the current accent (see tailwind-palette.ts). */
const ACCENT_STEPS = [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

/** Detect a raw CSS color string (`#hex`, `rgb()`, `oklch()`, …) vs. one of the named scales. */
function isCustomAccent(value: string): boolean {
  return !ACCENT_COLORS.includes(value);
}

/** Fallback hex the color picker shows when the accent is a named scale rather than a raw color. */
const DEFAULT_CUSTOM_HEX = '#7c3aed';

interface ThemeState {
  appearance: (typeof APPEARANCES)[number];
  accentColor: string;
  dangerColor: (typeof dangerColors)[number];
  warningColor: (typeof warningColors)[number];
  successColor: (typeof successColors)[number];
  infoColor: (typeof infoColors)[number];
  hasBackground: boolean;
}

const DEFAULT_STATE: ThemeState = {
  appearance: 'light',
  accentColor: 'blue',
  dangerColor: 'red',
  warningColor: 'amber',
  successColor: 'green',
  infoColor: 'sky',
  hasBackground: true,
};

const CSS = `
.tp-root {
  box-sizing: border-box;
  display: grid;
  gap: 20px;
  width: 100%;
  padding: 24px;
  color: var(--gray-900);
  font-size: 13px;
  line-height: 1.5;
}
.tp-title {
  margin: 0;
  color: var(--gray-950);
  font-size: 20px;
  font-weight: 600;
}
.tp-desc {
  max-width: 84ch;
  margin: 6px 0 0;
}
.tp-layout {
  display: grid;
  grid-template-columns: minmax(240px, 320px) 1fr;
  gap: 20px;
  align-items: start;
}
@media (max-width: 900px) {
  .tp-layout {
    grid-template-columns: 1fr;
  }
}
.tp-controls {
  display: grid;
  gap: 12px;
  padding: 16px;
  border: 1px solid var(--gray-alpha-400);
  border-radius: 12px;
  background: var(--gray-alpha-50);
}
.tp-field {
  display: grid;
  gap: 4px;
}
.tp-label {
  color: var(--gray-900);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.tp-select {
  box-sizing: border-box;
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--gray-alpha-400);
  border-radius: 8px;
  background: var(--gray-50);
  color: var(--gray-950);
  font-size: 13px;
}
.tp-check {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gray-950);
}
.tp-reset {
  height: 32px;
  border: 1px solid var(--gray-alpha-400);
  border-radius: 8px;
  background: var(--gray-50);
  color: var(--gray-950);
  font-size: 13px;
  cursor: pointer;
}
.tp-reset:hover {
  border-color: var(--accent-500);
  background: var(--accent-alpha-100);
}
.tp-preview {
  display: grid;
  gap: 20px;
}
.tp-panel {
  display: grid;
  gap: 16px;
  padding: 24px;
  border: 1px solid var(--gray-alpha-400);
  border-radius: 12px;
}
.tp-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.tp-swatches {
  display: flex;
  gap: 8px;
}
.tp-swatch {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--gray-alpha-400);
}
.tp-output {
  display: grid;
  gap: 12px;
}
.tp-out-block {
  display: grid;
  gap: 6px;
}
.tp-out-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.tp-out-title {
  color: var(--gray-900);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.tp-copy {
  height: 26px;
  padding: 0 10px;
  border: 1px solid var(--gray-alpha-400);
  border-radius: 6px;
  background: var(--gray-50);
  color: var(--gray-950);
  font-size: 12px;
  cursor: pointer;
}
.tp-copy:hover {
  border-color: var(--accent-500);
  background: var(--accent-alpha-100);
}
.tp-code {
  margin: 0;
  padding: 14px 16px;
  overflow-x: auto;
  border: 1px solid var(--gray-alpha-400);
  border-radius: 10px;
  background: var(--gray-alpha-50);
  color: var(--gray-950);
  font-family: monospace;
  font-size: 12px;
  line-height: 1.6;
  white-space: pre;
}
.tp-custom {
  display: flex;
  gap: 8px;
}
.tp-color {
  width: 40px;
  height: 32px;
  padding: 2px;
  border: 1px solid var(--gray-alpha-400);
  border-radius: 8px;
  background: var(--gray-50);
  cursor: pointer;
}
.tp-text {
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--gray-alpha-400);
  border-radius: 8px;
  background: var(--gray-50);
  color: var(--gray-950);
  font-family: monospace;
  font-size: 13px;
}
.tp-hint {
  margin: 2px 0 0;
  color: var(--gray-600);
  font-size: 11px;
}
.tp-scale {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 4px;
}
.tp-step {
  display: grid;
  gap: 4px;
  justify-items: center;
  font-size: 10px;
  color: var(--gray-600);
}
.tp-step-chip {
  width: 100%;
  height: 28px;
  border-radius: 6px;
  border: 1px solid var(--gray-alpha-400);
}
`;

/** Build the `<Theme …>` JSX string, emitting only props that differ from the defaults. */
function buildJsx(state: ThemeState): string {
  const props: string[] = [];
  if (state.appearance !== 'inherit') props.push(`appearance="${state.appearance}"`);
  props.push(`accentColor="${state.accentColor}"`);
  if (state.dangerColor !== 'red') props.push(`dangerColor="${state.dangerColor}"`);
  if (state.warningColor !== 'amber') props.push(`warningColor="${state.warningColor}"`);
  if (state.successColor !== 'green') props.push(`successColor="${state.successColor}"`);
  if (state.infoColor !== 'sky') props.push(`infoColor="${state.infoColor}"`);
  if (state.hasBackground) props.push('hasBackground');
  return `<Theme\n  ${props.join('\n  ')}\n>\n  {/* your app */}\n</Theme>`;
}

/** The data-attributes ljkui stamps on the rendered theme element — handy for plain CSS/HTML. */
function buildAttrs(state: ThemeState): string {
  const attrs = [
    `data-accent-color="${state.accentColor}"`,
    `data-danger-color="${state.dangerColor}"`,
    `data-warning-color="${state.warningColor}"`,
    `data-success-color="${state.successColor}"`,
    `data-info-color="${state.infoColor}"`,
  ];
  const cls = state.appearance === 'inherit' ? 'ljkui' : `ljkui ${state.appearance}`;
  return `<div\n  class="${cls}"\n  ${attrs.join('\n  ')}\n>`;
}

interface FieldProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

function SelectField({ label, value, options, onChange }: FieldProps) {
  return (
    <label className="tp-field">
      <span className="tp-label">{label}</span>
      <select className="tp-select" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

interface CodeBlockProps {
  title: string;
  code: string;
}

function CodeBlock({ title, code }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = React.useCallback(() => {
    void navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1000);
  }, [code]);
  return (
    <div className="tp-out-block">
      <div className="tp-out-head">
        <span className="tp-out-title">{title}</span>
        <button type="button" className="tp-copy" onClick={onCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="tp-code">{code}</pre>
    </div>
  );
}

function ThemePlaygroundPage() {
  const [state, setState] = React.useState<ThemeState>(DEFAULT_STATE);
  const set = React.useCallback(<K extends keyof ThemeState>(key: K, value: ThemeState[K]) => {
    setState((current) => ({ ...current, [key]: value }));
  }, []);

  const jsx = buildJsx(state);
  const attrs = buildAttrs(state);

  return (
    <div className="tp-root">
      <style>{CSS}</style>
      <header>
        <h1 className="tp-title">Theme playground</h1>
        <p className="tp-desc">
          Tune a nested <code>&lt;Theme&gt;</code> live — every control below maps to a real prop and re-themes only the
          preview panel. Pick a named scale <em>or paste any brand color</em> into the custom accent field: ljkui fits a
          full 12-step OKLab role scale from it at runtime (watch the scale strip below re-tint). Copy the resulting{' '}
          <code>&lt;Theme&gt;</code> JSX (or the data-attributes ljkui stamps on the element) to reproduce the exact
          look in your own app.
        </p>
      </header>

      <div className="tp-layout">
        <div className="tp-controls">
          <SelectField
            label="appearance"
            value={state.appearance}
            options={APPEARANCES}
            onChange={(value) => set('appearance', value as ThemeState['appearance'])}
          />
          <SelectField
            label="accentColor"
            value={isCustomAccent(state.accentColor) ? ACCENT_COLORS[0] : state.accentColor}
            options={ACCENT_COLORS}
            onChange={(value) => set('accentColor', value)}
          />
          <div className="tp-field">
            <span className="tp-label">custom accent</span>
            <div className="tp-custom">
              <input
                type="color"
                className="tp-color"
                aria-label="custom accent color picker"
                value={isCustomAccent(state.accentColor) ? state.accentColor : DEFAULT_CUSTOM_HEX}
                onChange={(event) => set('accentColor', event.target.value)}
              />
              <input
                type="text"
                className="tp-text"
                aria-label="custom accent color value"
                spellCheck={false}
                placeholder="#7c3aed / oklch(…) / rgb(…)"
                value={isCustomAccent(state.accentColor) ? state.accentColor : ''}
                onChange={(event) => set('accentColor', event.target.value)}
              />
            </div>
            <p className="tp-hint">Any CSS color — ljkui fits a full 12-step OKLab role scale at runtime.</p>
          </div>
          <SelectField
            label="dangerColor"
            value={state.dangerColor}
            options={dangerColors}
            onChange={(value) => set('dangerColor', value as ThemeState['dangerColor'])}
          />
          <SelectField
            label="warningColor"
            value={state.warningColor}
            options={warningColors}
            onChange={(value) => set('warningColor', value as ThemeState['warningColor'])}
          />
          <SelectField
            label="successColor"
            value={state.successColor}
            options={successColors}
            onChange={(value) => set('successColor', value as ThemeState['successColor'])}
          />
          <SelectField
            label="infoColor"
            value={state.infoColor}
            options={infoColors}
            onChange={(value) => set('infoColor', value as ThemeState['infoColor'])}
          />
          <label className="tp-check">
            <input
              type="checkbox"
              checked={state.hasBackground}
              onChange={(event) => set('hasBackground', event.target.checked)}
            />
            hasBackground
          </label>
          <button type="button" className="tp-reset" onClick={() => setState(DEFAULT_STATE)}>
            Reset
          </button>
        </div>

        <div className="tp-preview">
          <Theme
            appearance={state.appearance}
            accentColor={state.accentColor}
            dangerColor={state.dangerColor}
            warningColor={state.warningColor}
            successColor={state.successColor}
            infoColor={state.infoColor}
            hasBackground={state.hasBackground}
          >
            <div className="tp-panel">
              <div className="tp-row">
                <Avatar size="3" fallback="LJ" color="blue" />
                <div>
                  <Typography.Text render={<div />} size="3" weight="bold">
                    Live preview
                  </Typography.Text>
                  <Typography.Text render={<div />} size="2" color="gray">
                    This panel is themed by the controls on the left.
                  </Typography.Text>
                </div>
              </div>

              <div className="tp-row">
                <Button variant="classic">Classic</Button>
                <Button variant="solid">Solid</Button>
                <Button variant="soft">Soft</Button>
                <Button variant="surface">Surface</Button>
                <Button variant="ghost">Ghost</Button>
              </div>

              <div className="tp-row">
                <Badge variant="solid">accent</Badge>
                <Badge color={state.dangerColor}>danger</Badge>
                <Badge color={state.warningColor}>warning</Badge>
                <Badge color={state.successColor}>success</Badge>
                <Badge color={state.infoColor}>info</Badge>
              </div>

              <div className="tp-row">
                <Switch size="2" defaultChecked />
                <Switch size="2" />
                <div className="tp-swatches">
                  <span className="tp-swatch" style={{ background: 'var(--accent-700)' }} />
                  <span className="tp-swatch" style={{ background: 'var(--accent-500)' }} />
                  <span className="tp-swatch" style={{ background: 'var(--accent-300)' }} />
                  <span className="tp-swatch" style={{ background: 'var(--gray-500)' }} />
                </div>
              </div>

              <Card size="2" variant="surface">
                <Typography.Text render={<div />} size="2">
                  A surface card. The border, background, and accent links all track the current accent scale.
                </Typography.Text>
              </Card>

              <div>
                <Typography.Text render={<div />} size="1" color="gray" weight="medium">
                  Resolved accent scale (--accent-10 → --accent-950)
                </Typography.Text>
                <div className="tp-scale" style={{ marginTop: 8 }}>
                  {ACCENT_STEPS.map((step) => (
                    <div key={step} className="tp-step">
                      <span className="tp-step-chip" style={{ background: `var(--accent-${step})` }} />
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Theme>

          <div className="tp-output">
            <CodeBlock title="Theme JSX" code={jsx} />
            <CodeBlock title="Rendered element (plain CSS/HTML)" code={attrs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const fixtures = {
  'Theme Playground': () => <ThemePlaygroundPage />,
};
