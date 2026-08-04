import React from 'react';
import { DataTable, Link, Separator, Typography, dataTableRootPropDefs, Badge } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Data presentation', layout: 'fullscreen' } as const;

export const examples = {
  /** The canonical usage — was `demos/data-table.demo.tsx` before demos folded into examples. */
  Overview() {
    return (
      <DataTable.Root>
        <DataTable.Item align="center">
          <DataTable.Label>Status</DataTable.Label>
          <DataTable.Value>
            <Badge color="success">Active</Badge>
          </DataTable.Value>
        </DataTable.Item>
        <DataTable.Item>
          <DataTable.Label>ID</DataTable.Label>
          <DataTable.Value>
            <Typography.Code variant="ghost">usr_4f9a2c</Typography.Code>
          </DataTable.Value>
        </DataTable.Item>
        <DataTable.Item>
          <DataTable.Label>Name</DataTable.Label>
          <DataTable.Value>Ada Lovelace</DataTable.Value>
        </DataTable.Item>
        <DataTable.Item>
          <DataTable.Label>Email</DataTable.Label>
          <DataTable.Value>
            <Link href="mailto:ada@example.com">ada@example.com</Link>
          </DataTable.Value>
        </DataTable.Item>
      </DataTable.Root>
    );
  },

  Size() {
    const args = {
      size: dataTableRootPropDefs.size.default,
      orientation: dataTableRootPropDefs.orientation.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <DataTable.Root {...args} size="1">
          <DataTable.Item>
            <DataTable.Label>Name</DataTable.Label>
            <DataTable.Value>Artur Bień</DataTable.Value>
          </DataTable.Item>
          <DataTable.Item>
            <DataTable.Label>Email</DataTable.Label>
            <DataTable.Value>
              <Link href="mailto:artur@example.com">artur@example.com</Link>
            </DataTable.Value>
          </DataTable.Item>
          <DataTable.Item>
            <DataTable.Label>Company</DataTable.Label>
            <DataTable.Value>
              <Link target="_blank" href="https://example.com">
                Example Inc.
              </Link>
            </DataTable.Value>
          </DataTable.Item>
        </DataTable.Root>
        <DataTable.Root {...args} size="2">
          <DataTable.Item>
            <DataTable.Label>Name</DataTable.Label>
            <DataTable.Value>Artur Bień</DataTable.Value>
          </DataTable.Item>
          <DataTable.Item>
            <DataTable.Label>Email</DataTable.Label>
            <DataTable.Value>
              <Link href="mailto:artur@example.com">artur@example.com</Link>
            </DataTable.Value>
          </DataTable.Item>
          <DataTable.Item>
            <DataTable.Label>Company</DataTable.Label>
            <DataTable.Value>
              <Link target="_blank" href="https://example.com">
                Example Inc.
              </Link>
            </DataTable.Value>
          </DataTable.Item>
        </DataTable.Root>
        <DataTable.Root {...args} size="3">
          <DataTable.Item>
            <DataTable.Label>Name</DataTable.Label>
            <DataTable.Value>Artur Bień</DataTable.Value>
          </DataTable.Item>
          <DataTable.Item>
            <DataTable.Label>Email</DataTable.Label>
            <DataTable.Value>
              <Link href="mailto:artur@example.com">artur@example.com</Link>
            </DataTable.Value>
          </DataTable.Item>
          <DataTable.Item>
            <DataTable.Label>Company</DataTable.Label>
            <DataTable.Value>
              <Link target="_blank" href="https://example.com">
                Example Inc.
              </Link>
            </DataTable.Value>
          </DataTable.Item>
        </DataTable.Root>
      </div>
    );
  },

  Orientation() {
    const args = {
      size: dataTableRootPropDefs.size.default,
      orientation: dataTableRootPropDefs.orientation.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <div>
          <Typography.Heading size="3">Horizontal</Typography.Heading>
          <Separator orientation="horizontal" size="4" style={{ marginBottom: 16, marginTop: 16 }} />
          <DataTable.Root {...args} orientation={'horizontal'}>
            <DataTable.Item>
              <DataTable.Label>Name</DataTable.Label>
              <DataTable.Value>Artur Bień</DataTable.Value>
            </DataTable.Item>
            <DataTable.Item>
              <DataTable.Label>Email</DataTable.Label>
              <DataTable.Value>
                <Link href="mailto:artur@example.com">artur@example.com</Link>
              </DataTable.Value>
            </DataTable.Item>
            <DataTable.Item>
              <DataTable.Label>Company</DataTable.Label>
              <DataTable.Value>
                <Link target="_blank" href="https://example.com">
                  Example Inc.
                </Link>
              </DataTable.Value>
            </DataTable.Item>
          </DataTable.Root>
        </div>
        <div>
          <Typography.Heading size="3">Vertical</Typography.Heading>
          <Separator orientation="horizontal" size="4" style={{ marginBottom: 16, marginTop: 16 }} />
          <DataTable.Root {...args} orientation={'vertical'}>
            <DataTable.Item>
              <DataTable.Label>Name</DataTable.Label>
              <DataTable.Value>Artur Bień</DataTable.Value>
            </DataTable.Item>
            <DataTable.Item>
              <DataTable.Label>Email</DataTable.Label>
              <DataTable.Value>
                <Link href="mailto:artur@example.com">artur@example.com</Link>
              </DataTable.Value>
            </DataTable.Item>
            <DataTable.Item>
              <DataTable.Label>Company</DataTable.Label>
              <DataTable.Value>
                <Link target="_blank" href="https://example.com">
                  Example Inc.
                </Link>
              </DataTable.Value>
            </DataTable.Item>
          </DataTable.Root>
        </div>
      </div>
    );
  },

  Color() {
    const args = {
      size: dataTableRootPropDefs.size.default,
      orientation: dataTableRootPropDefs.orientation.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Typography.Text>
          Use the <Typography.Code>color</Typography.Code> prop on the{' '}
          <Typography.Code>{'<DataTable.Label />'}</Typography.Code> component to assign a specific color.
        </Typography.Text>
        <DataTable.Root {...args}>
          <DataTable.Item>
            <DataTable.Label color="indigo" style={{ minWidth: 40 }}>
              Color:
            </DataTable.Label>
            <DataTable.Value>Iris</DataTable.Value>
          </DataTable.Item>
          <DataTable.Item>
            <DataTable.Label color="cyan" style={{ minWidth: 40 }}>
              Color:
            </DataTable.Label>
            <DataTable.Value>Cyan</DataTable.Value>
          </DataTable.Item>
          <DataTable.Item>
            <DataTable.Label color="lime" style={{ minWidth: 40 }}>
              Color:
            </DataTable.Label>
            <DataTable.Value>Lime</DataTable.Value>
          </DataTable.Item>
          <DataTable.Item>
            <DataTable.Label color="rose" style={{ minWidth: 40 }}>
              Color:
            </DataTable.Label>
            <DataTable.Value>Crimson</DataTable.Value>
          </DataTable.Item>
        </DataTable.Root>
      </div>
    );
  },

  'High Contrast'() {
    const args = {
      size: dataTableRootPropDefs.size.default,
      orientation: dataTableRootPropDefs.orientation.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Typography.Text>
          Use the <Typography.Code>highContrast</Typography.Code> prop on the{' '}
          <Typography.Code>{'<DataTable.Label />'}</Typography.Code> component <br /> to increase color contrast with
          the background.
        </Typography.Text>
        <div style={{ display: 'flex', gap: 'var(--space-9)' }}>
          <DataTable.Root {...args}>
            <DataTable.Item>
              <DataTable.Label color="indigo">Name</DataTable.Label>
              <DataTable.Value>Iris</DataTable.Value>
            </DataTable.Item>
            <DataTable.Item>
              <DataTable.Label color="cyan">Name</DataTable.Label>
              <DataTable.Value>Cyan</DataTable.Value>
            </DataTable.Item>
            <DataTable.Item>
              <DataTable.Label color="lime">Name</DataTable.Label>
              <DataTable.Value>Lime</DataTable.Value>
            </DataTable.Item>
            <DataTable.Item>
              <DataTable.Label color="rose">Name</DataTable.Label>
              <DataTable.Value>Crimson</DataTable.Value>
            </DataTable.Item>
          </DataTable.Root>

          <DataTable.Root {...args}>
            <DataTable.Item>
              <DataTable.Label color="indigo" highContrast>
                Name
              </DataTable.Label>
              <DataTable.Value>Iris</DataTable.Value>
            </DataTable.Item>
            <DataTable.Item>
              <DataTable.Label color="cyan" highContrast>
                Name
              </DataTable.Label>
              <DataTable.Value>Cyan</DataTable.Value>
            </DataTable.Item>
            <DataTable.Item>
              <DataTable.Label color="lime" highContrast>
                Name
              </DataTable.Label>
              <DataTable.Value>Lime</DataTable.Value>
            </DataTable.Item>
            <DataTable.Item>
              <DataTable.Label color="rose" highContrast>
                Name
              </DataTable.Label>
              <DataTable.Value>Crimson</DataTable.Value>
            </DataTable.Item>
          </DataTable.Root>
        </div>
      </div>
    );
  },
};
