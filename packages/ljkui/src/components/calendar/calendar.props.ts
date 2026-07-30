import type { PropDef } from '../../helpers';

const firstDaysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;
const pageBehaviors = ['visible', 'single'] as const;

// Props for the primary part, `Calendar.Root` (and shared with `Calendar.Range`). Date values
// (`value`, `defaultValue`, `minValue`, `maxValue`, ...) come from `@internationalized/date`; the
// design-system flags are listed here.
const calendarRootPropDefs = {
  /**
   * Whether the calendar is disabled.
   * @default false
   */
  isDisabled: { type: 'boolean', default: false },
  /**
   * Whether the calendar value is immutable.
   * @default false
   */
  isReadOnly: { type: 'boolean', default: false },
  /**
   * Whether to automatically focus the calendar when it mounts.
   * @default false
   */
  autoFocus: { type: 'boolean', default: false },
  /**
   * Whether the current selection is invalid according to application logic.
   */
  isInvalid: { type: 'boolean' },
  /**
   * Controls the behavior of paging. Pagination either advances the visible page by
   * `visibleDuration` (`'visible'`) or by one unit of it (`'single'`).
   * @default 'visible'
   */
  pageBehavior: { type: 'enum', values: pageBehaviors, default: 'visible' },
  /**
   * The day that starts the week.
   */
  firstDayOfWeek: { type: 'enum', values: firstDaysOfWeek },
} satisfies {
  isDisabled: PropDef<boolean>;
  isReadOnly: PropDef<boolean>;
  autoFocus: PropDef<boolean>;
  isInvalid: PropDef<boolean>;
  pageBehavior: PropDef<(typeof pageBehaviors)[number]>;
  firstDayOfWeek: PropDef<(typeof firstDaysOfWeek)[number]>;
};

export { calendarRootPropDefs };
