import classNames from 'classnames';
import * as React from 'react';

import { gridPropDefs } from './grid.props';

import type { GetPropDefTypes } from '../../helpers';

interface GridRowProps extends React.ComponentProps<'div'> {}

/** One row of a `Grid`; each child becomes a cell. */
const GridRow = (props: GridRowProps) => {
  const { className, ...rowProps } = props;
  return <div {...rowProps} className={classNames('fui-GridRow', className)} />;
};
GridRow.displayName = 'Grid.Row';

type GridOwnProps = GetPropDefTypes<typeof gridPropDefs>;
interface GridProps extends React.ComponentProps<'div'>, GridOwnProps {
  /** The horizontal distance between each cell, in pixels. */
  horizontalSpacing?: number;
  /** The vertical distance between each cell, in pixels. */
  verticalSpacing?: number;
}

/**
 * A SwiftUI-style grid layout composed of `Grid.Row` children. The column count is derived from the
 * row with the most cells.
 *
 * @example
 * ```tsx
 * <Grid horizontalSpacing={16} verticalSpacing={8}>
 *   <Grid.Row>
 *     <Text>Name</Text>
 *     <Text>Jane</Text>
 *   </Grid.Row>
 *   <Grid.Row>
 *     <Text>Role</Text>
 *     <Text>Engineer</Text>
 *   </Grid.Row>
 * </Grid>
 * ```
 */
const GridComponent = (props: GridProps) => {
  const {
    className,
    style,
    children,
    alignment = gridPropDefs.alignment.default,
    horizontalSpacing,
    verticalSpacing,
    ...gridProps
  } = props;

  // The number of columns is the largest number of cells in any row, like SwiftUI's Grid.
  const columnCount = React.Children.toArray(children).reduce<number>(
    (max, child) =>
      React.isValidElement<GridRowProps>(child) && child.type === GridRow
        ? Math.max(max, React.Children.count(child.props.children))
        : max,
    1,
  );

  return (
    <div
      {...gridProps}
      className={classNames('fui-Grid', className, `fui-r-alignment-${alignment}`)}
      style={{
        gridTemplateColumns: `repeat(${columnCount}, auto)`,
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

const Grid = Object.assign(GridComponent, { Row: GridRow });

export { Grid as Root, GridRow as Row };
export type { GridProps as RootProps, GridRowProps as RowProps };
