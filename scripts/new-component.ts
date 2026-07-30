#!/usr/bin/env bun
// Scaffold a new ljkui component and wire it into every place the repo
// expects: component files, the components barrel, the CSS aggregate, and a usage demo.
// Its Storybook page is generated from examples/*.examples.tsx, so none is authored here.
//
// Usage:
//   bun run new:component <kebab-name> [--namespace] [--no-docs]
//
//   --namespace  namespace-style component (<Name>.Root / <Name>.Item, `export * as`)
//   --no-docs    skip the usage demo in packages/ljkui/demos

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const UI = join(ROOT, 'packages/ljkui');

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const name = args.find((a) => !a.startsWith('--'));
const namespace = flags.has('--namespace');
const withDocs = !flags.has('--no-docs');

if (!name || !/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name)) {
  console.error('Usage: bun run new:component <kebab-name> [--namespace] [--no-docs]');
  process.exit(1);
}

const pascal = name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
const camel = pascal[0].toLowerCase() + pascal.slice(1);
const title = pascal.replace(/([a-z])([A-Z])/g, '$1 $2');

const componentDir = join(UI, 'src/components', name);
if (existsSync(componentDir)) {
  console.error(`${componentDir} already exists`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// helpers

function edit(file: string, transform: (src: string) => string | null, description: string) {
  const src = readFileSync(file, 'utf8');
  const next = transform(src);
  if (next === null) {
    console.warn(`! could not update ${file} — ${description} must be added by hand`);
    return;
  }
  writeFileSync(file, next);
  console.log(`~ ${file.replace(ROOT, '')}`);
}

function create(file: string, content: string) {
  writeFileSync(file, content);
  console.log(`+ ${file.replace(ROOT, '')}`);
}

/** Insert `line` after the last line matching `pattern`, or return null. */
function insertAfterLast(src: string, pattern: RegExp, line: string): string | null {
  const lines = src.split('\n');
  const idx = lines.findLastIndex((l) => pattern.test(l));
  if (idx === -1) return null;
  lines.splice(idx + 1, 0, line);
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// component files

mkdirSync(componentDir, { recursive: true });

create(
  join(componentDir, `${name}.props.ts`),
  `import type { PropDef } from '../../helpers';

const sizes = ['1', '2'] as const;

const ${camel}PropDefs = {
  /**
   * The size of the ${title.toLowerCase()}.
   * @default '1'
   */
  size: { type: 'enum', values: sizes, default: '1' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export { ${camel}PropDefs };
`,
);

create(
  join(componentDir, `${name}.tsx`),
  namespace
    ? `'use client';

import classNames from 'classnames';
import * as React from 'react';

import type { GetPropDefTypes } from '../../helpers';
import { ${camel}PropDefs } from './${name}.props';

type ${pascal}RootOwnProps = GetPropDefTypes<typeof ${camel}PropDefs>;
interface ${pascal}RootProps extends React.ComponentPropsWithoutRef<'div'>, ${pascal}RootOwnProps {}

/**
 * TODO: describe the ${title} component.
 *
 * @example
 * <${pascal}.Root>
 *   <${pascal}.Item>Item</${pascal}.Item>
 * </${pascal}.Root>
 */
const ${pascal}Root = (props: ${pascal}RootProps) => {
  const { className, size = ${camel}PropDefs.size.default, ...rootProps } = props;
  return <div {...rootProps} className={classNames('fui-${pascal}Root', className, \`fui-r-size-\${size}\`)} />;
};
${pascal}Root.displayName = '${pascal}Root';

interface ${pascal}ItemProps extends React.ComponentPropsWithoutRef<'div'> {}

const ${pascal}Item = (props: ${pascal}ItemProps) => {
  const { className, ...itemProps } = props;
  return <div {...itemProps} className={classNames('fui-${pascal}Item', className)} />;
};
${pascal}Item.displayName = '${pascal}Item';

export { ${pascal}Item as Item, ${pascal}Root as Root };
export type { ${pascal}ItemProps as ItemProps, ${pascal}RootProps as RootProps };
`
    : `import classNames from 'classnames';
import * as React from 'react';

import type { GetPropDefTypes } from '../../helpers';
import { ${camel}PropDefs } from './${name}.props';

type ${pascal}OwnProps = GetPropDefTypes<typeof ${camel}PropDefs>;
interface ${pascal}Props extends React.ComponentPropsWithoutRef<'div'>, ${pascal}OwnProps {}

/**
 * TODO: describe the ${title} component.
 *
 * @example
 * <${pascal} size="2" />
 */
const ${pascal} = (props: ${pascal}Props) => {
  const { className, size = ${camel}PropDefs.size.default, ...rootProps } = props;
  return <div {...rootProps} className={classNames('fui-${pascal}', className, \`fui-r-size-\${size}\`)} />;
};
${pascal}.displayName = '${pascal}';

export { ${pascal} };
export type { ${pascal}Props };
`,
);

create(
  join(componentDir, `${name}.css`),
  `.fui-${pascal}${namespace ? 'Root' : ''} {
  /* TODO: styles */
}
`,
);

// Storybook pages are generated from `examples/*.examples.tsx` by generate-storybook.ts, and
// the prop table from `*.props.ts` via gen-props.ts — a new component needs no page authored here.

create(
  join(componentDir, 'index.ts'),
  `${namespace ? `export * as ${pascal} from './${name}';` : `export * from './${name}';`}
export * from './${name}.props';
`,
);

// ---------------------------------------------------------------------------
// wiring: barrel + CSS aggregate

edit(
  join(UI, 'src/components/index.ts'),
  (src) => {
    const line = `export * from './${name}';`;
    // Land at the end of the COMPONENTS section, just before the UTILITIES banner.
    if (src.includes('\n// UTILITIES')) return src.replace('\n// UTILITIES', `${line}\n\n// UTILITIES`);
    return `${src.trimEnd()}\n${line}\n`;
  },
  'barrel export',
);

edit(
  join(UI, 'src/styles/index.css'),
  (src) => insertAfterLast(src, /^@import '\.\.\/components\/.*';$/, `@import '../components/${name}/${name}.css';`),
  'CSS @import',
);

// ---------------------------------------------------------------------------
// usage demo (copy-pasteable source in packages/ljkui/demos, rendered by the docs page)

if (withDocs) {
  create(
    join(UI, 'demos', `${name}.demo.tsx`),
    namespace
      ? `import React from 'react';
import { ${pascal} } from 'ljkui';

export default function ${pascal}Demo() {
  return (
    <${pascal}.Root>
      <${pascal}.Item>Item</${pascal}.Item>
    </${pascal}.Root>
  );
}
`
      : `import React from 'react';
import { ${pascal} } from 'ljkui';

export default function ${pascal}Demo() {
  return <${pascal} />;
}
`,
  );
}

console.log(`
Done. Next steps:
  1. Implement ${pascal} in packages/ljkui/src/components/${name}/${name}.tsx (+ its .css and .props.ts)
  2. Flesh out packages/docs/content/docs/components/${name}.mdx${withDocs ? ' and the demo' : ' (demo skipped — rerun without --no-docs or add one by hand)'}
  3. Run it: bun run dev
`);
