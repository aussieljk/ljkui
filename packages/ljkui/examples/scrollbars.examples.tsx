import React from 'react';
import { Card, Typography } from 'ljkui';

/**
 * `styles/scrollbars.css` hides native scrollbars everywhere (scrolling still works)
 * and offers one opt-in class, `.fui-scrollbar-thin`, for an ultra-thin rounded thumb
 * drawn with the theme grays.
 */
const THIN = 'fui-scrollbar-thin';

const row: React.CSSProperties = { display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' };
const column: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' };

const frame = { borderRadius: 'var(--radius-4)', border: '1px solid var(--gray-alpha-300)', overflow: 'auto' };
const box: React.CSSProperties = { ...frame, width: 260, height: 160, padding: 'var(--space-3)' };

const Label = ({ children }: { children: React.ReactNode }) => (
  <Typography.Text render={<div />} size="1" color="gray" style={{ marginBottom: 'var(--space-2)' }}>
    {children}
  </Typography.Text>
);

const Paragraphs = ({ count = 6 }: { count?: number }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <Typography.Text key={index} render={<p />} size="2" style={{ marginBottom: 'var(--space-3)' }}>
        {index + 1}. Native scrollbars are hidden by default, so a scrolling region looks the same on every platform
        until you opt back in.
      </Typography.Text>
    ))}
  </>
);

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Utilities', layout: 'centered' } as const;

export const examples = {
  'Hidden by default'() {
    return (
      <div style={column}>
        <Label>no class — the content scrolls, the scrollbar is invisible</Label>
        <div style={box}>
          <Paragraphs />
        </div>
      </div>
    );
  },

  'Thin scrollbar'() {
    return (
      <div style={row}>
        <div>
          <Label>default</Label>
          <div style={box}>
            <Paragraphs />
          </div>
        </div>
        <div>
          <Label>className=&quot;{THIN}&quot;</Label>
          <div className={THIN} style={box}>
            <Paragraphs />
          </div>
        </div>
      </div>
    );
  },

  Horizontal() {
    return (
      <div style={column}>
        <Label>the same class styles the horizontal scrollbar</Label>
        <div className={THIN} style={{ ...box, height: 'auto', width: 420, whiteSpace: 'nowrap' }}>
          <Typography.Text size="2">
            A single very long line that has to scroll sideways, because wrapping is turned off and the container is
            narrower than the text it holds.
          </Typography.Text>
        </div>
      </div>
    );
  },

  'Both axes'() {
    return (
      <div style={column}>
        <Label>both scrollbars plus the corner</Label>
        <div className={THIN} style={{ ...box, width: 320 }}>
          <div style={{ width: 640 }}>
            <Paragraphs count={8} />
          </div>
        </div>
      </div>
    );
  },

  'In a card'() {
    return (
      <Card size="2" style={{ width: 360 }}>
        <Typography.Text render={<div />} size="2" weight="bold" style={{ marginBottom: 'var(--space-2)' }}>
          Release notes
        </Typography.Text>
        <div className={THIN} style={{ maxHeight: 180, overflowY: 'auto', paddingRight: 'var(--space-2)' }}>
          <Paragraphs count={10} />
        </div>
      </Card>
    );
  },
};
