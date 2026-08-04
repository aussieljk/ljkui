declare module '*.mdx' {
  import type { ComponentType } from 'react';

  /** Set by remark-mdx-frontmatter (see the `name` option in vite.config.ts). */
  export const frontmatter: { title?: string; description?: string };
  const MDXContent: ComponentType<{ components?: Record<string, unknown> }>;
  export default MDXContent;
}
