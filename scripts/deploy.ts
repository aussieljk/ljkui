#!/usr/bin/env bun
/**
 * Deploy the docs site (packages/docs) to Vercel.
 *
 *   bun scripts/deploy.ts            preview deploy
 *   bun scripts/deploy.ts --prod     production deploy
 *
 * In CI the target is inferred instead: a push to master is production, a pull
 * request is a preview whose URL gets commented on the PR.
 *
 * The docs app is TanStack Start + nitro's `vercel` preset, so `vite build`
 * emits a complete `.vercel/output` (Build Output API) under packages/docs. We
 * build here on the runner and upload it with `vercel deploy --prebuilt`, so the
 * CI runner does the work rather than Vercel's builder — no `vercel build`.
 *
 * Needs VERCEL_TOKEN / VERCEL_ORG_ID / VERCEL_PROJECT_ID in CI; locally it uses
 * the .vercel link and your `vercel login` session. A pull request from a fork
 * has no secrets, so the deploy is skipped with a warning rather than failing.
 */
import { existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, fail, run, capture, step, summary } from './lib.ts';

const DOCS = join(ROOT, 'packages/docs');
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

// Build the Build Output API bundle (packages/docs/.vercel/output).
run(['bun', 'run', 'build:docs']);

// Vercel commands run from packages/docs so `--prebuilt` finds .vercel/output there. In CI the
// project is identified by VERCEL_ORG_ID/PROJECT_ID; locally, seed the link from the repo-root
// .vercel so `vercel pull` doesn't try to interactively re-link.
const rootLink = join(ROOT, '.vercel/project.json');
const docsLink = join(DOCS, '.vercel/project.json');
if (!process.env.CI && existsSync(rootLink) && !existsSync(docsLink)) {
  mkdirSync(join(DOCS, '.vercel'), { recursive: true });
  copyFileSync(rootLink, docsLink);
}

run(vercel('pull', '--yes', `--environment=${production ? 'production' : 'preview'}`), { cwd: DOCS });

// `vercel deploy` prints the deployment URL on stdout and its progress on stderr.
const out = capture(vercel('deploy', '--prebuilt', ...(production ? ['--prod'] : [])), { cwd: DOCS });
const url = out.split('\n').filter(Boolean).at(-1) ?? fail('vercel printed no deployment URL');

console.log(`\n✓ deployed to ${url}`);
summary(`### ▲ ${production ? 'Production' : 'Preview'} deploy\n\n${url}`);

// One rolling comment per PR rather than one per push.
const pr = process.env.GITHUB_REF?.match(/^refs\/pull\/(\d+)\//)?.[1];
if (pr && !production) {
  const body = `▲ **Preview deploy** for \`${process.env.GITHUB_SHA?.slice(0, 7)}\`: ${url}`;
  const comment = (...args: string[]) =>
    Bun.spawnSync(['gh', 'pr', 'comment', pr, '--body', body, ...args], { cwd: ROOT, env: process.env }).exitCode === 0;
  if (!comment('--edit-last', '--create-if-none') && !comment()) {
    console.warn('⚠ could not comment the preview URL on the PR');
  }
}
