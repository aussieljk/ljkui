import { colorProp, highContrastProp } from '../../helpers';

const radioButtonGroupPropDefs = {
  /**
   * Overrides the theme accent color for the selected item's outline and check icon
   * (default undefined = inherit the theme accent).
   */
  color: colorProp,
  /** Renders a higher-contrast selected state. */
  highContrast: highContrastProp,
} satisfies {
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { radioButtonGroupPropDefs };
