import React from 'react';
import { Separator, separatorPropDefs } from '@aussieljk/frosted';

export const examples = {
  Size() {
    const args = {
      size: separatorPropDefs.size.default,
      color: separatorPropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Separator {...args} orientation="horizontal" size="4" />
          <Separator {...args} orientation="horizontal" size="3" />
          <Separator {...args} orientation="horizontal" size="2" />
          <Separator {...args} orientation="horizontal" size="1" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', height: 96 }}>
          <Separator {...args} orientation="vertical" size="4" />
          <Separator {...args} orientation="vertical" size="3" />
          <Separator {...args} orientation="vertical" size="2" />
          <Separator {...args} orientation="vertical" size="1" />
        </div>
      </div>
    );
  },

  Color() {
    const args = {
      size: separatorPropDefs.size.default,
      color: separatorPropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Separator {...args} color="indigo" size="3" />
        <Separator {...args} color="cyan" size="3" />
        <Separator {...args} color="orange" size="3" />
        <Separator {...args} color="rose" size="3" />
      </div>
    );
  },

  Orientation() {
    const args = {
      size: separatorPropDefs.size.default,
      color: separatorPropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <Separator {...args} orientation="horizontal" />
        <Separator {...args} orientation="vertical" />
      </div>
    );
  },
};
