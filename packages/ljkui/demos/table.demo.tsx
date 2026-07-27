import React from 'react';
import { Table } from 'ljkui';

export default function TableDemo() {
  return (
    <Table.Root variant="surface" className="min-w-105">
      <Table.Table>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Ada Lovelace</Table.RowHeaderCell>
            <Table.Cell>ada@example.com</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Grace Hopper</Table.RowHeaderCell>
            <Table.Cell>grace@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Alan Turing</Table.RowHeaderCell>
            <Table.Cell>alan@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Table>
    </Table.Root>
  );
}
