/**
 * Renders every Storybook story into a single PDF.
 *
 * ⚠️ BROKEN since the 2026-08-04 move from Storybook to uaight, and NOT ported.
 * Discovery here is entirely Storybook-shaped: it reads `index.json` and opens each story at
 * `iframe.html?id=<id>`. uaight exposes neither — it has its own fixture ids, a shareable URL
 * scheme and a read-only dev-server API. Everything below the discovery layer (the CDP capture,
 * the trim, the flow pagination) is reusable, so porting means replacing the two Storybook
 * contracts, not rewriting the script. Until then `generate:pdf` fails at the index fetch.
 *
 * Approach: drive a headless Google Chrome over the DevTools Protocol. No new dependency is
 * needed — neither playwright nor puppeteer is installed, but Chrome ships on this machine and
 * `@napi-rs/canvas` (already a devDependency) can crop the captures. Each story is opened
 * standalone at `iframe.html?id=<id>`, screenshotted, trimmed to its painted pixels, and the
 * shots are laid out in one generated HTML document which the same Chrome prints to PDF.
 * Assembling through HTML avoids needing a PDF library at all.
 *
 * Layout: stories *flow*, several to a page, instead of each component owning a whole sheet. The
 * generated document paginates itself (`__paginate`, run once the shots have decoded): blocks are
 * appended to a fixed-height `.sheet` until the sheet's real laid-out height overflows, then a new
 * sheet starts. Measuring the actual layout rather than summing estimated heights is what makes
 * the page numbers trustworthy — which in turn is what lets the table of contents be filled in
 * from the same single pass, before the print.
 *
 * By default it captures one representative story per component page (a catalog); `--all` captures
 * every variant of every component.
 *
 * Usage:
 *   bun scripts/generate-pdf.ts [--all] [--filter=<substring>] [--out=<path>] [--concurrency=6]
 *                               [--static[=<dir>]] [--storybook=http://localhost:6006]
 *                               [--delay=500] [--keep-shots]
 *
 *   --static  serve `storybook-static/` (or the given build dir) instead of hitting the dev
 *             server — faster and immune to the dev server's index/importer drift.
 */
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
];

/** Top-level sidebar order — mirrors `storySort.order` in `.storybook/preview.tsx`. */
const CATEGORY_ORDER = [
  'Introduction',
  'Guides',
  'Components',
  'Controls',
  'Typography',
  'Layout',
  'Data presentation',
  'Forms',
  'Utilities',
];

const VIEWPORT = { width: 1000, height: 700 };
/** Retina capture so text stays crisp when the PDF is zoomed. */
const SCALE = 2;
/** A runaway story (virtualised list, 100vh hero) must not become a 20-page image. */
const MAX_CAPTURE_HEIGHT = 2200;
/** Whitespace kept around the trimmed content, in CSS px. */
const CROP_PADDING = 12;
const CMD_TIMEOUT_MS = 30_000;
/** The Storybook dev server gets restarted while this runs, so a story is worth several tries. */
const ATTEMPTS = 3;

type StoryEntry = { id: string; title: string; name: string; type: string };
type Shot = { title: string; name: string; file: string; width: number; blank: boolean };

// ---------------------------------------------------------------------------- args

const args = process.argv.slice(2);
const flag = (name: string) => {
  const hit = args.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return undefined;
  return hit.includes('=') ? hit.slice(hit.indexOf('=') + 1) : '';
};

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(here, '..');

const filter = flag('filter');
const outPath = resolve(process.cwd(), flag('out') ?? join(pkgRoot, 'storybook-components.pdf'));
const concurrency = Math.max(1, Number(flag('concurrency') ?? 6));
const settleDelay = Number(flag('delay') ?? 500);
const keepShots = flag('keep-shots') !== undefined;
const captureAll = flag('all') !== undefined;
const staticDir = flag('static') === '' ? join(pkgRoot, 'storybook-static') : flag('static');
/** Filled in by `serveStatic` when --static is used; otherwise the running dev server. */
let storybookUrl = (flag('storybook') ?? 'http://localhost:6006').replace(/\/$/, '');

/**
 * Serves a `storybook build` output directory. Capturing from a static build is both faster and
 * far more reliable than the dev server, which transforms each story on demand and can serve an
 * importer map that has drifted from its own index.json.
 */
function serveStatic(dir: string) {
  if (!existsSync(join(dir, 'index.json'))) throw new Error(`${dir} is not a Storybook build (no index.json)`);
  const server = Bun.serve({
    port: 0,
    idleTimeout: 60,
    async fetch(req) {
      const path = decodeURIComponent(new URL(req.url).pathname).replace(/\.\./g, '');
      const file = Bun.file(join(dir, path.endsWith('/') ? `${path}index.html` : path));
      return (await file.exists()) ? new Response(file) : new Response('not found', { status: 404 });
    },
  });
  return server;
}

// ---------------------------------------------------------------------------- CDP

type Waiter = { resolve: (v: any) => void; reject: (e: Error) => void };

/** Minimal DevTools Protocol client over one WebSocket (one per browser tab). */
class Cdp {
  private ws!: WebSocket;
  private nextId = 1;
  private pending = new Map<number, Waiter>();
  private eventWaiters = new Map<string, Waiter[]>();
  private closed = false;

  static async connect(wsUrl: string) {
    const cdp = new Cdp();
    cdp.ws = new WebSocket(wsUrl);
    await new Promise<void>((res, rej) => {
      cdp.ws.onopen = () => res();
      cdp.ws.onerror = () => rej(new Error(`cannot connect to ${wsUrl}`));
    });
    cdp.ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data as string);
      if (msg.id !== undefined) {
        const waiter = cdp.pending.get(msg.id);
        if (!waiter) return;
        cdp.pending.delete(msg.id);
        if (msg.error) waiter.reject(new Error(msg.error.message));
        else waiter.resolve(msg.result);
        return;
      }
      const listeners = cdp.eventWaiters.get(msg.method);
      if (listeners?.length) {
        cdp.eventWaiters.delete(msg.method);
        for (const l of listeners) l.resolve(msg.params);
      }
    };
    cdp.ws.onclose = () => cdp.fail(new Error('devtools socket closed'));
    return cdp;
  }

  private fail(err: Error) {
    this.closed = true;
    for (const w of this.pending.values()) w.reject(err);
    this.pending.clear();
    for (const list of this.eventWaiters.values()) for (const w of list) w.reject(err);
    this.eventWaiters.clear();
  }

  send(method: string, params: Record<string, unknown> = {}, timeoutMs = CMD_TIMEOUT_MS): Promise<any> {
    if (this.closed) return Promise.reject(new Error('devtools socket closed'));
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`${method} timed out after ${timeoutMs}ms`));
      }, timeoutMs);
      this.pending.set(id, {
        resolve: (v) => (clearTimeout(timer), resolve(v)),
        reject: (e) => (clearTimeout(timer), reject(e)),
      });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  /**
   * Arms a one-shot listener. This must be called *before* the command that triggers the event,
   * otherwise the event can arrive while we are still awaiting the command's reply and be lost.
   */
  waitForEvent(method: string, timeoutMs = CMD_TIMEOUT_MS): Promise<any> {
    if (this.closed) return Promise.reject(new Error('devtools socket closed'));
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`${method} never fired (${timeoutMs}ms)`)), timeoutMs);
      const waiter: Waiter = {
        resolve: (v) => (clearTimeout(timer), resolve(v)),
        reject: (e) => (clearTimeout(timer), reject(e)),
      };
      const list = this.eventWaiters.get(method) ?? [];
      list.push(waiter);
      this.eventWaiters.set(method, list);
    });
  }

  /** Evaluate an expression in the page and return its (awaited) value. */
  async eval<T>(expression: string, timeoutMs = CMD_TIMEOUT_MS): Promise<T> {
    const r = await this.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, timeoutMs);
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description?.split('\n')[0] ?? 'eval failed');
    return r.result?.value as T;
  }

  close() {
    this.closed = true;
    try {
      this.ws.close();
    } catch {
      /* already gone */
    }
  }
}

// ---------------------------------------------------------------------------- browser lifecycle

function findChrome() {
  const found = CHROME_CANDIDATES.find((p) => existsSync(p));
  if (!found) throw new Error(`no Chrome found. Looked in:\n  ${CHROME_CANDIDATES.join('\n  ')}`);
  return found;
}

async function launchChrome(profileDir: string) {
  // Port 0 makes Chrome pick a free port and write it to DevToolsActivePort in the profile dir,
  // so this never collides with anything else already listening.
  const proc = Bun.spawn(
    [
      findChrome(),
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${profileDir}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-gpu',
      '--hide-scrollbars',
      '--mute-audio',
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
      '--disable-backgrounding-occluded-windows',
      '--allow-file-access-from-files',
    ],
    { stdout: 'ignore', stderr: 'ignore' },
  );

  const portFile = join(profileDir, 'DevToolsActivePort');
  for (let i = 0; i < 200; i++) {
    if (existsSync(portFile)) {
      const port = (await Bun.file(portFile).text()).split('\n')[0]?.trim();
      if (port) {
        const base = `http://127.0.0.1:${port}`;
        try {
          await (await fetch(`${base}/json/version`)).json();
          return { proc, base };
        } catch {
          /* devtools not accepting connections yet */
        }
      }
    }
    await Bun.sleep(100);
  }
  proc.kill();
  throw new Error('Chrome failed to start its DevTools endpoint');
}

type Tab = { cdp: Cdp; targetId: string };

/** Open a fresh tab, already parked on the Storybook origin so the first story navigation is
 *  same-process (an about:blank -> http hop swaps renderers and invalidates the JS context). */
async function openTab(base: string): Promise<Tab> {
  const target = await (await fetch(`${base}/json/new?about:blank`, { method: 'PUT' })).json();
  const cdp = await Cdp.connect(target.webSocketDebuggerUrl);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: VIEWPORT.width,
    height: VIEWPORT.height,
    deviceScaleFactor: SCALE,
    mobile: false,
  });
  const tab = { cdp, targetId: target.id as string };
  await navigate(tab, `${storybookUrl}/iframe.html`);
  return tab;
}

/** `openTab` parks on the Storybook origin, so it fails outright while the dev server is down. */
async function openTabWithRetry(base: string, tries = 12): Promise<Tab> {
  for (let i = 1; ; i++) {
    try {
      return await openTab(base);
    } catch (err) {
      if (i >= tries) throw err;
      await Bun.sleep(Math.min(5000, 500 * i));
    }
  }
}

async function closeTab(base: string, tab: Tab) {
  tab.cdp.close();
  try {
    await fetch(`${base}/json/close/${tab.targetId}`);
  } catch {
    /* tab already gone */
  }
}

/** Navigate and wait for the load event — arming the listener first, so it cannot be missed. */
async function navigate(tab: Tab, url: string) {
  const loaded = tab.cdp.waitForEvent('Page.loadEventFired');
  const res = await tab.cdp.send('Page.navigate', { url });
  if (res.errorText) throw new Error(`navigation failed: ${res.errorText}`);
  await loaded;
}

// ---------------------------------------------------------------------------- page-side helpers

/**
 * Waits for the story to settle: document ready, webfonts resolved, images decoded, then two
 * animation frames so Base UI's ResizeObserver/portal work has flushed. Reports Storybook's own
 * error overlay so a broken story is retried rather than screenshotted as a red stack trace.
 */
const WAIT_SETTLED = `(async () => {
  const idle = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const deadline = Date.now() + 15000;
  while (document.readyState !== 'complete' && Date.now() < deadline) await new Promise((r) => setTimeout(r, 50));
  try { await document.fonts.ready; } catch {}
  await Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((done) => {
    i.addEventListener('load', done, { once: true });
    i.addEventListener('error', done, { once: true });
    setTimeout(done, 5000);
  })));
  await idle();
  await idle();
  // Storybook's error / "no preview" overlays live in the preview document at all times and are
  // shown by a class on <body>. Their own class names are hashed-ish (sb-nopreview_main,
  // sb-errordisplay_main), so match on a substring and treat "has layout" as "is showing".
  const overlay = [...document.querySelectorAll('[class*="nopreview"], [class*="errordisplay"]')]
    .find((el) => el.getBoundingClientRect().height > 0);
  const heading = overlay?.querySelector('[class*="heading"]') || document.querySelector('#error-message');
  return {
    error: overlay ? (heading?.textContent || 'storybook error overlay').trim().slice(0, 120) : null,
    height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
  };
})()`;

// ---------------------------------------------------------------------------- capture

/**
 * Trims uniform background from the edges of a capture.
 *
 * Measuring the DOM instead is unreliable here: `layout: 'centered'` makes the story root a
 * full-viewport flex box, and components with `overflow: hidden` report boxes far larger than
 * what is actually painted. Working on pixels sidesteps both, and also captures portalled
 * content (popovers, toasts) that lives outside the story root.
 *
 * Returns the re-encoded PNG plus its CSS width, or null when the story painted nothing.
 */
async function trim(png: Buffer) {
  const img = await loadImage(png);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  // Analyse at 1x: 4x less work, and the downsample smooths away subpixel-AA noise.
  const w = Math.max(1, Math.round(img.width / SCALE));
  const h = Math.max(1, Math.round(img.height / SCALE));
  const small = createCanvas(w, h);
  const sctx = small.getContext('2d');
  sctx.drawImage(img, 0, 0, w, h);
  const px = sctx.getImageData(0, 0, w, h).data;

  /*
   * The Storybook backdrop is a soft gradient, so a single reference colour will not do. Model it
   * from the outermost row/column on each side: for a linear gradient in any direction the value
   * at (x, y) is bracketed by its own row's two ends and its own column's two ends, so a pixel
   * counts as background when it is close to any of those four. Content touching an edge only
   * makes the estimate more conservative (less cropping), never wrong.
   */
  const TOL = 10;
  const near = (i: number, j: number) =>
    Math.abs(px[i]! - px[j]!) <= TOL &&
    Math.abs(px[i + 1]! - px[j + 1]!) <= TOL &&
    Math.abs(px[i + 2]! - px[j + 2]!) <= TOL;
  const isContent = (x: number, y: number) => {
    const i = (y * w + x) * 4;
    return !(
      (
        near(i, y * w * 4) || // left end of this row
        near(i, (y * w + w - 1) * 4) || // right end of this row
        near(i, x * 4) || // top end of this column
        near(i, ((h - 1) * w + x) * 4)
      ) // bottom end of this column
    );
  };

  let top = -1;
  let bottom = -1;
  for (let y = 0; y < h && top === -1; y++) {
    for (let x = 0; x < w; x++) {
      if (isContent(x, y)) {
        top = y;
        break;
      }
    }
  }
  if (top === -1) return null; // painted nothing distinguishable from the backdrop
  for (let y = h - 1; y >= top && bottom === -1; y--) {
    for (let x = 0; x < w; x++) {
      if (isContent(x, y)) {
        bottom = y;
        break;
      }
    }
  }
  let left = w;
  let right = -1;
  for (let y = top; y <= bottom; y++) {
    for (let x = 0; x < left; x++) {
      if (isContent(x, y)) {
        left = x;
        break;
      }
    }
    for (let x = w - 1; x > right; x--) {
      if (isContent(x, y)) {
        right = x;
        break;
      }
    }
  }

  // Back to device pixels, with breathing room around the content.
  const pad = CROP_PADDING * SCALE;
  const x0 = Math.max(0, left * SCALE - pad);
  const y0 = Math.max(0, top * SCALE - pad);
  const cw = Math.min(img.width - x0, (right - left + 1) * SCALE + pad * 2);
  const ch = Math.min(img.height - y0, (bottom - top + 1) * SCALE + pad * 2);

  const out = createCanvas(cw, ch);
  out.getContext('2d').drawImage(canvas, x0, y0, cw, ch, 0, 0, cw, ch);
  return { png: await out.encode('png'), width: Math.round(cw / SCALE) };
}

async function captureStory(tab: Tab, story: StoryEntry, shotsDir: string): Promise<Shot> {
  await navigate(tab, `${storybookUrl}/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story`);
  // Generous: the colour-scale stories lay out thousands of swatches and blow past 30s.
  const settled = await tab.cdp.eval<{ error: string | null; height: number }>(WAIT_SETTLED, 90_000);
  if (settled.error) throw new Error(settled.error);
  if (settleDelay > 0) await Bun.sleep(settleDelay);

  const height = Math.min(MAX_CAPTURE_HEIGHT, Math.max(VIEWPORT.height, settled.height || 0));
  const { data } = await tab.cdp.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: VIEWPORT.width, height, scale: 1 },
  });

  const file = `${story.id.replace(/[^a-z0-9-]/gi, '_')}.png`;
  const trimmed = await trim(Buffer.from(data, 'base64'));
  if (!trimmed) return { title: story.title, name: story.name, file: '', width: 0, blank: true };
  await writeFile(join(shotsDir, file), trimmed.png);
  return { title: story.title, name: story.name, file, width: trimmed.width, blank: false };
}

// ---------------------------------------------------------------------------- html assembly

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Two shots this narrow are printed side by side rather than stacked. */
const PAIR_WIDTH = 330;
/** Failure lines per block, so a long list can break across pages. */
const FAILURES_PER_BLOCK = 24;

/**
 * The self-paginating half of the document.
 *
 * Blocks are moved one at a time out of `#source` into the current `.sheet` — a div whose height
 * is exactly the printable area of one A4 page. Appending a block that makes the sheet's
 * `scrollHeight` exceed its own height means it did not fit, so it is pulled back out and starts
 * the next sheet. Because every sheet is then known to fit, the browser's own page breaking never
 * fires and one sheet is exactly one PDF page — which is what makes the recorded page numbers
 * correct, and the contents list possible without printing twice.
 *
 * A block carrying `data-section` owns one or more headings (newline-separated — a block can hold
 * two short components side by side), so it records a contents entry each; when a component spills
 * onto the next sheet, a "(continued)" heading is repeated at the top.
 */
const PAGINATE = `window.__paginate = () => {
  const source = document.getElementById('source');
  const content = document.getElementById('content');
  const toc = document.getElementById('toc');
  const sheet = (host) => {
    const el = document.createElement('div');
    el.className = 'sheet';
    host.appendChild(el);
    return el;
  };
  // +1 absorbs subpixel rounding; a block is only rejected when it genuinely does not fit.
  const overflows = (el) => el.scrollHeight > el.clientHeight + 1;

  const entries = [];
  let page = 1;
  let current = sheet(content);
  let section = null;
  for (const block of [...source.children]) {
    const titles = block.dataset.section ? block.dataset.section.split('\\n') : [];
    if (titles.length) section = titles[titles.length - 1];
    current.appendChild(block);
    if (overflows(current) && current.children.length > 1) {
      current.removeChild(block);
      current = sheet(content);
      page++;
      if (!titles.length && section) {
        const cont = document.createElement('div');
        cont.className = 'blk';
        const h = document.createElement('h2');
        h.className = 'cont';
        h.textContent = section + ' (continued)';
        cont.appendChild(h);
        current.appendChild(cont);
      }
      current.appendChild(block);
    }
    for (const title of titles) entries.push({ page, title, row: null });
  }
  const contentPages = page;

  // The contents itself is paginated the same way. Its length depends only on how many entries
  // there are, never on the numbers printed in them, so it can be laid out with placeholders and
  // renumbered afterwards without reflowing.
  let tocSheet = sheet(toc);
  let tocPages = 1;
  const heading = document.createElement('div');
  heading.className = 'blk';
  const h2 = document.createElement('h2');
  h2.textContent = 'Contents';
  heading.appendChild(h2);
  tocSheet.appendChild(heading);
  for (const entry of entries) {
    const row = document.createElement('div');
    row.className = 'blk toc-row';
    const name = document.createElement('span');
    name.textContent = entry.title;
    const dots = document.createElement('span');
    dots.className = 'dots';
    const num = document.createElement('span');
    num.className = 'num';
    num.textContent = '000';
    row.append(name, dots, num);
    entry.row = num;
    tocSheet.appendChild(row);
    if (overflows(tocSheet) && tocSheet.children.length > 1) {
      tocSheet.removeChild(row);
      tocSheet = sheet(toc);
      tocPages++;
      tocSheet.appendChild(row);
    }
  }

  const offset = 1 + tocPages; // the cover, then the contents
  for (const entry of entries) entry.row.textContent = String(entry.page + offset);
  source.remove();
  return { pages: offset + contentPages, sections: entries.length, tocPages };
};`;

function buildHtml(shots: Shot[], failures: { story: StoryEntry; error: string }[]) {
  // Group into sections keyed by full story title, preserving the sorted order.
  const sections: { title: string; shots: Shot[] }[] = [];
  for (const shot of shots) {
    const last = sections.at(-1);
    if (last?.title === shot.title) last.shots.push(shot);
    else sections.push({ title: shot.title, shots: [shot] });
  }

  const figure = (s: Shot) => {
    const body = s.blank
      ? '<p class="blank">(rendered nothing visible)</p>'
      : `<img src="shots/${s.file}" style="width:${s.width}px" alt="${escapeHtml(s.name)}" />`;
    return `<figure class="story"><figcaption>${escapeHtml(s.name)}</figcaption>${body}</figure>`;
  };

  /** Pair up consecutive narrow shots so a page of small components is not a column of stubs. */
  const rowsOf = (list: Shot[]) => {
    const rows: Shot[][] = [];
    for (const s of list) {
      const last = rows.at(-1);
      const pairable = (x: Shot) => !x.blank && x.width <= PAIR_WIDTH;
      if (last?.length === 1 && pairable(last[0]!) && pairable(s)) last.push(s);
      else rows.push([s]);
    }
    return rows;
  };
  const rowHtml = (row: Shot[]) =>
    row.length === 1 ? figure(row[0]!) : `<div class="row">${row.map(figure).join('')}</div>`;

  const units = sections.map((section) => {
    const [category, ...rest] = section.title.split('/');
    return {
      heading: escapeHtml(rest.length ? `${category} / ${rest.join(' / ')}` : category!),
      rows: rowsOf(section.shots),
      width: Math.max(...section.shots.map((s) => (s.blank ? 0 : s.width))),
    };
  });

  const blocks: string[] = [];
  /* A whole component narrow enough to be a half-column, and short enough to be a single row, is
     printed beside its neighbour. In the default catalog mode every component *is* one row, so
     this is what keeps a page of small controls from being a ragged single column. */
  const halfable = (u: (typeof units)[number] | undefined) => !!u && u.rows.length === 1 && u.width <= PAIR_WIDTH;
  for (let i = 0; i < units.length; i++) {
    const a = units[i]!;
    const b = units[i + 1];
    if (halfable(a) && halfable(b)) {
      const col = (u: typeof a) => `<div class="col"><h2>${u.heading}</h2>${rowHtml(u.rows[0]!)}</div>`;
      blocks.push(
        `  <div class="blk" data-section="${a.heading}&#10;${b!.heading}">` +
          `<div class="row">${col(a)}${col(b!)}</div></div>`,
      );
      i++;
      continue;
    }
    for (const [j, row] of a.rows.entries()) {
      blocks.push(
        j === 0
          ? `  <div class="blk" data-section="${a.heading}"><h2>${a.heading}</h2>${rowHtml(row)}</div>`
          : `  <div class="blk">${rowHtml(row)}</div>`,
      );
    }
  }

  if (failures.length) {
    const lines = failures.map(
      (f) => `<li>${escapeHtml(f.story.title)} / ${escapeHtml(f.story.name)} — ${escapeHtml(f.error)}</li>`,
    );
    const first = lines.splice(0, FAILURES_PER_BLOCK);
    const title = `Failed to render (${failures.length})`;
    blocks.push(
      `  <div class="blk failures" data-section="${title}"><h2>${title}</h2><ul>${first.join('')}</ul></div>`,
    );
    for (let i = 0; i < lines.length; i += FAILURES_PER_BLOCK) {
      blocks.push(`  <div class="blk failures"><ul>${lines.slice(i, i + FAILURES_PER_BLOCK).join('')}</ul></div>`);
    }
  }

  return `<!doctype html>
<html><head><meta charset="utf-8" /><title>ljkui components</title>
<style>
  @page { size: A4; margin: 14mm 12mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 11px/1.5 -apple-system, "Helvetica Neue", Arial, sans-serif; color: #111; background: #fff; }
  /* One sheet is one printed page: A4 (210x297mm) less the @page margins, minus a hair so a
     rounding difference between our layout and the print layout cannot spill a blank page. */
  .sheet { width: 186mm; height: 267mm; overflow: hidden; break-after: page; }
  /* Only the very last sheet in the document may end without a break. */
  #content .sheet:last-child { break-after: auto; }
  .cover { height: 100%; display: flex; flex-direction: column; justify-content: center; }
  .cover h1 { font-size: 44px; margin: 0 0 10px; letter-spacing: -0.03em; }
  .cover p { margin: 3px 0; color: #52525b; font-size: 13px; }
  /* The unit of pagination: never split, so a heading always keeps its first story. */
  .blk { break-inside: avoid; padding-bottom: 14px; }
  h2 {
    font-size: 15px; margin: 0 0 10px; padding-bottom: 5px;
    border-bottom: 2px solid #111; letter-spacing: -0.01em;
  }
  h2.cont { color: #71717a; border-bottom-color: #d4d4d8; font-weight: 600; }
  .row { display: flex; gap: 14px; align-items: flex-start; }
  .row > .story { min-width: 0; max-width: 50%; }
  .row > .col { flex: 1 1 0; min-width: 0; }
  .story { margin: 0; }
  .story + .story { margin-top: 12px; }
  .story figcaption {
    font-size: 9px; font-weight: 700; color: #71717a; text-transform: uppercase;
    letter-spacing: 0.08em; margin-bottom: 5px;
  }
  /* Width is the shot's own logical width, so nothing is ever upscaled; max-width keeps an
     oversized capture inside the printable column, and max-height keeps a tall one on one page. */
  .story img {
    display: block; max-width: 100%; max-height: 225mm; height: auto;
    border: 1px solid #e4e4e7; border-radius: 4px;
  }
  .blank { margin: 0; color: #a1a1aa; font-style: italic; }
  .toc-row { display: flex; align-items: baseline; gap: 6px; padding-bottom: 3px; font-size: 10.5px; }
  .toc-row .dots { flex: 1; border-bottom: 1px dotted #d4d4d8; }
  .toc-row .num { color: #52525b; font-variant-numeric: tabular-nums; }
  .failures ul { margin: 0; padding-left: 18px; }
  .failures li { margin-bottom: 4px; color: #b91c1c; }
</style></head>
<body>
  <div id="cover"><div class="sheet"><div class="cover">
    <h1>ljkui</h1>
    <p>Every Storybook story, rendered.</p>
    <p>${shots.length} stories across ${sections.length} components${failures.length ? ` · ${failures.length} failed` : ''}</p>
    <p>${new Date().toISOString().slice(0, 10)}</p>
  </div></div></div>
  <div id="toc"></div>
  <div id="content"></div>
  <div id="source">
${blocks.join('\n')}
  </div>
<script>${PAGINATE}</script>
</body></html>`;
}

// ---------------------------------------------------------------------------- main

async function main() {
  const started = Date.now();

  const staticServer = staticDir ? serveStatic(staticDir) : undefined;
  if (staticServer) {
    storybookUrl = `http://127.0.0.1:${staticServer.port}`;
    console.log(`Serving ${staticDir} at ${storybookUrl}`);
  }

  // The dev server can be mid-restart (connection refused) or mid-reindex (500 EMFILE), so poll.
  let index: { entries: Record<string, StoryEntry> } | undefined;
  let indexError = 'unknown';
  for (let i = 1; i <= 10 && !index; i++) {
    try {
      const res = await fetch(`${storybookUrl}/index.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      index = await res.json();
    } catch (err) {
      indexError = (err as Error).message;
      if (i < 10) await Bun.sleep(2000);
    }
  }
  if (!index) {
    console.error(`Cannot read the Storybook index at ${storybookUrl}/index.json (${indexError}).`);
    console.error('Start it with: bun run --filter=ljkui storybook');
    process.exit(1);
  }

  // `docs` entries are long MDX pages, not component renders.
  const all = Object.values(index.entries).filter((e) => e.type === 'story');
  const needle = filter?.toLowerCase();
  let selected = needle
    ? all.filter((e) => `${e.title}/${e.name}`.toLowerCase().includes(needle) || e.id.toLowerCase().includes(needle))
    : all;

  // By default this is a catalog: one representative story (`Default`, else the first) per
  // component page. `--all` captures every variant instead, which is ~8x the work.
  if (!captureAll) {
    const byTitle = new Map<string, StoryEntry>();
    for (const entry of selected) {
      const current = byTitle.get(entry.title);
      if (!current || (current.name !== 'Default' && entry.name === 'Default')) byTitle.set(entry.title, entry);
    }
    selected = [...byTitle.values()];
  }

  // Sidebar order: category first, then the order Storybook itself indexed them in.
  const position = new Map(all.map((e, i) => [e.id, i]));
  const rank = (title: string) => {
    const i = CATEGORY_ORDER.indexOf(title.split('/')[0]!);
    return i === -1 ? CATEGORY_ORDER.length : i;
  };
  const stories = [...selected].sort(
    (a, b) => rank(a.title) - rank(b.title) || position.get(a.id)! - position.get(b.id)!,
  );

  if (!stories.length) {
    console.error(`No stories matched --filter=${filter}`);
    process.exit(1);
  }
  console.log(`Capturing ${stories.length} stories from ${storybookUrl} with ${concurrency} tabs...`);

  const workDir = join(tmpdir(), `ljkui-pdf-${process.pid}`);
  const shotsDir = join(workDir, 'shots');
  const profileDir = join(workDir, 'profile');
  await mkdir(shotsDir, { recursive: true });
  await mkdir(profileDir, { recursive: true });

  const { proc, base } = await launchChrome(profileDir);
  const results = Array.from<Shot | null>({ length: stories.length }).fill(null);
  const failures: { story: StoryEntry; error: string }[] = [];
  let cursor = 0;
  let done = 0;

  const worker = async () => {
    let tab = await openTabWithRetry(base);
    while (true) {
      const i = cursor++;
      if (i >= stories.length) break;
      const story = stories[i]!;
      for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
        try {
          results[i] = await captureStory(tab, story, shotsDir);
          break;
        } catch (err) {
          const message = (err as Error).message;
          // A wedged renderer poisons every later story on this tab, so always start over.
          // The backoff also rides out a Storybook dev-server restart mid-run.
          await closeTab(base, tab).catch(() => {});
          await Bun.sleep(1500 * attempt);
          tab = await openTabWithRetry(base);
          if (attempt === ATTEMPTS) {
            failures.push({ story, error: message });
            console.warn(`  ! ${story.title} / ${story.name}: ${message}`);
          }
        }
      }
      done++;
      if (done % 25 === 0 || done === stories.length) console.log(`  ${done}/${stories.length} captured`);
    }
    await closeTab(base, tab);
  };

  await Promise.all(Array.from({ length: Math.min(concurrency, stories.length) }, worker));

  const shots = results.filter((s): s is Shot => s !== null);
  const blanks = shots.filter((s) => s.blank);
  console.log(`Captured ${shots.length} stories (${failures.length} failed, ${blanks.length} blank). Building PDF...`);

  const htmlPath = join(workDir, 'index.html');
  await writeFile(htmlPath, buildHtml(shots, failures));

  // Print from a dedicated tab; the images are local files sitting next to the HTML. The result
  // is pulled as a stream rather than one base64 blob — a few hundred shots make a PDF far too
  // big to survive a single WebSocket frame.
  const printTab = await openTab(base);
  await printTab.cdp.send('Page.navigate', { url: `file://${htmlPath}` }, 300_000);
  // WAIT_SETTLED first: pagination measures laid-out heights, so every shot must have decoded.
  await printTab.cdp.eval(WAIT_SETTLED, 600_000);
  const layout = await printTab.cdp.eval<{ pages: number; sections: number; tocPages: number }>(
    'window.__paginate()',
    600_000,
  );
  console.log(`Flowed ${layout.sections} components onto ${layout.pages} pages (${layout.tocPages} of contents).`);
  const { stream } = await printTab.cdp.send(
    'Page.printToPDF',
    { printBackground: true, preferCSSPageSize: true, transferMode: 'ReturnAsStream' },
    900_000,
  );
  const chunks: Buffer[] = [];
  for (;;) {
    const io = await printTab.cdp.send('IO.read', { handle: stream, size: 4 << 20 }, 120_000);
    if (io.data) chunks.push(Buffer.from(io.data, io.base64Encoded ? 'base64' : 'utf8'));
    if (io.eof) break;
  }
  await printTab.cdp.send('IO.close', { handle: stream });
  await closeTab(base, printTab);
  proc.kill();

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, Buffer.concat(chunks));
  if (!keepShots) await rm(workDir, { recursive: true, force: true });
  await staticServer?.stop(true);

  const bytes = Bun.file(outPath).size;
  console.log(`\nWrote ${outPath} — ${(bytes / 1e6).toFixed(1)} MB in ${((Date.now() - started) / 1000).toFixed(1)}s`);
  if (keepShots) console.log(`Kept intermediates in ${workDir}`);
  if (failures.length) {
    console.log(`\n${failures.length} stories failed to render:`);
    for (const f of failures) console.log(`  - ${f.story.title} / ${f.story.name}: ${f.error}`);
  }
  if (blanks.length) {
    console.log(`\n${blanks.length} stories rendered nothing visible:`);
    for (const b of blanks) console.log(`  - ${b.title} / ${b.name}`);
  }
}

await main();
