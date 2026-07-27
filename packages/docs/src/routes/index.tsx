import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Check, Copy } from 'lucide-react';
import { baseOptions } from '@/lib/layout.shared';
import { gitConfig } from '@/lib/shared';
import { demos } from '@/demos/registry';
import { Showcase } from '@/components/showcase';

export const Route = createFileRoute('/')({
  component: Home,
});

const INSTALL = 'bun add ljkui';

function InstallCommand() {
  const [copied, setCopied] = React.useState(false);

  function copy() {
    void navigator.clipboard.writeText(INSTALL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-fd-border bg-fd-card py-2 pr-2 pl-4 font-mono text-sm">
      <span className="select-none text-fd-muted-foreground">$</span>
      <code className="text-fd-foreground">{INSTALL}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy install command'}
        className="rounded-md p-1.5 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}

function Home() {
  const count = Object.keys(demos).length;

  return (
    <HomeLayout {...baseOptions()}>
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:pt-10">
        <section className="docs-hero-collage" aria-label="ljkui component collection">
          <img
            src="/component-collage.png"
            alt="A collage of ljkui components including forms, navigation, feedback, controls and a calendar"
          />
          <div className="docs-hero-collage-fade" />
        </section>

        <section className="flex flex-col items-center text-center">
          <p className="docs-eyebrow">{count} production-ready building blocks</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Build interfaces that feel considered.</h1>
          <p className="mt-4 max-w-xl text-fd-muted-foreground sm:text-lg">
            ljkui is a themeable React component library built on{' '}
            <a href="https://base-ui.com" className="underline underline-offset-4 hover:text-fd-foreground">
              Base UI
            </a>
            . One theme, thoughtful defaults, and examples for every state.
          </p>

          <div className="mt-8">
            <InstallCommand />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/docs/$"
              params={{ _splat: 'components' }}
              className="rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground hover:opacity-90"
            >
              Explore components
            </Link>
            <a
              href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
              className="rounded-lg border border-fd-border px-4 py-2 text-sm font-medium hover:bg-fd-accent hover:text-fd-accent-foreground"
            >
              GitHub
            </a>
          </div>
        </section>

        <section className="mt-24">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-medium">Components</h2>
            <Link
              to="/docs/$"
              params={{ _splat: 'components/button' }}
              className="text-sm text-fd-muted-foreground hover:text-fd-foreground"
            >
              Browse the docs →
            </Link>
          </div>
          <Showcase />
        </section>
      </div>
    </HomeLayout>
  );
}
