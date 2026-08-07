# Contributing to ljkui

Thanks for helping out. This is a Bun + Turborepo monorepo; the library is `packages/ljkui`
and the [uight](https://www.npmjs.com/package/uight) explorer is the only site (deployed as a
static export). There are **no unit tests** by design — the explorer is the review surface.

## Setup

```sh
bun install
bun run dev      # regenerates fixtures + serves the explorer on http://localhost:5173/uight
```

## Before you open a PR

Run the exact gate CI runs:

```sh
bun run check
```

That covers: workflows-in-sync, format, lint, **props coverage**, typecheck, build,
**size-limit**, explorer wiring, prebundle drift, explorer build, and package health.

## Adding a component

```sh
bun run new:component <kebab-name> [--namespace]
```

Then make sure the component has all of the following — the CI gates enforce most of them:

- [ ] **`<name>.props.ts`** with structured `propDefs` + JSDoc descriptions. `check:props`
      fails otherwise (or add the slug to `PRIMITIVES`/`BACKLOG` in `scripts/check-props.ts`
      if it genuinely has no design-system props). This drives the `Reference` fixture's prop table.
- [ ] **`examples/<name>.examples.tsx`** — `export const examples = { Default() {…}, … }`.
      `gen-fixtures.ts` generates one fixture module per component from this; no wiring needed.
- [ ] **`examples/demos/<name>.demo.tsx`** — a canonical usage demo (skip with `--no-docs`),
      imported into the examples module as its `Overview` example.
- [ ] An entry in **`scripts/a11y-data.ts`** if the component has meaningful keyboard / ARIA
      behaviour — it renders a Keyboard + Accessibility section on the component's `Reference` fixture.
- [ ] **`export const fileMeta = { group, layout }`** in that same examples module — the tree
      section (`Controls`, or the nested `Controls/Dates`) and how the canvas frames it
      (`centered` / `padded` / `fullscreen`). `check:explorer` fails without it. A section
      that does not exist yet needs adding to `SECTIONS` in `scripts/gen-fixtures-meta.ts`.
- [ ] Its CSS wired into the aggregate and the component exported from the barrel (the
      scaffold does both).

## Non-obvious rules (see `CLAUDE.md` → Sharp Edges for the full list)

- **Never hand-edit `.github/workflows/*.yml`** — they're generated from `ci/workflows.ts`
  (`bun run workflows`); CI fails if they've drifted.
- **Never edit files under `fixtures/`, `src/icons/adapters/`, or `palettes.css`** —
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
