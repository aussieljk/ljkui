# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Lint Commands

### Monorepo

- **Install**: `bun install`
- **Dev server**: `bun run dev` — regenerates the Storybook stories and serves Storybook on `http://localhost:6006` (it just delegates to `bun run --filter=ljkui storybook`). **Storybook is the only site** — the Fumadocs docs site was removed on 2026-07-30 (see [History](#history)).
- **Build**: `bun run build --filter=<app>`; **the static Storybook** is `bun run build:storybook` (→ `packages/ljkui/storybook-static`).
- **Lint**: `bun run lint --filter=<app>`
- **Typecheck**: `bun run typecheck` (turbo for the packages, then root `tsconfig.json` for `scripts/` + `ci/`; TypeScript 7)
- **Full check**: `bun run check` — everything CI runs (workflows in sync, format, lint, props coverage, typecheck, build, size-limit, Storybook build, publint, attw)
- **Format**: `bun run format` / `bun run format:check` (oxfmt, JS/TS only — oxfmt would otherwise rewrite the generated workflow YAML and the markdown)
- **Regenerate the workflows**: `bun run workflows` (see [CI/CD](#cicd))
- **Scaffold a component**: `bun run new:component <kebab-name> [--namespace] [--no-docs]` (`--no-docs` skips the usage demo; generates the component files + a docs page in `packages/docs`)
- **Env problems**: `bun run doctor [--fix]` (stale nested node_modules, bun version)

### The library (`ljkui`, in `packages/ljkui`)

- **Build**: `bun run --filter="ljkui" build`
- **Lint**: `bun run --filter="ljkui" lint`

The library ships no site of its own — it's built (tsdown + postcss) and consumed by the docs app.

## Code Style Guidelines

- **TypeScript**: Strict typing, ES2020 modules, 120 char line width, 2-space indentation
- **React**: Functional components with hooks, JSX format
- **CSS**: Tailwind CSS v4, PostCSS with nesting/custom media/imports
- **Formatting**: Single quotes, semicolons required, trailing commas in multiline
- **Project**: Bun workspaces with Turborepo (`packages/*`), Vite everywhere (no Next.js, no tests)
- **Commits**: Semantic commit messages (feat, fix, docs, style, refactor, perf, test, chore)
- **Quality**: oxlint for linting (root `.oxlintrc.json`), oxfmt for formatting (`bun run format`; lefthook pre-commit runs both on staged files), Fumadocs (TanStack Start) for the docs site

## Publishing

The main package publishes to npm as `ljkui` (see `packages/ljkui`). Releases normally run from the **Release** workflow (Actions → Release → Run workflow); `bun run prod` does the same thing from this laptop.

**The version stays on 0.0.1 forever.** Every release is a prerelease of it — `0.0.1-1`, `0.0.1-2`, … — so the patch number never reaches 0.0.2. To release, from `packages/ljkui`:

```sh
bun run release   # npm version prerelease --no-git-tag-version && npm publish --tag latest
```

The pipeline is two root scripts, shared by `bun run prod` and the Release workflow so there is only one implementation:

- `scripts/release.ts` — refuses a dirty tree, writes `~/.npmrc` from `NPM_TOKEN` when running in CI, runs the package's `release` (bump + publish), refreshes `bun.lock` (**it records the workspace version** — skip this and the next `bun install --frozen-lockfile` fails in CI), commits and pushes.
- `scripts/deploy.ts` — builds the **static Storybook** on the runner, wraps `storybook-static` in a Build Output API bundle (`.vercel/output/static` + `config.json`), then `vercel pull` / `deploy --prebuilt`. `--prebuilt` skips Vercel's own build entirely, so it serves the files regardless of the project's framework preset. Production with `--prod` or on a master push; otherwise a preview whose URL it comments on the PR.

`--tag latest` is required: npm refuses to publish a prerelease to the default tag, and without it `latest` would never move, so plain `bun add ljkui` would fail to resolve.

**`--no-workspaces-update` on the `npm version` is also required.** After bumping, npm otherwise reifies the whole workspace to sync `package-lock.json` — and dies on `packages/docs`' `"ljkui": "workspace:*"` with `EUNSUPPORTEDPROTOCOL: Unsupported URL Type "workspace:"`, since the `workspace:` protocol is a bun/pnpm thing npm never implemented. npm has no business touching the tree here anyway: bun owns the lockfile, and `release.ts` refreshes `bun.lock` itself afterwards. The failure is a half-finished release — the bump lands in `package.json` but nothing publishes, so revert that before retrying or the next run bumps twice.

`prepublishOnly` runs `scripts/check-version.ts` (hard-fails on any version that isn't `0.0.1-<n>`), then lint + build.

Never publish a plain `0.0.1`: it outranks every later `0.0.1-N`, and `^0.0.1` ranges don't match prereleases, so consumers would be stuck on that one release. Installing normally (`bun add ljkui`) resolves the `latest` dist-tag and records `^0.0.1-N`, which does pick up subsequent `0.0.1-N` releases.

## CI/CD

**The workflows are written in TypeScript, not YAML.** `ci/workflows.ts` is the source; `bun run workflows` renders it to `.github/workflows/*.yml`, and CI fails if the YAML on disk has drifted (`bun run workflows:check`, the first step of the check job). Never hand-edit a file under `.github/workflows` — it will be overwritten, and the generator deletes any `.yml` there that isn't in the `workflows` map.

- `ci/dsl.ts` — the typed subset of the Actions schema, the step builders, and the YAML renderer (`Bun.YAML.stringify`, no dependency).
- `ci/workflows.ts` — the two workflows.
- `ci/generate.ts` — `bun run workflows` / `bun run workflows:check`.

Keep every `run:` a single line: Bun's YAML writer emits multi-line strings as quoted scalars with `\n` escapes instead of `|` blocks. Anything longer belongs in a `scripts/*.ts`, which is the point — the workflows stay a list of named one-liners and the logic is typechecked TypeScript.

**Workflows**

- **CI** — every PR and every push to master. `check` job: workflows-in-sync, format, lint, props coverage, typecheck, build, size-limit, Storybook build, package health (publint + attw). Then `deploy`: a Storybook preview on PRs (URL commented on the PR), production on master.
- **Release** — manual `workflow_dispatch` on master, with a `deploy` input. Runs `bun run check`, then `scripts/release.ts` and `scripts/deploy.ts --prod`.

**All jobs run on GitHub-hosted `ubuntu-latest`.** This is also what npm's trusted publishing requires — it only accepts cloud-hosted runners, so an OIDC token minted on a self-hosted runner would be refused by the registry.

**npm auth is trusted publishing (OIDC) — there is no npm token anywhere.** The release job's `id-token: write` mints an OIDC token that npm trades for short-lived, scoped publish rights, and provenance is attached automatically (public repo + public package). It is configured on npmjs.com under the package's Settings → Trusted publisher: org `aussieljk`, repo `ljkui`, workflow `release.yml`, no environment. Consequences worth knowing:

- **Never set `NODE_AUTH_TOKEN` in the release job** — npm would quietly take the legacy token path and skip trusted publishing. `release.ts` hard-fails if it sees one.
- Needs npm ≥ 11.5.1 and node ≥ 22.14.0, hence `setup-node` with node 24 (which ships npm 11). `release.ts` re-checks and self-upgrades npm as a backstop.
- The workflow **filename** is part of the trust config. Renaming `release.yml` breaks publishing until npmjs.com is updated to match.
- `repository.url` in the package must match the GitHub repo exactly, or provenance fails.
- Local `bun run prod` is unaffected — it publishes with your `npm login` session.

**Secrets** (Settings → Secrets and variables → Actions):

| Secret | Where it comes from |
| --- | --- |
| `VERCEL_TOKEN` | <https://vercel.com/account/tokens> |
| `VERCEL_ORG_ID` | `orgId` in `.vercel/project.json` (gitignored, so it has to be a secret) |
| `VERCEL_PROJECT_ID` | `projectId` in `.vercel/project.json` |

A PR from a fork has no secrets, so `deploy.ts` skips with a warning instead of failing.

The release commit is pushed with `GITHUB_TOKEN`, whose pushes deliberately do not trigger further workflow runs — so a release does not kick off a second CI + production deploy.

## Storybook (`packages/ljkui/.storybook` — the only site)

Storybook 10 (`@storybook/react-vite`) is the single site, deployed to Vercel as a static export. There is no separate docs package anymore. The stories run against the library **source** (`src` alias in `.storybook/main.ts`), so they hot-reload; the deployed static build renders the same trees a consumer sees.

- **Stories are generated** from `examples/*.examples.tsx` by `scripts/generate-storybook.ts` (run via `generate:storybook`, wired into `storybook` / `build-storybook`). It writes **one module per component** under `stories/generated/` (git-tracked, wiped-and-rewritten each run), so Vite code-splits per component. Each `*.examples.tsx` does `export const examples = { Size() {…}, … }`; a new file needs no wiring. **Hand-authored** stories (e.g. `stories/ColorScale.stories.tsx`, `stories/IconBrowser.stories.tsx`) live directly in `stories/` — never in `generated/`.
- **Prop tables** come from `src/generated/props.json`, produced by `scripts/gen-props.ts` (`generate:props`, which `generate:storybook` runs first). That generator **imports each `*.props.ts` at runtime** (bun runs TS natively) — no TypeScript compiler API, sidestepping the TS7-native limitation. Descriptions come from a regex over the source (following one re-export hop). The generator turns each component's props into the autodocs `argTypes` (controls off — the stories render fixed examples, not `args`).
- **Props coverage is gated**: `scripts/check-props.ts` (`check:props`, in CI) fails if a component directory has no `*.props.ts` and isn't listed in its `PRIMITIVES`/`BACKLOG` allowlists. Add props (or an allowlist entry) when adding a component.
- **Keyboard + Accessibility sections** on each component's Docs page come from `scripts/a11y-data.ts` (keyed by slug), appended to the autodocs `description.component` as markdown by `generate-storybook.ts`. Add an entry there to document a component's keyboard map / ARIA contract.
- **Guides** are MDX in `packages/ljkui/guides/` (the single source of truth for prose). `generate-storybook.ts` ports them into `stories/generated/Guides/*` (stripping any leftover `<Demo>`/`<PropsTable>` tags, downgrading `<Callout>` to a blockquote). The list + numbering live in the `GUIDES` array in that script; `1. Getting started` is an inline template in the script.
- **The preview** (`.storybook/preview.tsx`) wraps every story in `<Theme>` and exposes appearance / accent / gray as toolbar globals, plus the library breakpoints as viewport presets. `storySort.order` must stay an **inline literal** (Storybook statically parses it) and in sync with `CATEGORY_ORDER` in `generate-storybook.ts` (the generator warns on drift).
- **Perf**: `.storybook/main.ts` uses `react-docgen` (fast Babel analyser, not the TS-program one) and pre-bundles every heavy leaf dep — including all `@base-ui/react/*` subpaths (the `PREBUNDLE` list) — via `optimizeDeps.include`, so browsing never stalls on a lazy re-optimize + full reload. The `ljkui` alias uses **regex `find`s** so `ljkui/icons/*` subpaths aren't rewritten as a prefix.

## Sharp Edges

Non-obvious constraints — breaking any of these fails silently or in confusing ways:

- **`scripts/fix-namespace-exports.ts` must run after every tsdown build** (wired into `build:js`). Rolldown lowers `export * as Tabs` into materialized getter objects, which break React Server Components (`<Tabs.Root>` renders undefined: "Element type is invalid … got: undefined").
- **Storybook resolves `ljkui` to `src/`** (the alias in `.storybook/main.ts`), so stories hot-reload against source — no rebuild needed while developing. The published npm package still ships `dist/`; only the local Storybook reads `src`.
- **`sideEffects` in `packages/ljkui/package.json` must stay `["./dist/icons/adapters/*"]`**, not `false`. The icon adapter subpaths (`ljkui/icons/lucide` etc.) register themselves on import; `sideEffects: false` silently tree-shakes them.
- **TypeScript 7 (native compiler) is the library default**, and it has no JS compiler API — anything needing it can't use the library's `tsc`. The docs prop generator works around this by importing the `*.props.ts` at *runtime* under bun rather than parsing them (see the Docs site section). The docs package pins its own classic TypeScript for `tsc --noEmit`.
- **`.stylelintrc.js` must stay `.js`** — stylelint's TS config loader calls classic-TS APIs that the TS7 native compiler doesn't export.
- **A scale step's name is not the Tailwind stop it is built from.** The 12 steps are Radix-style *roles* (`10`-`50` backgrounds, `100`-`300` fills, `400`-`600` borders, `700`-`800` solid, `900`-`950` text), fitted against the frosted-ui scales this library forked from — so `--accent-500` is a *border* and comes from around Tailwind's `300`. Six of the twelve steps are backgrounds/borders and therefore all live in the light half of the palette; reading Tailwind's `100`-`600` into them straight (which the generator used to do) puts near-black borders on white cards. The tables and the two solved steps live in `src/helpers/tailwind-palette.ts`; edit those, never `palettes.css`, then `bun run generate:palettes`. Bright scales (`amber`, `yellow`, `lime`, `sky`) are deliberately non-monotone at the solid step — their chip is *lighter* than the border before it, exactly as frosted-ui's is.
- **`src/styles/tokens/tailwind-color.css` is hand-maintained runtime CSS** (per-palette oklch seeds + `:where()` blocks computing all 12 steps via color-mix/relative color syntax). There is no generator anymore; edit it by hand. Tailwind palettes are prefixed `tw-` (`tw-indigo`) to coexist with the Radix scales.
- **Icon adapters in `src/icons/adapters/` are generated** — edit `scripts/icon-map.ts` and run `bun run generate:icon-adapters`; never edit the adapters directly.
- **`lucide-react` is v1.x** — the adapter uses v1 names (`House`, `Funnel`, `TriangleAlert`); pre-1.0 aliases like `Home` no longer exist despite the permissive peer range.
- **Demo previews are client-only** (`src/components/demo.tsx` gates on a mounted flag). Many ljkui components touch browser globals (`CSS.supports`, portals, `ResizeObserver`) that throw under SSR/prerender, so the page shell prerenders but the live preview waits for mount. Don't "optimize" this by rendering the demo during SSR — the prerender will start erroring again.
- **`app.css` must import `ljkui/styles.css` into `layer(ljkui)`**, with the layer order the library's own Tailwind guide specifies (`@layer theme, base, ljkui, components, utilities;`, declared before the `@import`s — an empty `@layer` statement is one of the few things allowed to precede them). styles.css carries a *global* reset, including `h1..h6 { font-size: inherit; font-weight: inherit }`. Unlayered, that outranks every Tailwind utility (unlayered CSS beats all layers), so headings flatten site-wide and `text-4xl` silently does nothing. `theme.css` stays unlayered on purpose — it's custom-property definitions, and demoting it below Tailwind's `theme` layer would let Tailwind's `--color-*` defaults win.
- **The library ships no `font-family` and no `letter-spacing`.** `styles/tokens/typography.css` carries only the size / line-height / weight scale; text inherits type from the host page, and `<Code>`/`<Kbd>`/`<DateField>` use the generic `monospace` keyword. There is no `--default-font-family`, no `--code-font-family`, no `--letter-spacing-*`/`--tracking-0..9`, and no `src/styles/fonts.css` — don't reintroduce them. Corollary: the library's CSS must never contain a remote `@import url(...)`, which is only legal at the very top of the *final* stylesheet and would land ~2900 lines into the docs' concatenated `app.css`, where every parser rejects it. A webfont belongs in the consumer's document head.
- **The Storybook vite alias (`ljkui` → `src`) must use regex `find`s, in the array form.** A bare string `ljkui: …/src` alias also rewrites every subpath as a prefix, so `ljkui/icons/lucide` resolves to `src/icons/lucide` — a path that does not exist — and the build dies with `UNLOADABLE_DEPENDENCY`. The three regex entries in `.storybook/main.ts` (`^ljkui$`, `^ljkui/icons$`, `^ljkui/icons/(.+)$`) keep the icon subpaths pointed at `src/icons/adapters/*`. Pointing at `src` (not `dist`) also keeps a single module instance, so there is one `ThemeContext` and components that read it (Autocomplete, Combobox, DropdownMenu, …) don't throw ``​`useThemeContext` must be used within a `Theme` ``.
- **`optimizeDeps.include` in `.storybook/main.ts` is load-bearing.** The library imports ~36 `@base-ui/react/*` subpaths; without pre-bundling, Vite discovers each lazily the first time you open the component that uses it, and every discovery triggers a re-optimize plus a full page reload mid-browse. The `PREBUNDLE` list enumerates them (regenerate with `grep -rhoE "@base-ui/react[a-z/-]*" src/components | sort -u`). If a new heavy dep causes reload jank, add whatever the `dependencies optimized: …` line names.
- **If something is mysteriously broken, run `bun run doctor`** — under the hoisted linker, stale nested `packages/*/node_modules` dirs from older installs can shadow the root binaries (a package silently using an ancient `tsc`). `doctor --fix` deletes them.

## Deliberately Not Doing (don't suggest these again)

These are conscious decisions, not oversights. Do **not** re-propose them in reviews, plans, or "DX improvement" passes — they've been considered and declined for now.

- **No separate docs site.** Storybook **is** the docs site, full stop (deployed to Vercel as a static export — see the Storybook section). We are all-in on Storybook. Do not suggest Fumadocs, a Next.js/Astro docs app, a docs-only package, or resurrecting the old `packages/docs`. Improvements go **into Storybook**.
- **No change to the `0.0.1-<n>` prerelease versioning scheme.** Yes, `^`/`~` ranges don't match prereleases and consumers effectively pin an exact version — this is understood and accepted. The version stays `0.0.1` forever with per-release prerelease bumps (see the Publishing section). Do not suggest moving to normal semver / `0.1.0` / `0.x` minors.
- **No `shadcn`-style component-scaffolding / `ljkui init` / `ljkui add <component>` CLI, and no copy-paste-into-your-repo codegen.** ljkui ships as a normal npm package consumed from the barrel; components are not vendored into the consumer's source tree. (This is separate from the published `ljkui-lint-raw-colors` token codemod, which we *do* ship — see Publishing.)

## History

The repo used Storybook (docs site + stories) until 2026-07-23, then react-cosmos (a component workbench, no docs site) until 2026-07-24, when it moved to the current Fumadocs docs site and **removed react-cosmos entirely** — fixtures, cosmos config, the screenshot pipeline, and `scripts/dev.ts` all went with it. The archived Storybook MDX under `packages/ljkui/docs/` (including `WHAT-WE-LOST-DROPPING-STORYBOOK.md`) describes an older API and is kept for reference only; the docs are now generated from the demos + `*.props.ts`.

Later on 2026-07-24 the 93 deleted cosmos fixtures were **recovered from git and converted into `packages/ljkui/examples/*.examples.tsx`** (91 modules — `Icons` and `Layout` had only wrapped their demo, so there was nothing to restore), and every component page regained an `## Examples` gallery. Storybook's variant coverage is therefore back in the docs; `WHAT-WE-LOST-DROPPING-STORYBOOK.md` is out of date on that point.

On 2026-07-30 the **Fumadocs docs site (`packages/docs`) was removed entirely and Storybook became the only site**, deployed to Vercel as a static export. The guide MDX and the `gen-props.ts` prop-table extractor moved into `packages/ljkui` (`guides/`, `scripts/gen-props.ts`) so Storybook is self-contained. The same change added: bundle-size budgets (`.size-limit.json`, `size` script, CI gate), a props-coverage gate (`scripts/check-props.ts`), a per-component **Keyboard/Accessibility** reference in autodocs (`scripts/a11y-data.ts`), an **Installation & Layers** guide, an **Icon Browser** story, prop definitions for accordion/calendar/carousel/chart/drawer/form/navigation-menu, and Storybook load-perf tuning (the `PREBUNDLE` list).
