import type { Meta, StoryObj } from '@storybook/react-vite';
import { type CanonicalIconName, type IconAdapter, IconProvider, Icons } from 'ljkui';
import { heroiconsAdapter } from 'ljkui/icons/heroicons';
import { hugeiconsAdapter } from 'ljkui/icons/hugeicons';
import { lucideAdapter } from 'ljkui/icons/lucide';
import { phosphorAdapter } from 'ljkui/icons/phosphor';
import { tablerAdapter } from 'ljkui/icons/tabler';
import * as React from 'react';

/*
 * A searchable index of the library's canonical icons. `<Icons.Search />` etc.
 * resolve through whichever adapter is active, so the same name renders the
 * right glyph across every provider. Here we enumerate all canonical names via
 * `Object.keys(Icons)` (the proxy exposes them as its own keys) and scope a
 * chosen adapter with `<IconProvider>` so the provider selector re-renders the
 * whole grid in that library's style.
 *
 * The full canonical set is ~96 names (small enough to render at once), so no
 * curation is needed — the text box just filters that list client-side.
 */

/** Every canonical name the `Icons` proxy exposes, in declaration order. */
const iconNames = Object.keys(Icons) as CanonicalIconName[];

const ADAPTERS: readonly IconAdapter[] = [
  lucideAdapter,
  heroiconsAdapter,
  hugeiconsAdapter,
  phosphorAdapter,
  tablerAdapter,
];

const CSS = `
.ib-root {
  box-sizing: border-box;
  display: grid;
  gap: 20px;
  width: 100%;
  padding: 24px;
  color: var(--gray-900);
  font-size: 12px;
  line-height: 1.4;
}
.ib-title {
  margin: 0;
  color: var(--gray-950);
  font-size: 20px;
  font-weight: 600;
}
.ib-desc {
  max-width: 84ch;
  margin: 6px 0 0;
}
.ib-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.ib-input,
.ib-select {
  box-sizing: border-box;
  height: 34px;
  padding: 0 10px;
  border: 1px solid var(--gray-alpha-400);
  border-radius: 8px;
  background: var(--gray-50);
  color: var(--gray-950);
  font-size: 13px;
}
.ib-input {
  min-width: 240px;
  flex: 1 1 240px;
}
.ib-count {
  color: var(--gray-900);
  font-variant-numeric: tabular-nums;
}
.ib-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(112px, 1fr));
  gap: 10px;
}
.ib-cell {
  display: grid;
  justify-items: center;
  gap: 8px;
  padding: 16px 8px 12px;
  border: 1px solid var(--gray-alpha-400);
  border-radius: 10px;
  background: var(--gray-alpha-50);
  color: var(--gray-950);
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease;
}
.ib-cell:hover {
  border-color: var(--accent-500);
  background: var(--accent-alpha-100);
}
.ib-glyph {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
}
.ib-glyph svg {
  width: 24px;
  height: 24px;
}
.ib-name {
  overflow: hidden;
  max-width: 100%;
  color: var(--gray-900);
  font-size: 10px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ib-copied {
  color: var(--accent-800);
  font-weight: 600;
}
.ib-empty {
  padding: 40px 0;
  color: var(--gray-900);
  text-align: center;
}
`;

interface CellProps {
  name: CanonicalIconName;
  copied: boolean;
  onCopy: (name: CanonicalIconName) => void;
}

function Cell({ name, copied, onCopy }: CellProps) {
  const Icon = Icons[name];
  return (
    <button type="button" className="ib-cell" title={`<Icons.${name} />`} onClick={() => onCopy(name)}>
      <span className="ib-glyph">
        <Icon aria-hidden />
      </span>
      <span className={`ib-name${copied ? ' ib-copied' : ''}`}>{copied ? 'Copied!' : name}</span>
    </button>
  );
}

function IconBrowserPage() {
  const [query, setQuery] = React.useState('');
  const [adapterName, setAdapterName] = React.useState(ADAPTERS[0].name);
  const [copied, setCopied] = React.useState<CanonicalIconName | null>(null);

  const adapter = ADAPTERS.find((a) => a.name === adapterName) ?? ADAPTERS[0];

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return iconNames;
    return iconNames.filter((name) => name.toLowerCase().includes(q));
  }, [query]);

  const onCopy = React.useCallback((name: CanonicalIconName) => {
    void navigator.clipboard?.writeText(`<Icons.${name} />`).catch(() => {});
    setCopied(name);
    window.setTimeout(() => setCopied((current) => (current === name ? null : current)), 1000);
  }, []);

  return (
    <div className="ib-root">
      <style>{CSS}</style>
      <header>
        <h1 className="ib-title">Icon browser</h1>
        <p className="ib-desc">
          Every canonical icon name ljkui understands, rendered through the selected adapter. Reference any of them as{' '}
          <code>&lt;Icons.Search /&gt;</code>. Switching the provider re-renders the grid in that library&rsquo;s style
          (via <code>&lt;IconProvider&gt;</code>). Click a cell to copy its JSX.
        </p>
      </header>

      <div className="ib-controls">
        <input
          className="ib-input"
          type="search"
          placeholder="Filter icons by name…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="ib-select"
          value={adapterName}
          onChange={(event) => setAdapterName(event.target.value)}
          aria-label="Icon provider"
        >
          {ADAPTERS.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <span className="ib-count">
          {filtered.length} / {iconNames.length}
        </span>
      </div>

      <IconProvider library={adapter}>
        {filtered.length === 0 ? (
          <p className="ib-empty">No icon matches “{query}”.</p>
        ) : (
          <div className="ib-grid">
            {filtered.map((name) => (
              <Cell key={name} name={name} copied={copied === name} onCopy={onCopy} />
            ))}
          </div>
        )}
      </IconProvider>
    </div>
  );
}

const meta = {
  title: 'Utilities/Icon Browser',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A searchable grid of every canonical icon name, resolved through a selectable adapter (lucide, heroicons, hugeicons, phosphor, tabler).',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Browser: Story = {
  name: 'Icon Browser',
  render: () => <IconBrowserPage />,
};
