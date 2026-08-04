import type { MDXComponents } from 'mdx/types';
import { Info, TriangleAlert } from 'lucide-react';
import * as React from 'react';
import { Alert, Card, Table, Typography } from 'ljkui';
import * as ljkui from 'ljkui';
import { PropsTable } from './reference';

/*
 * The component map every guide MDX renders against.
 *
 * The old Storybook pipeline ported guides by *stripping* `<Demo>` / `<PropsTable>` and
 * downgrading `<Callout>` to a blockquote, because MDX could not run in a generated CSF
 * module. Here the MDX is compiled for real (@mdx-js/rollup, see vite.config.ts), so the
 * whole library is in scope and those three tags do what they say.
 */

/** Every demo module, so `<Demo name="layout" />` resolves without a static import each. */
const demos = import.meta.glob<{ default: React.ComponentType }>('../demos/*.demo.tsx');

export function Demo({ name }: { name: string }) {
  // Memoized before the missing-demo branch: a hook after an early return is a hook that
  // does not run on every render path.
  const Lazy = React.useMemo(() => {
    const load = demos[`../demos/${name}.demo.tsx`];
    return load ? React.lazy(load) : null;
  }, [name]);

  if (!Lazy) {
    return (
      <Typography.Text size="2" color="red">
        No demo named <Typography.Code size="2">{name}</Typography.Code>.
      </Typography.Text>
    );
  }

  return (
    <Card size="2" style={{ margin: 'var(--space-4) 0' }}>
      <React.Suspense fallback={null}>
        <Lazy />
      </React.Suspense>
    </Card>
  );
}

/**
 * `<Callout type="warn">` came from Fumadocs — ljkui has no such component, so it is
 * rebuilt here on `Alert`. The Storybook pipeline downgraded these to blockquotes; the
 * guides read as intended again.
 */
export function Callout({ type = 'info', children }: { type?: 'info' | 'warn'; children: React.ReactNode }) {
  return (
    <Alert.Root color={type === 'warn' ? 'warning' : 'info'} style={{ margin: 'var(--space-4) 0' }}>
      <Alert.Icon>{type === 'warn' ? <TriangleAlert size={16} /> : <Info size={16} />}</Alert.Icon>
      <Alert.Description>{children}</Alert.Description>
    </Alert.Root>
  );
}

const preStyle: React.CSSProperties = {
  background: 'var(--gray-50)',
  border: '1px solid var(--gray-400)',
  borderRadius: 'var(--radius-3)',
  padding: 'var(--space-3)',
  overflowX: 'auto',
  margin: 'var(--space-3) 0',
  fontSize: '0.8125rem',
  lineHeight: 1.6,
};

/**
 * Markdown element overrides. Headings and text go through the library's own typography
 * so a guide reads in the same type as the components it documents — which also matters
 * because styles.css flattens bare `h1..h6` to `font-size: inherit`.
 *
 * Each override takes only `children` and renders the ljkui component through its `render`
 * prop, keeping the semantic element. The incoming HTML attributes are deliberately not
 * spread through: the typography components carry their own `color` prop with a token
 * union, which an untyped HTML `color` attribute would collide with.
 */
type Content = { children?: React.ReactNode };

/** Vertical rhythm, applied on the wrapper rather than by props the components don't have. */
const spaced = (top: string, bottom: string): React.CSSProperties => ({
  marginTop: top,
  marginBottom: bottom,
});

/**
 * The barrel's *component* exports only. It also exports palette arrays, type guards and
 * the `*PropDefs` objects; those are not components, and spreading them wholesale both
 * breaks the `MDXComponents` index signature and puts junk in every guide's JSX scope.
 * A PascalCase name holding a function or a namespace object (`Table`, `Alert`) is the
 * shape that can actually be rendered.
 */
const componentExports = Object.fromEntries(
  Object.entries(ljkui as Record<string, unknown>).filter(
    ([name, value]) =>
      /^[A-Z]/.test(name) &&
      (typeof value === 'function' || (typeof value === 'object' && value !== null && !Array.isArray(value))),
  ),
) as MDXComponents;

export const mdxComponents: MDXComponents = {
  h1: ({ children }: Content) => (
    <Typography.Heading size="8" render={<h1 style={spaced('0', 'var(--space-4)')} />}>
      {children}
    </Typography.Heading>
  ),
  h2: ({ children }: Content) => (
    <Typography.Heading size="6" render={<h2 style={spaced('var(--space-6)', 'var(--space-3)')} />}>
      {children}
    </Typography.Heading>
  ),
  h3: ({ children }: Content) => (
    <Typography.Heading size="4" render={<h3 style={spaced('var(--space-5)', 'var(--space-2)')} />}>
      {children}
    </Typography.Heading>
  ),
  h4: ({ children }: Content) => (
    <Typography.Heading size="3" render={<h4 style={spaced('var(--space-4)', 'var(--space-2)')} />}>
      {children}
    </Typography.Heading>
  ),
  p: ({ children }: Content) => (
    <Typography.Text size="3" render={<p style={spaced('0', 'var(--space-3)')} />}>
      {children}
    </Typography.Text>
  ),
  li: ({ children }: Content) => (
    <Typography.Text size="3" render={<li />}>
      {children}
    </Typography.Text>
  ),
  a: ({ children, href }: Content & { href?: string }) => (
    <ljkui.Link size="3" href={href}>
      {children}
    </ljkui.Link>
  ),
  code: ({ children }: Content) => <Typography.Code size="2">{children}</Typography.Code>,
  // A fenced block already contains a `code` child; don't nest the inline treatment twice.
  pre: ({ children }: Content) => <pre style={preStyle}>{children}</pre>,
  table: ({ children }: Content) => (
    <Table.Root size="1" variant="surface">
      {children}
    </Table.Root>
  ),
  thead: Table.Header,
  tbody: Table.Body,
  tr: Table.Row,
  th: Table.ColumnHeaderCell,
  td: Table.Cell,

  // The three custom tags the guides use.
  Demo,
  PropsTable,
  Callout,

  // Guides render live components inline (`<Text>`, `<Field>`, `<Theme>`, …). Putting the
  // barrel in scope is what lets the MDX stay unchanged from the Fumadocs original.
  ...componentExports,
};
