'use client';

import { DirectionProvider, mergeProps, useRender } from '@base-ui/react';
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import classNames from 'classnames';
import * as React from 'react';
import { createAccentScaleStyle } from './helpers/tailwind-palette';
import { isCustomAccentColor, themePropDefs } from './theme-options';

import type { ThemeOptions } from './theme-options';
import { WithThemeEvents } from './use-theme-events';

const noop = () => {};

interface ThemeChangeHandlers {
  onAppearanceChange: (appearance: ThemeOptions['appearance']) => void;
  onAccentColorChange: (accentColor: ThemeOptions['accentColor']) => void;
  onInfoColorChange: (infoColor: ThemeOptions['infoColor']) => void;
  onWarningColorChange: (warningColor: ThemeOptions['warningColor']) => void;
  onSuccessColorChange: (successColor: ThemeOptions['successColor']) => void;
  onDangerColorChange: (dangerColor: ThemeOptions['dangerColor']) => void;
}

interface ThemeContextValue extends ThemeOptions, ThemeChangeHandlers {}
const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

function useThemeContext() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('`useThemeContext` must be used within a `Theme`');
  }
  return context;
}

interface ThemeProps extends ThemeRootProps {}
const Theme = (props: ThemeProps) => {
  const context = React.useContext(ThemeContext);
  const isRoot = context === undefined;
  if (isRoot) {
    return (
      <TooltipPrimitive.Provider>
        <DirectionProvider direction="ltr">
          <ThemeRoot {...props} />
        </DirectionProvider>
      </TooltipPrimitive.Provider>
    );
  }
  return <ThemeImpl {...props} />;
};
Theme.displayName = 'Theme';

interface ThemeRootProps extends ThemeImplPublicProps {}
const ThemeRoot = (props: ThemeRootProps) => {
  const {
    appearance: appearanceProp = themePropDefs.appearance.default,
    accentColor: accentColorProp = themePropDefs.accentColor.default,
    infoColor: infoColorProp = themePropDefs.infoColor.default,
    successColor: successColorProp = themePropDefs.successColor.default,
    warningColor: warningColorProp = themePropDefs.warningColor.default,
    dangerColor: dangerColorProp = themePropDefs.dangerColor.default,
    hasBackground = themePropDefs.hasBackground.default,
    ...rootProps
  } = props;
  const [appearance, setAppearance] = React.useState(appearanceProp);
  React.useEffect(() => setAppearance(appearanceProp), [appearanceProp]);

  const [accentColor, setAccentColor] = React.useState(accentColorProp);
  React.useEffect(() => setAccentColor(accentColorProp), [accentColorProp]);

  const [infoColor, setInfoColor] = React.useState(infoColorProp);
  React.useEffect(() => setInfoColor(infoColorProp), [infoColorProp]);

  const [successColor, setSuccessColor] = React.useState(successColorProp);
  React.useEffect(() => setSuccessColor(successColorProp), [successColorProp]);

  const [warningColor, setWarningColor] = React.useState(warningColorProp);
  React.useEffect(() => setWarningColor(warningColorProp), [warningColorProp]);

  const [dangerColor, setDangerColor] = React.useState(dangerColorProp);
  React.useEffect(() => setDangerColor(dangerColorProp), [dangerColorProp]);

  // Initial appearance on page load when `appearance` is explicitly set to `light` or `dark`
  const ExplicitRootAppearanceScript = React.memo(
    ({ appearance }: { appearance: Exclude<ThemeOptions['appearance'], 'inherit'> }) => (
      <script
        dangerouslySetInnerHTML={{
          __html: `!(function(){try{var d=document.documentElement,c=d.classList;c.remove('light','dark');d.style.colorScheme='${appearance}';c.add('${appearance}');}catch(e){}})();`,
        }}
      ></script>
    ),
    () => true, // Never re-render
  );
  ExplicitRootAppearanceScript.displayName = 'ExplicitRootAppearanceScript';

  // Client-side only changes when `appearance` prop is changed while developing
  React.useEffect(() => updateThemeAppearanceClass(appearanceProp), [appearanceProp]);

  // The dark page background is applied to <body>, which no theme scope reaches, so it
  // names the fixed gray scale directly rather than reading `--gray-10`.
  const darkPageBackground = 'var(--neutral-10)';

  return (
    <>
      {appearance !== 'inherit' && (
        <>
          <ExplicitRootAppearanceScript appearance={appearance} />
          <SyncRootElementAppearance appearance={appearance} />
        </>
      )}

      {hasBackground && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
:root, .light, .light-theme { --color-page-background: white; }
.dark, .dark-theme { --color-page-background: ${darkPageBackground}; }
body { background-color: var(--color-page-background); }
`,
          }}
        />
      )}

      <ThemeImpl
        {...rootProps}
        isRoot
        hasBackground={hasBackground}
        //
        appearance={appearance}
        accentColor={accentColor}
        infoColor={infoColor}
        successColor={successColor}
        warningColor={warningColor}
        dangerColor={dangerColor}
        //
        onAppearanceChange={setAppearance}
        onAccentColorChange={setAccentColor}
        onInfoColorChange={setInfoColor}
        onSuccessColorChange={setSuccessColor}
        onWarningColorChange={setWarningColor}
        onDangerColorChange={setDangerColor}
      />
    </>
  );
};
ThemeRoot.displayName = 'ThemeRoot';

function SyncRootElementAppearance({ appearance }: { appearance: Exclude<ThemeOptions['appearance'], 'inherit'> }) {
  React.useEffect(() => {
    try {
      document.documentElement.style.colorScheme = appearance;
      const cl = document.documentElement.classList;
      const opposite = appearance === 'light' ? 'dark' : 'light';
      if (cl.contains(opposite)) cl.remove(opposite);
      if (!cl.contains(appearance)) cl.add(appearance);
    } catch {
      /* ignore errors */
    }
  }, [appearance]);
  return null;
}

interface ThemeImplProps extends ThemeImplPublicProps, ThemeImplPrivateProps {}
interface ThemeImplPublicProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'dir'>, Partial<ThemeOptions> {
  render?: useRender.ComponentProps<'div'>['render'];
  isRoot?: boolean;
  hasBackground?: boolean;
}
interface ThemeImplPrivateProps extends Partial<ThemeChangeHandlers> {}
const ThemeImpl = (props: ThemeImplProps) => {
  const context = React.useContext(ThemeContext);
  const {
    render,
    isRoot,
    hasBackground,
    children,
    className,
    //
    appearance = context?.appearance ?? themePropDefs.appearance.default,
    accentColor = context?.accentColor ?? themePropDefs.accentColor.default,
    dangerColor = context?.dangerColor ?? themePropDefs.dangerColor.default,
    warningColor = context?.warningColor ?? themePropDefs.warningColor.default,
    successColor = context?.successColor ?? themePropDefs.successColor.default,
    infoColor = context?.infoColor ?? themePropDefs.infoColor.default,
    //
    onAppearanceChange = noop,
    onAccentColorChange = noop,
    onInfoColorChange = noop,
    onSuccessColorChange = noop,
    onWarningColorChange = noop,
    onDangerColorChange = noop,
    //
    ...themeProps
  } = props;
  const isExplicitAppearance = props.appearance !== undefined && props.appearance !== 'inherit';
  const shouldHaveBackground = !isRoot && (hasBackground === true || (hasBackground !== false && isExplicitAppearance));

  // A custom (non-named) accent renders as data-accent-color="custom" plus inline scale
  // vars; the block in tokens/custom-color.css turns them into --accent-*.
  const custom = React.useMemo(() => {
    let style: Record<string, string> | undefined;
    let accentAttr = accentColor;
    if (isCustomAccentColor(accentColor)) {
      try {
        style = createAccentScaleStyle(accentColor);
        accentAttr = 'custom';
      } catch {
        console.warn(`ljkui: unsupported accentColor "${accentColor}". Use #hex, rgb() or oklch().`);
        accentAttr = themePropDefs.accentColor.default;
      }
    }
    return { style, accentAttr };
  }, [accentColor]);

  const element = useRender({
    render,
    props: mergeProps(
      themeProps as React.ComponentProps<'div'>,
      {
        'data-is-root-theme': isRoot ? 'true' : 'false',
        'data-accent-color': custom.accentAttr,
        'data-danger-color': dangerColor,
        'data-warning-color': warningColor,
        'data-success-color': successColor,
        'data-info-color': infoColor,
        ...(custom.style ? { style: custom.style as React.CSSProperties } : null),
        // for nested `Theme` background
        'data-has-background': shouldHaveBackground ? 'true' : 'false',
        className: classNames(
          'ljkui',
          {
            // Only apply theme class to nested `Theme` sections.
            //
            // If it's the root `Theme`, we either rely on
            // - something else setting the theme class when root `appearance` is `inherit`
            // - our script setting it when root `appearance` is explicit
            light: !isRoot && appearance === 'light',
            dark: !isRoot && appearance === 'dark',
          },
          className,
        ),
        children: (
          <>
            {isRoot && <WithThemeEvents />}
            {children}
          </>
        ),
      } as React.ComponentProps<'div'>,
    ),
    defaultTagName: 'div',
  });

  return (
    <ThemeContext.Provider
      value={React.useMemo(
        () => ({
          appearance,
          accentColor,
          dangerColor,
          warningColor,
          successColor,
          infoColor,
          //
          onAppearanceChange,
          onAccentColorChange,
          onInfoColorChange,
          onSuccessColorChange,
          onWarningColorChange,
          onDangerColorChange,
        }),
        [
          appearance,
          accentColor,
          dangerColor,
          warningColor,
          successColor,
          infoColor,
          //
          onAppearanceChange,
          onAccentColorChange,
          onInfoColorChange,
          onSuccessColorChange,
          onWarningColorChange,
          onDangerColorChange,
        ],
      )}
    >
      {element}
    </ThemeContext.Provider>
  );
};
ThemeImpl.displayName = 'ThemeImpl';

function updateThemeAppearanceClass(appearance: ThemeOptions['appearance']) {
  if (appearance === 'inherit') return;
  const root = document.documentElement;

  if (root.classList.contains('light-theme') || root.classList.contains('dark-theme')) {
    root.classList.remove('light-theme', 'dark-theme');
    root.style.colorScheme = appearance;
    root.classList.add(`${appearance}-theme`);
  }

  if (root.classList.contains('light') || root.classList.contains('dark')) {
    root.classList.remove('light', 'dark');
    root.style.colorScheme = appearance;
    root.classList.add(appearance);
  }
}

function resolveAppearanceFromDOM(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light';
  const root = document.documentElement;
  const body = document.body;
  const hasDarkClass =
    root.classList.contains('dark') ||
    root.classList.contains('dark-theme') ||
    body.classList.contains('dark') ||
    body.classList.contains('dark-theme');
  return hasDarkClass ? 'dark' : 'light';
}

interface ReversedThemeProps extends Omit<ThemeProps, 'appearance'> {}
const ReversedTheme = React.memo((props: ReversedThemeProps) => {
  const context = React.useContext(ThemeContext);

  // If we have explicit context appearance, compute directly (most efficient)
  const hasExplicitAppearance = context?.appearance === 'light' || context?.appearance === 'dark';

  const reversedAppearanceFromContext = React.useMemo((): 'light' | 'dark' => {
    if (!hasExplicitAppearance) return 'dark'; // fallback, will be overridden by state
    return context.appearance === 'light' ? 'dark' : 'light';
  }, [context?.appearance, hasExplicitAppearance]);

  // Only use state + DOM watching when we don't have explicit context
  const [domAppearance, setDomAppearance] = React.useState<'light' | 'dark'>(() => resolveAppearanceFromDOM());

  React.useEffect(() => {
    // If we have explicit appearance from context, no need to watch DOM
    if (hasExplicitAppearance) {
      return;
    }

    // Watch for class changes on document.documentElement and document.body
    const updateFromDOM = () => {
      const resolved = resolveAppearanceFromDOM();
      setDomAppearance(resolved);
    };

    // Use MutationObserver to watch for class changes
    const observer = new MutationObserver(() => {
      updateFromDOM();
    });

    // Observe both documentElement and body for class changes
    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [hasExplicitAppearance]);

  // Use context-based when available, otherwise use DOM-based
  const reversedAppearance = hasExplicitAppearance
    ? reversedAppearanceFromContext
    : domAppearance === 'light'
      ? 'dark'
      : 'light';

  // Render Theme with the reversed appearance
  return <Theme {...props} appearance={reversedAppearance} />;
});
ReversedTheme.displayName = 'ReversedTheme';

export { ReversedTheme, Theme, updateThemeAppearanceClass, useThemeContext };
export type { ReversedThemeProps, ThemeProps };
