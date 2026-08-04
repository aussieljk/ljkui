# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Lint Commands

### Monorepo

- **Install**: `bun install`
- **Dev server**: `bun run dev` — regenerates the fixtures and starts Vite; the explorer is at `http://localhost:5173/uaight` (it just delegates to `bun run --filter=ljkui dev`). **uaight is the only site** — Storybook was removed on 2026-08-04 (see [History](#history)).
- **Build**: `bun run build --filter=<app>`; **the static explorer** is `bun run build:explorer` (→ `packages/ljkui/dist-uaight`).
- **Lint**: `bun run lint --filter=<app>`
- **Typecheck**: `bun run typecheck` (turbo for the packages, then root `tsconfig.json` for `scripts/` + `ci/`; TypeScript 7)
- **Full check**: `bun run check` — everything CI runs (workflows in sync, format, lint, props coverage, typecheck, build, size-limit, explorer build, publint, attw)
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
- `scripts/deploy.ts` — builds the **static explorer** (`uaight build`) on the runner, wraps `dist-uaight` in a Build Output API bundle (`.vercel/output/static` + `config.json`), then `vercel pull` / `deploy --prebuilt`. `--prebuilt` skips Vercel's own build entirely, so it serves the files regardless of the project's framework preset. Production with `--prod` or on a master push; otherwise a preview whose URL it comments on the PR.

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

- **CI** — every PR and every push to master. `check` job: workflows-in-sync, format, lint, props coverage, typecheck, build, size-limit, explorer build, package health (publint + attw). Then `deploy`: an explorer preview on PRs (URL commented on the PR), production on master.
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

## uaight (`packages/ljkui/vite.config.ts` — the only site)

[uaight](https://www.npmjs.com/package/uaight) is a component explorer that runs **inside the package's own Vite dev server** — there is no second process and no second port. `bun run dev` starts Vite and the explorer is at `/uaight`. It is deployed to Vercel as a static export (`uaight build` → `dist-uaight`). The library ships no other site.

uaight is on `0.0.1-canary.N` and the pinned version is exact. Its surface can still move between canaries — treat an upgrade as a real change, not a bump.

The fixtures run against the library **source** (the `ljkui` → `src` alias in `vite.config.ts`), so they hot-reload; the deployed static build renders the same trees a consumer sees.

- **Fixtures are generated** from `examples/*.examples.tsx` by `scripts/gen-fixtures.ts` (`generate:fixtures`, wired into `dev` / `build:explorer`). It writes **one `*.fixture.tsx` per component** under `fixtures/` (git-tracked, wiped-and-rewritten each run), so Vite code-splits per component. Each `*.examples.tsx` still does `export const examples = { Size() {…}, … }` — the generator wraps that into the `export default { … }` object uaight reads. A new file needs no wiring; its own `fileMeta.group` decides its directory, and **the directory is the tree section** (uaight builds its tree from paths).

  **The two suffixes must stay distinct.** `*.fixture.tsx` is generated, `*.examples.tsx` is authored. They used to share the `examples` suffix, which forced `exclude: ['examples/**']` to stop every component being listed twice — and `exclude` is applied to the inventory/call-site scan as well, so that one line silently cost the harvest every usage written in an example. Splitting the suffixes let both globs be exact; the harvest went from 594 groups to 812.
- **Never edit `fixtures/`** — it is regenerated. Hand-authored support code lives in `fixture-support/`.
- **There is no top-level `demos/`.** Each canonical usage is `examples/demos/<slug>.demo.tsx`: rendered by `<Demo name="…" />` in the guides, surfaced as that component's **`Overview`** fixture, and harvested for call sites. One directory, one source of truth.
- **A component's section and canvas come from `fileMeta` in its own `examples/*.examples.tsx`** (`export const fileMeta = { group, layout }`), not from a map in the generator. `check:explorer` fails when one is missing or names an unknown section.
- **Section order is encoded in the directory names** (`1. Introduction`, `5. Controls`, …). uaight sorts tree directories with an `Intl.Collator` (`numeric: true`) and `fileMeta.order` only sorts files *within* a directory, so the number is the only lever. The order itself lives in `SECTIONS` in `scripts/gen-fixtures-meta.ts`.
- **Playgrounds**: 35 components get a live `Playground` fixture that drives the real component from its `*.props.ts` definitions via `useFixtureInput` (`fixture-support/playground.tsx`). A component qualifies automatically — the barrel exports something renderable under its PascalCase name and it has at least one controllable prop — so there is no allowlist to drift. uaight's own `docgen` / `InputOptions.from` would do this, but neither is implemented in `0.0.1-canary.0`.
- **Date codecs**: `fixture-support/codecs.tsx` teaches the serializer the `@internationalized/date` types, so `CalendarDate` props are editable and link-encodable instead of `opaque`. A JS `Date` needs nothing — uaight ships `dateCodec`.
- **The three hand-written tools** (Color scales, Icon Browser, Theme Playground) are components in `fixture-support/tools/`, each exporting a `fixtures` object that `gen-fixtures.ts` wraps into `fixtures/Tools/`. They were hand-authored `*.stories.tsx` before, i.e. the one part of the tree that is not derived from `examples/`.
- **Prop tables + the a11y reference** are a `Reference` fixture appended to every component that has either, rendered by `fixture-support/reference.tsx` from `src/generated/props.json` and `scripts/a11y-data.ts`. uaight has no autodocs, so this replaces Storybook's Docs tab — the docs sit one click from the examples instead of behind a tab.
- **`props.json`** is produced by `scripts/gen-props.ts` (`generate:props`, which `generate:fixtures` runs first). That generator **imports each `*.props.ts` at runtime** (bun runs TS natively) — no TypeScript compiler API, sidestepping the TS7-native limitation. Descriptions come from a regex over the source (following one re-export hop).
- **Props coverage is gated**: `scripts/check-props.ts` (`check:props`, in CI) fails if a component directory has no `*.props.ts` and isn't listed in its `PRIMITIVES`/`BACKLOG` allowlists. Add props (or an allowlist entry) when adding a component.
- **Guides** are MDX in `packages/ljkui/guides/` (the single source of truth for prose) and are now **compiled as real MDX** by `@mdx-js/rollup`, not ported. `<Callout>`, `<Demo>` and `<PropsTable>` therefore work — see `fixture-support/mdx-components.tsx`, which maps markdown elements onto the library's typography and puts the barrel's component exports in scope. The list + numbering live in the `GUIDES` array in `gen-fixtures.ts`.
- **The theme decorator** is `fixtures/uaight.decorator.tsx` (generated, re-exporting `fixture-support/theme-decorator.tsx`). It wraps every fixture in `<Theme>` and exposes appearance / accent / gray as **fixture inputs** via `useFixtureInput` — the replacement for Storybook's toolbar globals. They now appear in the control panel and ride along in a shared link. A decorator must live **inside** the fixtures dir; uaight applies every decorator at or above a fixture's path.
- **`fixturesDir` is `.` (the package root), not `fixtures/`.** The inventory and call-site scans glob from `fixturesDir`, so pointing it at the generated directory would leave them nothing to look at. From the root they find ~470 components and ~626 call-site groups in `src/` and `demos/` — real `<Button …>` usages with the props written at them, which is uaight's zero-config half. `examples/**` is excluded, since those modules match the fixture glob too but export `examples` rather than a default.
- **Perf**: `optimizeDeps.include` gets the **generated** `fixture-support/prebundle.ts` list (`generate:prebundle`, gated by `check:prebundle`), so browsing never stalls on a lazy re-optimize + full reload. It is derived from the bare import specifiers in `src/`, minus type-only imports and the optional icon peers. The `ljkui` alias uses **regex `find`s** so `ljkui/icons/*` subpaths aren't rewritten as a prefix.
- **The read-only dev API** (`/@uaight/index.json`, `inventory.json`, `callsites.json`, `config.json`, `health`) is development-only and is what `scripts/generate-pdf.ts` and the MCP server both read. `.mcp.json` wires `uaight-mcp` against `http://localhost:5173`, so an agent can query the running explorer instead of grepping `examples/`.
- **`capture.html` + `fixture-support/capture.tsx`** are the one-fixture page the PDF pipeline screenshots — uaight has no `iframe.html?id=` equivalent because the explorer selects fixtures over its message channel, not the URL. Dev-only, and not an input to `uaight build`. It **must** import `uaight/styles.css`: the inline host is styled with uaight's own utilities, and without them the container collapses and every capture comes out blank.

## Sharp Edges

Non-obvious constraints — breaking any of these fails silently or in confusing ways:

- **`scripts/fix-namespace-exports.ts` must run after every tsdown build** (wired into `build:js`). Rolldown lowers `export * as Tabs` into materialized getter objects, which break React Server Components (`<Tabs.Root>` renders undefined: "Element type is invalid … got: undefined").
- **The explorer resolves `ljkui` to `src/`** (the alias in `vite.config.ts`), so fixtures hot-reload against source — no rebuild needed while developing. The published npm package still ships `dist/`; only the local explorer reads `src`.
- **`sideEffects` in `packages/ljkui/package.json` must stay `["./dist/icons/adapters/*"]`**, not `false`. The icon adapter subpaths (`ljkui/icons/lucide` etc.) register themselves on import; `sideEffects: false` silently tree-shakes them.
- **TypeScript 7 (native compiler) is the library default**, and it has no JS compiler API — anything needing it can't use the library's `tsc`. The docs prop generator works around this by importing the `*.props.ts` at *runtime* under bun rather than parsing them (see the Docs site section). The docs package pins its own classic TypeScript for `tsc --noEmit`.
- **`.stylelintrc.js` must stay `.js`** — stylelint's TS config loader calls classic-TS APIs that the TS7 native compiler doesn't export.
- **A scale step's name is not the Tailwind stop it is built from.** The 12 steps are semantic *roles* (`10`-`50` backgrounds, `100`-`300` fills, `400`-`600` borders, `700`-`800` solid, `900`-`950` text), fitted against the frosted-ui scales this library forked from — so `--accent-500` is a *border* and comes from around Tailwind's `300`. Six of the twelve steps are backgrounds/borders and therefore all live in the light half of the palette; reading Tailwind's `100`-`600` into them straight (which the generator used to do) puts near-black borders on white cards. The tables and the two solved steps live in `src/helpers/tailwind-palette.ts`; edit those, never `palettes.css`, then `bun run generate:palettes`. Bright scales (`amber`, `yellow`, `lime`, `sky`) are deliberately non-monotone at the solid step — their chip is *lighter* than the border before it, exactly as frosted-ui's is.
- **Icon adapters in `src/icons/adapters/` are generated** — edit `scripts/icon-map.ts` and run `bun run generate:icon-adapters`; never edit the adapters directly.
- **`lucide-react` is v1.x** — the adapter uses v1 names (`House`, `Funnel`, `TriangleAlert`); pre-1.0 aliases like `Home` no longer exist despite the permissive peer range.
- **Demo previews are client-only** (`src/components/demo.tsx` gates on a mounted flag). Many ljkui components touch browser globals (`CSS.supports`, portals, `ResizeObserver`) that throw under SSR/prerender, so the page shell prerenders but the live preview waits for mount. Don't "optimize" this by rendering the demo during SSR — the prerender will start erroring again.
- **`app.css` must import `ljkui/styles.css` into `layer(ljkui)`**, with the layer order the library's own Tailwind guide specifies (`@layer theme, base, ljkui, components, utilities;`, declared before the `@import`s — an empty `@layer` statement is one of the few things allowed to precede them). styles.css carries a *global* reset (`list-style: none`, `border-width: 0`, `img { display: block }`, zeroed margins). Unlayered, it outranks every Tailwind utility — unlayered CSS beats all layers — so `list-disc`, `border` and friends silently do nothing. (The reset used to flatten `h1..h6` to `font-size: inherit` as well; that rule was removed, so headings now keep the host's type scale either way.) `theme.css` stays unlayered on purpose — it's custom-property definitions, and demoting it below Tailwind's `theme` layer would let Tailwind's `--color-*` defaults win.
- **The library ships no `font-family` and no `letter-spacing`.** `styles/tokens/typography.css` carries only the size / line-height / weight scale; text inherits type from the host page, and `<Code>`/`<Kbd>`/`<DateField>`/`<CreditCard>` use `var(--font-mono, monospace)` — Tailwind's mono stack when the host defines one, falling back to the generic keyword (which resolves to Courier, a serif, so never use it bare). There is no `--default-font-family`, no `--code-font-family`, no `--letter-spacing-*`/`--tracking-0..9`, and no `src/styles/fonts.css` — don't reintroduce them. Corollary: the library's CSS must never contain a remote `@import url(...)`, which is only legal at the very top of the *final* stylesheet and would land ~2900 lines into the docs' concatenated `app.css`, where every parser rejects it. A webfont belongs in the consumer's document head.
- **The vite alias (`ljkui` → `src`) must use regex `find`s, in the array form.** A bare string `ljkui: …/src` alias also rewrites every subpath as a prefix, so `ljkui/icons/lucide` resolves to `src/icons/lucide` — a path that does not exist — and the build dies with `UNLOADABLE_DEPENDENCY`. The three regex entries in `vite.config.ts` (`^ljkui# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Deliberately Not Doing (don't suggest these again)

These are conscious decisions, not oversights. Do **not** re-propose them in reviews, plans, or "DX improvement" passes — they've been considered and declined for now.

- **No separate docs site.** The uaight explorer **is** the docs site, full stop (deployed to Vercel as a static export — see the uaight section). Do not suggest Fumadocs, a Next.js/Astro docs app, a docs-only package, resurrecting the old `packages/docs`, or bringing Storybook back. Improvements go **into the explorer** — a new document is a fixture under `fixtures/`, generated by `gen-fixtures.ts`.
- **No change to the `0.0.1-<n>` prerelease versioning scheme.** Yes, `^`/`~` ranges don't match prereleases and consumers effectively pin an exact version — this is understood and accepted. The version stays `0.0.1` forever with per-release prerelease bumps (see the Publishing section). Do not suggest moving to normal semver / `0.1.0` / `0.x` minors.
- **No `shadcn`-style component-scaffolding / `ljkui init` / `ljkui add <component>` CLI, and no copy-paste-into-your-repo codegen.** ljkui ships as a normal npm package consumed from the barrel; components are not vendored into the consumer's source tree. (This is separate from the published `ljkui-lint-raw-colors` token codemod, which we *do* ship — see Publishing.)

## History

The repo used Storybook (docs site + stories) until 2026-07-23, then react-cosmos (a component workbench, no docs site) until 2026-07-24, when it moved to the current Fumadocs docs site and **removed react-cosmos entirely** — fixtures, cosmos config, the screenshot pipeline, and `scripts/dev.ts` all went with it. The archived Storybook MDX that used to sit under `packages/ljkui/docs/` was **deleted on 2026-08-04** — it described an API two tools out of date and dominated every repo-wide grep. Recover it from git history if it is ever wanted.

Later on 2026-07-24 the 93 deleted cosmos fixtures were **recovered from git and converted into `packages/ljkui/examples/*.examples.tsx`** (91 modules — `Icons` and `Layout` had only wrapped their demo, so there was nothing to restore), and every component page regained an `## Examples` gallery. Storybook's variant coverage is therefore back in the docs; `WHAT-WE-LOST-DROPPING-STORYBOOK.md` is out of date on that point.

On 2026-07-30 the **Fumadocs docs site (`packages/docs`) was removed entirely and Storybook became the only site**, deployed to Vercel as a static export. The guide MDX and the `gen-props.ts` prop-table extractor moved into `packages/ljkui` (`guides/`, `scripts/gen-props.ts`) so Storybook is self-contained. The same change added: bundle-size budgets (`.size-limit.json`, `size` script, CI gate), a props-coverage gate (`scripts/check-props.ts`), a per-component **Keyboard/Accessibility** reference in autodocs (`scripts/a11y-data.ts`), an **Installation & Layers** guide, an **Icon Browser** story, prop definitions for accordion/calendar/carousel/chart/drawer/form/navigation-menu, and Storybook load-perf tuning (the `PREBUNDLE` list).

On 2026-08-04 **Storybook was removed entirely and replaced by [uaight](https://www.npmjs.com/package/uaight)** (`0.0.1-canary.0`), a component explorer that runs inside the package's own Vite dev server. `.storybook/`, `stories/`, `scripts/generate-storybook.ts` and every `@storybook/*` dependency went with it; `packages/ljkui/vite.config.ts` (new) hosts the explorer at `/uaight`, and `scripts/gen-fixtures.ts` replaces the story generator. What changed in kind rather than in name:

- **Autodocs had no equivalent**, so the prop table + keyboard map + ARIA notes became a `Reference` fixture on each component (`fixture-support/reference.tsx`), and the guides became fixtures rendering the MDX through `fixture-support/guide.tsx`.
- **The guides are now compiled as real MDX** (`@mdx-js/rollup`) instead of being text-ported, so `<Callout>`, `<Demo>` and `<PropsTable>` render properly for the first time. `<Callout>` is reimplemented locally on `Alert` — it was a Fumadocs component, never an ljkui export.
- **Toolbar globals became fixture inputs** (`useFixtureInput` in the theme decorator), so appearance/accent/gray are shareable in a link. The Color scales tool relied on Storybook remounting it via a `key` when a global changed; it now watches the themed ancestor with a `MutationObserver` instead (`useSwatchValues`).
- **`scripts/generate-pdf.ts` was NOT ported and is broken.** It drives Storybook's `index.json` + `iframe.html?id=` contracts, which uaight does not expose. Its capture/pagination half is still reusable — see the note at the top of the file.
- **The Chromatic job was removed** from CI: it only accepts a `--storybook-build-dir`, so it has no input any more. The `CHROMATIC_PROJECT_TOKEN` secret is left in place, unused.
- The deploy target moved from `storybook-static/` to `dist-uaight/`; `bun run dev` now serves `http://localhost:5173/uaight` rather than port 6006.

Later on 2026-08-04, ten follow-up improvements landed on top of the uaight migration:

- **Live `Playground` fixtures** (35 components) driving real props from `*.props.ts` — Storybook's prop table was read-only by necessity, `useFixtureInput` is not.
- **Date codecs** for the `@internationalized/date` types, so the date components' props are editable and shareable rather than `opaque`.
- **`.mcp.json`** wiring `uaight-mcp` at the repo root.
- **Ordered tree sections** via numeric directory prefixes, restoring the order Storybook's `storySort` used to give.
- **`fileMeta` colocated in each examples module**, deleting the `CATEGORIES` / `FULLSCREEN` / `PADDED` maps.
- **`check:explorer`** — the drift gate for hand-authored explorer code. It immediately found three guides (`forms.mdx`, `oscar.mdx`, `examples.mdx`) that had been orphaned since the Fumadocs era; the first two are now wired in, the third was deleted as obsolete. `<Examples name="…" />` was implemented to support them.
- **`check:prebundle`** — `fixture-support/prebundle.ts` is generated from the sources instead of maintained by grep.
- **A narrowed inventory** (`base-*` internals excluded). NB: `examples/` must stay in `inventory.include`, because the call-site harvest rides on that same glob.
- **`packages/ljkui/docs/` deleted** — 40+ MDX files describing an API two tools out of date.
- **`scripts/generate-pdf.ts` ported** onto `/@uaight/index.json` + the new `capture.html`.

A second follow-up pass on 2026-08-04 (ten more items):

- **Decorator inputs are namespaced `theme:*`.** They share one flat registry with the fixture's own inputs, so the un-prefixed `appearance` collided with `<Theme>`'s prop of the same name in its Playground — one control driving two things.
- **A breakpoint badge** replaces Storybook's viewport presets. uaight's `VIEWPORT_PRESETS` is a private constant (Small/Mobile/Tablet/Laptop/Desktop; only 768 and 1280 coincide with this library's scale) and `useFixtureViewport()` is read-only, so the named-preset toolbar cannot be reproduced — but the thing that mattered, *which `@custom-media` query is live*, is now reported directly and `check:explorer` keeps `fixture-support/breakpoints.ts` in step with `breakpoints.css`.
- **`index: 'static'`** — every fixture name is statically decidable (measured: zero undecidable), so the warm pass was a browser round-trip per boot for nothing.
- **`fetch-depth: 100`** on the checkouts that build the explorer; `actions/checkout` defaults to a depth-1 clone, which made "Recently Changed" render an empty list on every deployed build.
- **A generated `Usages` report.** uaight excludes the inventory and call sites from production builds unconditionally, so the deployed explorer had neither; `gen-fixtures.ts` now runs the same Node API (`buildFixtureIndex`) at generate time against the shared `fixture-support/uaight-options.ts`.
- **`fileMeta.playground`** opts a namespace component into a Playground by naming the export to drive (`Table.Root`), with inner content from a sibling `playgroundChildren` export — not from an example, since every example is a *complete* component and would nest.
- **`Responsive<T>` and `string | number` controls.** Prop coverage was already 94%; this takes it to ~99%. (The original claim that responsive props were "a large fraction" was wrong — there are three.)
- **`check:shape` folded into `check:explorer`**, which now also verifies the breakpoint scale.
- **`demos/` folded into `examples/`** — see above.
- **Root hygiene** — `shot1.png`, `screenshots/`, the stale 2.7 MB PDF and a one-line duplicate `changelog.md` removed. `SHADCN-ALIGNMENT.md` was kept: 296 lines of durable naming rationale, unlike the deleted `docs/`.
- **This file was deduplicated**: it had accumulated four copies of its own body (569 lines → 179), of which only the first was current.
