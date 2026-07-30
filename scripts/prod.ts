#!/usr/bin/env bun
// Full production release from this laptop: publish ljkui to npm,
// then deploy Storybook to vercel. Sequential — a failing step aborts the
// rest. The Release workflow (`ci/workflows.ts`) runs these same two scripts, so
// this is an escape hatch rather than a second implementation.
//
// Usage: bun run prod

import { run } from './lib.ts';

run(['bun', 'scripts/release.ts']);
run(['bun', 'scripts/deploy.ts', '--prod']);
