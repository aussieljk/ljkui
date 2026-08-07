import * as React from 'react';
import { Typography } from 'ljkui';
import { useFixtureInput } from '@aussieljk/uight';
import propsJson from '../src/generated/props.json';

/*
 * Live prop controls, driven by the library's own `*.props.ts` definitions.
 *
 * Storybook's autodocs table was deliberately read-only here (`control: false`): its stories
 * rendered fixed examples, so a knob would have changed nothing. `useFixtureInput` has no
 * such limitation — the value comes back into the render — so a component can be driven
 * directly, and the control values encode into a shareable link.
 *
 * uight has a `docgen` option and an `InputOptions.from: { component, prop }` field that
 * would supply this metadata itself, but neither is implemented in 0.0.1-canary.0 ("No
 * docgen in v1", and `from` is dropped from the serialized `InputOptionsWire`). Reading
 * `props.json` is better here regardless: those are hand-authored prop definitions with real
 * defaults and descriptions, not types recovered by a parser.
 */

interface PropEntry {
  type?: string;
  default?: string;
  description?: string;
  required?: boolean;
}

const PROPS = propsJson as Record<string, Record<string, PropEntry>>;

/** `'"1" | "2" | "3"'` → `['1', '2', '3']`. Returns null when it isn't a string union. */
function stringUnion(type: string | undefined): string[] | null {
  if (!type || !type.includes('|')) return null;
  const parts = type.split('|').map((part) => part.trim());
  if (!parts.every((part) => /^"[^"]*"$/.test(part))) return null;
  return parts.map((part) => part.slice(1, -1));
}

/**
 * `Responsive<T>` → `T`.
 *
 * A prop typed `Responsive<"1" | "2">` accepts either a bare value or a per-breakpoint object.
 * The control drives the bare form — the base value — which is what a playground wants; the
 * per-breakpoint object is a composition concern better shown by a written example.
 */
function unwrapResponsive(type: string | undefined): string | undefined {
  const match = type?.match(/^Responsive<([\s\S]+)>$/);
  return match ? match[1].trim() : type;
}

type Control =
  | { kind: 'select'; options: string[] }
  | { kind: 'checkbox' }
  | { kind: 'number' }
  | { kind: 'text' }
  | null;

/**
 * The control a prop's declared type deserves, or null to leave it alone.
 *
 * Anything structural — a render prop, a `Responsive<…>` object, a ReactNode — is skipped
 * rather than guessed at. A text box that stringifies an element is worse than no control.
 */
function controlFor(prop: PropEntry): Control {
  const type = unwrapResponsive(prop.type?.trim());
  if (!type) return null;

  const options = stringUnion(type);
  if (options) return { kind: 'select', options };
  if (type === 'boolean') return { kind: 'checkbox' };
  if (type === 'number') return { kind: 'number' };
  if (type === 'string') return { kind: 'text' };
  // `string | number` (widths, spacing) — a text box, since the component accepts either.
  if (/^(string \| number|number \| string)$/.test(type)) return { kind: 'text' };
  return null;
}

/** `prop.default` is authored as a source-ish string; coerce it to the control's type. */
function initialValue(control: NonNullable<Control>, raw: string | undefined): string | number | boolean {
  if (control.kind === 'checkbox') return raw === 'true';
  // `Number('')` is 0 and `Number('x')` is NaN — neither is nullish, so guard on the value.
  if (control.kind === 'number') {
    const parsed = Number(raw);
    return raw === undefined || Number.isNaN(parsed) ? 0 : parsed;
  }
  if (control.kind === 'select') return raw ?? control.options[0] ?? '';
  return raw ?? '';
}

/**
 * One `useFixtureInput` per controllable prop.
 *
 * The hook list is derived from `props.json`, which is static for the life of the module, so
 * the number and order of hook calls is stable across renders — the rule this would
 * otherwise break.
 */
function usePropValues(slug: string): Record<string, unknown> {
  const entries = React.useMemo(() => {
    const props = PROPS[slug] ?? {};
    return Object.entries(props)
      .map(([name, prop]) => ({ name, prop, control: controlFor(prop) }))
      .filter((entry): entry is { name: string; prop: PropEntry; control: NonNullable<Control> } => !!entry.control);
  }, [slug]);

  const values: Record<string, unknown> = {};
  for (const { name, prop, control } of entries) {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- `entries` is derived from static JSON; the list never changes between renders.
    const [value] = useFixtureInput(name, initialValue(control, prop.default), {
      control: control.kind === 'select' ? 'select' : control.kind,
      options: control.kind === 'select' ? control.options : undefined,
      description: prop.description,
    });
    /*
     * An unset prop and a prop set to its own default are not the same thing: several
     * components branch on `color === undefined` to inherit the theme accent. Only forward
     * what the user actually moved away from empty.
     */
    if (value !== '' && value !== undefined) values[name] = value;
  }

  return values;
}

const shellStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--space-4)',
  padding: 'var(--space-4)',
};

interface PlaygroundProps {
  slug: string;
  name: string;
  /*
   * Children for a namespace component, supplied by `fileMeta.playground.children` as one of
   * the module's own examples. `Table.Root` with a text child renders nothing meaningful; with
   * a real `Table.Body` inside it, every prop on the root becomes observable.
   */
  renderChildren?: () => React.ReactNode;
  /*
   * Deliberately loose. The props are assembled at runtime from `props.json`, so there is no
   * static relationship between this component's real prop type and what gets spread into it;
   * a narrower type here only forces every generated call site to cast.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- see above
  component: React.ComponentType<any>;
}

export function Playground({ slug, name, component: Component, renderChildren }: PlaygroundProps) {
  const values = usePropValues(slug);
  /*
   * Only leaf components get a text-children control. When the children are supplied as a real
   * example there is nothing sensible to type, and offering the box would just be a way to
   * replace a working table with the word "Table".
   */
  const [children] = useFixtureInput('children', renderChildren ? '' : name, {
    description: renderChildren
      ? 'Fixed for this component — its children come from a real example.'
      : 'Text content. Clear it to render the component with no children.',
  });

  const props = { ...values };
  const content = renderChildren ? renderChildren() : children || undefined;

  return (
    <div style={shellStyle}>
      <Component {...props}>{content}</Component>
      <Typography.Code size="1" color="gray">
        {`<${name}${Object.entries(props)
          .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}={${JSON.stringify(v)}}`))
          .join('')}>`}
      </Typography.Code>
    </div>
  );
}
