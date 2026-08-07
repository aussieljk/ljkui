---
name: components
description: >
  Write ljkui components correctly and fast: the shared size/variant/color prop vocabulary, the namespace pattern (Tabs.Root, Dialog.Trigger), the render prop for changing the underlying element, layout primitives, spacing tokens, and where to find the full component list. Load whenever building UI with ljkui — picking a component, styling one, composing one, or fixing a component that does not accept the props you expected.
metadata:
  type: framework
  library: ljkui
  library_version: '0.0.1'
  framework: react
requires:
  - getting-started
sources:
  - 'aussieljk/ljkui:packages/ljkui/guides/render-prop.mdx'
  - 'aussieljk/ljkui:packages/ljkui/guides/layout.mdx'
  - 'aussieljk/ljkui:packages/ljkui/guides/typography.mdx'
  - 'aussieljk/ljkui:packages/ljkui/examples'
---

Assumes the app is already set up (see the `getting-started` skill).

## Find the component you need

Every component and every prop value is listed in one file that ships with the package:

```
node_modules/ljkui/dist/llms.txt
```

Read it before guessing a name or a prop. It is one page. For a working code example
per component, plus the full guides, read `node_modules/ljkui/dist/llms-full.txt`.

Both are also at <https://ljkui.vercel.app/llms.txt> and
<https://ljkui.vercel.app/llms-full.txt>.

## The shared prop vocabulary

Most components take the same four props, so learning them once covers the library.

- `size` — `"1"` to `"4"` on most components; some go further. **A string, not a
  number.** `size="2"`, never `size={2}`.
- `variant` — the visual style. Usually `solid`, `soft`, `surface`, `outline` or
  `ghost`. Which ones exist differs per component; check llms.txt.
- `color` — a palette name such as `blue`, `red`, `gray`, or a role name: `danger`,
  `warning`, `success`, `info`. Leave it off to inherit the theme.
- `highContrast` — boolean, darkens text and fills for legibility.

Do not configure theme colours. `<Theme>` with no props is correct for almost every
app. When you need a specific colour, put `color=` on the individual component.

## Namespace components

Anything with multiple parts is exported as one object. You compose the parts; there is
no single all-in-one component and no `items` array prop.

```tsx
import { Tabs, Typography } from 'ljkui';

<Tabs.Root defaultValue="account">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">
    <Typography.Text size="2">Account settings.</Typography.Text>
  </Tabs.Content>
  <Tabs.Content value="settings">
    <Typography.Text size="2">Everything else.</Typography.Text>
  </Tabs.Content>
</Tabs.Root>;
```

The `parts:` list in llms.txt tells you which parts a namespace has. Text is always
`Typography.Text` and `Typography.Heading` — there is no bare `Text` export.

## The render prop

To change the element a component renders, pass an element to `render`. The component
merges its props and classes into yours. This replaces `asChild` and is how you make a
`Button` into a link, or a `Section` into a real `<section>`.

```tsx
<Button render={<a href="/pricing" />}>Pricing</Button>
<Typography.Text render={<div />} size="2">Not a span</Typography.Text>
<Section render={<section />} size="2">…</Section>
```

Pass the element, not a component reference: `render={<a href="/x" />}`, not
`render={Link}`.

## Layout

The layout primitives are SwiftUI-style stacks, not `Flex`/`Box`. `spacing` is a number
of pixels; `alignment` is a named value.

```tsx
<VStack spacing={12} alignment="leading">
  <HStack spacing={8} alignment="center">
    <Avatar size="2" fallback="AL" />
    <Typography.Text size="2">Ada Lovelace</Typography.Text>
  </HStack>
</VStack>
```

- `HStack` — a row. `alignment`: `top | center | bottom | firstTextBaseline | lastTextBaseline`.
- `VStack` — a column. `alignment`: `leading | center | trailing`.
- `ZStack` — layers children on top of each other.
- `Grid.Root` / `Grid.Row` — rows and columns with `horizontalSpacing` / `verticalSpacing`.
- `Container` — caps page width. `size` `1`–`4` (448 / 688 / 880 / 1136 px).
- `Section` — vertical page rhythm. `size` `1`–`4`.
- `Spacer` — pushes siblings apart inside a stack.

Plain CSS, Tailwind classes and `className` all work on every component too. Use
whichever the surrounding code already uses.

## Spacing and colour in your own CSS

Use the tokens rather than hard-coded values, so your CSS follows the theme:

```css
padding: var(--space-3);
color: var(--gray-900);
background: var(--accent-100);
border: 1px solid var(--gray-500);
```

Scale steps are roles, not brightness levels: `10`–`50` backgrounds, `100`–`300` fills,
`400`–`600` borders, `700`–`800` solid, `900`–`950` text. Pick by role. `--gray-*` is
fixed and always the same neutral scale, in light and dark.

## Common shapes

```tsx
// Card
<Card size="2" variant="surface">
  <Typography.Heading size="4">Title</Typography.Heading>
  <Typography.Text size="2" color="gray">Body text.</Typography.Text>
</Card>

// Dialog — the trigger wraps your own button
<Dialog.Root>
  <Dialog.Trigger nativeButton>
    <Button>Edit</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Title>Edit profile</Dialog.Title>
    <Dialog.Description>Make changes here.</Dialog.Description>
    <Dialog.Close render={<Button variant="soft" />}>Done</Dialog.Close>
  </Dialog.Content>
</Dialog.Root>

// Select
<Select.Root defaultValue="apple" size="2">
  <Select.Trigger />
  <Select.Content>
    <Select.Item value="apple">Apple</Select.Item>
    <Select.Item value="orange">Orange</Select.Item>
  </Select.Content>
</Select.Root>

// Table — note the Root/Table pair
<Table.Root variant="surface">
  <Table.Table>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.RowHeaderCell>Ada</Table.RowHeaderCell>
      </Table.Row>
    </Table.Body>
  </Table.Table>
</Table.Root>

// Text input — Root wraps, Control is the <input>
<Input.Root>
  <Input.Control placeholder="Search…" />
</Input.Root>
```

For forms, validation and binding to a form library, load the `forms` skill.

## Mistakes that cost time

- `size={2}` instead of `size="2"`. Sizes are strings.
- Using `<Text>` or `<Heading>` directly. They are `Typography.Text` and
  `Typography.Heading`.
- Reaching for `<Flex>` or `<Box>`. They do not exist — use `HStack` / `VStack`.
- Using `asChild`. It is `render`, and it takes an element.
- Rendering a namespace root alone (`<Tabs.Root />`). Every part is required.
- Setting theme colour props to "match the design". Use `color=` on the component.
