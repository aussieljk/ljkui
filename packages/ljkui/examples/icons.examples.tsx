import IconsOverview from './demos/icons.demo';
import React from 'react';
import { Badge, Button, Card, IconButton, IconProvider, Icons, Typography, type CanonicalIconName } from 'ljkui';
import {
  CalendarIcon,
  ChevronRightIcon,
  InfoCircledIcon,
  ThickCheckIcon,
  ThickChevronRightIcon,
  TriangleDownIcon,
  XIcon,
} from 'ljkui/icons';
import { lucideAdapter } from 'ljkui/icons/lucide';

const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' };
const column: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' };

const Label = ({ children }: { children: React.ReactNode }) => (
  <Typography.Text render={<div />} size="1" color="gray" style={{ marginBottom: 'var(--space-2)' }}>
    {children}
  </Typography.Text>
);

/** The canonical names the `Icons` proxy exposes, in declaration order. */
const canonicalNames = Object.keys(Icons) as CanonicalIconName[];

const builtIns = [
  { name: 'CalendarIcon', Icon: CalendarIcon },
  { name: 'ChevronRightIcon', Icon: ChevronRightIcon },
  { name: 'InfoCircledIcon', Icon: InfoCircledIcon },
  { name: 'ThickCheckIcon', Icon: ThickCheckIcon },
  { name: 'ThickChevronRightIcon', Icon: ThickChevronRightIcon },
  { name: 'TriangleDownIcon', Icon: TriangleDownIcon },
  { name: 'XIcon', Icon: XIcon },
];

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Utilities', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/icons.demo.tsx` before demos folded into examples. */
  Overview: IconsOverview,

  'Built-in icons'() {
    // Shipped inline as SVG and used by the components themselves — no adapter needed.
    return (
      <div style={column}>
        <Typography.Text size="2" color="gray" render={<div />} style={{ maxWidth: 520 }}>
          These are the only icons the library ships. They are imported from{' '}
          <Typography.Code size="2">ljkui/icons</Typography.Code> and inherit{' '}
          <Typography.Code size="2">currentColor</Typography.Code>.
        </Typography.Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-5)' }}>
          {builtIns.map(({ name, Icon }) => (
            <div key={name} style={{ textAlign: 'center', width: 140 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 'var(--space-7)',
                  borderRadius: 'var(--radius-3)',
                  backgroundColor: 'var(--gray-alpha-100)',
                }}
              >
                <Icon size="2" />
              </div>
              <Typography.Text render={<div />} size="1" color="gray" style={{ marginTop: 'var(--space-1)' }}>
                {name}
              </Typography.Text>
            </div>
          ))}
        </div>
      </div>
    );
  },

  'Adapter (lucide)'() {
    // `Icons.*` renders nothing until an adapter is registered. Either import the
    // entrypoint once (`import 'ljkui/icons/lucide'`) or scope it with `IconProvider`.
    return (
      <IconProvider library={lucideAdapter}>
        <div style={column}>
          <Label>library={lucideAdapter.name}</Label>
          <div style={row}>
            <Icons.Search />
            <Icons.Settings />
            <Icons.Bell />
            <Icons.Heart />
            <Icons.Star />
            <Icons.Calendar />
            <Icons.Trash />
            <Icons.Warning />
          </div>
        </div>
      </IconProvider>
    );
  },

  Size() {
    return (
      <IconProvider library={lucideAdapter}>
        <div style={row}>
          {[12, 16, 20, 24, 32, 48].map((size) => (
            <div key={size} style={{ textAlign: 'center' }}>
              <Icons.Flame size={size} />
              <Typography.Text render={<div />} size="1" color="gray">
                {size}
              </Typography.Text>
            </div>
          ))}
        </div>
      </IconProvider>
    );
  },

  Color() {
    return (
      <IconProvider library={lucideAdapter}>
        <div style={row}>
          <Icons.Zap size={24} style={{ color: 'var(--accent-700)' }} />
          <Icons.Zap size={24} style={{ color: 'var(--gray-900)' }} />
          <Icons.Zap size={24} style={{ color: 'var(--green-700)' }} />
          <Icons.Zap size={24} style={{ color: 'var(--amber-700)' }} />
          <Icons.Zap size={24} style={{ color: 'var(--red-700)' }} />
        </div>
      </IconProvider>
    );
  },

  'In components'() {
    return (
      <IconProvider library={lucideAdapter}>
        <div style={column}>
          <div style={row}>
            <Button variant="solid">
              <Icons.Plus />
              New item
            </Button>
            <Button variant="surface">
              <Icons.Download />
              Export
            </Button>
            <Button variant="soft" color="danger">
              <Icons.Trash />
              Delete
            </Button>
          </div>
          <div style={row}>
            <IconButton variant="soft" aria-label="Settings">
              <Icons.Settings />
            </IconButton>
            <IconButton variant="surface" aria-label="Filter">
              <Icons.Filter />
            </IconButton>
            <IconButton variant="ghost" aria-label="Close">
              <Icons.Close />
            </IconButton>
            <Badge variant="soft" color="success">
              <Icons.Check size={12} />
              Verified
            </Badge>
          </div>
        </div>
      </IconProvider>
    );
  },

  'Icon browser'() {
    const [query, setQuery] = React.useState('');
    const matches = canonicalNames.filter((name) => name.toLowerCase().includes(query.trim().toLowerCase()));
    return (
      <IconProvider library={lucideAdapter}>
        <Card size="2" style={{ width: 640 }}>
          <div style={column}>
            <div style={row}>
              <Typography.Text size="2" weight="bold">
                {matches.length} canonical names
              </Typography.Text>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter…"
                style={{
                  flex: 1,
                  padding: 'var(--space-2)',
                  borderRadius: 'var(--radius-2)',
                  border: '1px solid var(--gray-alpha-300)',
                  background: 'transparent',
                  color: 'inherit',
                  font: 'inherit',
                }}
              />
            </div>
            <div
              className="fui-scrollbar-thin"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
                gap: 'var(--space-3)',
                maxHeight: 360,
                overflowY: 'auto',
              }}
            >
              {matches.map((name) => {
                const Icon = Icons[name];
                return (
                  <div key={name} style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'var(--space-7)',
                        borderRadius: 'var(--radius-3)',
                        backgroundColor: 'var(--gray-alpha-100)',
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <Typography.Text render={<div />} size="1" color="gray" style={{ marginTop: 'var(--space-1)' }}>
                      {name}
                    </Typography.Text>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </IconProvider>
    );
  },
};
