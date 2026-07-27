import * as React from 'react';

// Every `demos/*.demo.tsx` in the ljkui package becomes an addressable demo, keyed by its
// kebab-case base name (`button.demo.tsx` -> `button`). Components load lazily; sources are eager
// so `<Demo>` can show the copy-paste snippet without a second round-trip. `import.meta.glob` keeps
// this list in lock-step with the package — a new demo file is registered with no edit here.
const componentModules = import.meta.glob('../../../ljkui/demos/*.demo.tsx');
const sourceModules = import.meta.glob('../../../ljkui/demos/*.demo.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function nameFromPath(path: string): string {
  return path.split('/').pop()!.replace('.demo.tsx', '');
}

export type DemoEntry = {
  Component: React.LazyExoticComponent<React.ComponentType>;
  source: string;
};

export const demos: Record<string, DemoEntry> = {};

for (const [path, load] of Object.entries(componentModules)) {
  demos[nameFromPath(path)] = {
    Component: React.lazy(load as () => Promise<{ default: React.ComponentType }>),
    source: sourceModules[path] ?? '',
  };
}
