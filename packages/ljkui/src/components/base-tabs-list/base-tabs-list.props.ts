import { colorProp, highContrastProp, PropDef } from '../../helpers';

const sizes = ['1', '2'] as const;

const baseTabsListPropDefs = {
  /**
   * The size of the tab triggers.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /** The color of the active tab indicator and label. Inherits the theme accent color when not set. */
  color: colorProp,
  /** Increases color contrast with the background for better legibility. */
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { baseTabsListPropDefs };
