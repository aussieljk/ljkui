'use client';

import * as React from 'react';
import { CANONICAL_ICON_NAMES, type AdapterIconComponent, type CanonicalIconName, type IconAdapter } from './types';

/* -------------------------------------------------------------------------------------------------
 * Global adapter registry
 * -----------------------------------------------------------------------------------------------*/

let registeredAdapter: IconAdapter | null = null;
const listeners = new Set<() => void>();

/**
 * Registers an icon adapter globally. Importing an adapter entrypoint
 * (e.g. `import 'ljkui/icons/lucide'`) calls this for you.
 * The most recently registered adapter wins.
 */
export function registerIconAdapter(adapter: IconAdapter): void {
  registeredAdapter = adapter;
  for (const listener of listeners) listener();
}

/** Returns the globally registered adapter, if any. */
export function getRegisteredIconAdapter(): IconAdapter | null {
  return registeredAdapter;
}

function useRegisteredAdapter(): IconAdapter | null {
  const [adapter, setAdapter] = React.useState(registeredAdapter);
  React.useEffect(() => {
    const listener = () => setAdapter(registeredAdapter);
    listeners.add(listener);
    listener(); // sync in case registration happened between render and effect
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return adapter;
}

/* -------------------------------------------------------------------------------------------------
 * IconProvider (scoped override of the global registration)
 * -----------------------------------------------------------------------------------------------*/

const IconAdapterContext = React.createContext<IconAdapter | null>(null);

export interface IconProviderProps {
  library: IconAdapter;
  children?: React.ReactNode;
}

/** Scopes an icon adapter to a subtree. Takes precedence over `registerIconAdapter`. */
export const IconProvider = ({ library, children }: IconProviderProps) => (
  <IconAdapterContext.Provider value={library}>{children}</IconAdapterContext.Provider>
);
IconProvider.displayName = 'IconProvider';

/** The active adapter: context first, then the global registration. */
export function useIconAdapter(): IconAdapter | null {
  const contextAdapter = React.useContext(IconAdapterContext);
  const registered = useRegisteredAdapter();
  return contextAdapter ?? registered;
}

/** The active adapter's component for a canonical name, or `null`. */
export function useAdapterIcon(name: CanonicalIconName): AdapterIconComponent | null {
  return useIconAdapter()?.icons[name] ?? null;
}

/* -------------------------------------------------------------------------------------------------
 * Icons proxy
 * -----------------------------------------------------------------------------------------------*/

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Convenience: sets both `width` and `height`. */
  size?: number | string;
}

// Local declaration so the dev-only warning compiles without node types;
// bundlers still statically replace `process.env.NODE_ENV`.
declare const process: { env: { NODE_ENV?: string } } | undefined;

const warned = new Set<CanonicalIconName>();

function createIcon(name: CanonicalIconName): React.ComponentType<IconProps> {
  const Icon = ({ size, ...props }: IconProps) => {
    const Impl = useAdapterIcon(name);
    if (!Impl) {
      if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production' && !warned.has(name)) {
        warned.add(name);
        console.warn(
          `[ljkui] No icon adapter provides "${name}". ` +
            `Import an adapter once (e.g. \`import 'ljkui/icons/lucide'\`) ` +
            `or wrap your app in <IconProvider library={...}>.`,
        );
      }
      return null;
    }
    const AnyImpl = Impl as React.ComponentType<Record<string, unknown>>;
    return <AnyImpl {...(size == null ? null : { width: size, height: size })} {...props} />;
  };
  Icon.displayName = `Icon(${name})`;
  return Icon;
}

const canonicalNameSet: ReadonlySet<string> = new Set(CANONICAL_ICON_NAMES);
const iconComponentCache = new Map<CanonicalIconName, React.ComponentType<IconProps>>();

export type IconsMap = { readonly [K in CanonicalIconName]: React.ComponentType<IconProps> };

/**
 * Canonical icon components, resolved through the active adapter at render
 * time: `<Icons.Search />`, `<Icons.ChevronDown />`, … Each member is a
 * stable (cached) component, safe to reference in deps arrays.
 */
export const Icons: IconsMap = new Proxy({} as IconsMap, {
  get(_target, prop) {
    if (typeof prop !== 'string' || !canonicalNameSet.has(prop)) return undefined;
    const name = prop as CanonicalIconName;
    let component = iconComponentCache.get(name);
    if (!component) {
      component = createIcon(name);
      iconComponentCache.set(name, component);
    }
    return component;
  },
  has(_target, prop) {
    return typeof prop === 'string' && canonicalNameSet.has(prop);
  },
  ownKeys() {
    return [...CANONICAL_ICON_NAMES];
  },
  getOwnPropertyDescriptor(target, prop) {
    if (typeof prop !== 'string' || !canonicalNameSet.has(prop)) return undefined;
    return { configurable: true, enumerable: true, value: Icons[prop as CanonicalIconName] };
  },
});
