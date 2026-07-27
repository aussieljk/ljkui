import { colorProp } from '../../helpers';

const alertRootPropDefs = {
  /**
   * The color of the alert, applied to its icon, title and description. Inherits the theme accent
   * color when not set.
   */
  color: { ...colorProp, default: undefined },
} satisfies {
  color: typeof colorProp;
};

export { alertRootPropDefs };
