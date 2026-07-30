/**
 * Per-component accessibility reference — keyboard interactions and ARIA notes.
 *
 * `generate-storybook.ts` appends this to each component's autodocs page (the Docs
 * tab), so the a11y contract sits next to the examples rather than being invisible.
 * A slug with no entry here simply gets no a11y section.
 *
 * The keyboard maps follow the WAI-ARIA Authoring Practices patterns that Base UI
 * (and react-aria for the date/calendar components) implement. Keyed by the same
 * kebab slug used everywhere else (`dropdown-menu`, `date-field`, …).
 */
export interface A11y {
  /** [key or key combo, what it does] — rendered as a table on the Docs tab. */
  keyboard?: Array<[string, string]>;
  /** Free-form bullet notes: roles, focus management, screen-reader behaviour. */
  notes?: string[];
}

const menuKeys: Array<[string, string]> = [
  ['`Space` / `Enter`', 'Activate the focused item; open a submenu.'],
  ['`↓` / `↑`', 'Move focus to the next / previous item.'],
  ['`→` / `←`', 'Open the submenu / return to the parent menu.'],
  ['`Home` / `End`', 'Focus the first / last item.'],
  ['`Esc`', 'Close the menu and return focus to the trigger.'],
  ['`A`–`Z`', 'Typeahead: focus the next item starting with that character.'],
];

export const A11Y: Record<string, A11y> = {
  dialog: {
    keyboard: [
      ['`Esc`', 'Close the dialog.'],
      ['`Tab` / `Shift+Tab`', 'Cycle focus within the dialog (focus is trapped).'],
    ],
    notes: [
      'Rendered as `role="dialog"` with `aria-modal="true"`; the rest of the page is inert while open.',
      'Focus moves to the dialog on open and returns to the trigger on close.',
      'Give it an accessible name via the title, or `aria-label` when there is no visible title.',
    ],
  },
  drawer: {
    keyboard: [
      ['`Esc`', 'Close the drawer.'],
      ['`Tab` / `Shift+Tab`', 'Cycle focus within the drawer (focus is trapped).'],
    ],
    notes: ['A modal dialog anchored to an edge — same focus trap and `aria-modal` semantics as `Dialog`.'],
  },
  sheet: {
    keyboard: [
      ['`Esc`', 'Close the sheet.'],
      ['`Tab` / `Shift+Tab`', 'Cycle focus within the sheet.'],
    ],
    notes: ['Edge-anchored modal dialog; focus is trapped and restored to the trigger on close.'],
  },
  popover: {
    keyboard: [
      ['`Esc`', 'Close the popover and return focus to the trigger.'],
      ['`Tab`', 'Move through focusable content inside the popover.'],
    ],
    notes: [
      'The trigger has `aria-expanded` and `aria-controls`; the popover is `role="dialog"` when it holds interactive content.',
      'Closes on outside click and on `Esc`.',
    ],
  },
  tooltip: {
    keyboard: [['`Esc`', 'Dismiss the tooltip while the trigger stays focused.']],
    notes: [
      'Shows on hover and on keyboard focus of the trigger; content is `role="tooltip"` and referenced via `aria-describedby`.',
      'Non-interactive by design — never put focusable content in a tooltip.',
    ],
  },
  'hover-card': {
    keyboard: [['`Esc`', 'Dismiss the card.']],
    notes: ['Opens on hover / focus of the trigger; intended for rich non-essential preview content.'],
  },
  'dropdown-menu': {
    keyboard: [['`Space` / `Enter` / `↓`', 'Open the menu from the trigger.'], ...menuKeys],
    notes: ['Trigger is a `button` with `aria-haspopup="menu"` and `aria-expanded`; items are `role="menuitem"`.'],
  },
  'context-menu': {
    keyboard: [['`Shift+F10` / `Menu`', 'Open the menu at the focused element.'], ...menuKeys],
    notes: ['Opened by right-click or the keyboard menu key; same `role="menu"` semantics as the dropdown menu.'],
  },
  menubar: {
    keyboard: [
      ['`←` / `→`', 'Move between top-level menus.'],
      ['`↓` / `Space` / `Enter`', 'Open the focused menu.'],
      ['`↑` / `↓`', 'Move between items in an open menu.'],
      ['`Esc`', 'Close the open menu.'],
    ],
    notes: ['`role="menubar"` with a single tab stop; arrow keys move focus, matching the APG menubar pattern.'],
  },
  'navigation-menu': {
    keyboard: [
      ['`Tab`', 'Move to the next trigger or link.'],
      ['`Enter` / `Space`', 'Open the focused menu.'],
      ['`Esc`', 'Close the open menu.'],
    ],
    notes: [
      'A site-navigation disclosure pattern (not a `role="menu"`); triggers expose `aria-expanded` / `aria-controls`.',
    ],
  },
  command: {
    keyboard: [
      ['`↑` / `↓`', 'Move through the filtered results.'],
      ['`Enter`', 'Run the highlighted command.'],
      ['`Esc`', 'Close the palette.'],
      ['type', 'Filter the list.'],
    ],
    notes: ['A combobox-backed command palette: the input owns `aria-activedescendant`, results are a `listbox`.'],
  },
  combobox: {
    keyboard: [
      ['`↓` / `↑`', 'Open the list / move the active option.'],
      ['`Enter`', 'Select the active option.'],
      ['`Esc`', 'Close the list, then clear the field.'],
      ['`Home` / `End`', 'Jump to the first / last option.'],
    ],
    notes: ['`role="combobox"` with `aria-expanded` and `aria-activedescendant`; the popup is a `listbox`.'],
  },
  autocomplete: {
    keyboard: [
      ['`↓` / `↑`', 'Open and move through suggestions.'],
      ['`Enter`', 'Accept the highlighted suggestion.'],
      ['`Esc`', 'Dismiss the suggestions.'],
    ],
    notes: ['Editable combobox; typing filters the `listbox` while the text field keeps focus.'],
  },
  select: {
    keyboard: [
      ['`Space` / `Enter` / `↓`', 'Open the listbox.'],
      ['`↑` / `↓`', 'Move the highlighted option.'],
      ['`Enter`', 'Select and close.'],
      ['`Esc`', 'Close without changing the value.'],
      ['`A`–`Z`', 'Typeahead to a matching option.'],
    ],
    notes: [
      'Trigger has `aria-haspopup="listbox"` and `aria-expanded`; options are `role="option"` with `aria-selected`.',
    ],
  },
  tabs: {
    keyboard: [
      ['`←` / `→`', 'Move between tabs (horizontal orientation).'],
      ['`↑` / `↓`', 'Move between tabs (vertical orientation).'],
      ['`Home` / `End`', 'Focus the first / last tab.'],
      ['`Space` / `Enter`', 'Activate the focused tab (manual activation).'],
    ],
    notes: ['`role="tablist"` with a roving tabindex; each tab points at its panel via `aria-controls`.'],
  },
  accordion: {
    keyboard: [
      ['`Enter` / `Space`', 'Toggle the focused section.'],
      ['`↓` / `↑`', 'Move focus between headers.'],
      ['`Home` / `End`', 'Focus the first / last header.'],
    ],
    notes: ['Each header is a `button` with `aria-expanded` and `aria-controls` pointing at its `region` panel.'],
  },
  collapsible: {
    keyboard: [['`Enter` / `Space`', 'Toggle the panel.']],
    notes: ['Trigger button carries `aria-expanded` and `aria-controls`.'],
  },
  checkbox: {
    keyboard: [['`Space`', 'Toggle checked / unchecked.']],
    notes: [
      '`role="checkbox"` with `aria-checked` (`"mixed"` when indeterminate); label the control with a `<label>` or `aria-label`.',
    ],
  },
  'radio-group': {
    keyboard: [
      ['`↑` / `↓` / `←` / `→`', 'Move selection between radios (single tab stop).'],
      ['`Space`', 'Select the focused radio.'],
    ],
    notes: ['`role="radiogroup"` wrapping `role="radio"` options; arrow keys move both focus and selection.'],
  },
  'radio-button-group': {
    keyboard: [
      ['`↑` / `↓` / `←` / `→`', 'Move selection.'],
      ['`Space`', 'Select the focused option.'],
    ],
    notes: ['Radio-group semantics rendered as a segmented button set.'],
  },
  switch: { keyboard: [['`Space` / `Enter`', 'Toggle on / off.']], notes: ['`role="switch"` with `aria-checked`.'] },
  toggle: {
    keyboard: [['`Space` / `Enter`', 'Toggle pressed state.']],
    notes: ['A button with `aria-pressed` reflecting its state.'],
  },
  'toggle-group': {
    keyboard: [
      ['`←` / `→`', 'Move between items.'],
      ['`Space` / `Enter`', 'Toggle the focused item.'],
    ],
    notes: ['Single tab stop with a roving tabindex; single- or multiple-selection via `aria-pressed`.'],
  },
  slider: {
    keyboard: [
      ['`←` / `↓`', 'Decrease by one step.'],
      ['`→` / `↑`', 'Increase by one step.'],
      ['`Page Up` / `Page Down`', 'Change by a larger step.'],
      ['`Home` / `End`', 'Jump to the minimum / maximum.'],
    ],
    notes: ['Each thumb is `role="slider"` with `aria-valuenow` / `aria-valuemin` / `aria-valuemax`.'],
  },
  'number-field': {
    keyboard: [
      ['`↑` / `↓`', 'Increment / decrement by the step.'],
      ['`Page Up` / `Page Down`', 'Change by a larger step.'],
      ['`Home` / `End`', 'Set to the minimum / maximum.'],
    ],
    notes: ['`role="spinbutton"` with `aria-valuenow`; the stepper buttons are labelled and focus stays in the field.'],
  },
  'input-otp': {
    keyboard: [
      ['`0`–`9`', 'Fill the current cell and advance.'],
      ['`←` / `→`', 'Move between cells.'],
      ['`Backspace`', 'Clear the current cell and step back.'],
      ['paste', 'Distribute a pasted code across the cells.'],
    ],
    notes: ['Presented as a single labelled input to assistive tech; individual cells are visual.'],
  },
  'date-field': {
    keyboard: [
      ['`←` / `→`', 'Move between the day / month / year segments.'],
      ['`↑` / `↓`', 'Increment / decrement the focused segment.'],
      ['`0`–`9`', 'Type a value into the focused segment.'],
      ['`Backspace`', 'Clear the focused segment.'],
    ],
    notes: ['Segmented `spinbutton`s (react-aria) — locale-aware, with each segment individually announced.'],
  },
  calendar: {
    keyboard: [
      ['`←` / `→`', 'Previous / next day.'],
      ['`↑` / `↓`', 'Previous / next week.'],
      ['`Page Up` / `Page Down`', 'Previous / next month.'],
      ['`Home` / `End`', 'Start / end of the week.'],
      ['`Enter` / `Space`', 'Select the focused date.'],
    ],
    notes: ['`role="grid"` calendar (react-aria); the focused date is a single tab stop and changes are announced.'],
  },
  'range-calendar': {
    keyboard: [
      ['`←` `→` `↑` `↓`', 'Move the focused date.'],
      ['`Enter`', 'Set the range start, then the range end.'],
      ['`Esc`', 'Cancel an in-progress selection.'],
    ],
    notes: ['Grid calendar for a start/end range; the highlighted range is announced as it grows.'],
  },
  'date-picker': {
    keyboard: [
      ['`↓` / `Enter`', 'Open the calendar from the field.'],
      ['`Esc`', 'Close the calendar.'],
    ],
    notes: ['A `DateField` plus a popover `Calendar`; see both for their segment and grid keys.'],
  },
  'date-range-picker': {
    keyboard: [
      ['`↓` / `Enter`', 'Open the range calendar.'],
      ['`Esc`', 'Close it.'],
    ],
    notes: ['Two date fields plus a popover `RangeCalendar`.'],
  },
  pagination: {
    keyboard: [
      ['`Tab`', 'Move between page links.'],
      ['`Enter` / `Space`', 'Go to the focused page.'],
    ],
    notes: ['A `nav` labelled "pagination"; the current page carries `aria-current="page"`.'],
  },
  carousel: {
    keyboard: [
      ['`←` / `→`', 'Previous / next slide.'],
      ['`Tab`', 'Reach the previous/next controls and slide content.'],
    ],
    notes: [
      'Region labelled as a carousel; the previous/next buttons are labelled and slides use `aria-roledescription="slide"`.',
    ],
  },
  sidebar: {
    keyboard: [
      ['`Tab`', 'Move through navigation items.'],
      ['`Enter` / `Space`', 'Activate the focused item or toggle a group.'],
    ],
    notes: ['A `nav` landmark; collapsible groups expose `aria-expanded`, the active item `aria-current`.'],
  },
  breadcrumb: {
    notes: ['A `nav` labelled "breadcrumb" wrapping an ordered list; the last crumb uses `aria-current="page"`.'],
  },
  'data-table': {
    keyboard: [
      ['`Tab`', 'Reach interactive cells, sort headers and controls.'],
      ['`Enter` / `Space`', 'Toggle sorting on a sortable header.'],
    ],
    notes: ['Sortable column headers expose `aria-sort`; selection checkboxes are individually labelled.'],
  },
  table: { notes: ['Semantic `<table>` markup — `<th scope>` for headers, caption for the accessible name.'] },
  field: {
    notes: [
      'Associates a label, description and error with the control via `aria-describedby` / `aria-invalid`, so the error is announced.',
    ],
  },
  fieldset: { notes: ['A `<fieldset>` with a `<legend>` naming the group of controls.'] },
  form: {
    notes: [
      'Validation messages are wired to their fields via `aria-describedby` and `aria-invalid`; the first invalid field receives focus on submit.',
    ],
  },
  'icon-button': { notes: ['Icon-only button — always give it an `aria-label`, since there is no visible text.'] },
  avatar: {
    notes: ['Provide `alt` text; the fallback initials/icon are hidden from assistive tech when an image loads.'],
  },
  progress: {
    notes: [
      '`role="progressbar"` with `aria-valuenow` / `aria-valuemin` / `aria-valuemax`; omit `aria-valuenow` for indeterminate.',
    ],
  },
  'circular-progress': { notes: ['`role="progressbar"` with the same value attributes as the linear progress bar.'] },
};
