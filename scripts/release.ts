#!/usr/bin/env bun
/**
 * Publish ljkui to npm and push the version bump.
 *
 *   bun scripts/release.ts
 *
 * Runs identically on this laptop (via `bun run prod`) and in the Release
 * workflow; the only CI-specific bits are the npm token and the git identity.
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
 * workflow runs — so the release commit does not kick off a second CI + deploy.
 */
import { CI, PKG, capture, fail, requireCleanTree, run, step, summary, version } from './lib.ts';

/** Trusted publishing landed in npm 11.5.1; older npm silently falls back to token auth. */
const MIN_NPM = [11, 5, 1];

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
