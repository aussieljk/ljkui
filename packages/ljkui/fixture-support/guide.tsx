import { MDXProvider } from '@mdx-js/react';
import * as React from 'react';
import { Typography } from 'ljkui';
import { mdxComponents } from './mdx-components';

/*
 * The page shell every guide renders in. `guides/*.mdx` stays the single source of truth
 * for the prose — it is compiled by @mdx-js/rollup and rendered here, rather than being
 * ported into another format.
 */

export interface Frontmatter {
  title?: string;
  description?: string;
}

const pageStyle: React.CSSProperties = {
  maxWidth: '48rem',
  margin: '0 auto',
  padding: 'var(--space-6) var(--space-5)',
};

export function Guide({ content: Content, frontmatter }: { content: React.ComponentType; frontmatter?: Frontmatter }) {
  return (
    <MDXProvider components={mdxComponents}>
      <article style={pageStyle}>
        {frontmatter?.title ? (
          <Typography.Heading size="8" render={<h1 style={{ marginBottom: 'var(--space-2)' }} />}>
            {frontmatter.title}
          </Typography.Heading>
        ) : null}
        {frontmatter?.description ? (
          <Typography.Text size="4" color="gray" render={<p style={{ marginBottom: 'var(--space-6)' }} />}>
            {frontmatter.description}
          </Typography.Text>
        ) : null}
        <Content />
      </article>
    </MDXProvider>
  );
}
