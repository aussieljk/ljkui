import classNames from 'classnames';
import * as React from 'react';

import { gridPropDefs } from './grid.props';

import { rootClassName } from '../../helpers';

import type { GetPropDefTypes, Responsive } from '../../helpers';

/**
 * Builds a set of per-breakpoint CSS custom properties from a responsive value.
 * `initial` becomes the `-i` suffix; the CSS (grid.css) reads them with min-width
 * fallback chains so each breakpoint inherits the nearest defined value below it.
 */
function responsiveVars<T>(
  value: Responsive<T> | undefined,
  varName: string,
  transform: (v: T) => string,
): React.CSSProperties {
  if (value === undefined) return {};
  const out: Record<string, string> = {};
  if (typeof value === 'object' && value !== null) {
    for (const [bp, v] of Object.entries(value as Record<string, T>)) {
      if (v !== undefined) out[`--${varName}-${bp === 'initial' ? 'i' : bp}`] = transform(v);
    }
  } else {
    out[`--${varName}-i`] = transform(value as T);
  }
  return out as React.CSSProperties;
}

interface GridRowProps extends React.ComponentProps<'div'> {}

/** One row of a `Grid`; each child becomes a cell. Used by the SwiftUI-style (row-based) `Grid`. */
const GridRow = (props: GridRowProps) => {
  const { className, ref, ...rowProps } = props;
  return <div ref={ref} {...rowProps} className={classNames('fui-GridRow', className)} />;
};
GridRow.displayName = 'Grid.Row';

interface GridItemProps extends React.ComponentProps<'div'> {
  /** How many columns the item spans. Responsive. */
  colSpan?: Responsive<number>;
  /** How many rows the item spans. Responsive. */
  rowSpan?: Responsive<number>;
  /** The 1-based grid column line the item starts on. Responsive. */
  colStart?: Responsive<number>;
  /** The 1-based grid row line the item starts on. Responsive. */
  rowStart?: Responsive<number>;
}

/**
 * A cell for the uniform-columns `Grid` (the `columns`-driven mode). Applies grid-column /
 * grid-row span and start. All four props are responsive — each maps to CSS custom properties
 * that grid.css resolves with min-width fallback chains.
 *
 * @example
 * ```tsx
 * <Grid columns={3} gap={8}>
 *   <Grid.Item colSpan={2}>wide</Grid.Item>
 *   <Grid.Item>narrow</Grid.Item>
 * </Grid>
 * ```
 */
const GridItem = (props: GridItemProps) => {
  const { className, style, colSpan, rowSpan, colStart, rowStart, ref, ...itemProps } = props;
  return (
    <div
      ref={ref}
      {...itemProps}
      className={classNames('fui-GridItem', className)}
      style={{
        ...responsiveVars(colSpan, 'gcp', (v) => String(v)),
        ...responsiveVars(rowSpan, 'grp', (v) => String(v)),
        ...responsiveVars(colStart, 'gcs', (v) => String(v)),
        ...responsiveVars(rowStart, 'grs', (v) => String(v)),
        ...style,
      }}
    />
  );
};
GridItem.displayName = 'Grid.Item';

type GridOwnProps = GetPropDefTypes<typeof gridPropDefs>;
interface GridProps extends React.ComponentProps<'div'>, GridOwnProps {
  /** The horizontal distance between each cell, in pixels (row-based mode). */
  horizontalSpacing?: number;
  /** The vertical distance between each cell, in pixels (row-based mode). */
  verticalSpacing?: number;
  /**
   * Opt into a uniform CSS-grid layout with this many columns. A number becomes
   * `repeat(N, minmax(0, 1fr))`; a string is used verbatim as `grid-template-columns`.
   * Responsive. When provided, children render directly into the grid (no `Grid.Row` needed)
   * and the SwiftUI row-based column derivation is skipped.
   */
  columns?: Responsive<number | string>;
  /** Convenience gap between cells, in pixels. Responsive. Maps to CSS `gap`. */
  gap?: Responsive<number>;
}

/**
 * A grid layout with two modes.
 *
 * **Row-based (default, SwiftUI-style):** compose `Grid.Row` children; the column count is
 * derived from the row with the most cells.
 *
 * **Uniform columns:** pass `columns` (and optionally `gap`) to render a plain CSS grid;
 * children go straight into the tracks and can be wrapped in `Grid.Item` to span cells.
 *
 * @example
 * ```tsx
 * <Grid horizontalSpacing={16} verticalSpacing={8}>
 *   <Grid.Row>
 *     <Text>Name</Text>
 *     <Text>Jane</Text>
 *   </Grid.Row>
 * </Grid>
 *
 * <Grid columns={{ initial: 1, md: 3 }} gap={12}>
 *   <Grid.Item colSpan={2}>Featured</Grid.Item>
 *   <Card />
 * </Grid>
 * ```
 */
const GridComponent = (props: GridProps) => {
  const {
    className,
    style,
    children,
    ref,
    alignment = gridPropDefs.alignment.default,
    horizontalSpacing,
    verticalSpacing,
    columns,
    gap,
    ...gridProps
  } = props;

  const uniform = columns !== undefined;

  // Row-based mode: number of columns is the largest number of cells in any row, like SwiftUI's Grid.
  const columnCount = uniform
    ? 0
    : React.Children.toArray(children).reduce<number>(
        (max, child) =>
          React.isValidElement<GridRowProps>(child) && child.type === GridRow
            ? Math.max(max, React.Children.count(child.props.children))
            : max,
        1,
      );

  return (
    <div
      ref={ref}
      {...gridProps}
      className={rootClassName(
        'fui-Grid',
        className,
        { alignment },
        uniform && 'fui-Grid--columns',
        gap !== undefined && 'fui-Grid--gap',
      )}
      style={{
        ...(uniform
          ? responsiveVars(columns, 'gc', (v) => (typeof v === 'number' ? `repeat(${v}, minmax(0, 1fr))` : v))
          : { gridTemplateColumns: `repeat(${columnCount}, auto)` }),
        ...responsiveVars(gap, 'gg', (v) => `${v}px`),
        ...(horizontalSpacing !== undefined && { columnGap: horizontalSpacing }),
        ...(verticalSpacing !== undefined && { rowGap: verticalSpacing }),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
GridComponent.displayName = 'Grid';

const Grid = Object.assign(GridComponent, { Row: GridRow, Item: GridItem });

export { Grid as Root, GridRow as Row, GridItem as Item };
export type { GridProps as RootProps, GridRowProps as RowProps, GridItemProps as ItemProps };
