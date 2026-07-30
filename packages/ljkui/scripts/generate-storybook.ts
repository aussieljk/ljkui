import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const examplesDir = join(import.meta.dirname, '..', 'examples');
const storiesDir = join(import.meta.dirname, '..', 'stories');
const outputPath = join(storiesDir, 'examples.stories.tsx');

const componentTitle = (slug: string) =>
  slug
    .split('-')
    .map((part) => {
      if (part === 'otp') return 'OTP';
      return part[0]?.toUpperCase() + part.slice(1);
    })
    .join(' ');

const exportName = (slug: string) =>
  slug
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join('')
    .replace(/^[^a-zA-Z_$]+/, '') || 'Example';

const files = readdirSync(examplesDir)
  .filter((file) => file.endsWith('.examples.tsx'))
  .sort();

const imports = files
  .map((file, index) => {
    const slug = basename(file, '.examples.tsx');
    return `import { examples as ${exportName(slug)}Examples } from '../examples/${slug}.examples';`;
  })
  .join('\n');

const registry = files
  .map((file) => {
    const slug = basename(file, '.examples.tsx');
    return `  { title: '${componentTitle(slug)}', examples: ${exportName(slug)}Examples },`;
  })
  .join('\n');

const storyNameCounts = new Map<string, number>();

function uniqueStoryName(name: string) {
  const count = storyNameCounts.get(name) ?? 0;
  storyNameCounts.set(name, count + 1);
  return count === 0 ? name : `${name}${count + 1}`;
}

const exampleNames = (file: string) => {
  const source = readFileSync(join(examplesDir, file), 'utf8');
  let names = Array.from(
    source.matchAll(/^\s{2}(?:'([^']+)'|"([^"]+)"|([A-Za-z_$][\w$]*))\s*(?:\(|:)/gm),
    (match) => match[1] ?? match[2] ?? match[3],
  );
  if (names.length === 0 && source.includes('export const examples = {')) {
    names = Array.from(
      source.matchAll(/export const examples = \{\s*(?:'([^']+)'|"([^"]+)"|([A-Za-z_$][\w$]*))\s*:/gm),
      (match) => match[1] ?? match[2] ?? match[3],
    );
  }
  if (names.length === 0) {
    throw new Error(`No examples found in ${file}`);
  }
  return names;
};

const storyExports = files
  .flatMap((file) => {
    const slug = basename(file, '.examples.tsx');
    const component = componentTitle(slug);
    return exampleNames(file).map((name) => {
      const storyName = uniqueStoryName(`${exportName(slug)}${exportName(name)}`);
      return `export const ${storyName}: Story = {
  name: '${component} / ${name.replaceAll("'", "\\'")}',
  render: () => <StoryFrame title="${component}" name={'${name.replaceAll("'", "\\'")}'} render={() => renderExample(${exportName(slug)}Examples['${name.replaceAll("'", "\\'")}'])} />,
  parameters: {
    docs: {
      description: {
        story: '${component} example from packages/ljkui/examples/${slug}.examples.tsx.',
      },
    },
  },
};`;
    });
  })
  .join('\n\n');

const content = `import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Theme, Typography } from 'ljkui';
${imports}

type ExampleValue = React.ReactNode | (() => React.ReactNode);
type ExampleMap = Record<string, ExampleValue>;

const renderExample = (example: ExampleValue) => (typeof example === 'function' ? example() : example);

const groups: Array<{ title: string; examples: ExampleMap }> = [
${registry}
];

const StoryFrame = ({ title, name, render }: { title: string; name: string; render: () => React.ReactNode }) => (
  <Theme accentColor="indigo" grayColor="slate" radius="medium" scaling="100%" hasBackground>
    <main className="ljkui-story-frame">
      <header className="ljkui-story-header">
        <Typography.Text size="2" color="gray">
          {title}
        </Typography.Text>
        <Typography.Heading as="h1" size="6">
          {name}
        </Typography.Heading>
      </header>
      <section className="ljkui-story-canvas">{render()}</section>
    </main>
  </Theme>
);

const meta = {
  title: 'Examples/All ljkui Components',
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Gallery: Story = {
  name: 'Gallery',
  render: () => (
    <Theme accentColor="indigo" grayColor="slate" radius="medium" scaling="100%" hasBackground>
      <main className="ljkui-gallery">
        <header className="ljkui-gallery-hero">
          <Typography.Text size="2" color="gray">
            ljkui Storybook
          </Typography.Text>
          <Typography.Heading as="h1" size="8">
            Component examples
          </Typography.Heading>
          <Typography.Text size="4" color="gray">
            A complete, generated gallery of the forked Whop examples updated to render through the ljkui package,
            naming, theme tokens, and current component exports.
          </Typography.Text>
        </header>
        <div className="ljkui-gallery-grid">
          {groups.map((group) => (
            <section className="ljkui-gallery-group" key={group.title}>
              <Typography.Heading as="h2" size="5">
                {group.title}
              </Typography.Heading>
              <div className="ljkui-gallery-examples">
                {Object.entries(group.examples).map(([name, render]) => (
                  <article className="ljkui-gallery-card" key={name}>
                    <Typography.Text size="2" weight="medium">
                      {name}
                    </Typography.Text>
                    <div className="ljkui-gallery-card-canvas">{renderExample(render)}</div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </Theme>
  ),
};

${storyExports}

export const Components: Story = {
  name: 'Component browser',
  render: () => (
    <Theme accentColor="indigo" grayColor="slate" radius="medium" scaling="100%" hasBackground>
      <main className="ljkui-component-index">
        {groups.map((group) => (
          <section key={group.title}>
            <Typography.Heading as="h2" size="5">
              {group.title}
            </Typography.Heading>
            <div>
              {Object.entries(group.examples).map(([name, render]) => (
                <StoryFrame key={name} title={group.title} name={name} render={() => renderExample(render)} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </Theme>
  ),
};
`;

mkdirSync(storiesDir, { recursive: true });
writeFileSync(outputPath, content);
