/**
 * The repo's CI/CD, in TypeScript. `bun run workflows` renders this file to
 * `.github/workflows/*.yml`; never edit the YAML by hand (CI checks it matches).
 *
 * Two workflows, split by branch rather than by purpose — a master push runs
 * release.yml only, so the 20-minute check does not run twice per commit and
 * production is never deployed twice:
 *
 *   ci.yml       pull requests. One `check` job (format, lint, typecheck, build,
 *                package health, this file's YAML being in sync), then a Vercel
 *                preview whose URL is commented on the PR.
 *
 *   release.yml  every push to master, plus a manual button (Actions → Release →
 *                Run workflow). Runs the same check, publishes to npm, pushes the
 *                version commit, and deploys production. The CI-side `bun run prod`.
 *
 *                On a push it publishes only when the push touched
 *                `packages/ljkui/` (`release.ts --if-changed`) — a root-docs or
 *                CI-only commit still deploys the site but does not burn a version.
 *                A manual run always publishes.
 *
 * Both run on GitHub-hosted `ubuntu-latest` runners.
 *
 * npm needs no token at all: the release publishes over OIDC (trusted
 * publishing), configured against this repo + `release.yml` on npmjs.com. That
 * filename is part of the trust config — publishing must stay in this workflow,
 * or npmjs.com has to be updated to match first.
 *
 * Secrets (Settings → Secrets and variables → Actions):
 *   VERCEL_TOKEN      vercel.com/account/tokens
 *   VERCEL_ORG_ID     `orgId` from .vercel/project.json (gitignored)
 *   VERCEL_PROJECT_ID `projectId` from .vercel/project.json
 */
import {
  cacheBunStore,
  cacheTurbo,
  checkout,
  install,
  setupBun,
  setupNode,
  sh,
  type Runner,
  type Workflow,
} from './dsl.ts';
import root from '../package.json' with { type: 'json' };

/** GitHub-hosted; also what npm's trusted publishing requires (cloud-hosted only). */
const RUNNER: Runner = 'ubuntu-latest';

/** Trusted publishing needs npm >= 11.5.1 / node >= 22.14.0; node 24 ships npm 11. */
const NODE_VERSION = '24';

/** Same bun the lockfile and this laptop use, straight off `packageManager`. */
const BUN_VERSION = root.packageManager.replace('bun@', '');

/*
 * Depth for the checkouts that build the explorer. The Recently Changed report reads
 * `git log -n 60 -- src/components`; a shallow clone makes it come out empty, which is what
 * shipped on every deploy until now. 100 covers the window the report looks at.
 */
const EXPLORER_HISTORY = 100;

const MASTER = 'master';
const ON_MASTER = `github.ref == 'refs/heads/${MASTER}'`;

const VERCEL_ENV = {
  VERCEL_TOKEN: '${{ secrets.VERCEL_TOKEN }}',
  VERCEL_ORG_ID: '${{ secrets.VERCEL_ORG_ID }}',
  VERCEL_PROJECT_ID: '${{ secrets.VERCEL_PROJECT_ID }}',
};

const ci: Workflow = {
  name: 'CI',
  // Pull requests only. Master pushes are release.yml's, which runs the same check.
  on: {
    pull_request: { branches: [MASTER] },
  },
  // One run per branch; a new push cancels the one in flight.
  concurrency: { group: 'ci-${{ github.ref }}', 'cancel-in-progress': true },
  permissions: { contents: 'read' },
  jobs: {
    check: {
      name: 'Check',
      'runs-on': RUNNER,
      // 25 rather than 20: the explorer build adds a second full vite pass over ~90 component modules.
      'timeout-minutes': 25,
      steps: [
        checkout(EXPLORER_HISTORY),
        setupBun(BUN_VERSION),
        cacheBunStore(),
        install(),
        cacheTurbo(),
        // `fixtures/` is generated and no longer tracked, so it has to exist before the
        // steps that read it (format, typecheck) run.
        sh('Generate fixtures', 'bun run --filter=ljkui generate:fixtures'),
        // Cheap and pure-text first, so a formatting nit fails in seconds.
        sh('Workflows in sync', 'bun run workflows:check'),
        sh('Format', 'bun run format:check'),
        sh('Lint', 'bun run lint'),
        // Every component must ship a *.props.ts (or be exempt) — no silent prop-table gaps.
        sh('Props coverage', 'bun run --filter=ljkui check:props'),
        // Root fui-* modifiers must go through rootClassName — no drifting per-component copies.
        sh('Root className', 'bun run --filter=ljkui check:root-class'),
        // Every component stylesheet must be imported by index.css — no silently-unstyled components.
        sh('CSS registration', 'bun run --filter=ljkui check:css-index'),
        // The committed token snapshot must match the color CSS — a palette edit can't sneak in.
        sh('Token snapshot', 'bun run --filter=ljkui check:tokens'),
        // Component shape (barrel + examples module) and the hand-authored explorer pieces
        // (tools, guides, fileMeta, breakpoints) must stay wired — fixtures/ is generated, so
        // an orphan is otherwise invisible.
        sh('Explorer wiring', 'bun run --filter=ljkui check:explorer'),
        // The Vite prebundle list is generated from the sources; a new dep must not drift it.
        sh('Prebundle list', 'bun run --filter=ljkui check:prebundle'),
        // The Intent skills ship in the tarball for agents to read. Bad frontmatter is never
        // an error at read time — the skills are just silently ignored — so gate it here.
        sh('Intent skills', 'bun run --filter=ljkui check:skills'),
        sh('Typecheck', 'bun run typecheck'),
        sh('Build', 'bun run build'),
        // Packs the real tarball and imports every entry point in a clean project — catches a
        // broken `files` array / `exports` map / `sideEffects` that publint & attw miss.
        sh('Install smoke', 'bun scripts/smoke-install.ts'),
        // Bundle-size budgets per entry point — fails if a change (e.g. flipping `sideEffects`)
        // breaks tree-shaking or bloats the public surface. Runs on the just-built dist/.
        sh('Size limit', 'bun run --filter=ljkui size'),
        // Compiles every generated fixture module, so a fixture that stops building fails CI.
        sh('Build explorer', 'bun run --filter=ljkui build:explorer'),
        sh('Package health', 'bun run --filter=ljkui health'),
      ],
    },
    deploy: {
      name: 'Deploy',
      needs: 'check',
      'runs-on': RUNNER,
      'timeout-minutes': 20,
      // Commenting the preview URL on the PR.
      permissions: { contents: 'read', 'pull-requests': 'write' },
      steps: [
        checkout(EXPLORER_HISTORY),
        setupBun(BUN_VERSION),
        cacheBunStore(),
        install(),
        // deploy.ts picks production vs preview from the event itself — a
        // pull_request is always a preview — and no-ops with a warning on PRs
        // from forks, where the secrets are absent.
        sh('Vercel', 'bun scripts/deploy.ts', {
          env: { ...VERCEL_ENV, GITHUB_TOKEN: '${{ github.token }}' },
        }),
      ],
    },
    /*
     * There was a `chromatic` job here. It uploaded the Storybook build for an image diff
     * of every story; Chromatic takes a `--storybook-build-dir` and nothing else, so it
     * has no input now that Storybook is gone. Removed rather than left broken — the
     * CHROMATIC_PROJECT_TOKEN secret can stay, unused, in case it comes back.
     */
  },
};

const release: Workflow = {
  name: 'Release',
  on: {
    push: { branches: [MASTER] },
    workflow_dispatch: {
      inputs: {
        deploy: {
          description: 'Also deploy the explorer to production (a push always does)',
          type: 'boolean',
          default: true,
        },
      },
    },
  },
  // Never overlap releases, and never cancel one mid-publish.
  concurrency: { group: 'release', 'cancel-in-progress': false },
  // contents: pushing the version-bump commit back to master.
  // id-token: minting the OIDC token npm trades for publish rights.
  permissions: { contents: 'write', 'id-token': 'write' },
  jobs: {
    release: {
      name: 'Publish + deploy',
      'runs-on': RUNNER,
      'timeout-minutes': 30,
      if: ON_MASTER,
      steps: [
        checkout(EXPLORER_HISTORY),
        setupBun(BUN_VERSION),
        setupNode(NODE_VERSION),
        cacheBunStore(),
        install(),
        cacheTurbo(),
        // Full gate before anything leaves the machine. npm publish re-runs
        // lint + build through prepublishOnly; that's cheap against turbo cache.
        sh('Check', 'bun run check'),
        // No NPM_TOKEN: `id-token: write` above lets npm publish authenticate
        // over OIDC. Setting NODE_AUTH_TOKEN here would send npm back down the
        // legacy token path and silently skip trusted publishing.
        //
        // Two steps rather than one with an inline ternary: on a push the release is
        // conditional on the library having changed, on a manual run it never is.
        sh('Publish to npm', 'bun scripts/release.ts --if-changed', {
          if: "github.event_name == 'push'",
        }),
        sh('Publish to npm (manual)', 'bun scripts/release.ts', {
          if: "github.event_name == 'workflow_dispatch'",
        }),
        // `!cancelled()` rather than the default success(): the explorer is built from
        // source and does not depend on the release landing, so a failed publish (npm
        // outage, OIDC hiccup) must not also hold back the site.
        sh('Deploy to Vercel', 'bun scripts/deploy.ts --prod', {
          if: "!cancelled() && (github.event_name == 'push' || inputs.deploy)",
          env: VERCEL_ENV,
        }),
      ],
    },
  },
};

/** Filename → workflow. The generator treats this map as the whole of `.github/workflows`. */
export const workflows: Record<string, Workflow> = {
  'ci.yml': ci,
  'release.yml': release,
};
