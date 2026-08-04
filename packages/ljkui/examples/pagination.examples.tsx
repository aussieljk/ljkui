import React from 'react';
import { Pagination, VStack } from 'ljkui';

const Interactive = () => {
  const [page, setPage] = React.useState(2);
  const total = 5;
  return (
    <Pagination.Root>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPage((p) => Math.max(1, p - 1));
            }}
          />
        </Pagination.Item>
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <Pagination.Item key={n}>
            <Pagination.Link
              href="#"
              isActive={n === page}
              onClick={(e) => {
                e.preventDefault();
                setPage(n);
              }}
            >
              {n}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Next
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPage((p) => Math.min(total, p + 1));
            }}
          />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination.Root>
  );
};

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls', layout: 'padded' } as const;

export const examples = {
  Default: <Interactive />,

  'With ellipsis': (
    <Pagination.Root>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous href="#" />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">1</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#" isActive>
            2
          </Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">24</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next href="#" />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination.Root>
  ),

  Sizes: (
    <VStack spacing={16} alignment="leading">
      {(['1', '2', '3'] as const).map((size) => (
        <Pagination.Root key={size} size={size}>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous href="#" />
            </Pagination.Item>
            <Pagination.Item>
              <Pagination.Link href="#" isActive>
                1
              </Pagination.Link>
            </Pagination.Item>
            <Pagination.Item>
              <Pagination.Link href="#">2</Pagination.Link>
            </Pagination.Item>
            <Pagination.Item>
              <Pagination.Next href="#" />
            </Pagination.Item>
          </Pagination.Content>
        </Pagination.Root>
      ))}
    </VStack>
  ),
};
