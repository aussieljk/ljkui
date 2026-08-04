import SpinnerOverview from './demos/spinner.demo';
import React from 'react';
import { Spinner, Switch, Typography, spinnerPropDefs } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/spinner.demo.tsx` before demos folded into examples. */
  Overview: SpinnerOverview,

  Size() {
    const args = {
      size: spinnerPropDefs.size.default,
      loading: spinnerPropDefs.loading.default,
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <Spinner {...args} size="1" />
        <Spinner {...args} size="2" />
        <Spinner {...args} size="3" />
        <Spinner {...args} size="4" />
        <Spinner {...args} size="5" />
        <Spinner {...args} size="6" />
      </div>
    );
  },

  'With children'() {
    const args = {
      size: spinnerPropDefs.size.default,
      loading: spinnerPropDefs.loading.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: 640 }}>
        <Typography.Text>
          Use the <Typography.Code>loading</Typography.Code> prop to control whether the spinner or its children are
          displayed. Spinner preserves the dimensions of children when they are hidden and disables interactive
          elements.
        </Typography.Text>
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          <Spinner {...args} loading={true}>
            <Switch defaultChecked />
          </Spinner>

          <Spinner {...args} loading={false}>
            <Switch defaultChecked />
          </Spinner>
        </div>
      </div>
    );
  },
};
