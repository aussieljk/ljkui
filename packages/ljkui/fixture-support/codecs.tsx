import {
  CalendarDate,
  CalendarDateTime,
  Time,
  ZonedDateTime,
  parseDate,
  parseDateTime,
  parseTime,
  parseZonedDateTime,
} from '@internationalized/date';
import * as React from 'react';
import { type CodecEditorProps, defineCodec } from '@aussieljk/uight';

/*
 * Codecs for the `@internationalized/date` value types.
 *
 * Calendar, DateField, DatePicker, DateRangePicker and RangeCalendar all pass `CalendarDate`
 * and friends around. Without a codec the serializer classifies them as `opaque` — visible
 * in the control panel but not editable, and impossible to put in a share link, because an
 * opaque value is only a label plus a handle into the renderer's realm.
 *
 * Each of these types round-trips losslessly through its own ISO string (`toString()` is the
 * exact inverse of the matching `parse*`), which is the whole job: `serialize` must return
 * something structured-cloneable, and `deserialize` must rebuild the real instance so the
 * component still receives a `CalendarDate` and not a string.
 *
 * A JS `Date` needs nothing here — uight ships `dateCodec` among its built-ins, and
 * consumer codecs are tested first, so ours never shadow it by accident.
 */

/** `<input type="date">` etc. want `YYYY-MM-DD`; the ISO string is already that shape. */
function IsoEditor({ value, onChange, label, disabled, type }: CodecEditorProps<string> & { type: string }) {
  return (
    <input
      type={type}
      aria-label={label}
      disabled={disabled}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      style={{ font: 'inherit', width: '100%' }}
    />
  );
}

const dateEditor = (props: CodecEditorProps<string>) => <IsoEditor {...props} type="date" />;
const dateTimeEditor = (props: CodecEditorProps<string>) => <IsoEditor {...props} type="datetime-local" />;
const timeEditor = (props: CodecEditorProps<string>) => <IsoEditor {...props} type="time" />;

export const codecs = [
  defineCodec<CalendarDate, string>({
    name: 'CalendarDate',
    test: (value): value is CalendarDate => value instanceof CalendarDate,
    serialize: (value) => value.toString(),
    deserialize: (data) => parseDate(data),
    label: (value) => value.toString(),
    editor: dateEditor,
  }),

  defineCodec<CalendarDateTime, string>({
    name: 'CalendarDateTime',
    test: (value): value is CalendarDateTime => value instanceof CalendarDateTime,
    serialize: (value) => value.toString(),
    deserialize: (data) => parseDateTime(data),
    label: (value) => value.toString(),
    editor: dateTimeEditor,
  }),

  /*
   * `ZonedDateTime` before the others would be wrong only if it subclassed them; it does not,
   * but the ordering is kept explicit anyway — `test` runs in array order and the first match
   * wins, so a broader type must never sit ahead of a narrower one.
   */
  defineCodec<ZonedDateTime, string>({
    name: 'ZonedDateTime',
    test: (value): value is ZonedDateTime => value instanceof ZonedDateTime,
    serialize: (value) => value.toString(),
    deserialize: (data) => parseZonedDateTime(data),
    label: (value) => value.toString(),
  }),

  defineCodec<Time, string>({
    name: 'Time',
    test: (value): value is Time => value instanceof Time,
    serialize: (value) => value.toString(),
    deserialize: (data) => parseTime(data),
    label: (value) => value.toString(),
    editor: timeEditor,
  }),
];
