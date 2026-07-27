/**
 * Shared plumbing for the repo scripts — paths, child processes, CI reporting.
 *
 * The release/deploy scripts run in two places (this laptop via `bun run prod`,
 * and GitHub Actions), so anything that differs between the two is decided here
 * or behind `CI`, never duplicated in a workflow.
 */
import { appendFileSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

export const ROOT = resolve(import.meta.dir, '..');
export const PKG = join(ROOT, 'packages/ljkui');
export const CI = !!process.env.CI;

export function fail(message: string): never {
  console.error(`✗ ${message}`);
  process.exit(1);
}

export function step(message: string) {
  console.log(`\n\x1b[1m▸ ${message}\x1b[0m`);
}

/**
 * Tokens reach these commands as argv (`vercel --token …`), so the echoed
 * command line would print them. Actions masks its own secrets in the log; this
 * covers the local runs, and anything the child process prints back at us.
 */
const secrets = ['VERCEL_TOKEN', 'NPM_TOKEN', 'GITHUB_TOKEN']
  .map((name) => process.env[name])
  .filter((value): value is string => !!value);

const redact = (text: string) => secrets.reduce((acc, secret) => acc.replaceAll(secret, '***'), text);

/** Run a command, streaming its output. Any non-zero exit aborts the script. */
export function run(cmd: string[], opts: { cwd?: string; env?: Record<string, string> } = {}) {
  console.log(`$ ${redact(cmd.join(' '))}`);
  const { exitCode } = Bun.spawnSync(cmd, {
    cwd: opts.cwd ?? ROOT,
    env: { ...process.env, ...opts.env },
    stdout: 'inherit',
    stderr: 'inherit',
  });
  if (exitCode !== 0) fail(`${redact(cmd.join(' '))} failed (exit ${exitCode})`);
}

/** Same, but captures stdout instead of streaming it. */
export function capture(cmd: string[], opts: { cwd?: string; env?: Record<string, string> } = {}): string {
  console.log(`$ ${redact(cmd.join(' '))}`);
  const { exitCode, stdout, stderr } = Bun.spawnSync(cmd, {
    cwd: opts.cwd ?? ROOT,
    env: { ...process.env, ...opts.env },
    stderr: 'pipe',
  });
  const out = stdout.toString();
  if (exitCode !== 0) fail(redact(`${cmd.join(' ')} failed (exit ${exitCode})\n${out}${stderr.toString()}`));
  return out.trim();
}

/** Markdown appended to the GitHub Actions job summary; a no-op locally. */
export function summary(markdown: string) {
  const path = process.env.GITHUB_STEP_SUMMARY;
  if (path) appendFileSync(path, `${markdown}\n`);
}

/** Abort unless the working tree is clean (untracked files count). */
export function requireCleanTree() {
  const dirty = capture(['git', 'status', '--porcelain']);
  if (dirty) fail(`uncommitted changes — commit or stash first:\n${dirty}`);
}

/** The published version, read fresh (it changes mid-script during a release). */
export const version = (): string => JSON.parse(readFileSync(join(PKG, 'package.json'), 'utf8')).version;
