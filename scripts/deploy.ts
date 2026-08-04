#!/usr/bin/env bun
/**
 * Deploy the uaight static explorer to Vercel.
 *
 *   bun scripts/deploy.ts            preview deploy
 *   bun scripts/deploy.ts --prod     production deploy
 *
 * In CI the target is inferred instead: a push to master is production, a pull
 * request is a preview whose URL gets commented on the PR.
 *
 * `uaight build` emits a pure static site (`packages/ljkui/dist-uaight`), so we wrap
 * it in a Build Output API bundle (`.vercel/output/static` + a `config.json`) and
 * upload it with `vercel deploy --prebuilt`. `--prebuilt` skips Vercel's build step
 * entirely — the runner does the explorer build, and Vercel just serves the files,
 * regardless of whatever framework preset the project was left on.
 *
 * Needs VERCEL_TOKEN / VERCEL_ORG_ID / VERCEL_PROJECT_ID in CI; locally it uses
 * the .vercel link and your `vercel login` session. A pull request from a fork
 * has no secrets, so the deploy is skipped with a warning rather than failing.
 */
import { existsSync, mkdirSync, copyFileSync, cpSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, PKG, fail, run, capture, step, summary } from './lib.ts';

const STATIC = join(PKG, 'dist-uaight');
const OUTPUT = join(PKG, '.vercel', 'output');
const flags = process.argv.slice(2);
const token = process.env.VERCEL_TOKEN;
const event = process.env.GITHUB_EVENT_NAME;

const production = flags.includes('--prod') || (!flags.includes('--preview') && event === 'push');

if (process.env.CI && !token) {
  if (production) fail('VERCEL_TOKEN is not set — add it under Settings → Secrets and variables → Actions');
  console.warn('⚠ no VERCEL_TOKEN (fork PR?) — skipping the preview deploy');
  process.exit(0);
}

/** `vercel <args>` with the token appended when we have one. */
const vercel = (...args: string[]) => ['bun', 'x', 'vercel', ...args, ...(token ? ['--token', token] : [])];

step(`${production ? 'Production' : 'Preview'} deploy`);

// Build the static explorer (packages/ljkui/dist-uaight).
run(['bun', 'run', 'build:explorer']);

// Wrap it in a Build Output API bundle so `--prebuilt` serves it verbatim, no Vercel-side build.
rmSync(OUTPUT, { recursive: true, force: true });
mkdirSync(OUTPUT, { recursive: true });
cpSync(STATIC, join(OUTPUT, 'static'), { recursive: true });
writeFileSync(join(OUTPUT, 'config.json'), JSON.stringify({ version: 3 }) + '\n');

// Vercel commands run from packages/ljkui so `--prebuilt` finds .vercel/output there. In CI the
// project is identified by VERCEL_ORG_ID/PROJECT_ID; locally, seed the link from the repo-root
// .vercel so `vercel pull` doesn't try to interactively re-link.
const rootLink = join(ROOT, '.vercel/project.json');
const pkgLink = join(PKG, '.vercel/project.json');
if (!process.env.CI && existsSync(rootLink) && !existsSync(pkgLink)) {
  mkdirSync(join(PKG, '.vercel'), { recursive: true });
  copyFileSync(rootLink, pkgLink);
}

run(vercel('pull', '--yes', `--environment=${production ? 'production' : 'preview'}`), { cwd: PKG });

// `vercel deploy` prints the deployment URL on stdout and its progress on stderr.
const out = capture(vercel('deploy', '--prebuilt', ...(production ? ['--prod'] : [])), { cwd: PKG });
const url = out.split('\n').filter(Boolean).at(-1) ?? fail('vercel printed no deployment URL');

console.log(`\n✓ deployed to ${url}`);
summary(`### ▲ ${production ? 'Production' : 'Preview'} explorer deploy\n\n${url}`);

// One rolling comment per PR rather than one per push.
const pr = process.env.GITHUB_REF?.match(/^refs\/pull\/(\d+)\//)?.[1];
if (pr && !production) {
  const body = `▲ **Explorer preview** for \`${process.env.GITHUB_SHA?.slice(0, 7)}\`: ${url}`;
  const comment = (...args: string[]) =>
    Bun.spawnSync(['gh', 'pr', 'comment', pr, '--body', body, ...args], { cwd: ROOT, env: process.env }).exitCode === 0;
  if (!comment('--edit-last', '--create-if-none') && !comment()) {
    console.warn('⚠ could not comment the preview URL on the PR');
  }
}
