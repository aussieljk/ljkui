import IconButtonOverview from './demos/icon-button.demo';
import React from 'react';
import { IconButton, buttonPropDefs } from 'ljkui';

const ExampleIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V13.5C12 13.6818 11.9014 13.8492 11.7424 13.9373C11.5834 14.0254 11.3891 14.0203 11.235 13.924L7.5 11.5896L3.765 13.924C3.61087 14.0203 3.41659 14.0254 3.25762 13.9373C3.09864 13.8492 3 13.6818 3 13.5V2.5ZM4 3V12.5979L6.97 10.7416C7.29427 10.539 7.70573 10.539 8.03 10.7416L11 12.5979V3H4Z"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
  </svg>
);

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/icon-button.demo.tsx` before demos folded into examples. */
  Overview: IconButtonOverview,

  'High Contrast'() {
    const args = { children: <ExampleIcon size={16} />, disabled: false };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <IconButton {...args} highContrast={false} variant="classic" />
          <IconButton {...args} highContrast={false} variant="solid" />
          <IconButton {...args} highContrast={false} variant="soft" />
          <IconButton {...args} highContrast={false} variant="surface" />
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <IconButton {...args} variant="classic" highContrast />
          <IconButton {...args} variant="solid" highContrast />
          <IconButton {...args} variant="soft" highContrast />
          <IconButton {...args} variant="surface" highContrast />
        </div>
      </div>
    );
  },

  Loading() {
    const args = {
      children: <ExampleIcon size={16} />,
      size: buttonPropDefs.size.default,
      color: buttonPropDefs.color.default,
      loading: true,
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <IconButton {...args} variant="classic" />
        <IconButton {...args} variant="solid" />
        <IconButton {...args} variant="soft" />
        <IconButton {...args} variant="surface" />
        <IconButton {...args} variant="ghost" />
      </div>
    );
  },
};
