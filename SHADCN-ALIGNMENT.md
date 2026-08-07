# shadcn alignment — what changed and why

**Commit:** `54fe998` — *updated package versions, renamed to shadcn names, added missing components*
**Date:** 2026-07-23
**Verified with:** `bun run check` (lint + typecheck + build + publint + attw) — green.

This document covers five changes made in one pass:

1. Every dependency updated to latest.
2. Components renamed to their shadcn/ui equivalents.
3. Dot-namespacing (`<Tabs.List>`) extended to the remaining multi-part components.
4. The twelve shadcn components ljkui was missing, added.
5. The default theme gray changed to `neutral`.

The library went from **78 → 84 barrel exports** (88 component directories, including internal `base-*`
helpers) and **36 → 50 namespaced components**.

---

## 1. Dependencies

Everything was already close to latest — **no major versions were pending**. Both `bun outdated`
tables are now empty.

| Package | From | To | Where |
|---|---|---|---|
| `oxfmt` | 0.59.0 | 0.60.0 | root |
| `oxlint` | 1.74.0 | 1.75.0 | root |
| `turbo` | 2.10.5 | 2.10.6 | root |
| `@types/react` | 19.1.10 | 19.2.17 | root `overrides` |
| `@types/react-dom` | 19.1.10 | 19.2.3 | root `overrides` |
| `lucide-react` | 1.25.0 | 1.26.0 | ljkui |
| `postcss` | 8.5.21 | 8.5.22 | ljkui |
| `react` / `react-dom` | 19.2.7 | 19.2.8 | ljkui |
| `tsdown` | 0.22.12 | 0.22.13 | ljkui |

### Two things to know

**The `@types/react` lag was the root `overrides`, not the package.** `packages/ljkui` already
declared `^19.2.17`, but the root override pinned the whole workspace to `19.1.10`. Bumping the
package alone would have changed nothing — the override has to move too.

**`tools/props-gen` was deliberately excluded from `--latest`.** It pins `typescript@^6.0.3` because
prop-table generation needs the classic-TS compiler API, which the TS7 native compiler does not
expose. `bun update --latest` run at the root would rewrite that range to `^7`, silently breaking
`generate:props`. Update that package by hand, within `^6`, or not at all.

---

## 2. Renames

All twelve families, plus the directory, CSS classes, prop-def names, colocated fixtures and
standalone demos that go with each.

| shadcn name | was | directory | notes |
|---|---|---|---|
| `Input` | `TextField` | `input/` | parts are `Root` / `Control` / `Slot` — see below |
| `Textarea` | `TextArea` | `textarea/` | lowercase `a` |
| `InputOTP` | `OTPField` | `input-otp/` | |
| `Alert` | `Callout` | `alert/` | `AlertDialog` is unchanged and unrelated |
| `Breadcrumb` | `Breadcrumbs` | `breadcrumb/` | singular |
| `Empty` | `EmptyState` | `empty/` | |
| `Carousel` | `ScrollGallery` | `carousel/` | |
| `ToggleGroup` | `SegmentedControl` | `toggle-group/` | family moved together — see below |
| `Chart` | `StackedHorizontalBarChart` | `chart/` | still only one chart type |
| `DataTable` | `DataList` | `data-table/` | distinct from `Table` |
| `Sonner` | `Toast` | `sonner/` | module renamed, exports unchanged — see below |
| `Typography` | `Heading`, `Text`, `Code`, `Em`, `Strong`, `Quote`, `Blockquote` | `typography/` | seven components merged into one namespace |

### Judgment calls inside the renames

**`Input.Control`, not `Input.Input`.** ljkui's TextField is composite: `Root` is a
wrapper, with a separate input element and `Slot`s for icons. The literal rename produced
`Input.Input`. `Control` is Base UI's own vocabulary for the interactive element (`Field.Control`),
so it is borrowed rather than invented.

```tsx
<Input.Root>
  <Input.Slot><SearchIcon /></Input.Slot>
  <Input.Control placeholder="Search…" />
</Input.Root>

<Input.Control placeholder="Search…" />   // standalone — wraps itself in a Root
```

**`Sonner` is the module; `Toaster` is the export.** In shadcn, `sonner.tsx` exports `Toaster`, and
`toast()` comes from the vendored package. ljkui already exported `Toaster` + `toast`, so only the
directory moved. A blanket `Toast → Sonner` replacement would have wrongly renamed the `toast()`
function, `ToastOptions`, `ToastPosition` and friends.

**The SegmentedControl family moved together.** `SegmentedControlNav → ToggleGroupNav`,
`SegmentedControlRadioGroup → ToggleGroupRadioGroup`, `base-segmented-control-list →
base-toggle-group-list`. Leaving the siblings behind would have split one family across two names.

**`Typography` is a namespace, not a component.** shadcn's "Typography" is a documentation page of
prose classes, not an export, so there was nothing to map one-to-one onto. The seven typography
components became parts of a single namespace:

```tsx
<Typography.Heading size="6">Title</Typography.Heading>
<Typography.Text size="2" color="gray">Body copy</Typography.Text>
```

Implementation files stayed separate (`typography/text.tsx`, `typography/heading.tsx`, …) and
`typography.tsx` is just a barrel over them. Internal code that imports a concrete component
(`import { Text } from '../typography/text'`) keeps the flat identifier — only barrel consumers use
the namespace.

---

## 3. Namespacing

Most flat components turned out to be genuinely single-element, so this was much smaller than
expected. Only three needed converting:

| Component | Before | After |
|---|---|---|
| `Grid` | `Grid`, `GridRow` | `Grid.Root`, `Grid.Row` |
| `Overlay` | `Overlay`, `OverlayContent` | `Overlay.Root`, `Overlay.Content` |
| `Calendar` | `Calendar`, `RangeCalendar` | `Calendar.Root`, `Calendar.Range` |

`Card`, `Avatar`, `Button`, `Badge`, `Separator`, `Skeleton`, `Spinner` and the rest export exactly
one element each — there is no `Card.Header` in ljkui the way there is in shadcn — so they stayed
flat, per the "every multi-part component" rule.

`Calendar` also re-exports the `MappedDateValue` type directly, because `export * as Calendar` would
otherwise have buried a type that `DateRangePicker` imports flat.

---

## 4. New components

Twelve added, each with props, CSS, a multi-variant cosmos fixture and a standalone demo.

| Component | Namespace parts | Built on |
|---|---|---|
| `Collapsible` | `Root` `Trigger` `Content` | Base UI `collapsible` |
| `Toggle` | *(flat)* | Base UI `toggle` |
| `AspectRatio` | *(flat)* | CSS `aspect-ratio` |
| `ButtonGroup` | `Root` `Text` `Separator` | composition |
| `InputGroup` | `Root` `Addon` `Input` `Textarea` `Button` `Text` | composition over `Input` |
| `Item` | `Root` `Media` `Content` `Title` `Description` `Actions` `Group` `Separator` | composition |
| `Menubar` | `Root` `Menu` `Trigger` + all `DropdownMenu` parts | Base UI `menubar` + `menu` |
| `NavigationMenu` | `Root` `List` `Item` `Trigger` `Content` `Link` `Viewport` | Base UI `navigation-menu` |
| `Pagination` | `Root` `Content` `Item` `Link` `Previous` `Next` `Ellipsis` | composition |
| `Command` | `Root` `Input` `List` `Empty` `Group` `Item` `Separator` `Shortcut` `Dialog` | self-contained |
| `Sidebar` | `Provider` `Root` `Trigger` `Rail` `Inset` `Header` `Content` `Footer` `Group` `GroupLabel` `Menu` `MenuItem` `MenuButton` `Separator` + `useSidebar` | composition + `Sheet` |
| `Resizable` | `Root` `Panel` `Handle` | self-contained |

### Notes on the non-trivial ones

**`Menubar` reuses `DropdownMenu`.** Base UI's `Menubar` is only the bar; the menus inside it are
ordinary `Menu.Root`s. So `Menubar` re-exports `DropdownMenu`'s `Item`, `Separator`, `Group`,
`CheckboxItem`, `RadioGroup`, `RadioItem`, `Sub`, `SubTrigger`, `SubContent` unchanged, and adds only
`Root`, `Menu` and `Trigger`. Menu styling stays in one place.

**`Command` is self-contained** (shadcn vendors `cmdk`). Items register with the root, filter
themselves against the search text, and the root owns the highlight. Arrow keys / Home / End / Enter
are handled on the root; focus never leaves the input, and the active item is announced via
`aria-activedescendant`. `Command.Group` hides itself when all of its items are filtered out.
Default filter is a case-insensitive substring match, overridable with `filter`.

**`Sidebar` is the widest surface.** `Provider` holds the open state and binds ⌘B / Ctrl+B. Below
768px `Root` renders as a `Sheet` instead of a docked column. Three `collapsible` modes —
`offcanvas` (default, slides out), `icon` (shrinks to a rail, hides labels), `none`. `MenuButton`
takes a `render` prop so a router `Link` can replace the `<button>`.

**`Resizable` has no effect and no layout thrash.** Sizes stay `null` until the first drag and are
derived from the declared defaults, normalised to 100%. Handles are focusable and movable with the
arrow keys (Shift for larger steps), and both neighbours' `minSize` are respected on every path.

### The `Toggle` / `ToggleGroup` tension

Worth knowing: in shadcn, `ToggleGroup` is a group of `Toggle`s. In ljkui, `ToggleGroup` is the
renamed segmented control — a different visual with a sliding indicator — and the new `Toggle` is an
independent standalone pressable. They share a name prefix but not an implementation. If that
bothers you, the honest fix is renaming the segmented control to something else rather than
reworking `Toggle`.

---

## 5. Default gray

`packages/ljkui/src/theme-options.tsx` used to expose a `grayColor` prop, defaulted here to
`neutral`. **That prop no longer exists** — the gray scale is fixed to `neutral` and is not
themeable. `.ljkui` maps `--gray-*` at `--neutral-*` unconditionally in
`src/styles/tokens/palettes.css`.

Note this was the **theme** gray. Component-level `color="gray"` defaults (`Separator`, `Skeleton`,
`InputOTP`) refer to the semantic gray token and were left alone — they follow whatever the theme
resolves `--gray-*` to, so they pick up `neutral` automatically.

---

## Gotchas discovered along the way

Things that cost time and would cost it again.

**Base UI's OTP module is `otp-field`, exporting `OTPField`.** The `OTPField → InputOTP` rename
caught the import path and produced `@base-ui/react/input-otp`, which does not exist. The local alias
is renamed; the import is not:

```ts
import { OTPField as InputOTPPrimitive } from '@base-ui/react/otp-field';
```

**`HStack` / `VStack` are SwiftUI-shaped, not Tailwind-shaped.** They take `spacing={number}` (pixels)
and `alignment` — `top`/`center`/`bottom` for `HStack`, `leading`/`center`/`trailing` for `VStack`.
There is no `gap`, no `align`, and no `justify`; use `style={{ justifyContent }}` for the last one.

**stylelint bans type selectors entirely** (`selector-max-type: 0`). `& > :where(img, video)` and
`:not(svg)` both fail. Structural selectors like `:not(:first-child)` are fine.

**Only seven internal icons exist**: `CalendarIcon`, `ChevronRightIcon`, `InfoCircledIcon`,
`ThickCheckIcon`, `ThickChevronRightIcon`, `TriangleDownIcon`, `XIcon`. There is no left chevron and
no search icon — `Pagination.Previous` uses a CSS-flipped right chevron
(`.fui-PaginationChevronStart { transform: scaleX(-1) }`).

**Fixtures are default-exported objects**, keys are the variant names — not React components:

```tsx
export default {
  Default: <Thing />,
  Disabled: <Thing disabled />,
};
```

Demos in `packages/ljkui/demos/` are the opposite: a single default-exported function
component, importing from `ljkui` (aliased to `src/`) because the source is shown
verbatim to users.

**`bun run new:component <name> [--namespace]`** wires the barrel, the CSS aggregate, a fixture and a
demo for you. It also always writes a `<name>.props.ts`; delete it and simplify `index.ts` when props
come from a Base UI primitive instead.

**zsh does not word-split unquoted variables.** `set -- $pair` inside a `for` loop silently does
nothing — a shell idiom that works in bash and quietly fails here.

---

## Verification

| Check | Result |
|---|---|
| `bun run typecheck` | pass |
| `bun run lint` (oxlint + stylelint) | 0 warnings, 0 errors |
| `bun run build` | pass — 50 namespace definitions, 150 facade re-exports rewritten |
| `bun run generate:props` | 299 components extracted |
| `bun run check` (all of the above + publint + attw) | pass |
| Browser / visual | **not run** — nothing has been rendered |

`scripts/fix-namespace-exports.ts` ran correctly after the build, which matters: rolldown lowers
`export * as Typography` into materialized getters that break React Server Components, and there are
now fourteen more namespaces relying on that fixup than before.

---

## Not done / worth revisiting

**Nothing has been rendered in a browser.** Typecheck and lint prove the code compiles and the CSS
parses; they prove nothing about whether `Sidebar`'s icon-collapse mode looks right, whether
`NavigationMenu`'s viewport animates, or whether `Resizable`'s drag feels correct. Run
`bun run dev` and page through the new fixtures, or `bun run screenshot --filter <name>`.

**`Typography` was probably the wrong call.** `Text` and `Heading` accounted for roughly 2,800 of the
~4,000 JSX usages rewritten, and every one of them is now longer for no functional gain. shadcn's
Typography is not a component, so this rename mapped onto nothing real. Reverting just this one is
contained — the other eleven renames do not depend on it.

**`InputGroup` is largely an alias for `Input`.** `InputGroup.Root` *is* `Input.Root`;
`InputGroup.Addon` *is* `Input.Slot`. It is documented as a compatibility surface, but there are now
two names for one thing. Fine if the goal is that shadcn code pastes in unchanged; redundant
otherwise.

**`Chart` is still one chart.** The rename gives it shadcn's name but not shadcn's generality — it is
a stacked horizontal bar chart, not a Recharts wrapper. Anyone reaching for `Chart` expecting to
pass arbitrary series will be surprised.

**No back-compatibility aliases were added.** Per the repo's stated position on migrations, the old
names are simply gone. Anything outside this repo importing `TextField`, `Callout`, `Text` etc. will
break at the import.

**Docs were not swept.** `CLAUDE.md` and any prose referencing old component names were not updated
beyond the two stale doc comments found in `calendar.tsx` and `date-range-picker.tsx`.

**Seven "orphan" demos remain** — `demos/{text,heading,code,em,strong,quote,blockquote}.fixture.tsx`
no longer have a matching component directory, since all seven live in `typography/`. They compile
and render fine, and `icons` / `layout` were already orphans by that definition, so this is cosmetic.
Consolidate into one `typography.fixture.tsx` if you would rather the demo list mirror the component
list.
