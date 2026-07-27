import type { PropDef } from '../../helpers';
import { colorProp, highContrastProp } from '../../helpers';
import { avatarPropDefs } from '../avatar/avatar.props';
import { textPropDefs } from '../typography/text.props';

const skeletonAvatarPropDefs = {
  /**
   * The size of the avatar placeholder, matching Avatar's size scale.
   * @default '3'
   */
  size: avatarPropDefs.size,
  /**
   * The shape of the avatar placeholder, matching Avatar's shapes.
   * @default 'circle'
   */
  shape: avatarPropDefs.shape,
  /**
   * Overrides the theme accent color used for the skeleton's pulse.
   * @default 'gray'
   */
  color: { ...colorProp, default: 'gray' },
  /** Renders a higher-contrast skeleton. */
  highContrast: highContrastProp,
} satisfies {
  size: typeof avatarPropDefs.size;
  shape: PropDef<(typeof avatarPropDefs.shape.values)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

const skeletonTextPropDefs = {
  /**
   * The text size the placeholder mimics, matching Text's size scale.
   * @default '3'
   */
  size: { ...textPropDefs.size, default: '3' },
  /**
   * Overrides the theme accent color used for the skeleton's pulse.
   * @default 'gray'
   */
  color: { ...colorProp, default: 'gray' },
  /** Renders a higher-contrast skeleton. */
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof textPropDefs.size.values)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

const skeletonRectPropDefs = {
  /**
   * Overrides the theme accent color used for the skeleton's pulse.
   * @default 'gray'
   */
  color: { ...colorProp, default: 'gray' },
  /** Renders a higher-contrast skeleton. */
  highContrast: highContrastProp,
} satisfies {
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { skeletonAvatarPropDefs, skeletonRectPropDefs, skeletonTextPropDefs };
