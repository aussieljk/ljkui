import { PropDef } from '../../helpers';

const sizes = ['1', '2', '3', '4', '5', '6'] as const;

const spinnerPropDefs = {
  /**
   * The size of the spinner.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /**
   * Whether the spinner is shown. When `false`, the component renders its
   * children (if any) instead of the spinner.
   * @default true
   */
  loading: { type: 'boolean', default: true },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  loading: PropDef<boolean>;
};

export { spinnerPropDefs };
