/**
 * check-skills.ts — validate the TanStack Intent skills in `skills/`.
 *
 * Intent lets a package ship the knowledge needed to use it: an agent reads
 * `skills/<name>/SKILL.md` straight out of node_modules instead of hunting for docs.
 * The registry only indexes packages whose skills parse, so a broken frontmatter field
 * fails silently — nothing errors, the skills are simply never loaded. Hence this gate.
 *
 * Checks the parts that go stale on their own:
 *   - the frontmatter parses and has `name` + `description`
 *   - `name` matches the directory (the spec requires it)
 *   - `metadata.library` / `library_version` match package.json
 *   - `requires` only names skills that exist
 *   - the file is under 500 lines and the description under 1024 characters
 *
 * Run with: bun run check:skills
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(pkgRoot, 'skills');
const pkg = JSON.parse(readFileSync(join(pkgRoot, 'package.json'), 'utf8'));

/** Every release is a prerelease of 0.0.1, so the skills pin the base version. */
const baseVersion = String(pkg.version).split('-')[0];

const errors: string[] = [];

if (!existsSync(skillsDir)) {
  console.error(`✗ ${skillsDir} is missing.`);
  process.exit(1);
}

const names = readdirSync(skillsDir, { withFileTypes: true })
  .filter((e) => e.isDirectory() && !e.name.startsWith('_'))
  .map((e) => e.name);

if (names.length === 0) errors.push('skills/ has no skill directories.');

for (const name of names) {
  const file = join(skillsDir, name, 'SKILL.md');
  const where = `skills/${name}/SKILL.md`;

  if (!existsSync(file)) {
    errors.push(`${where} is missing.`);
    continue;
  }

  const raw = readFileSync(file, 'utf8');
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) {
    errors.push(`${where} has no YAML frontmatter.`);
    continue;
  }

  const meta = Bun.YAML.parse(fm[1]) as Record<string, any>;

  if (meta?.name !== name) errors.push(`${where}: name is "${meta?.name}", must match the directory "${name}".`);
  if (!meta?.description) errors.push(`${where}: description is required.`);
  else if (String(meta.description).length > 1024) errors.push(`${where}: description is over 1024 characters.`);

  if (meta?.metadata?.library !== pkg.name) {
    errors.push(`${where}: metadata.library is "${meta?.metadata?.library}", expected "${pkg.name}".`);
  }
  if (meta?.metadata?.library_version !== baseVersion) {
    errors.push(
      `${where}: metadata.library_version is "${meta?.metadata?.library_version}", expected "${baseVersion}".`,
    );
  }

  for (const dep of (meta?.requires ?? []) as string[]) {
    if (!names.includes(dep)) errors.push(`${where}: requires "${dep}", which is not a skill in skills/.`);
  }

  const lines = raw.split('\n').length;
  if (lines > 500) errors.push(`${where} is ${lines} lines; the spec caps a skill at 500.`);
}

if (!Array.isArray(pkg.files) || !pkg.files.includes('skills')) {
  errors.push('package.json "files" must include "skills", or the skills are not published.');
}
if (!Array.isArray(pkg.keywords) || !pkg.keywords.includes('tanstack-intent')) {
  errors.push('package.json "keywords" must include "tanstack-intent" for the Intent registry to find the package.');
}

if (errors.length) {
  console.error('✗ Intent skills are invalid:');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`✓ ${names.length} Intent skills valid (${names.join(', ')}).`);
