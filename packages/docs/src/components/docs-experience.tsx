import * as React from 'react';
import { Check, ChevronDown, Copy, Monitor, Moon, Palette, Smartphone, Sun, Tablet } from 'lucide-react';
import { useTheme as useDocsShellTheme } from 'next-themes';
import {
  Button,
  DropdownMenu,
  IconButton,
  Theme,
  themeAccentColorsOrdered,
  themeGrayColorsGrouped,
  type ThemeOptions,
} from 'ljkui';

type PreviewSize = 'mobile' | 'tablet' | 'desktop';
type Appearance = Exclude<ThemeOptions['appearance'], 'inherit'>;

type DocsPreferences = {
  appearance: Appearance;
  accentColor: string;
  grayColor: string;
  previewSize: PreviewSize;
};

type DocsExperienceValue = DocsPreferences & {
  setAppearance: (value: Appearance) => void;
  setAccentColor: (value: string) => void;
  setGrayColor: (value: string) => void;
  setPreviewSize: (value: PreviewSize) => void;
};

const STORAGE_KEY = 'ljkui:docs-preferences';
const defaults: DocsPreferences = {
  appearance: 'light',
  accentColor: 'blue',
  grayColor: 'neutral',
  previewSize: 'desktop',
};

const DocsExperienceContext = React.createContext<DocsExperienceValue | null>(null);

export function DocsExperienceProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = React.useState(defaults);
  const { setTheme: setDocsShellTheme } = useDocsShellTheme();

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPreferences((current) => ({ ...current, ...JSON.parse(saved) }));
    } catch {
      // A private browsing policy may make localStorage unavailable.
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // Preferences still work for the current session.
    }
  }, [preferences]);

  React.useEffect(() => {
    setDocsShellTheme(preferences.appearance);
  }, [preferences.appearance, setDocsShellTheme]);

  const value = React.useMemo<DocsExperienceValue>(
    () => ({
      ...preferences,
      setAppearance: (appearance) => setPreferences((current) => ({ ...current, appearance })),
      setAccentColor: (accentColor) => setPreferences((current) => ({ ...current, accentColor })),
      setGrayColor: (grayColor) => setPreferences((current) => ({ ...current, grayColor })),
      setPreviewSize: (previewSize) => setPreferences((current) => ({ ...current, previewSize })),
    }),
    [preferences],
  );

  return (
    <DocsExperienceContext.Provider value={value}>
      <Theme
        appearance={preferences.appearance}
        accentColor={preferences.accentColor}
        grayColor={preferences.grayColor}
        hasBackground={false}
      >
        {children}
      </Theme>
    </DocsExperienceContext.Provider>
  );
}

export function useDocsExperience() {
  const context = React.useContext(DocsExperienceContext);
  if (!context) throw new Error('useDocsExperience must be used inside DocsExperienceProvider');
  return context;
}

export function ThemeConfigurator() {
  const preferences = useDocsExperience();
  const [copied, setCopied] = React.useState(false);
  const grayColors = themeGrayColorsGrouped.flatMap((group) => group.values);

  async function copyTheme() {
    await navigator.clipboard.writeText(
      `<Theme appearance="${preferences.appearance}" accentColor="${preferences.accentColor}" grayColor="${preferences.grayColor}">`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button type="button" className="docs-theme-trigger" aria-label="Customize the documentation theme">
          <Palette size={15} />
          <span className="hidden sm:inline">Theme</span>
          <ChevronDown size={13} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" sideOffset={10} className="docs-theme-menu">
        <div className="docs-theme-panel">
          <div className="docs-theme-panel-heading">
            <div>
              <strong>Make it yours</strong>
              <span>Applied across every page and preview.</span>
            </div>
            <div className="docs-appearance-switch" aria-label="Appearance">
              <IconButton
                size="1"
                variant={preferences.appearance === 'light' ? 'solid' : 'ghost'}
                aria-label="Use light appearance"
                onClick={() => preferences.setAppearance('light')}
              >
                <Sun size={14} />
              </IconButton>
              <IconButton
                size="1"
                variant={preferences.appearance === 'dark' ? 'solid' : 'ghost'}
                aria-label="Use dark appearance"
                onClick={() => preferences.setAppearance('dark')}
              >
                <Moon size={14} />
              </IconButton>
            </div>
          </div>

          <fieldset>
            <legend>Accent</legend>
            <div className="docs-color-grid">
              {themeAccentColorsOrdered.map((color) => (
                <button
                  type="button"
                  key={color}
                  title={color}
                  aria-label={`Use ${color} accent`}
                  aria-pressed={preferences.accentColor === color}
                  className="docs-color-swatch"
                  style={{ background: `var(--${color}-700)` }}
                  onClick={() => preferences.setAccentColor(color)}
                >
                  {preferences.accentColor === color ? <Check size={12} /> : null}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="docs-theme-select">
            <span>Gray scale</span>
            <select value={preferences.grayColor} onChange={(event) => preferences.setGrayColor(event.target.value)}>
              {grayColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </label>

          <Button size="2" variant="soft" onClick={copyTheme}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied theme' : 'Copy Theme config'}
          </Button>
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

const previewSizes: Array<{ value: PreviewSize; label: string; icon: React.ReactNode }> = [
  { value: 'mobile', label: 'Mobile', icon: <Smartphone size={14} /> },
  { value: 'tablet', label: 'Tablet', icon: <Tablet size={14} /> },
  { value: 'desktop', label: 'Desktop', icon: <Monitor size={14} /> },
];

export function PreviewToolbar() {
  const { previewSize, setPreviewSize } = useDocsExperience();

  return (
    <div className="docs-preview-toolbar" role="group" aria-label="Preview width">
      {previewSizes.map((option) => (
        <button
          type="button"
          key={option.value}
          title={option.label}
          aria-label={`${option.label} preview`}
          aria-pressed={previewSize === option.value}
          onClick={() => setPreviewSize(option.value)}
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
      <span className="docs-preview-saved">Saved on this device</span>
    </div>
  );
}

export function PreviewFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { previewSize } = useDocsExperience();

  return (
    <div className="docs-preview-stage">
      <div className={`docs-preview-frame docs-preview-${previewSize} ${className}`}>{children}</div>
    </div>
  );
}
