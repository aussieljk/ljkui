#!/usr/bin/env bun
/**
 * Publish ljkui to npm and push the version bump.
 *
 *   bun scripts/release.ts
 *   bun scripts/release.ts --if-changed   publish only if this push touched the library
 *
 * Runs identically on this laptop (via `bun run prod`) and in the Release
 * workflow; the only CI-specific bits are the npm token and the git identity.
 *
 * `--if-changed` is what the automatic release on a master push uses: a push that
 * only edited the root docs or the CI definition should deploy the site but not
 * burn a version number. A manual run publishes unconditionally.
 *
 *   1. refuse to run with uncommitted changes
 *   2. in CI, make sure npm is new enough to publish over OIDC
 *   3. bump 0.0.1-N → 0.0.1-N+1 and publish (the package's `release` script;
 *      prepublishOnly runs check-version + lint + build)
 *   4. refresh bun.lock — it records the workspace version, so skipping this
 *      leaves the next `bun install --frozen-lockfile` failing in CI
 *   5. commit package.json + bun.lock and push
 *
 * There is no npm token anywhere. In CI the publish authenticates by trusted
 * publishing: the job's `id-token: write` permission mints an OIDC token that
 * npm trades for scoped, short-lived publish rights, and provenance is attached
 * automatically. Locally it just uses your `npm login` session.
 *
 * The push uses GITHUB_TOKEN, whose pushes deliberately do not trigger further
 * workflow runs. That is load-bearing now that a master push releases: the release
 * commit touches packages/ljkui/package.json, which `--if-changed` counts as a
 * library change, so a triggering push would release forever.
 */
import { readFileSync } from 'node:fs';
import { CI, PKG, ROOT, capture, fail, requireCleanTree, run, step, summary, version } from './lib.ts';

/** Trusted publishing landed in npm 11.5.1; older npm silently falls back to token auth. */
const MIN_NPM = [11, 5, 1];

/**
 * A change under here changes the tarball, so it earns a release. Everything the package
 * publishes lives inside it — including `guides/` and `examples/`, which are compiled into
 * the shipped `dist/llms-full.txt`. Root docs, `ci/` and the root `scripts/` do not.
 */
const PUBLISHED_PATH = 'packages/ljkui/';

/**
 * The files a push changed, or `undefined` when that cannot be determined (a manual run, a
 * first push, a clone too shallow to hold the previous commit). Callers treat `undefined` as
 * "assume it changed" — skipping a release you wanted is worse than an extra version bump.
 */
function pushedFiles(): string[] | undefined {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath) return undefined;

  let before: string | undefined;
  try {
    before = JSON.parse(readFileSync(eventPath, 'utf8')).before;
  } catch {
    return undefined;
  }
  // All-zeros is a branch's first push, which has no diff base.
  if (!before || /^0+$/.test(before)) return undefined;

  const diff = Bun.spawnSync(['git', 'diff', '--name-only', `${before}..HEAD`], { cwd: ROOT });
  if (diff.exitCode !== 0) return undefined;
  return diff.stdout.toString().split('\n').filter(Boolean);
}

if (process.argv.includes('--if-changed')) {
  const files = pushedFiles();
  if (files && !files.some((file) => file.startsWith(PUBLISHED_PATH))) {
    step(`No change under ${PUBLISHED_PATH} in this push — skipping the release`);
    summary(`### 📦 No release\n\nNothing under \`${PUBLISHED_PATH}\` changed, so the npm version is unchanged.`);
    process.exit(0);
  }
}

const olderThanMin = (found: number[]) => {
  for (const [i, min] of MIN_NPM.entries()) {
    const part = found[i] ?? 0;
    if (part !== min) return part < min;
  }
  return false;
};

step('Checking the working tree');
requireCleanTree();

if (CI) {
  if (process.env.NODE_AUTH_TOKEN) {
    fail('NODE_AUTH_TOKEN is set — npm would use legacy token auth instead of trusted publishing');
  }

  const npm = capture(['npm', '--version']);
  if (olderThanMin(npm.split('.').map(Number))) {
    step(`npm ${npm} predates trusted publishing (need ${MIN_NPM.join('.')}) — upgrading`);
    run(['npm', 'install', '-g', 'npm@latest']);
  }

  run(['git', 'config', 'user.name', 'github-actions[bot]']);
  run(['git', 'config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
}

step(`Publishing (from ${version()})`);
run(['bun', 'run', 'release'], { cwd: PKG });

const released = version();

step(`Committing ${released}`);
run(['bun', 'install', '--lockfile-only']);
run(['git', 'commit', '-am', `chore: release ${released}`]);

// HEAD:<branch> so this works from CI's checkout as well as a local branch.
const branch = process.env.GITHUB_REF_NAME ?? capture(['git', 'rev-parse', '--abbrev-ref', 'HEAD']);
run(['git', 'push', 'origin', `HEAD:${branch}`]);

summary(`### 📦 Published \`ljkui@${released}\`\n\nhttps://www.npmjs.com/package/ljkui/v/${released}`);
console.log(`\n✓ published ljkui@${released}`);
