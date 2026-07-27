/**
 * Publish guard: every release is a prerelease of 0.0.1 (`0.0.1-1`, `0.0.1-2`, …),
 * so the published version never reaches 0.0.2. Run from `prepublishOnly`.
 *
 * Plain `0.0.1` is rejected too: publishing it would outrank every later
 * `0.0.1-N`, and `^0.0.1` ranges don't match prereleases, so consumers would be
 * pinned to that one release forever.
 */
import pkg from '../package.json' with { type: 'json' };

const ALLOWED = /^0\.0\.1-\d+$/;

if (!ALLOWED.test(pkg.version)) {
  console.error(
    `Refusing to publish ${pkg.name}@${pkg.version}.\n` +
      `Versions must look like 0.0.1-<n> (0.0.1-1, 0.0.1-2, …).\n` +
      `Use \`bun run release\`, which runs \`npm version prerelease\` and bumps only the -<n>.`,
  );
  process.exit(1);
}
