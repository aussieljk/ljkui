import { Monitor, Moon, Sun } from 'lucide-react';
import React from 'react';
import { Button, ToggleGroupRadioGroup, Typography } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/toggle-group-radio-group.demo.tsx` before demos folded into examples. */
  Overview() {
    const [view, setView] = React.useState('day');

    return (
      <div className="flex flex-col items-center gap-3">
        <ToggleGroupRadioGroup.Root value={view} onValueChange={setView}>
          <ToggleGroupRadioGroup.Item value="day">Day</ToggleGroupRadioGroup.Item>
          <ToggleGroupRadioGroup.Item value="week">Week</ToggleGroupRadioGroup.Item>
          <ToggleGroupRadioGroup.Item value="month">Month</ToggleGroupRadioGroup.Item>
        </ToggleGroupRadioGroup.Root>
        <Typography.Text size="2" color="gray">
          Selected view: {view}
        </Typography.Text>
      </div>
    );
  },

  'Input Ref'() {
    const args = {};
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFocus = () => {
      inputRef.current?.focus();
    };

    const handleReportValidity = () => {
      const isValid = inputRef.current?.reportValidity();
      console.log('Validity:', isValid);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 400 }}>
        <Typography.Text>
          The <Typography.Code>inputRef</Typography.Code> prop provides access to the underlying hidden input element,
          enabling programmatic control for focus management, form validation, and integration with form libraries.
        </Typography.Text>

        <ToggleGroupRadioGroup.Root {...args} name="theme-preference" required inputRef={inputRef}>
          <ToggleGroupRadioGroup.Item value="system">
            <Monitor size={20} />
          </ToggleGroupRadioGroup.Item>
          <ToggleGroupRadioGroup.Item value="light-mode">
            <Sun size={20} />
          </ToggleGroupRadioGroup.Item>
          <ToggleGroupRadioGroup.Item value="dark-mode">
            <Moon size={20} />
          </ToggleGroupRadioGroup.Item>
        </ToggleGroupRadioGroup.Root>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button size="1" variant="soft" onClick={handleFocus}>
            Focus Input
          </Button>
          <Button size="1" variant="soft" onClick={handleReportValidity}>
            Check Validity
          </Button>
        </div>

        <Typography.Text size="1" color="gray">
          Click &quot;Check Validity&quot; without selecting an option to see the browser&apos;s native validation
          message in the console (the group has <Typography.Code>required</Typography.Code> set).
        </Typography.Text>
      </div>
    );
  },

  Controlled() {
    const [theme, setTheme] = React.useState('system');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 400 }}>
        <Typography.Text>
          Use <Typography.Code>value</Typography.Code> and <Typography.Code>onValueChange</Typography.Code> for
          controlled state.
        </Typography.Text>

        <ToggleGroupRadioGroup.Root value={theme} onValueChange={setTheme}>
          <ToggleGroupRadioGroup.Item value="system">
            <Monitor size={20} />
          </ToggleGroupRadioGroup.Item>
          <ToggleGroupRadioGroup.Item value="light">
            <Sun size={20} />
          </ToggleGroupRadioGroup.Item>
          <ToggleGroupRadioGroup.Item value="dark">
            <Moon size={20} />
          </ToggleGroupRadioGroup.Item>
        </ToggleGroupRadioGroup.Root>

        <Typography.Text size="2">
          Selected: <Typography.Code>{theme}</Typography.Code>
        </Typography.Text>
      </div>
    );
  },

  'Type-Safe Values'() {
    type Theme = 'system' | 'light' | 'dark';
    const [theme, setTheme] = React.useState<Theme>('system');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 400 }}>
        <Typography.Text>
          Pass a string union type to get autocomplete and catch typos at compile time. Without an explicit type
          parameter, the value type is inferred from props like <Typography.Code>value</Typography.Code> and{' '}
          <Typography.Code>onValueChange</Typography.Code>.
        </Typography.Text>

        <ToggleGroupRadioGroup.Root<Theme> value={theme} onValueChange={setTheme}>
          <ToggleGroupRadioGroup.Item value="system">
            <Monitor size={20} />
          </ToggleGroupRadioGroup.Item>
          <ToggleGroupRadioGroup.Item value="light">
            <Sun size={20} />
          </ToggleGroupRadioGroup.Item>
          <ToggleGroupRadioGroup.Item value="dark">
            <Moon size={20} />
          </ToggleGroupRadioGroup.Item>
        </ToggleGroupRadioGroup.Root>

        <Typography.Text size="2">
          Selected: <Typography.Code>{theme}</Typography.Code>
        </Typography.Text>

        <Typography.Text size="1" color="gray">
          Try changing a value to <Typography.Code>&quot;sytsem&quot;</Typography.Code> — TypeScript will catch the
          typo!
        </Typography.Text>
      </div>
    );
  },
};
