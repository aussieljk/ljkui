# Storybook improvement ideas

Backlog of storybook improvements, roughly ordered by impact. (Three earlier items — docs
coverage backfill, theme toolbar globals, and feeding `component-props.json` into controls —
are already implemented.)

## 1. Turn the screenshot pipeline into visual regression testing

`bun run screenshot` already produces ~600 deterministic screenshots in about a minute, plus a
contact sheet. Add a `--diff` mode (pixelmatch/odiff against a committed or cached baseline
directory, failures surfaced in the contact sheet) and it becomes a real safety net for CSS and
token changes — the class of change this repo makes most and currently verifies by eye. Given
the no-tests/no-CI stance, this is the test suite that fits the project's philosophy.

## 2. Deploy the static Storybook publicly

There's a Vercel config in the repo, and `build-storybook` already bakes in prop tables and
`llms.txt`. The package publishes to npm as `ljkui`, but the docs live at
`ljkui.localhost` — laptop-only. A public URL (linked from `package.json#homepage` and the
README) makes the docs, the Examples gallery, and `llms.txt` reachable by users and by other
people's AI agents.

## 3. Per-demo affordances in `DemoView`

Right now it's live preview + source. High-value additions, all local to
`.storybook/components/demo.tsx`:

- a light/dark toggle on the demo frame itself (rather than flipping the whole page)
- an RTL toggle
- a resize handle or width presets for exercising responsive props

That makes each demo a mini-playground without leaving the docs page.

## 4. Accessibility section in the docs template

No MDX page documents keyboard interactions or ARIA behavior (compare Radix's "Keyboard
Interactions" tables). For menus, dialogs, comboboxes, and sliders this is often what people
come to docs for. A small `<KeyboardTable>` MDX component plus per-component data would slot
into the existing template — and flow into `llms.txt` too.

## 5. Make the Examples page a visual index

Screenshots of every demo already exist — use them (or live thumbnails) as a card grid linking
to each component's docs page. An 80+-component library needs a browsable "what does this
library have?" surface; a flat sidebar list doesn't sell it.

## 6. Sidebar information architecture

Stories are already grouped by title (`Typography/…`, `Layout/…`, `Controls/…`, `Utilities/…`)
— add an explicit `options.storySort` order so groups appear intentionally (guides first, then
component groups), and use Storybook tag badges for things like `unstable`/`internal`. The
`base-*` primitives shouldn't sit alongside public components — filter them out or nest them
under an Internals group.

## 7. Interaction smoke tests via `play` functions

Not a full test suite — just `play` functions on the stateful components (combobox,
date-range-picker, otp-field, toast) that open/type/select. They run visibly in the browser,
double as living documentation of intended interaction, and the screenshot pipeline can capture
the post-interaction state (open menus and dialogs are currently invisible in screenshots since
they only render after a click).
