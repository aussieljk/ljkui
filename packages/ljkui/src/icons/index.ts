export {
  getRegisteredIconAdapter,
  IconProvider,
  Icons,
  registerIconAdapter,
  useAdapterIcon,
  useIconAdapter,
} from './registry';
export type { IconProps, IconProviderProps, IconsMap } from './registry';
export { CANONICAL_ICON_NAMES } from './types';
export type { AdapterIconComponent, AdapterIconProps, CanonicalIconName, IconAdapter } from './types';

// Built-in inline-SVG icons used internally by ljkui components.
export {
  CalendarIcon,
  ChevronRightIcon,
  InfoCircledIcon,
  ThickCheckIcon,
  ThickChevronRightIcon,
  TriangleDownIcon,
  XIcon,
} from './internal-icons';
