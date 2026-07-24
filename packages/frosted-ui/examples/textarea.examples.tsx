import React from 'react';
import { Textarea, textareaPropDefs } from '@aussieljk/frosted';

export const examples = {
  Size() {
    const args = {
      size: textareaPropDefs.size.default,
      variant: textareaPropDefs.variant.default,
      color: textareaPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 500 }}>
        <Textarea placeholder="Reply to comment…" {...args} size="1" />
        <Textarea placeholder="Reply to comment…" {...args} size="2" />
        <Textarea placeholder="Reply to comment…" {...args} size="3" />
        <Textarea placeholder="Reply to comment…" {...args} size="4" />
      </div>
    );
  },

  Variant() {
    const args = {
      size: textareaPropDefs.size.default,
      variant: textareaPropDefs.variant.default,
      color: textareaPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 500 }}>
        <Textarea placeholder="Reply to comment…" {...args} variant="surface" />
        <Textarea placeholder="Reply to comment…" {...args} variant="soft" />
      </div>
    );
  },

  Color() {
    const args = {
      size: textareaPropDefs.size.default,
      variant: textareaPropDefs.variant.default,
      color: textareaPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 500 }}>
        <Textarea placeholder="Reply to comment…" {...args} color="blue" />
        <Textarea placeholder="Reply to comment…" {...args} color="green" />
        <Textarea placeholder="Reply to comment…" {...args} color="red" />
      </div>
    );
  },
};
