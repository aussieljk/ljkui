import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Demo } from './demo';
import { PropsTable } from './props-table';
import { AllExamples } from './all-examples';
import { Examples } from './examples';
import { ComponentCatalog } from './component-catalog';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Demo,
    PropsTable,
    AllExamples,
    Examples,
    ComponentCatalog,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
