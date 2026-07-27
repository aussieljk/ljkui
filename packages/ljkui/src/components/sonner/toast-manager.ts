'use client';

import { Toast } from '@base-ui/react/toast';
import type * as React from 'react';
import type { ToastPosition } from './sonner.props';
import { toastPositions } from './sonner.props';

// One manager per position so stacking indices stay independent
const managers = new Map<ToastPosition, ReturnType<typeof Toast.createToastManager>>();
for (const pos of toastPositions) {
  managers.set(pos, Toast.createToastManager());
}

// Tracks which manager owns a given toast ID (for update/dismiss by id)
const toastOwnership = new Map<string, ToastPosition>();

function clearOwnershipForPosition(position: ToastPosition) {
  for (const [id, pos] of toastOwnership) {
    if (pos === position) {
      toastOwnership.delete(id);
      clearScheduledDismissal(id);
    }
  }
  positionInteraction.delete(position);
}

// The provider sets this on mount so imperative calls use the right default
let _defaultPosition: ToastPosition = 'bottom-right';

/**
 * The kind of toast, which determines its status icon (and rendering for 'custom').
 */
type ToastType = 'success' | 'error' | 'warning' | 'loading' | 'info' | 'default' | 'custom';

/**
 * Props passed to the render function given to `toast.custom()`.
 */
interface CustomToastRenderProps {
  /** Dismisses this toast. */
  close: () => void;
  /** The toast's unique id. */
  id: string;
  /** Pre-styled building blocks (Root, Content, Title, Description) for composing the toast. */
  Toast: {
    Root: React.FC<
      { className?: string; style?: React.CSSProperties; children?: React.ReactNode } & Record<string, unknown>
    >;
    Content: React.FC<
      { className?: string; style?: React.CSSProperties; children: React.ReactNode } & Record<string, unknown>
    >;
    Title: React.FC<
      { className?: string; style?: React.CSSProperties; children: React.ReactNode } & Record<string, unknown>
    >;
    Description: React.FC<
      { className?: string; style?: React.CSSProperties; children: React.ReactNode } & Record<string, unknown>
    >;
  };
}

/**
 * Options accepted by `toast()` and its type-specific methods.
 */
interface ToastOptions {
  /** Custom id for the toast. Reusing an existing toast's id updates that toast in place. */
  id?: string;
  /** Secondary text shown below the title. */
  description?: React.ReactNode;
  /** Auto-dismiss duration in milliseconds. Pass Infinity to keep the toast until dismissed. */
  duration?: number;
  /** Screen position for this toast, overriding the Toaster's default position. */
  position?: ToastPosition;
  /** Callback fired when the toast is closed (before its exit animation finishes). */
  onClose?: () => void;
  /** Callback fired when the toast is removed from the DOM. */
  onRemove?: () => void;
  /** Props for an action button rendered inside the toast (use `children` for its label). */
  actionProps?: React.ComponentPropsWithRef<'button'>;
  /** Arbitrary data attached to the toast. */
  data?: Record<string, unknown>;
}

/**
 * Options accepted by `toast.promise()`.
 */
interface ToastPromiseOptions<T> {
  /** Title shown while the promise is pending. Omit to skip the loading toast. */
  loading?: React.ReactNode | (() => React.ReactNode);
  /** Title shown when the promise resolves (or a function of the resolved value). Omit to dismiss instead. */
  success?: React.ReactNode | ((data: T) => React.ReactNode);
  /** Title shown when the promise rejects (or a function of the error). Omit to dismiss instead. */
  error?: React.ReactNode | ((err: unknown) => React.ReactNode);
  /** Callback fired after the promise settles, regardless of outcome. */
  finally?: () => void;
  /** Screen position for the toast, overriding the Toaster's default position. */
  position?: ToastPosition;
}

function setDefaultPosition(pos: ToastPosition) {
  _defaultPosition = pos;
}

/**
 * Payload passed to the Toaster's `onToast` callback when a toast is created.
 */
type ToastEventData = { id: string; type: ToastType; title: React.ReactNode; description?: React.ReactNode };
type ToastListener = (toast: ToastEventData) => void;

let _onToast: ToastListener | undefined;

function setOnToast(cb: ToastListener | undefined) {
  _onToast = cb;
}

function getManager(position: ToastPosition) {
  // All managers are pre-created in the loop above
  return managers.get(position)!;
}

function resolvePosition(options?: ToastOptions): ToastPosition {
  return options?.position ?? _defaultPosition;
}

function normalizeDuration(duration: number | undefined): number | undefined {
  if (duration === undefined) return undefined;
  return duration === Infinity ? 0 : duration;
}

function mapOptions(options?: ToastOptions) {
  if (!options) return {};
  const { duration, id, position, ...rest } = options;
  const normalized = normalizeDuration(duration);
  return {
    ...(normalized !== undefined ? { timeout: normalized } : {}),
    ...rest,
  };
}

type BumpListener = (id: string, type: ToastType) => void;
const bumpListeners = new Set<BumpListener>();

function subscribeBump(listener: BumpListener) {
  bumpListeners.add(listener);
  return () => {
    bumpListeners.delete(listener);
  };
}

// ---------------------------------------------------------------------------
// Interaction-aware scheduled dismissals
// ---------------------------------------------------------------------------
// Base UI's manager.update() doesn't restart the auto-dismiss timer, so we
// schedule our own fallback timeout when an update changes the duration from
// infinite (0) to a finite value (e.g. loading toast → success).
//
// This timer system pauses/resumes in sync with viewport interaction state
// (hover + keyboard focus) so toasts don't vanish while the user is
// interacting — matching Base UI's own `expanded = hovering || focused`.

interface ScheduledDismissal {
  timerId: ReturnType<typeof setTimeout> | null;
  remaining: number;
  startedAt: number;
}

const scheduledDismissals = new Map<string, ScheduledDismissal>();

interface PositionInteraction {
  hover: boolean;
  focus: boolean;
}

const positionInteraction = new Map<ToastPosition, PositionInteraction>();

function isPositionPaused(position: ToastPosition) {
  const state = positionInteraction.get(position);
  return state ? state.hover || state.focus : false;
}

function clearScheduledDismissal(id: string) {
  const existing = scheduledDismissals.get(id);
  if (existing) {
    if (existing.timerId !== null) clearTimeout(existing.timerId);
    scheduledDismissals.delete(id);
  }
}

function startDismissalTimer(id: string, remaining: number) {
  return setTimeout(() => {
    scheduledDismissals.delete(id);
    dismiss(id);
  }, remaining);
}

function scheduleDismissal(id: string, duration: number) {
  clearScheduledDismissal(id);

  const pos = toastOwnership.get(id);
  if (pos && isPositionPaused(pos)) {
    scheduledDismissals.set(id, { timerId: null, remaining: duration, startedAt: 0 });
    return;
  }

  scheduledDismissals.set(id, {
    timerId: startDismissalTimer(id, duration),
    remaining: duration,
    startedAt: Date.now(),
  });
}

function pauseDismissalsForPosition(position: ToastPosition) {
  const now = Date.now();
  for (const [id, d] of scheduledDismissals) {
    if (toastOwnership.get(id) !== position || d.timerId === null) continue;
    clearTimeout(d.timerId);
    d.remaining = Math.max(0, d.remaining - (now - d.startedAt));
    d.timerId = null;
    d.startedAt = 0;
  }
}

function resumeDismissalsForPosition(position: ToastPosition) {
  for (const [id, d] of scheduledDismissals) {
    if (toastOwnership.get(id) !== position || d.timerId !== null) continue;
    if (d.remaining <= 0) {
      scheduledDismissals.delete(id);
      dismiss(id);
      continue;
    }
    d.startedAt = Date.now();
    d.timerId = startDismissalTimer(id, d.remaining);
  }
}

function setPositionInteracting(position: ToastPosition, signal: 'hover' | 'focus', active: boolean) {
  let state = positionInteraction.get(position);
  if (!state) {
    state = { hover: false, focus: false };
    positionInteraction.set(position, state);
  }

  const wasPaused = state.hover || state.focus;
  state[signal] = active;
  const isPaused = state.hover || state.focus;

  if (!wasPaused && isPaused) {
    pauseDismissalsForPosition(position);
  } else if (wasPaused && !isPaused) {
    resumeDismissalsForPosition(position);
  }
}

function addOrUpdate(title: React.ReactNode, type: ToastType, options?: ToastOptions) {
  // Update an existing toast on its original manager
  if (options?.id && toastOwnership.has(options.id)) {
    const originalPos = toastOwnership.get(options.id) as ToastPosition;
    const manager = getManager(originalPos);
    const normalizedDuration = normalizeDuration(options?.duration);
    manager.update(options.id, {
      title,
      type,
      ...(type !== 'loading' && normalizedDuration !== undefined ? { timeout: normalizedDuration } : {}),
      ...mapOptions({ ...options, id: undefined }),
    });

    clearScheduledDismissal(options.id);
    const resolvedDuration = normalizedDuration ?? 0;
    if (type !== 'loading' && resolvedDuration > 0) {
      scheduleDismissal(options.id, resolvedDuration);
    }

    for (const listener of bumpListeners) listener(options.id, type);
    return options.id;
  }

  const pos = resolvePosition(options);
  const manager = getManager(pos);
  const userOnRemove = options?.onRemove;
  const id = manager.add({
    ...(options?.id ? { id: options.id } : {}),
    title,
    type,
    ...mapOptions(options),
    onRemove: () => {
      toastOwnership.delete(id);
      clearScheduledDismissal(id);
      userOnRemove?.();
    },
  });
  toastOwnership.set(id, pos);
  _onToast?.({ id, type, title, description: options?.description });
  return id;
}

function success(title: React.ReactNode, options?: ToastOptions) {
  return addOrUpdate(title, 'success', { duration: 5000, ...options });
}

function error(title: React.ReactNode, options?: ToastOptions) {
  return addOrUpdate(title, 'error', { duration: 5000, ...options });
}

function loading(title: React.ReactNode, options?: ToastOptions) {
  return addOrUpdate(title, 'loading', { duration: Infinity, ...options });
}

function warning(title: React.ReactNode, options?: ToastOptions) {
  return addOrUpdate(title, 'warning', { duration: 5000, ...options });
}

function info(title: React.ReactNode, options?: ToastOptions) {
  return addOrUpdate(title, 'info', { duration: 5000, ...options });
}

function promise<T>(promiseOrFn: Promise<T> | (() => Promise<T>), options: ToastPromiseOptions<T>) {
  const pos = options.position ?? _defaultPosition;

  let id: string | undefined;
  if (options.loading !== undefined) {
    const loadingTitle = typeof options.loading === 'function' ? options.loading() : options.loading;
    if (loadingTitle !== undefined) {
      id = loading(loadingTitle as React.ReactNode, { position: pos });
    }
  }

  const promiseValue = typeof promiseOrFn === 'function' ? promiseOrFn() : promiseOrFn;

  const handled = promiseValue.then(
    (data) => {
      const title = typeof options.success === 'function' ? options.success(data) : options.success;
      if (title !== undefined) {
        success(title as React.ReactNode, { ...(id ? { id } : {}), position: pos });
      } else if (id) {
        dismiss(id);
      }
      return data;
    },
    (err) => {
      const title = typeof options.error === 'function' ? options.error(err) : options.error;
      if (title !== undefined) {
        error(title as React.ReactNode, { ...(id ? { id } : {}), position: pos });
      } else if (id) {
        dismiss(id);
      }
      return Promise.reject(err);
    },
  );

  if (options.finally) {
    handled.finally(options.finally);
  }

  return handled;
}

function dismiss(id: string) {
  clearScheduledDismissal(id);
  const pos = toastOwnership.get(id);
  if (pos) {
    getManager(pos).close(id);
  }
}

function dismissAll() {
  for (const [id, pos] of toastOwnership) {
    clearScheduledDismissal(id);
    getManager(pos).close(id);
  }
  toastOwnership.clear();
}

function update(
  id: string,
  updates: { title?: React.ReactNode; type?: string; description?: React.ReactNode; duration?: number },
) {
  const pos = toastOwnership.get(id);
  if (!pos) return;
  const { duration, ...rest } = updates;
  getManager(pos).update(id, {
    ...rest,
    ...(duration !== undefined ? { timeout: duration } : {}),
  });
}

/**
 * Render function passed to `toast.custom()`; receives the toast id, a `close`
 * callback and pre-styled `Toast` building blocks.
 */
type CustomToastRenderFn = (props: CustomToastRenderProps) => React.ReactNode;

function custom(render: CustomToastRenderFn, options?: Omit<ToastOptions, 'description' | 'actionProps'>) {
  return addOrUpdate('', 'custom', {
    duration: 5000,
    ...options,
    data: { ...options?.data, render },
  });
}

/**
 * Creates a toast notification imperatively; requires a mounted `Toaster`.
 *
 * Calling `toast(title, options?)` shows a plain toast and returns its id.
 * Type-specific variants (`toast.success`, `toast.error`, `toast.warning`,
 * `toast.info`, `toast.loading`) add a status icon; `toast.loading` persists
 * until updated or dismissed. Also exposes `toast.promise` (loading → success /
 * error tracking a promise), `toast.custom` (fully custom rendering),
 * `toast.update`, `toast.dismiss` and `toast.dismissAll`.
 *
 * @example
 * ```tsx
 * toast.success('Changes saved');
 *
 * toast.promise(saveSettings(), {
 *   loading: 'Saving…',
 *   success: 'Settings saved',
 *   error: 'Could not save settings',
 * });
 * ```
 */
const toast = Object.assign(
  (titleOrJsx: React.ReactNode, options?: ToastOptions) => {
    return addOrUpdate(titleOrJsx, 'default', options);
  },
  { success, error, warning, loading, info, promise, dismiss, dismissAll, update, custom },
);

export {
  clearOwnershipForPosition,
  getManager,
  managers,
  setDefaultPosition,
  setOnToast,
  setPositionInteracting,
  subscribeBump,
  toast,
};
export type {
  CustomToastRenderFn,
  CustomToastRenderProps,
  ToastEventData,
  ToastOptions,
  ToastPromiseOptions,
  ToastType,
};
