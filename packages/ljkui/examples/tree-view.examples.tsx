import React from 'react';
import { TreeView, type TreeNode } from 'ljkui';

const files: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'button', label: 'button.tsx' },
          { id: 'badge', label: 'badge.tsx' },
        ],
      },
      { id: 'index', label: 'index.ts' },
    ],
  },
  {
    id: 'public',
    label: 'public',
    children: [{ id: 'logo', label: 'logo.svg' }],
  },
  { id: 'readme', label: 'README.md' },
];

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'centered' } as const;

export const examples = {
  Default() {
    return (
      <div style={{ width: 260 }}>
        <TreeView data={files} defaultExpandedIds={['src', 'components']} defaultSelectedId="button" />
      </div>
    );
  },
};
