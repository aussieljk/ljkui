import * as React from 'react';
import { Table, Typography } from 'ljkui';
import { A11Y } from '../scripts/a11y-data';
import propsJson from '../src/generated/props.json';

/*
 * The per-component reference that used to be Storybook's Docs tab: the prop table
 * generated from `*.props.ts` (src/generated/props.json) plus the keyboard map and ARIA
 * notes from scripts/a11y-data.ts.
 *
 * uaight has no autodocs, so this renders as a fixture — `gen-fixtures.ts` appends a
 * `Reference` entry to every component's fixture module, which puts the docs one click
 * from the examples instead of behind a separate tab.
 */

interface PropEntry {
  type?: string;
  default?: string;
  description?: string;
  required?: boolean;
}

const PROPS = propsJson as Record<string, Record<string, PropEntry>>;

/** `HStack` → `h-stack`, `InputOTP` → `input-otp`. */
function kebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/** Props for a component named as it is written in JSX, or as a kebab slug. */
function propsFor(component: string): Record<string, PropEntry> | undefined {
  return PROPS[component] ?? PROPS[kebab(component)];
}

/**
 * The one piece of markdown the a11y data uses: `` `code` `` spans. The keyboard maps
 * and notes are authored with them, and rendering them as literal backticks reads badly.
 */
function inlineCode(text: string): React.ReactNode {
  return text.split(/(`[^`]+`)/g).map((part, index) =>
    part.startsWith('`') && part.endsWith('`') && part.length > 2 ? (
      <Typography.Code key={index} size="2">
        {part.slice(1, -1)}
      </Typography.Code>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    ),
  );
}

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
  maxWidth: '68rem',
  padding: 'var(--space-4)',
};

export function PropsTable({ component }: { component: string }) {
  const props = propsFor(component);

  if (!props || Object.keys(props).length === 0) {
    return (
      <Typography.Text size="2" color="gray">
        No prop definitions for <Typography.Code size="2">{component}</Typography.Code>.
      </Typography.Text>
    );
  }

  return (
    <Table.Root size="1" variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Prop</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Default</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.entries(props).map(([name, prop]) => (
          <Table.Row key={name}>
            <Table.RowHeaderCell>
              <Typography.Code size="2">{name}</Typography.Code>
              {prop.required ? (
                <Typography.Text size="1" color="red">
                  {' '}
                  *
                </Typography.Text>
              ) : null}
            </Table.RowHeaderCell>
            <Table.Cell>
              <Typography.Code size="1" color="gray">
                {prop.type ?? '—'}
              </Typography.Code>
            </Table.Cell>
            <Table.Cell>
              {prop.default === undefined ? (
                <Typography.Text size="2" color="gray">
                  —
                </Typography.Text>
              ) : (
                <Typography.Code size="1">{String(prop.default)}</Typography.Code>
              )}
            </Table.Cell>
            <Table.Cell>
              <Typography.Text size="2">{prop.description ?? ''}</Typography.Text>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

/** Prop table + keyboard map + ARIA notes for one component slug. */
export function ComponentReference({ slug }: { slug: string }) {
  const props = propsFor(slug);
  const a11y = A11Y[slug];

  return (
    <div style={sectionStyle}>
      <Typography.Heading size="4">Props</Typography.Heading>
      {props && Object.keys(props).length > 0 ? (
        <PropsTable component={slug} />
      ) : (
        <Typography.Text size="2" color="gray">
          This component has no <Typography.Code size="2">*.props.ts</Typography.Code> definitions.
        </Typography.Text>
      )}

      {a11y?.keyboard?.length ? (
        <>
          <Typography.Heading size="4">Keyboard</Typography.Heading>
          <Table.Root size="1" variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Key</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {a11y.keyboard.map(([key, action]) => (
                <Table.Row key={key}>
                  <Table.RowHeaderCell>{inlineCode(key)}</Table.RowHeaderCell>
                  <Table.Cell>
                    <Typography.Text size="2">{inlineCode(action)}</Typography.Text>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </>
      ) : null}

      {a11y?.notes?.length ? (
        <>
          <Typography.Heading size="4">Accessibility</Typography.Heading>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingLeft: '1.25rem' }}>
            {a11y.notes.map((note, index) => (
              <li key={index}>
                <Typography.Text size="2">{inlineCode(note)}</Typography.Text>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
