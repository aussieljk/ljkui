# Changelog

All notable changes to `ljkui`. The package version stays on `0.0.1-N` (see CLAUDE.md → Publishing),
so entries are grouped by date/commit rather than semver.


### Bug Fixes

- Match live hero to readme collage (069f123)
- Replace static hero with live components (3d5fd52)
- Map bare ljkui/icons to src so typecheck doesn't need dist (7b6c76b)
- Stop npm reifying the workspace on the version bump (0d2bafa)
- Build the library before the docs site in build:docs (9f2cf47)
- Add unrun so tsdown loads its config outside bun (1bdf4b8)
- Fixed ss script + using inter for windows (26e2092)
- Fixed how the namings is displayed on the cosmos (d3b25e5)
- Fixed react cosmos (488f0ac)
- Fixed to use the tailwind palettes as it should (25a14fc)
- Fixed the storybook to work on portless (21aeb97)

### CI/CD

- Drop Blacksmith runners, run everything on ubuntu-latest (b5d2f18)

### Chores

- Release 0.0.1-8 (5d2cace)
- Release 0.0.1-7 (fb77009)
- Release 0.0.1-6 (a1c93e7)
- Release 0.0.1-4 (632d9eb)
- Release 0.0.1-3 (9c56ac2)
- Remove stray --full-page screenshot committed by mistake (9a3bfbd)
- Release 0.0.1-2 (79e0fff)

### Documentation

- Add an Oscar guide page that exercises a spread of components (c4c97ed)

### Features

- Add global theme playground and discovery (39f855e)
- Restore the variant galleries and add a live landing page (cfd63ad)
- Port the prose guide pages (f239792)
- Prop tables generated from frosted propDefs (2b38810)
- Fumadocs docs site on TanStack Start (120239d)
- Publish to npm via OIDC trusted publishing (ec29eb9)
- Replace hardcoded palettes and custom icons with Tailwind palettes and icon libraries (#1) (e76215d)

### Other

- Merge branch 'master' of https://github.com/aussieljk/ljkui (d520438)
- Removed the docs (0638dda)
- Updated all of the stories (91d9b71)
- Added a shit tonne of stories (0a8e918)
- Added a PDF generator (772efd4)
- Added stories for everything (7853de3)
- Improved the colour accuracy (f147e9f)
- Added a storybook (8e55daa)
- Removed the not gray options for gray (87ae233)
- Stopped the font family interference (33edbaf)
- Renamed to ljkui (61f11fa)
- Switch docs layout to notebook mode with top nav

- Use `fumadocs-ui/layouts/notebook` instead of `layouts/docs` for DocsLayout and page components
- Set `nav.mode: 'top'` on the docs layout options (1beebd0)
- Added CI (2f94f66)
- Flattened the cosmos shit (80c3375)
- Added a prod script (7daab0d)
- Create SHADCN-ALIGNMENT.md (a599c13)
- Updated package versions, renamed to shadcn names, added missing components (54fe998)
- Migrated from storybook to react-cosmos (1856596)
- Merged intro and getting started (13fa6d6)
- Improved performance (97b9c6d)
- Improved the performance (789a6e9)
- Tried improving performance (ae289bd)
- Update CLAUDE.md (c3f987a)
- Updated to use the package name (10bf6ea)
- Using correct fonts (ba2a183)
- Improved storybook coverage (0d4f7fb)
- Added vercel config (3a1145c)
- Added some more screenshotting ideas (30ee902)
- Added a screenshots feature (0a134fb)
- Made the storybook the primary/only frontend for this (21b564f)
- Removed the ugly playground and more general improvements (4b56312)
- Made some dev script improvements (d463985)
- Removed all of the bullshit that it just didn't need :) (3db8302)
- Fully got rid of eslint (b79c56d)
- Deleted Ci and tests :) (6526120)
- Deleted a huge bunch of code from this that just wasn't really doing anything (98e1bb1)
- Added changes (8a5fa3c)
- Deleted all of the icons (f6cb21b)
- Added docs + the things i wanted for it to have (ecdbaaa)
- Added a fuck tonne of changes that i asked it to make (9920a24)
- Apparently did everything i needed to, to make this ready (90b3db1)
- Initial upload + still just a plain frosted-ui clone for now (a924f07)

### Refactor

- Remove react-cosmos, deploy the docs site instead (4f0e45b)
