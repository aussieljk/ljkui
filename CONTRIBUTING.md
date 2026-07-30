# Contributing to ljkui

Thanks for helping out. This is a Bun + Turborepo monorepo; the library is `packages/ljkui`
and Storybook is the only site (deployed as a static export). There are **no unit tests** by
design — Storybook is the review surface.

## Setup

```sh
bun install
bun run dev      # regenerates stories + serves Storybook on http://localhost:6006
```

## Before you open a PR

Run the exact gate CI runs:

```sh
bun run check
```

That covers: workflows-in-sync, format, lint, **props coverage**, typecheck, build,
**size-limit**, Storybook build, and package health.

## Adding a component

```sh
bun run new:component <kebab-name> [--namespace]
```

Then make sure the component has all of the following — the CI gates enforce most of them:

- [ ] **`<name>.props.ts`** with structured `propDefs` + JSDoc descriptions. `check:props`
      fails otherwise (or add the slug to `PRIMITIVES`/`BACKLOG` in `scripts/check-props.ts`
      if it genuinely has no design-system props). This drives the Storybook prop table.
- [ ] **`examples/<name>.examples.tsx`** — `export const examples = { Default() {…}, … }`.
      Storybook generates one page + one story per example from this; no wiring needed.
- [ ] **`demos/<name>.demo.tsx`** — a canonical usage demo (skip with `--no-docs`).
- [ ] An entry in **`scripts/a11y-data.ts`** if the component has meaningful keyboard / ARIA
      behaviour — it renders a Keyboard + Accessibility section on the Docs page.
- [ ] A category in **`scripts/generate-storybook.ts`** (`CATEGORIES`) if it shouldn't fall
      into the default `Components` section.
- [ ] Its CSS wired into the aggregate and the component exported from the barrel (the
      scaffold does both).

## Non-obvious rules (see `CLAUDE.md` → Sharp Edges for the full list)

- **Never hand-edit `.github/workflows/*.yml`** — they're generated from `ci/workflows.ts`
  (`bun run workflows`); CI fails if they've drifted.
- **Never edit files under `stories/generated/`, `src/icons/adapters/`, or `palettes.css`** —
  all generated. Edit the source + rerun the generator.
- **`sideEffects` in the package must stay `["./dist/icons/adapters/*"]`** — `false`
  tree-shakes the self-registering icon adapters away. The `{ Button }` size-limit budget
  guards this.
- The library ships **no font-family and no remote `@import`** — see the CLAUDE.md note.

## Commits

Semantic commit messages (`feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `chore:`) — the
changelog is generated from them (`bun run changelog`).

## Releasing

Maintainers only: the **Release** workflow (Actions → Release), or `bun run prod` locally.
The version stays on `0.0.1-N` forever (see `CLAUDE.md` → Publishing).
