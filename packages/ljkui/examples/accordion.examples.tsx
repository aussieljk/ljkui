import React from 'react';
import { Accordion } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Layout', layout: 'padded' } as const;

export const examples = {
  /** The canonical usage — was `demos/accordion.demo.tsx` before demos folded into examples. */
  Overview() {
    return (
      <Accordion.Root type="single" defaultValue={['item-1']} className="w-full max-w-125">
        <div className="flex flex-col gap-4">
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
            <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="item-2">
            <Accordion.Trigger>Can it open multiple items?</Accordion.Trigger>
            <Accordion.Content>Yes. Set type to multiple to allow several open panels at once.</Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="item-3">
            <Accordion.Trigger>Can it be animated?</Accordion.Trigger>
            <Accordion.Content>Yes! Panels animate open and closed by default.</Accordion.Content>
          </Accordion.Item>
        </div>
      </Accordion.Root>
    );
  },

  Single() {
    const args = {
      defaultValue: ['item-1'],
      type: 'single' as const,
    };
    return (
      <div>
        <Accordion.Root
          // collapsible
          style={{ width: 600 }}
          {...args}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Accordion.Item value="item-1">
              <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
              <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value="item-2">
              <Accordion.Trigger>Is it unstyled?</Accordion.Trigger>
              <Accordion.Content>
                Yes. It's unstyled by default, giving you freedom over the look and feel.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value="item-3">
              <Accordion.Trigger>Can it be animated?</Accordion.Trigger>
              <Accordion.Content>Yes! You can animate the Accordion with CSS or JavaScript.</Accordion.Content>
            </Accordion.Item>
          </div>
        </Accordion.Root>
      </div>
    );
  },

  Multiple() {
    const args = {
      defaultValue: ['item-1', 'item-2'],
      type: 'multiple' as const,
    };
    return (
      <div>
        <Accordion.Root style={{ width: 600 }} {...args}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Accordion.Item value="item-1">
              <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
              <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value="item-2">
              <Accordion.Trigger>Is it unstyled?</Accordion.Trigger>
              <Accordion.Content>
                Yes. It's unstyled by default, giving you freedom over the look and feel.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value="item-3">
              <Accordion.Trigger>Can it be animated?</Accordion.Trigger>
              <Accordion.Content>Yes! You can animate the Accordion with CSS or JavaScript.</Accordion.Content>
            </Accordion.Item>
          </div>
        </Accordion.Root>
      </div>
    );
  },

  'Hidden Until Found'() {
    const args = {
      hiddenUntilFound: true,
    };
    return (
      <div>
        <p style={{ marginBottom: 'var(--space-4)', maxWidth: 600, color: 'var(--gray-900)' }}>
          Use your browser's find feature (Ctrl/Cmd + F) to search for "secret keyword" - the panel will automatically
          expand when found.
        </p>
        <Accordion.Root
          style={{ width: 600, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
          {...args}
        >
          <Accordion.Item value="item-1">
            <Accordion.Trigger>First section</Accordion.Trigger>
            <Accordion.Content>This is some visible content in the first section.</Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="item-2">
            <Accordion.Trigger>Second section (contains hidden text)</Accordion.Trigger>
            <Accordion.Content>
              This section contains a secret keyword that you can find using browser search.
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="item-3">
            <Accordion.Trigger>Third section</Accordion.Trigger>
            <Accordion.Content>More content in the third section.</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    );
  },
};
