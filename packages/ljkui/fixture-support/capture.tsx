import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Fixture, parseFixtureId } from 'uaight';
/*
 * uaight's own stylesheet is required even though this page shows no chrome: the inline host
 * is styled with uaight's utility classes and its `--u-*` custom properties, so without it the
 * container collapses and the capture comes out blank.
 */
import 'uaight/styles.css';
import '../src/styles/index.css';
import './host.css';

/*
 * The standalone one-fixture page the PDF pipeline screenshots.
 *
 * Storybook had `iframe.html?id=<id>`: a URL that renders exactly one story and nothing else.
 * uaight has no such route — its explorer selects fixtures over the message channel, not
 * through the address bar — so this page provides the equivalent. It reads the fixture from
 * `?fixture=<path>:<name>` and renders it with no chrome.
 *
 * `isolation="inline"` matters: an iframe would put the content in a nested document, and the
 * capture trims the *page* to its painted pixels. Inline puts the fixture in this document,
 * so a full-page screenshot is the fixture and nothing else. Decorators still apply — the
 * renderer composes them either way — so this is themed exactly like the explorer.
 *
 * Dev-only. `capture.html` is not part of the deployed static build.
 */

function Capture() {
  const raw = new URLSearchParams(window.location.search).get('fixture') ?? '';
  const id = parseFixtureId(raw);

  React.useEffect(() => {
    // The capture script polls for this, so it can tell "still rendering" from "bad id".
    (window as unknown as { __captureReady?: boolean }).__captureReady = true;
  }, []);

  if (!id) {
    return <pre data-capture-error>{`Unparseable fixture id: ${raw || '(none)'}`}</pre>;
  }

  return (
    <Fixture
      fixture={id}
      isolation="inline"
      /*
       * An explicit height, not `auto`: the inline host measures its container, and a container
       * that is itself auto-sized resolves to zero before the fixture has painted into it.
       */
      height="100vh"
      // No `chrome` prop: `<Fixture>` renders one fixture and never any chrome by construction.
      fallback={<pre data-capture-error>{`No such fixture: ${raw}`}</pre>}
    />
  );
}

const root = document.getElementById('capture-root');
if (root) createRoot(root).render(<Capture />);
