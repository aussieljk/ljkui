---
name: getting-started
description: >
  Install and set up ljkui in a React app: the package, the stylesheet, the <Theme> wrapper, the Tailwind layer order, and the icon set. Load this before writing any ljkui code, and whenever styles look wrong — unstyled components, Tailwind utilities doing nothing, or missing icons almost always mean the setup is wrong, not the component.
metadata:
  type: core
  library: ljkui
  library_version: '0.0.1'
  framework: react
sources:
  - 'aussieljk/ljkui:packages/ljkui/guides/installation.mdx'
  - 'aussieljk/ljkui:packages/ljkui/guides/getting-started.mdx'
  - 'aussieljk/ljkui:packages/ljkui/guides/icons.mdx'
---

ljkui is a React component library. It ships its own CSS. You import components from
the package root and wrap your app in `<Theme>`.

## Install

```sh
bun add ljkui
```

React is a peer dependency (17, 18 or 19). The package is ESM only — there is no
CommonJS build.

## Set up

Do this once, at the root of your app.

```tsx
import { Theme } from 'ljkui';
import 'ljkui/styles.css';

export default function App() {
  return (
    <Theme>
      <YourApp />
    </Theme>
  );
}
```

That is the whole setup. `<Theme>` needs no props — the defaults are correct for
almost every app. Do not add colour props to it unless you were asked to.

## If the app uses Tailwind

Import the stylesheet into a CSS layer instead. ljkui's stylesheet carries a global
reset. Unlayered CSS beats every layer, so without this the reset silently wins and
Tailwind utilities like `list-disc` and `border` do nothing.

```css
/* the layer statement must come before the imports */
@layer theme, base, ljkui, components, utilities;

@import 'tailwindcss';
@import 'ljkui/styles.css' layer(ljkui);
```

To use ljkui's colour tokens as Tailwind classes (`bg-accent-700`, `text-gray-900`),
add the plugin:

```js
// tailwind.config.js
import { ljkuiThemePlugin } from 'ljkui/tailwind';

export default { plugins: [ljkuiThemePlugin()] };
```

The plugin subpath is `ljkui/tailwind`, and the plugin is a function you call.

## Icons

ljkui ships no icon set and has no opinion about which one you use. Import icons from
your own library and pass them as children:

```sh
bun add lucide-react
```

```tsx
import { Button } from 'ljkui';
import { Search } from 'lucide-react';

<Button>
  <Search />
  Search
</Button>;
```

Inside a `Button` or `IconButton` the icon is sized to match the button's `size`, so an
icon that carries no intrinsic `width` / `height` (heroicons, or a hand-written `<svg>`)
still comes out right. To pick your own size, set it on the icon — a `className` such as
Tailwind's `size-5` wins over the library rule.

Components that need an icon internally (the select tick, the calendar glyph) use a
built-in inline SVG. There is nothing to configure.

## Fonts

ljkui ships no font and no `font-family`. Text inherits the font of the host page. Set
your font on `<body>` as normal. Code-like components (`Typography.Code`, `Kbd`,
`DateField`) use
`var(--font-mono, monospace)` — define `--font-mono` or they fall back to Courier.

Never put `@import url(...)` for a webfont inside ljkui's CSS. A remote `@import` is
only legal at the top of the final stylesheet, so it will be dropped or throw a parse
error. Load webfonts from the document head.

## Server-side rendering

Components are client components. Many touch browser APIs (`ResizeObserver`, portals,
`CSS.supports`) and throw during prerender. In Next.js or TanStack Start, mark the file
that renders them `'use client'`.

## Check it worked

Render a `<Button>`. If it has a background, a border radius and hover styles, the
stylesheet is loaded and `<Theme>` is above it. If it looks like a bare HTML button,
one of those two is missing.
