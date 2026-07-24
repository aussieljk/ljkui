import * as React from 'react';

/**
 * Every `examples/*.examples.tsx` in the frosted-ui package becomes an addressable gallery, keyed
 * by its kebab-case base name (`button.examples.tsx` -> `button`). These modules are the variant
 * showcases the component library has always had (they were react-cosmos fixtures until the docs
 * site replaced cosmos) — one record of named examples per component.
 *
 * Loaded lazily and never eagerly: some are thousands of lines, and a page only ever needs its own.
 */
const modules = import.meta.glob('../../../frosted-ui/examples/*.examples.tsx');

/** Fixtures wrote examples either way — `Name() { … }` (needed for hooks) or `Name: <X />`. */
export type Example = React.ReactElement | React.ComponentType;
export type ExampleRecord = Record<string, Example>;

function nameFromPath(path: string): string {
  return path.split('/').pop()!.replace('.examples.tsx', '');
}

export const exampleModules: Record<string, () => Promise<{ examples: ExampleRecord }>> = {};

for (const [path, load] of Object.entries(modules)) {
  exampleModules[nameFromPath(path)] = load as () => Promise<{ examples: ExampleRecord }>;
}

export const exampleNames = Object.keys(exampleModules).sort();
