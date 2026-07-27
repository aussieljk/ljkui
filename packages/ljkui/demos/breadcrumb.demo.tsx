import React from 'react';
import { Breadcrumb } from 'ljkui';

export default function BreadcrumbDemo() {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.Item render={<a href="#" />} nativeButton={false}>
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Dropdown>
        <Breadcrumb.DropdownItem render={<a href="#">Products</a>} />
        <Breadcrumb.DropdownItem render={<a href="#">Categories</a>} />
      </Breadcrumb.Dropdown>
      <Breadcrumb.Item render={<a href="#" />} nativeButton={false}>
        Bots
      </Breadcrumb.Item>
      <Breadcrumb.Item>Sneaker Bot</Breadcrumb.Item>
    </Breadcrumb.Root>
  );
}
