/**
 * The write-or-check half of every generator in this directory.
 *
 * `gen-css-index`, `gen-prebundle` and `gen-token-snapshot` each grew their own copy of the
 * same shape: build the content, and either write it or — under `--check`, which is how CI
 * runs them — compare against what is on disk and fail with a "run `bun run generate:…`"
 * message. Three copies of a read/compare/exit dance is three chances for one of them to
 * report drift differently from the others.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { relative } from 'node:path';

export const isCheck = () => process.argv.includes('--check');

interface EmitOptions {
  /** The script to name in the drift message, e.g. `bun run generate:prebundle`. */
  regenerate: string;
  /** Extra context printed above the drift message — what changed, in this generator's terms. */
  detail?: string;
}

/**
 * Write `contents` to `path`, or under `--check` fail the process when it has drifted.
 *
 * Returns true when the file was already up to date, so a caller can log accordingly.
 */
export function emit(path: string, contents: string, { regenerate, detail }: EmitOptions): boolean {
  const current = existsSync(path) ? readFileSync(path, 'utf8') : '';
  const label = relative(process.cwd(), path);

  if (current === contents) {
    console.log(`✓ ${label} is up to date.`);
    return true;
  }

  if (isCheck()) {
    console.error(`${label} is out of date — run \`${regenerate}\`.`);
    if (detail) console.error(detail);
    process.exit(1);
  }

  writeFileSync(path, contents);
  console.log(`${label} written.`);
  return false;
}
