import React from 'react';
import { Breadcrumb, breadcrumbPropDefs } from 'ljkui';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Components', layout: 'padded' } as const;

export const examples = {
  'With links'() {
    const args = {
      color: breadcrumbPropDefs.color.default,
    };
    return (
      <Breadcrumb.Root {...args}>
        <Breadcrumb.Item render={<a href="#" />} nativeButton={false}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item render={<a href="#user-profiles" />} nativeButton={false}>
          User Profiles
        </Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb.Root>
    );
  },

  'With onClick'() {
    const args = {
      color: breadcrumbPropDefs.color.default,
    };
    return (
      <Breadcrumb.Root {...args}>
        <Breadcrumb.Item onClick={() => alert('Home')}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => alert('Products')}>Products</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => alert('Sneaker Bot')}>Sneaker Bot</Breadcrumb.Item>
      </Breadcrumb.Root>
    );
  },

  Truncated() {
    const args = {
      color: breadcrumbPropDefs.color.default,
    };
    return (
      <Breadcrumb.Root {...args}>
        <Breadcrumb.Item render={<a href="#">Home</a>} />
        <Breadcrumb.Dropdown>
          <Breadcrumb.DropdownItem render={<a href="#">Products</a>} />
          <Breadcrumb.DropdownItem render={<a href="#">Categories</a>} />
          <Breadcrumb.DropdownItem render={<a href="#">Software</a>} />
        </Breadcrumb.Dropdown>
        <Breadcrumb.Item render={<a href="#">Bots</a>} />
        <Breadcrumb.Item>Sneaker Bot</Breadcrumb.Item>
      </Breadcrumb.Root>
    );
  },
};
