'use client';

import * as React from 'react';
import { mergeRefs, rootClassName } from '../../helpers';
import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';
import {
  skeletonAvatarPropDefs,
  skeletonBoxPropDefs,
  skeletonRectPropDefs,
  skeletonTextPropDefs,
} from './skeleton.props';

/** Must match the animation duration in skeleton.css (fui-skeleton-pulse) */
const SKELETON_PULSE_DURATION_S = 2;

function useSkeletonAnimationSync(ref: React.RefObject<HTMLDivElement | null>) {
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const phaseSec = (performance.now() / 1000) % SKELETON_PULSE_DURATION_S;
    el.style.setProperty('--fui-skeleton-animation-delay', `-${phaseSec}s`);
  }, [ref]);
}

type SkeletonAvatarOwnProps = GetPropDefTypes<typeof skeletonAvatarPropDefs>;

interface SkeletonAvatarProps extends PropsWithoutColor<'div'>, SkeletonAvatarOwnProps {}
/**
 * A pulsing placeholder shaped like an Avatar of the same `size` and `shape`.
 * All skeletons on the page pulse in phase, regardless of when they mount.
 *
 * @example
 * <Skeleton.Avatar size="4" />
 */
const SkeletonAvatar = (props: SkeletonAvatarProps) => {
  const {
    className,
    size = skeletonAvatarPropDefs.size.default,
    shape = skeletonAvatarPropDefs.shape.default,
    color = skeletonAvatarPropDefs.color.default,
    highContrast = skeletonAvatarPropDefs.highContrast.default,
    ref: refProp,
    ...skeletonAvatarProps
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  useSkeletonAnimationSync(ref);
  const setRef = React.useMemo(() => mergeRefs(ref, refProp), [refProp]);

  return (
    <div
      {...skeletonAvatarProps}
      ref={setRef}
      data-accent-color={color}
      className={rootClassName('fui-SkeletonAvatar', className, { size, highContrast }, `fui-shape-${shape}`)}
    />
  );
};
SkeletonAvatar.displayName = 'SkeletonAvatar';

type SkeletonTextOwnProps = GetPropDefTypes<typeof skeletonTextPropDefs>;

interface SkeletonTextProps extends PropsWithoutColor<'div'>, SkeletonTextOwnProps {}
/**
 * A pulsing placeholder for a line of Text of the same `size`.
 * All skeletons on the page pulse in phase, regardless of when they mount.
 */
const SkeletonText = (props: SkeletonTextProps) => {
  const {
    className,
    size = skeletonTextPropDefs.size.default,
    color = skeletonTextPropDefs.color.default,
    highContrast = skeletonTextPropDefs.highContrast.default,
    ref: refProp,
    ...skeletonTextProps
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  useSkeletonAnimationSync(ref);
  const setRef = React.useMemo(() => mergeRefs(ref, refProp), [refProp]);

  return (
    <div
      {...skeletonTextProps}
      ref={setRef}
      data-accent-color={color}
      className={rootClassName('fui-SkeletonText', className, { size, highContrast })}
    />
  );
};
SkeletonText.displayName = 'SkeletonText';

type SkeletonRectOwnProps = GetPropDefTypes<typeof skeletonRectPropDefs>;

interface SkeletonRectProps extends PropsWithoutColor<'div'>, SkeletonRectOwnProps {}
/**
 * A pulsing rectangular placeholder; size it via `className` or `style`.
 * All skeletons on the page pulse in phase, regardless of when they mount.
 */
const SkeletonRect = (props: SkeletonRectProps) => {
  const {
    className,
    color = skeletonRectPropDefs.color.default,
    highContrast = skeletonRectPropDefs.highContrast.default,
    ref: refProp,
    ...skeletonRectProps
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  useSkeletonAnimationSync(ref);
  const setRef = React.useMemo(() => mergeRefs(ref, refProp), [refProp]);

  return (
    <div
      {...skeletonRectProps}
      ref={setRef}
      data-accent-color={color}
      className={rootClassName('fui-SkeletonRect', className, { highContrast })}
    />
  );
};
SkeletonRect.displayName = 'SkeletonRect';

type SkeletonBoxOwnProps = GetPropDefTypes<typeof skeletonBoxPropDefs>;

interface SkeletonBoxProps extends PropsWithoutColor<'span'>, SkeletonBoxOwnProps {
  /**
   * While `true`, `children` are rendered but hidden, and a pulsing placeholder of the same
   * geometry is painted over them. Flip to `false` once the real content has loaded.
   * @default true
   */
  loading?: boolean;
  /** Stretches the placeholder to fill its container (block layout) instead of hugging its content. */
  block?: boolean;
}
/**
 * Wraps real content and, while `loading`, paints a pulsing placeholder of the *same size* — no
 * hand-measured widths. Once `loading` is `false`, the children are shown untouched. Wrap each line
 * of text (or each element) you want its own placeholder rectangle. All skeletons on the page pulse
 * in phase, regardless of when they mount.
 *
 * @example
 * <Skeleton.Box loading={isLoading}>
 *   <Heading>{user?.name}</Heading>
 * </Skeleton.Box>
 */
const SkeletonBox = (props: SkeletonBoxProps) => {
  const {
    className,
    loading = true,
    block = false,
    color = skeletonBoxPropDefs.color.default,
    highContrast = skeletonBoxPropDefs.highContrast.default,
    ref: refProp,
    children,
    ...skeletonBoxProps
  } = props;

  const ref = React.useRef<HTMLSpanElement>(null);
  useSkeletonAnimationSync(ref as React.RefObject<HTMLDivElement | null>);
  const setRef = React.useMemo(() => mergeRefs(ref, refProp), [refProp]);

  if (!loading) return <>{children}</>;

  return (
    <span
      {...skeletonBoxProps}
      ref={setRef}
      data-accent-color={color}
      data-loading=""
      aria-hidden
      className={rootClassName('fui-SkeletonBox', className, { highContrast }, { 'fui-display-block': block })}
    >
      {children}
    </span>
  );
};
SkeletonBox.displayName = 'SkeletonBox';

export { SkeletonAvatar as Avatar, SkeletonBox as Box, SkeletonRect as Rect, SkeletonText as Text };
export type {
  SkeletonAvatarProps as AvatarProps,
  SkeletonBoxProps as BoxProps,
  SkeletonRectProps as RectProps,
  SkeletonTextProps as TextProps,
};
