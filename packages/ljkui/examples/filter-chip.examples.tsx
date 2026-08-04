import FilterChipOverview from './demos/filter-chip.demo';
import React from 'react';
import { Button, FilterChip, Typography, filterChipPropDefs } from 'ljkui';

const ExampleIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 8C3 6 5.70833 3 9.5 3C13.2917 3 16 6 16 8M16 8H13M16 8V8C16.5523 8 17 7.55228 17 7V4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 12C17 14 14.2917 17 10.5 17C6.70833 17 4 14 4 12M4 12H7M4 12V12C3.44772 12 3 12.4477 3 13V16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/filter-chip.demo.tsx` before demos folded into examples. */
  Overview: FilterChipOverview,

  Default() {
    const args = { children: null, size: filterChipPropDefs.size.default };
    return (
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexDirection: 'row' }}>
        <FilterChip defaultChecked {...args}>
          <ExampleIcon size={16} />
          Default
        </FilterChip>
        <FilterChip defaultChecked={true} disabled {...args}>
          <ExampleIcon size={16} />
          Disabled checked
        </FilterChip>
        <FilterChip defaultChecked={false} disabled {...args}>
          <ExampleIcon size={16} />
          Disabled unchecked
        </FilterChip>
      </div>
    );
  },

  'Read Only'() {
    const args = { children: null };
    const activeFilters = {
      inStock: true,
      onSale: false,
      freeShipping: true,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 400 }}>
        <Typography.Text>
          The <Typography.Code>readOnly</Typography.Code> prop prevents users from toggling a filter chip while still
          showing its current state. Unlike <Typography.Code>disabled</Typography.Code>, read-only chips remain
          focusable and their values are submitted with forms.
        </Typography.Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <Typography.Text size="2" weight="medium">
            Applied Filters (from saved search)
          </Typography.Text>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <FilterChip {...args} checked={activeFilters.inStock} readOnly>
              In Stock
            </FilterChip>
            <FilterChip {...args} checked={activeFilters.onSale} readOnly>
              On Sale
            </FilterChip>
            <FilterChip {...args} checked={activeFilters.freeShipping} readOnly>
              Free Shipping
            </FilterChip>
          </div>
        </div>
      </div>
    );
  },

  'Input Ref'() {
    const args = { children: null };
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [info, setInfo] = React.useState<string>('Click a button to inspect the input');

    const focusInput = () => {
      inputRef.current?.focus();
      setInfo('Input focused programmatically');
    };

    const checkState = () => {
      const input = inputRef.current;
      if (input) {
        const isChecked = input.checked;
        const name = input.name;
        setInfo(`Name: "${name}", Checked: ${isChecked}`);
      }
    };

    const toggleChecked = () => {
      const input = inputRef.current;
      if (input) {
        input.click();
        setInfo(`Toggled via native click. New state: ${!input.checked}`);
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 400 }}>
        <Typography.Text>
          The <Typography.Code>inputRef</Typography.Code> prop provides direct access to the hidden native{' '}
          <Typography.Code>&lt;input&gt;</Typography.Code> element. This is useful for programmatic focus, form
          validation, or integrating with third-party libraries.
        </Typography.Text>
        <FilterChip {...args} inputRef={inputRef} name="featured" defaultChecked>
          <ExampleIcon size={16} />
          Featured Items
        </FilterChip>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <Button size="1" variant="soft" onClick={focusInput}>
            Focus Input
          </Button>
          <Button size="1" variant="soft" onClick={checkState}>
            Check State
          </Button>
          <Button size="1" variant="soft" onClick={toggleChecked}>
            Toggle via Ref
          </Button>
        </div>
        <Typography.Code style={{ padding: 'var(--space-2)', display: 'block' }}>{info}</Typography.Code>
      </div>
    );
  },

  'Form with value & uncheckedValue'() {
    const args = { children: null };
    const [formData, setFormData] = React.useState<Record<string, FormDataEntryValue>>({});
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.currentTarget).entries());
      setFormData(data);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 500 }}>
        <Typography.Text>
          Use <Typography.Code>value</Typography.Code> and <Typography.Code>uncheckedValue</Typography.Code> props to
          customize what gets submitted with the form. By default, checked chips submit{' '}
          <Typography.Code>"on"</Typography.Code> and unchecked chips submit nothing.
        </Typography.Text>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Typography.Text size="2" weight="medium">
            Product Filters
          </Typography.Text>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <FilterChip {...args} name="availability" defaultChecked value="in-stock" uncheckedValue="all">
              In Stock
            </FilterChip>
            <FilterChip {...args} name="shipping" value="free" uncheckedValue="any">
              Free Shipping
            </FilterChip>
            <FilterChip {...args} name="discount" defaultChecked value="on-sale" uncheckedValue="no-filter">
              On Sale
            </FilterChip>
          </div>
          <Button variant="solid" type="submit" style={{ alignSelf: 'flex-start', marginTop: 'var(--space-2)' }}>
            Apply Filters
          </Button>
        </form>
        <div>
          <Typography.Text size="2" weight="medium">
            Form Data:
          </Typography.Text>
          <Typography.Code
            style={{ display: 'block', marginTop: 'var(--space-2)', whiteSpace: 'pre', padding: 'var(--space-2)' }}
          >
            {JSON.stringify(formData, null, 2)}
          </Typography.Code>
        </div>
      </div>
    );
  },
};
