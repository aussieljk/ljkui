import * as React from 'react';
import { Theme } from 'ljkui';
import { useFixtureInput } from 'uaight';
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

export function ThemeDecorator({ children }: { children: React.ReactNode }) {
  const [appearance] = useFixtureInput<(typeof APPEARANCES)[number]>('appearance', 'light', {
    control: 'radio',
    options: APPEARANCES,
    description: 'Theme appearance',
  });
  const [accentColor] = useFixtureInput<(typeof ACCENTS)[number]>('accent', 'blue', {
    control: 'select',
    options: ACCENTS,
    description: 'Accent color',
  });
  const [grayColor] = useFixtureInput<(typeof GRAYS)[number]>('gray', 'auto', {
    control: 'select',
    options: GRAYS,
    description: 'Gray scale paired with the accent',
  });

  return (
    <Theme appearance={appearance} accentColor={accentColor} grayColor={grayColor} hasBackground>
      {children}
    </Theme>
  );
}

export default ThemeDecorator;
