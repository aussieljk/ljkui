import type { PropDef } from '../../helpers';
import { colorProp, highContrastProp } from '../../helpers';

const sizes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const shapes = ['circle', 'square'] as const;

const avatarPropDefs = {
  /**
   * The size of the avatar.
   * @default '3'
   */
  size: { type: 'enum', values: sizes, default: '3' },
  /**
   * The shape of the avatar.
   * @default 'circle'
   */
  shape: { type: 'enum', values: shapes, default: 'circle' },
  /** The color of the fallback background. Inherits the theme accent color when not set. */
  color: { ...colorProp, default: undefined },
  /** Increases color contrast of the fallback for better legibility. */
  highContrast: highContrastProp,
  /**
   * Content shown while the image is loading or when it fails to load. A string is converted to
   * initials (e.g. "Jane Doe" becomes "JD").
   */
  fallback: { type: 'ReactNode', default: undefined, required: true },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  shape: PropDef<(typeof shapes)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
  fallback: PropDef<React.ReactNode>;
};

export { avatarPropDefs };
