import classNames from 'classnames';
import * as React from 'react';

import { Text } from '../typography/text';
import { dataTableItemPropDefs, dataTableLabelPropDefs, dataTableRootPropDefs } from './data-table.props';

import { PropsWithoutColor, type GetPropDefTypes } from '../../helpers';

type DataTableRootOwnProps = GetPropDefTypes<typeof dataTableRootPropDefs>;
interface DataTableRootProps extends PropsWithoutColor<'dl'>, DataTableRootOwnProps {}

/**
 * A definition list (`<dl>`) of label/value rows, e.g. for metadata panels.
 *
 * @example
 * ```tsx
 * <DataTable.Root>
 *   <DataTable.Item>
 *     <DataTable.Label>Status</DataTable.Label>
 *     <DataTable.Value>
 *       <Badge color="success">Active</Badge>
 *     </DataTable.Value>
 *   </DataTable.Item>
 * </DataTable.Root>
 * ```
 */
const DataTableRoot = (props: DataTableRootProps) => {
  const {
    className,
    size = dataTableRootPropDefs.size.default,
    trim = dataTableRootPropDefs.trim.default,
    orientation = dataTableRootPropDefs.orientation.default,
    ...dataTableProps
  } = props;

  return (
    <Text
      render={<dl />}
      {...dataTableProps}
      className={classNames(
        'fui-DataTableRoot',
        `fui-r-size-${size}`,
        `fui-r-lt-${trim}`,
        `fui-r-orientation-${orientation}`,
        className,
      )}
    />
  );
};
DataTableRoot.displayName = 'DataTable.Root';

type DataTableItemOwnProps = GetPropDefTypes<typeof dataTableItemPropDefs>;
interface DataTableItemProps extends PropsWithoutColor<'div'>, DataTableItemOwnProps {}

/** One row of the list, containing a `Label` and a `Value`. */
const DataTableItem = (props: DataTableItemProps) => {
  const { className, align = dataTableItemPropDefs.align.default, ...dataTableItemProps } = props;

  return (
    <div
      {...dataTableItemProps}
      className={classNames('fui-DataTableItem', align ? `fui-r-ai-${align}` : undefined, className)}
    />
  );
};
DataTableItem.displayName = 'DataTable.Item';

type DataTableLabelOwnProps = GetPropDefTypes<typeof dataTableLabelPropDefs>;
interface DataTableLabelProps extends PropsWithoutColor<'dt'>, DataTableLabelOwnProps {}

/** The term (`<dt>`) of a row, rendered as a muted label. */
const DataTableLabel = (props: DataTableLabelProps) => {
  const {
    className,
    color = dataTableLabelPropDefs.color.default,
    highContrast = dataTableLabelPropDefs.highContrast.default,
    ...dataTableLabelProps
  } = props;

  return (
    <dt
      {...dataTableLabelProps}
      data-accent-color={color}
      className={classNames('fui-DataTableLabel', { 'fui-high-contrast': highContrast }, className)}
    />
  );
};
DataTableLabel.displayName = 'DataTable.Label';

interface DataTableValueProps extends React.ComponentProps<'dd'> {}

/** The description (`<dd>`) of a row, holding the value content. */
const DataTableValue = ({ children, className, ...props }: DataTableValueProps) => (
  <dd {...props} className={classNames(className, 'fui-DataTableValue')}>
    {children}
  </dd>
);
DataTableValue.displayName = 'DataTable.Value';

export { DataTableItem as Item, DataTableLabel as Label, DataTableRoot as Root, DataTableValue as Value };
export type {
  DataTableItemProps as ItemProps,
  DataTableLabelProps as LabelProps,
  DataTableRootProps as RootProps,
  DataTableValueProps as ValueProps,
};
