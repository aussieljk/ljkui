import { colorProp, type PropDef } from '../../helpers';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const shapes = ['circle', 'square'] as const;

const avatarGroupPropDefs = {
  /**
   * The color applied to the group's avatars.
   * @default 'gray'
   */
  color: { ...colorProp, default: 'gray' },
  /**
   * The size of the group's avatars.
   * @default '3'
   */
  size: { type: 'enum', values: sizes, default: '3' },
  /**
   * The shape of the group's avatars.
   * @default 'circle'
   */
  shape: { type: 'enum', values: shapes, default: 'circle' },
} satisfies {
  color: typeof colorProp;
  size: PropDef<(typeof sizes)[number]>;
  shape: PropDef<(typeof shapes)[number]>;
};

export { avatarGroupPropDefs };
