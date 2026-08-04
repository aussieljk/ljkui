import * as React from 'react';
import { tailwindColorScales } from '../../src/helpers/tailwind-colors';

/*
 * A visual index of the 12-step scales. Every scale ships as `--{name}-{step}` (opaque)
 * and `--{name}-alpha-{step}` (translucent), plus `--{name}-700-contrast` (the text color
 * for the solid step) and a translucent surface.
 *
 * The step names are Radix-style *roles*, not a lightness ramp and not the Tailwind stop
 * they are derived from — see src/helpers/tailwind-palette.ts.
 */

interface Step {
  step: number;
  role: string;
}

const STEPS: readonly Step[] = [
  { step: 10, role: 'App background' },
  { step: 50, role: 'Subtle background' },
  { step: 100, role: 'UI element fill' },
  { step: 200, role: 'Hovered fill' },
  { step: 300, role: 'Active fill' },
  { step: 400, role: 'Subtle border' },
  { step: 500, role: 'UI border' },
  { step: 600, role: 'Strong border' },
  { step: 700, role: 'Solid' },
  { step: 800, role: 'Hovered solid' },
  { step: 900, role: 'Low-contrast text' },
  { step: 950, role: 'High-contrast text' },
];

interface ScaleSpec {
  /** Token prefix, e.g. `accent` in `--accent-700`. */
  name: string;
  /** Heading shown above the block. */
  label?: string;
  /** One-line note under the heading. */
  note?: string;
  /**
   * The var holding the translucent surface. It is `--{name}-surface` for a palette but
   * `--color-surface-{name}` for the accent and the semantic scales, which are mappings.
   */
  surfaceVar: string;
}

const CSS = `
.cs-root {
  --cs-label: 108px;
  box-sizing: border-box;
  display: grid;
  gap: 28px;
  width: 100%;
  padding: 24px;
  color: var(--gray-900);
  font-size: 12px;
  line-height: 1.4;
}
.cs-title {
  margin: 0;
  color: var(--gray-950);
  font-size: 20px;
  font-weight: 600;
}
.cs-desc {
  max-width: 84ch;
  margin: 6px 0 0;
}
.cs-code {
  color: var(--gray-950);
  font-family: monospace;
}
.cs-blocks {
  display: grid;
  gap: 28px;
}
.cs-blocks--compact {
  gap: 14px;
}
.cs-block {
  display: grid;
  gap: 6px;
}
.cs-block-title {
  margin: 0;
  color: var(--gray-950);
  font-size: 13px;
  font-weight: 600;
}
.cs-block-note {
  margin: 2px 0 4px;
}
.cs-grid {
  display: grid;
  grid-template-columns: var(--cs-label) repeat(12, minmax(0, 1fr));
  gap: 6px;
  align-items: stretch;
}
.cs-legend-cell {
  display: grid;
  align-content: end;
  gap: 2px;
  min-width: 0;
  font-size: 10px;
}
.cs-legend-step {
  color: var(--gray-950);
  font-family: monospace;
  font-weight: 600;
}
.cs-rowlabel {
  display: grid;
  align-content: center;
  min-width: 0;
  overflow: hidden;
  color: var(--gray-950);
  font-size: 11px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cs-rowlabel--muted {
  color: var(--gray-900);
  font-weight: 400;
}
.cs-cell {
  display: grid;
  gap: 3px;
  min-width: 0;
}
.cs-swatch {
  height: 44px;
  border: 1px solid var(--gray-alpha-400);
  border-radius: 6px;
}
.cs-swatch--sm {
  height: 24px;
}
.cs-fill {
  width: 100%;
  height: 100%;
  border-radius: inherit;
}
.cs-value {
  overflow: hidden;
  color: var(--gray-900);
  font-family: monospace;
  font-size: 9px;
  letter-spacing: -0.02em;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cs-checker {
  background-color: var(--gray-100);
  background-image: conic-gradient(
    from 0deg,
    var(--gray-alpha-500) 0deg 90deg,
    transparent 90deg 180deg,
    var(--gray-alpha-500) 180deg 270deg,
    transparent 270deg 360deg
  );
  background-size: 14px 14px;
}
.cs-extras {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 2px;
}
.cs-chip {
  overflow: hidden;
  border: 1px solid var(--gray-alpha-400);
  border-radius: 6px;
}
.cs-chip-inner {
  display: block;
  padding: 6px 10px;
  color: var(--gray-950);
  font-family: monospace;
  font-size: 10px;
}
`;

const byte = (v: number) => Math.round(v).toString(16).padStart(2, '0');

/** `rgb(59, 130, 246)` / `rgba(…, 0.16)` → `#3b82f6` / `#3b82f629`. */
function toHex(color: string): string {
  const match = color.match(/^rgba?\(([^)]+)\)$/);
  if (!match) return color;
  const parts = match[1]
    .split(/[\s,/]+/)
    .filter(Boolean)
    .map(Number);
  const [r, g, b, a] = parts;
  if ([r, g, b].some((v) => !Number.isFinite(v))) return color;
  const hex = `#${byte(r)}${byte(g)}${byte(b)}`;
  return a === undefined || a >= 1 ? hex : `${hex}${byte(a * 255)}`;
}

/**
 * Resolve every `[data-token]` swatch under the returned ref to its computed color.
 * Read after a frame so the `<Theme>` class is already on the tree.
 *
 * Under Storybook this re-ran because changing a toolbar global remounted the page via a
 * `key`. The theme is now a fixture input on the root decorator, which re-renders in place
 * instead of remounting — so watch the themed ancestor's attributes and re-read whenever
 * appearance / accent / gray actually change.
 */
function useSwatchValues(enabled: boolean) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [values, setValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const root = ref.current;
    if (!enabled || !root) return;

    let frame = 0;
    const read = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next: Record<string, string> = {};
        for (const node of root.querySelectorAll<HTMLElement>('[data-token]')) {
          const token = node.dataset.token;
          if (token) next[token] = toHex(getComputedStyle(node).backgroundColor);
        }
        setValues(next);
      });
    };

    read();

    const themed = root.closest('.ljkui') ?? document.documentElement;
    const observer = new MutationObserver(read);
    observer.observe(themed, {
      attributes: true,
      attributeFilter: ['class', 'data-accent-color', 'data-gray-color'],
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return { ref, values };
}

interface SwatchProps {
  token: string;
  alpha: boolean;
  small: boolean;
  value?: string;
}

function Swatch({ token, alpha, small, value }: SwatchProps) {
  const style = { background: `var(${token})` };
  const className = `cs-swatch${small ? ' cs-swatch--sm' : ''}`;
  return (
    <div className="cs-cell" title={token}>
      {alpha ? (
        <div className={`${className} cs-checker`}>
          <div className="cs-fill" data-token={token} style={style} />
        </div>
      ) : (
        <div className={className} data-token={token} style={style} />
      )}
      {value !== undefined && <span className="cs-value">{value}</span>}
    </div>
  );
}

function Legend() {
  return (
    <div className="cs-grid">
      <div />
      {STEPS.map(({ step, role }) => (
        <div className="cs-legend-cell" key={step}>
          <span className="cs-legend-step">{step}</span>
          <span>{role}</span>
        </div>
      ))}
    </div>
  );
}

interface ScaleBlockProps extends ScaleSpec {
  compact: boolean;
  values?: Record<string, string>;
}

function ScaleBlock({ name, label, note, surfaceVar, compact, values }: ScaleBlockProps) {
  const row = (alpha: boolean) => (
    <div className="cs-grid">
      <span className={`cs-rowlabel${alpha ? ' cs-rowlabel--muted' : ''}`}>
        {compact ? (alpha ? 'alpha' : name) : alpha ? 'Alpha' : 'Solid'}
      </span>
      {STEPS.map(({ step }) => {
        const token = `--${name}-${alpha ? 'alpha-' : ''}${step}`;
        return <Swatch key={step} token={token} alpha={alpha} small={compact} value={values?.[token]} />;
      })}
    </div>
  );

  return (
    <section className="cs-block">
      {!compact && (
        <header>
          <h2 className="cs-block-title">{label ?? name}</h2>
          {note && <p className="cs-block-note">{note}</p>}
        </header>
      )}
      {row(false)}
      {row(true)}
      {!compact && (
        <div className="cs-extras">
          <div className="cs-chip">
            <span
              className="cs-chip-inner"
              style={{ background: `var(--${name}-700)`, color: `var(--${name}-700-contrast)` }}
            >
              Aa — --{name}-700-contrast
            </span>
          </div>
          <div className="cs-chip cs-checker">
            <span className="cs-chip-inner" style={{ background: `var(${surfaceVar})` }}>
              {surfaceVar}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

interface PageProps {
  title: string;
  description: React.ReactNode;
  scales: readonly ScaleSpec[];
  compact?: boolean;
  showValues?: boolean;
}

function ColorScalePage({ title, description, scales, compact = false, showValues = true }: PageProps) {
  const { ref, values } = useSwatchValues(showValues);
  return (
    <div className="cs-root" ref={ref}>
      <style>{CSS}</style>
      <header>
        <h1 className="cs-title">{title}</h1>
        <p className="cs-desc">{description}</p>
      </header>
      <Legend />
      <div className={`cs-blocks${compact ? ' cs-blocks--compact' : ''}`}>
        {scales.map((scale) => (
          <ScaleBlock key={scale.name} {...scale} compact={compact} values={showValues ? values : undefined} />
        ))}
      </div>
    </div>
  );
}

const ROLE_NOTE = (
  <>
    The 12 steps are <em>roles</em>, not a lightness ramp: a step&rsquo;s name is not the Tailwind stop it is derived
    from. <span className="cs-code">--x-500</span> is a border, so it comes from around Tailwind&rsquo;s 300. Every
    scale also ships an alpha twin (<span className="cs-code">--x-alpha-500</span>) that tints whatever is behind it
    instead of covering it — shown here over a checkerboard.
  </>
);

/*
 * The fixtures. These were four Storybook stories under `Guides/3.1 Color scales`; the
 * `key={themeKey(globals)}` each carried is gone — see `useSwatchValues`, which now
 * re-reads on a theme change rather than being remounted for one.
 */
export const fixtures = {
  Accent: () => (
    <ColorScalePage
      title="Accent scale"
      description={ROLE_NOTE}
      scales={[
        {
          name: 'accent',
          label: 'accent',
          note: 'Follows the Accent control — --accent-* is a mapping onto the selected palette.',
          surfaceVar: '--color-surface-accent',
        },
      ]}
    />
  ),

  Gray: () => (
    <ColorScalePage
      title="Gray scale"
      description={ROLE_NOTE}
      scales={[
        {
          name: 'gray',
          label: 'gray',
          note: 'Follows the Gray control; "auto" pairs the gray with the accent hue.',
          surfaceVar: '--gray-surface',
        },
      ]}
    />
  ),

  Semantic: () => (
    <ColorScalePage
      title="Semantic scales"
      description={ROLE_NOTE}
      scales={[
        { name: 'danger', note: 'Destructive actions and errors.', surfaceVar: '--color-surface-danger' },
        { name: 'warning', note: 'Caution states.', surfaceVar: '--color-surface-warning' },
        { name: 'success', note: 'Confirmation states.', surfaceVar: '--color-surface-success' },
        { name: 'info', note: 'Neutral informational states.', surfaceVar: '--color-surface-info' },
      ]}
    />
  ),

  'All palettes': () => (
    <ColorScalePage
      title="All palettes"
      description={
        <>
          Every named Tailwind palette ljkui ships, solid row over alpha row. Any of these can be the theme&rsquo;s
          accent (<span className="cs-code">&lt;Theme accentColor=&quot;violet&quot;&gt;</span>) or referenced directly
          as <span className="cs-code">--violet-700</span>.
        </>
      }
      scales={tailwindColorScales.map((name) => ({ name, surfaceVar: `--${name}-surface` }))}
      compact
      showValues={false}
    />
  ),
};
