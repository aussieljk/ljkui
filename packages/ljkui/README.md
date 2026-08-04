<h1 align="center">ljkui</h1>

<p align="center">ljkui — a React design system with a themeable component library, SwiftUI-style layout primitives, and pluggable icon sets</p>

<h3 align="center">
  <a href="https://ljkui.vercel.app">Documentation (uaight explorer)</a>
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
