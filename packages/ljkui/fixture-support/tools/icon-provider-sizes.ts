/**
 * Approximate per-provider icon weight, for the "provider comparison" story.
 *
 * WHY THIS FILE EXISTS: a Storybook story can't run the bundler, so these are
 * hand-looked-up numbers rather than live measurements. They're derived from the
 * *installed* provider packages (versions below) by gzipping a representative
 * single-icon ES module and the shared runtime each icon depends on:
 *
 *   $ gzip -c node_modules/<pkg>/<one-icon>.{mjs,js} | wc -c
 *
 * Measurements taken 2026-07-30 against the versions pinned here. `perIconApprox`
 * is the marginal gzipped cost of ONE more icon (the icon's own module), rounded.
 * A provider also pays a one-time shared-runtime cost the first time you import
 * any of its icons (`sharedRuntimeApprox`), amortised across every icon you use.
 *
 * ALL NUMBERS ARE APPROXIMATE — real output depends on your bundler, minifier,
 * and how many icons you import. Treat them as relative guidance, not a contract.
 */

export interface ProviderSize {
  /** Adapter name as exposed by the ljkui adapter (`IconAdapter.name`). */
  provider: string;
  /** npm package(s) the adapter imports from. */
  package: string;
  /** Installed version(s) these numbers were measured against. */
  version: string;
  /** Marginal gzipped size of one more icon, approximate. */
  perIconApprox: string;
  /** One-time shared runtime cost, paid once per provider, amortised. */
  sharedRuntimeApprox: string;
  /** Do named imports drop the unused icons? (all ship `sideEffects: false`). */
  treeShakes: boolean;
  notes: string;
}

export const PROVIDER_SIZES: readonly ProviderSize[] = [
  {
    provider: 'lucide',
    package: 'lucide-react',
    version: '1.26.0',
    // dist/esm/icons/house.mjs -> 399 B gz; shared Icon.mjs + createLucideIcon.mjs -> ~1.2 KB gz
    perIconApprox: '~0.4 KB',
    sharedRuntimeApprox: '~1.2 KB',
    treeShakes: true,
    notes: 'Per-icon ES modules; named imports keep only what you use. The library default.',
  },
  {
    provider: 'heroicons',
    package: '@heroicons/react',
    version: '2.2.0',
    // 24/outline/esm/HomeIcon.js -> 518 B gz; each icon is a self-contained forwardRef, negligible shared runtime
    perIconApprox: '~0.5 KB',
    sharedRuntimeApprox: '~0 KB',
    treeShakes: true,
    notes: 'Self-contained forwardRef per icon with inline SVG. Import from a style subpath (24/outline).',
  },
  {
    provider: 'hugeicons',
    package: '@hugeicons/react + @hugeicons/core-free-icons',
    version: '1.1.9 + 4.2.3',
    // core-free-icons/dist/esm/Home01Icon.js -> 431 B gz (pure path data); one shared <HugeiconsIcon> component
    perIconApprox: '~0.4 KB',
    sharedRuntimeApprox: '~0.5 KB',
    treeShakes: true,
    notes: 'Icons are plain path-data modules fed to one <HugeiconsIcon> renderer — no per-icon component.',
  },
  {
    provider: 'phosphor',
    package: '@phosphor-icons/react',
    version: '2.1.10',
    // dist/csr/House.es.js -> 227 B gz; shared IconBase.es.js (~500 B) + context.es.js (~162 B) once
    perIconApprox: '~0.2 KB',
    sharedRuntimeApprox: '~0.7 KB',
    treeShakes: true,
    notes: 'Smallest per-icon, but each renders through a shared IconBase + context (weight paid once).',
  },
  {
    provider: 'tabler',
    package: '@tabler/icons-react',
    version: '3.45.0',
    // dist/esm/icons/IconHome.mjs -> 385 B gz; shared createReactComponent runtime once
    perIconApprox: '~0.4 KB',
    sharedRuntimeApprox: '~0.5 KB',
    treeShakes: true,
    notes: 'Huge catalogue (~5k icons) but per-icon modules; named imports keep the barrel from shipping.',
  },
];
