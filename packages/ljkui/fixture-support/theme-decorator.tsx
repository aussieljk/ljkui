import * as React from 'react';
import { Theme } from 'ljkui';
import { useFixtureInput, useFixtureViewport } from 'uaight';
import { activeBreakpoint } from './breakpoints';
import '../src/styles/index.css';
import './host.css';

/*
 * Every fixture renders inside this. It replaces the three Storybook toolbar globals
 * (appearance / accent / gray) with fixture inputs, which is a straight upgrade: the
 * values now live in the control panel next to the fixture's own inputs, and they ride
 * along in a shared link like any other control.
 */

const ACCENTS = ['blue', 'indigo', 'violet', 'cyan', 'sky', 'green', 'amber', 'orange', 'red', 'rose', 'gray'] as const;

const GRAYS = ['auto', 'slate', 'zinc', 'neutral', 'stone'] as const;

const APPEARANCES = ['light', 'dark'] as const;

/*
 * Fixture inputs are registered in a single flat namespace shared with the fixture's own
 * inputs, so an un-prefixed `appearance` here collides with any component that has a prop of
 * the same name — `<Theme>` does, and its Playground registered the identical key, leaving one
 * control driving both the page theme and the nested component's prop. The prefix is ugly on
 * purpose: it cannot be produced by `props.json`, which is what makes a collision impossible.
 */
const THEME_PREFIX = 'theme:';

export function ThemeDecorator({ children }: { children: React.ReactNode }) {
  const [appearance] = useFixtureInput<(typeof APPEARANCES)[number]>(`${THEME_PREFIX}appearance`, 'light', {
    control: 'radio',
    options: APPEARANCES,
    description: 'Theme appearance',
  });
  const [accentColor] = useFixtureInput<(typeof ACCENTS)[number]>(`${THEME_PREFIX}accent`, 'blue', {
    control: 'select',
    options: ACCENTS,
    description: 'Accent color',
  });
  const [grayColor] = useFixtureInput<(typeof GRAYS)[number]>(`${THEME_PREFIX}gray`, 'auto', {
    control: 'select',
    options: GRAYS,
    description: 'Gray scale paired with the accent',
  });

  return (
    <Theme appearance={appearance} accentColor={accentColor} grayColor={grayColor} hasBackground>
      {children}
      <BreakpointBadge />
    </Theme>
  );
}

const badgeStyle: React.CSSProperties = {
  position: 'fixed',
  right: '6px',
  bottom: '6px',
  padding: '2px 6px',
  borderRadius: '4px',
  background: 'var(--gray-alpha-300)',
  color: 'var(--gray-900)',
  font: '10px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace',
  pointerEvents: 'none',
  zIndex: 2147483647,
};

/**
 * Which breakpoint the fixture is currently rendering at.
 *
 * This is what replaces Storybook's breakpoint viewport presets. uaight's preset list
 * (`VIEWPORT_PRESETS`) is a private constant — Small/Mobile/Tablet/Laptop/Desktop, of which
 * only 768 and 1280 coincide with this library's scale — and there is no public option to
 * extend it, so the named-preset toolbar cannot be reproduced. What actually mattered was
 * knowing which `@custom-media` query is live; that is reported here directly, and it stays
 * correct however the width was arrived at (a uaight preset, or just resizing the window).
 *
 * `useFixtureViewport()` is read-only, and reports the real frame viewport rather than a CSS
 * box — which is the number the media queries themselves measure.
 */
function BreakpointBadge() {
  const viewport = useFixtureViewport();
  if (!viewport?.width) return null;
  return <div style={badgeStyle}>{`${activeBreakpoint(viewport.width)} · ${viewport.width}px`}</div>;
}

export default ThemeDecorator;
