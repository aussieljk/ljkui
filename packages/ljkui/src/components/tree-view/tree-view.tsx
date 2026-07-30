'use client';

import classNames from 'classnames';
import * as React from 'react';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';
import { mergeRefs, rootClassName, useAccessibleNameWarning, useControllableState } from '../../helpers';
import { treeViewPropDefs } from './tree-view.props';

interface TreeNode {
  /** Unique identifier for the node. */
  id: string;
  /** The label shown for the node. */
  label: React.ReactNode;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Child nodes; presence makes this node expandable. */
  children?: TreeNode[];
}

type TreeViewOwnProps = GetPropDefTypes<typeof treeViewPropDefs>;
interface TreeViewProps extends Omit<PropsWithoutColor<'ul'>, 'children' | 'onSelect'>, TreeViewOwnProps {
  /** The hierarchical data to render. */
  data: TreeNode[];
  /** Ids of expanded nodes (controlled). */
  expandedIds?: string[];
  /** Ids of expanded nodes on first render (uncontrolled). @default [] */
  defaultExpandedIds?: string[];
  /** Called when a node is expanded or collapsed, with the next set of expanded ids. */
  onExpandedChange?: (ids: string[]) => void;
  /** The selected node id (controlled). */
  selectedId?: string | null;
  /** The selected node id on first render (uncontrolled). */
  defaultSelectedId?: string | null;
  /** Called when a node is selected. */
  onSelect?: (id: string) => void;
}

const Chevron = () => (
  <svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" aria-hidden focusable="false">
    <path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface FlatNode {
  node: TreeNode;
  level: number;
  parentId: string | null;
  expandable: boolean;
}

/** Flatten the tree into the currently-visible rows, in DOM order. */
function flatten(data: TreeNode[], expanded: Set<string>, level = 1, parentId: string | null = null): FlatNode[] {
  const out: FlatNode[] = [];
  for (const node of data) {
    const expandable = !!node.children?.length;
    out.push({ node, level, parentId, expandable });
    if (expandable && expanded.has(node.id)) {
      out.push(...flatten(node.children!, expanded, level + 1, node.id));
    }
  }
  return out;
}

/**
 * A hierarchical tree with expand/collapse and single selection. Renders WAI-ARIA
 * `role="tree"` / `treeitem` / `group` markup with roving `tabindex` and full arrow-key
 * navigation. Expansion and selection are each controllable or uncontrolled.
 *
 * @example
 * ```tsx
 * <TreeView
 *   defaultExpandedIds={['src']}
 *   data={[
 *     { id: 'src', label: 'src', children: [{ id: 'app', label: 'app.tsx' }] },
 *     { id: 'readme', label: 'README.md' },
 *   ]}
 * />
 * ```
 */
const TreeView = React.forwardRef<HTMLUListElement, TreeViewProps>((props, ref) => {
  const {
    className,
    size = treeViewPropDefs.size.default,
    color = treeViewPropDefs.color.default,
    highContrast = treeViewPropDefs.highContrast.default,
    data,
    expandedIds,
    defaultExpandedIds,
    onExpandedChange,
    selectedId,
    defaultSelectedId,
    onSelect,
    ...rootProps
  } = props;

  const [expandedList, setExpandedList] = useControllableState<string[]>({
    prop: expandedIds,
    defaultProp: defaultExpandedIds ?? [],
    onChange: onExpandedChange,
  });
  const expanded = React.useMemo(() => new Set(expandedList), [expandedList]);

  const [selected, setSelected] = useControllableState<string | null>({
    prop: selectedId,
    defaultProp: defaultSelectedId ?? null,
  });

  useAccessibleNameWarning('TreeView', rootProps);

  const flat = React.useMemo(() => flatten(data, expanded), [data, expanded]);

  // Roving focus: the id of the tabbable row.
  const [focusedId, setFocusedId] = React.useState<string | null>(null);
  const activeId = focusedId ?? selected ?? flat[0]?.node.id ?? null;
  const rootRef = React.useRef<HTMLUListElement>(null);

  const toggle = (id: string, open?: boolean) => {
    const next = new Set(expanded);
    const shouldOpen = open ?? !next.has(id);
    if (shouldOpen) next.add(id);
    else next.delete(id);
    setExpandedList([...next]);
  };
  const select = (id: string) => {
    setSelected(id);
    onSelect?.(id);
  };

  const focusRow = (id: string) => {
    setFocusedId(id);
    rootRef.current?.querySelector<HTMLElement>(`[data-tree-id="${CSS.escape(id)}"]`)?.focus();
  };

  const onRowKeyDown = (e: React.KeyboardEvent, entry: FlatNode) => {
    const index = flat.findIndex((f) => f.node.id === entry.node.id);
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = flat[index + 1];
        if (next) focusRow(next.node.id);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev = flat[index - 1];
        if (prev) focusRow(prev.node.id);
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        if (entry.expandable && !expanded.has(entry.node.id)) toggle(entry.node.id, true);
        else if (entry.expandable) {
          const child = flat[index + 1];
          if (child) focusRow(child.node.id);
        }
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        if (entry.expandable && expanded.has(entry.node.id)) toggle(entry.node.id, false);
        else if (entry.parentId) focusRow(entry.parentId);
        break;
      }
      case 'Home': {
        e.preventDefault();
        if (flat[0]) focusRow(flat[0].node.id);
        break;
      }
      case 'End': {
        e.preventDefault();
        const last = flat[flat.length - 1];
        if (last) focusRow(last.node.id);
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        select(entry.node.id);
        if (entry.expandable) toggle(entry.node.id);
        break;
      }
    }
  };

  const renderItems = (nodes: TreeNode[], level: number, parentId: string | null): React.ReactNode =>
    nodes.map((node) => {
      const expandable = !!node.children?.length;
      const isExpanded = expanded.has(node.id);
      const isSelected = selected === node.id;
      return (
        <li key={node.id} role="none" className="fui-TreeItemWrapper">
          <div
            role="treeitem"
            data-tree-id={node.id}
            aria-level={level}
            aria-expanded={expandable ? isExpanded : undefined}
            aria-selected={isSelected}
            tabIndex={activeId === node.id ? 0 : -1}
            className={classNames('fui-TreeItem', { 'fui-selected': isSelected })}
            style={{ paddingInlineStart: `calc(${level - 1} * var(--tree-indent) + var(--space-1))` }}
            onKeyDown={(e) => onRowKeyDown(e, { node, level, parentId, expandable })}
            onClick={() => {
              setFocusedId(node.id);
              select(node.id);
              if (expandable) toggle(node.id);
            }}
          >
            <span
              className={classNames('fui-TreeToggle', { 'fui-invisible': !expandable, 'fui-open': isExpanded })}
              aria-hidden
            >
              {expandable && <Chevron />}
            </span>
            {node.icon != null && <span className="fui-TreeIcon">{node.icon}</span>}
            <span className="fui-TreeLabel">{node.label}</span>
          </div>
          {expandable && isExpanded && (
            <ul role="group" className="fui-TreeGroup">
              {renderItems(node.children!, level + 1, node.id)}
            </ul>
          )}
        </li>
      );
    });

  return (
    <ul
      ref={mergeRefs(ref, rootRef)}
      role="tree"
      data-accent-color={color}
      {...rootProps}
      className={rootClassName('fui-TreeRoot', className, { size, highContrast }, 'fui-TreeGroup')}
    >
      {renderItems(data, 1, null)}
    </ul>
  );
});
TreeView.displayName = 'TreeView';

export { TreeView };
export type { TreeViewProps, TreeNode };
