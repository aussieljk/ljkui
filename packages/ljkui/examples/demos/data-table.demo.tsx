import React from 'react';
import { Badge, DataTable, Link, Typography } from 'ljkui';

export default function DataTableDemo() {
  return (
    <DataTable.Root>
      <DataTable.Item align="center">
        <DataTable.Label>Status</DataTable.Label>
        <DataTable.Value>
          <Badge color="success">Active</Badge>
        </DataTable.Value>
      </DataTable.Item>
      <DataTable.Item>
        <DataTable.Label>ID</DataTable.Label>
        <DataTable.Value>
          <Typography.Code variant="ghost">usr_4f9a2c</Typography.Code>
        </DataTable.Value>
      </DataTable.Item>
      <DataTable.Item>
        <DataTable.Label>Name</DataTable.Label>
        <DataTable.Value>Ada Lovelace</DataTable.Value>
      </DataTable.Item>
      <DataTable.Item>
        <DataTable.Label>Email</DataTable.Label>
        <DataTable.Value>
          <Link href="mailto:ada@example.com">ada@example.com</Link>
        </DataTable.Value>
      </DataTable.Item>
    </DataTable.Root>
  );
}
