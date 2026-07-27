/**
 * Validation half of the icon adapter generator, kept free of node API imports.
 */
import { ICON_LIBRARIES, ICON_MAP, LIBRARY_MODULES, type IconLibrary } from './icon-map';

export const CANONICAL_NAMES = Object.keys(ICON_MAP).sort() as (keyof typeof ICON_MAP)[];

export function mappedEntries(lib: IconLibrary): Array<[canonical: string, exportName: string]> {
  return CANONICAL_NAMES.flatMap((name) => {
    const exportName = ICON_MAP[name][lib];
    return exportName == null ? [] : [[name, exportName] as [string, string]];
  });
}

export function unmappedNames(lib: IconLibrary): string[] {
  return CANONICAL_NAMES.filter((name) => ICON_MAP[name][lib] == null);
}

/**
 * Imports each icon library and checks that every export name referenced in
 * `ICON_MAP` actually exists. Returns a list of human-readable problems
 * (empty when everything resolves).
 */
export async function validateIconMap(): Promise<string[]> {
  const problems: string[] = [];
  for (const lib of ICON_LIBRARIES) {
    const specifier = LIBRARY_MODULES[lib];
    let mod: Record<string, unknown>;
    try {
      mod = (await import(/* @vite-ignore */ specifier)) as Record<string, unknown>;
    } catch (error) {
      problems.push(`[${lib}] failed to import "${specifier}": ${String(error)}`);
      continue;
    }
    for (const [canonical, exportName] of mappedEntries(lib)) {
      if (!(exportName in mod) || mod[exportName] == null) {
        problems.push(`[${lib}] "${canonical}" refers to missing export "${exportName}" in "${specifier}"`);
      }
    }
  }
  return problems;
}
