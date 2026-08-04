/**
 * The repo's CI/CD, in TypeScript. `bun run workflows` renders this file to
 * `.github/workflows/*.yml`; never edit the YAML by hand (CI checks it matches).
 *
 * Two workflows:
 *
 *   ci.yml       every PR and every push to master — one `check` job (format,
 *                lint, typecheck, build, package health, this
 *                file's YAML being in sync), then a Vercel deploy: a preview
 *                URL commented on the PR, production on master.
 *
 *   release.yml  manual button (Actions → Release → Run workflow). Bumps
 *                0.0.1-N → N+1, publishes to npm, pushes the version commit and
 *                deploys production. The CI-side equivalent of `bun run prod`.
 *
 * Both run on GitHub-hosted `ubuntu-latest` runners.
 *
 * npm needs no token at all: the release publishes over OIDC (trusted
 * publishing), configured against this repo + `release.yml` on npmjs.com.
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

const MASTER = 'master';
const ON_MASTER = `github.ref == 'refs/heads/${MASTER}'`;

const VERCEL_ENV = {
  VERCEL_TOKEN: '${{ secrets.VERCEL_TOKEN }}',
  VERCEL_ORG_ID: '${{ secrets.VERCEL_ORG_ID }}',
  VERCEL_PROJECT_ID: '${{ secrets.VERCEL_PROJECT_ID }}',
};

const ci: Workflow = {
  name: 'CI',
  on: {
    push: { branches: [MASTER] },
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
        checkout(),
        setupBun(BUN_VERSION),
        cacheBunStore(),
        install(),
        cacheTurbo(),
        // Cheap and pure-text first, so a formatting nit fails in seconds.
        sh('Workflows in sync', 'bun run workflows:check'),
        sh('Format', 'bun run format:check'),
        sh('Lint', 'bun run lint'),
        // Every component must ship a *.props.ts (or be exempt) — no silent prop-table gaps.
        sh('Props coverage', 'bun run --filter=ljkui check:props'),
        // Every component must have a barrel index.ts and an examples module — no half-landed components.
        sh('Component shape', 'bun run --filter=ljkui check:shape'),
        // Root fui-* modifiers must go through rootClassName — no drifting per-component copies.
        sh('Root className', 'bun run --filter=ljkui check:root-class'),
        // Every component stylesheet must be imported by index.css — no silently-unstyled components.
        sh('CSS registration', 'bun run --filter=ljkui check:css-index'),
        // The committed token snapshot must match the color CSS — a palette edit can't sneak in.
        sh('Token snapshot', 'bun run --filter=ljkui check:tokens'),
        // Hand-authored explorer pieces (tools, guides, examples fileMeta) must stay wired —
        // fixtures/ is generated, so an orphan is otherwise invisible.
        sh('Explorer wiring', 'bun run --filter=ljkui check:explorer'),
        // The Vite prebundle list is generated from the sources; a new dep must not drift it.
        sh('Prebundle list', 'bun run --filter=ljkui check:prebundle'),
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
        checkout(),
        setupBun(BUN_VERSION),
        cacheBunStore(),
        install(),
        // deploy.ts picks production vs preview from the event itself, and
        // no-ops with a warning on PRs from forks, where the secrets are absent.
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
    workflow_dispatch: {
      inputs: {
        deploy: {
          description: 'Also deploy the explorer to production',
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
        checkout(),
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
        sh('Publish to npm', 'bun scripts/release.ts'),
        sh('Deploy to Vercel', 'bun scripts/deploy.ts --prod', {
          if: '${{ inputs.deploy }}',
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
