import { Copy as CopyIcon, Ellipsis, Eye, EyeOff, Link, Lock, Mail, Search as SearchIcon, X } from 'lucide-react';
import React from 'react';
import { Button, IconButton, Input, Typography, inputPropDefs } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls', layout: 'centered' } as const;

export const examples = {
  /** The canonical usage — was `demos/input.demo.tsx` before demos folded into examples. */
  Overview() {
    return (
      <div className="flex w-70 flex-col gap-3">
        <Input.Root>
          <Input.Slot>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Input.Slot>
          <Input.Control placeholder="Search the docs…" />
        </Input.Root>

        <Input.Root variant="soft" size="3">
          <Input.Control placeholder="Soft variant, size 3" />
        </Input.Root>
      </div>
    );
  },

  Size() {
    const args = {
      size: inputPropDefs.size.default,
      variant: inputPropDefs.variant.default,
      color: inputPropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Input.Root {...args} size="1">
            <Input.Slot>
              <SearchIcon size={12} />
            </Input.Slot>
            <Input.Control placeholder="Search the docs…" />
          </Input.Root>
          <Button size="1" variant={args.variant}>
            Search
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Input.Root {...args} size="2">
            <Input.Slot>
              <SearchIcon size={16} />
            </Input.Slot>
            <Input.Control placeholder="Search the docs…" />
            <Input.Slot>
              <IconButton color="gray" size="1" variant="ghost">
                <Ellipsis size={16} />
              </IconButton>
            </Input.Slot>
          </Input.Root>
          <Button size="2" variant={args.variant}>
            Search
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Input.Root {...args} size="3">
            <Input.Slot>
              <SearchIcon size={20} />
            </Input.Slot>
            <Input.Control placeholder="Search the docs…" />
            <Input.Slot style={{ paddingRight: 'var(--space-3)' }}>
              <IconButton color="gray" size="2" variant="ghost">
                <Ellipsis size={20} />
              </IconButton>
            </Input.Slot>
          </Input.Root>
          <Button size="3" variant={args.variant}>
            Search
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Input.Root {...args} size="4">
            <Input.Slot>
              <SearchIcon size={24} />
            </Input.Slot>
            <Input.Control placeholder="Search the docs…" />
            <Input.Slot style={{ paddingRight: 'var(--space-3)' }}>
              <IconButton color="gray" size="2" variant="ghost">
                <Ellipsis size={20} />
              </IconButton>
            </Input.Slot>
          </Input.Root>
          <Button size="4" variant={args.variant}>
            Search
          </Button>
        </div>
      </div>
    );
  },

  Variant() {
    const args = {
      size: inputPropDefs.size.default,
      variant: inputPropDefs.variant.default,
      color: inputPropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--space-5)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 400 }}>
          <Input.Control placeholder="Search the docs…" {...args} variant="surface" />
          <Input.Control placeholder="Search the docs…" {...args} variant="soft" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 400 }}>
          <Input.Control disabled placeholder="Search the docs…" {...args} variant="surface" />
          <Input.Control disabled placeholder="Search the docs…" {...args} variant="soft" />
        </div>
      </div>
    );
  },

  Color() {
    const args = {
      size: inputPropDefs.size.default,
      variant: inputPropDefs.variant.default,
      color: inputPropDefs.color.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 400 }}>
        <Input.Control {...args} placeholder="Search the docs…" color="indigo" />
        <Input.Control {...args} placeholder="Search the docs…" color="green" />
        <Input.Control {...args} placeholder="Search the docs…" color="red" />
      </div>
    );
  },

  'With Slot'() {
    const args = {
      size: inputPropDefs.size.default,
      variant: inputPropDefs.variant.default,
      color: inputPropDefs.color.default,
    };
    const [showPassword, setShowPassword] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: 320 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <Typography.Text size="2" weight="bold">
            Slot
          </Typography.Text>
          <Typography.Text size="1" color="gray">
            Use <Typography.Code size="1">Input.Slot</Typography.Code> to add icons, buttons, or text inside the input
            area.
          </Typography.Text>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <div>
            <Typography.Text size="1" color="gray" style={{ marginBottom: 'var(--space-1)', display: 'block' }}>
              Leading icon
            </Typography.Text>
            <Input.Root {...args}>
              <Input.Slot>
                <SearchIcon size={16} />
              </Input.Slot>
              <Input.Control placeholder="Search…" />
            </Input.Root>
          </div>

          <div>
            <Typography.Text size="1" color="gray" style={{ marginBottom: 'var(--space-1)', display: 'block' }}>
              Trailing icon
            </Typography.Text>
            <Input.Root {...args}>
              <Input.Control placeholder="Enter URL…" />
              <Input.Slot>
                <Link size={16} />
              </Input.Slot>
            </Input.Root>
          </div>

          <div>
            <Typography.Text size="1" color="gray" style={{ marginBottom: 'var(--space-1)', display: 'block' }}>
              Both slots
            </Typography.Text>
            <Input.Root {...args}>
              <Input.Slot>
                <Mail size={16} />
              </Input.Slot>
              <Input.Control placeholder="Email address" />
              <Input.Slot>@company.com</Input.Slot>
            </Input.Root>
          </div>

          <div>
            <Typography.Text size="1" color="gray" style={{ marginBottom: 'var(--space-1)', display: 'block' }}>
              With icon button (password toggle)
            </Typography.Text>
            <Input.Root {...args}>
              <Input.Slot>
                <Lock size={16} />
              </Input.Slot>
              <Input.Control type={showPassword ? 'text' : 'password'} placeholder="Password" defaultValue="secret" />
              <Input.Slot>
                <IconButton
                  size="1"
                  variant="ghost"
                  color="gray"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </IconButton>
              </Input.Slot>
            </Input.Root>
          </div>

          <div>
            <Typography.Text size="1" color="gray" style={{ marginBottom: 'var(--space-1)', display: 'block' }}>
              Clearable search
            </Typography.Text>
            <Input.Root {...args}>
              <Input.Slot>
                <SearchIcon size={16} />
              </Input.Slot>
              <Input.Control
                placeholder="Search…"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {searchValue && (
                <Input.Slot>
                  <IconButton
                    size="1"
                    variant="ghost"
                    color="gray"
                    onClick={() => setSearchValue('')}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </IconButton>
                </Input.Slot>
              )}
            </Input.Root>
          </div>

          <div>
            <Typography.Text size="1" color="gray" style={{ marginBottom: 'var(--space-1)', display: 'block' }}>
              With copy button
            </Typography.Text>
            <Input.Root {...args}>
              <Input.Control readOnly defaultValue="https://example.com/share/abc123" />
              <Input.Slot>
                <IconButton
                  size="1"
                  variant="ghost"
                  color="gray"
                  onClick={() => navigator.clipboard.writeText('https://example.com/share/abc123')}
                  aria-label="Copy to clipboard"
                >
                  <CopyIcon size={16} />
                </IconButton>
              </Input.Slot>
            </Input.Root>
          </div>

          <div>
            <Typography.Text size="1" color="gray" style={{ marginBottom: 'var(--space-1)', display: 'block' }}>
              Colored slot
            </Typography.Text>
            <Input.Root {...args} color="green">
              <Input.Slot color="green">$</Input.Slot>
              <Input.Control placeholder="Amount" />
              <Input.Slot>USD</Input.Slot>
            </Input.Root>
          </div>
        </div>
      </div>
    );
  },
};
