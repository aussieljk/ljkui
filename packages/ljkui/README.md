<h1 align="center">ljkui</h1>

<p align="center">ljkui — a React design system with a themeable component library, SwiftUI-style layout primitives, and pluggable icon sets</p>

<h3 align="center">
  <a href="https://ljkui.vercel.app">Documentation (uight explorer)</a>
</h3>

> [!WARNING]
> The design system is still a work in progress so you can expect some breaking changes.

<img width="2270" height="1101" alt="Gray 1" src="https://github.com/user-attachments/assets/abb3b1ca-7445-4438-801c-80bc666b7c54" />

## Getting Started

Install ljkui:

```sh
$ bun add ljkui
```

Import the global CSS file at the root of your application:

```tsx
import 'ljkui/styles.css';
```

> [!NOTE]
> Using Tailwind? Import `styles.css` into the `ljkui` layer, or the global reset
> flattens every heading. See the **Installation & Layers** guide in the docs. In
> development, `<Theme>` warns in the console if it detects this.

Add the Theme component:

```tsx
import { Theme } from 'ljkui';

export default function () {
  return (
    <html>
      <body>
        <Theme>
          <MyApp />
        </Theme>
      </body>
    </html>
  );
}
```

## For AI agents

ljkui ships the docs an agent needs to use it, inside the package.

**TanStack Intent skills** — `skills/getting-started`, `skills/components`, `skills/forms`.
Agents that support [Intent](https://tanstack.com/intent/latest) load these automatically
from `node_modules/ljkui/skills/*/SKILL.md`.

**Cheatsheet** — `node_modules/ljkui/dist/llms.txt`, also at
<https://ljkui.vercel.app/llms.txt>. One page: setup, the rules that break things when
ignored, and every component with the exact values each prop accepts.

**Everything** — `dist/llms-full.txt` / <https://ljkui.vercel.app/llms-full.txt>. All the
guides, plus a working code example for every component.

All of it is generated from the source at build time (`scripts/gen-llms-txt.ts`), so it
cannot drift from the real API.
