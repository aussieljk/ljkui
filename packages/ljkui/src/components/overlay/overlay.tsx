import classNames from 'classnames';
import * as React from 'react';

import { overlayPropDefs } from './overlay.props';

import type { GetPropDefTypes } from '../../helpers';

interface OverlayContentProps extends React.ComponentProps<'div'> {}

/**
 * The content layered in front of the Overlay's base children, positioned by the parent
 * Overlay's `alignment`. The layer itself lets pointer events pass through to the base
 * content; only the overlaid children remain interactive.
 */
const OverlayContent = (props: OverlayContentProps) => {
  const { className, ...contentProps } = props;
  return <div {...contentProps} className={classNames('fui-OverlayContent', className)} />;
};
OverlayContent.displayName = 'Overlay.Content';

type OverlayOwnProps = GetPropDefTypes<typeof overlayPropDefs>;
interface OverlayProps extends React.ComponentProps<'div'>, OverlayOwnProps {}

/**
 * Layers `Overlay.Content` children in front of the remaining children,
 * matching SwiftUI's `.overlay(alignment:)` semantics.
 *
 * The base children size the container; the overlay content is absolutely
 * positioned over them without affecting layout.
 *
 * @example
 * <Overlay alignment="topTrailing">
 *   <img src="cover.png" alt="Cover" />
 *   <Overlay.Content>
 *     <Badge>New</Badge>
 *   </Overlay.Content>
 * </Overlay>
 */
const OverlayComponent = (props: OverlayProps) => {
  const { className, alignment = overlayPropDefs.alignment.default, ...overlayProps } = props;
  return <div {...overlayProps} className={classNames('fui-Overlay', className, `fui-r-alignment-${alignment}`)} />;
};
OverlayComponent.displayName = 'Overlay';

const Overlay = Object.assign(OverlayComponent, { Content: OverlayContent });

export { Overlay as Root, OverlayContent as Content };
export type { OverlayProps as RootProps, OverlayContentProps as ContentProps };
