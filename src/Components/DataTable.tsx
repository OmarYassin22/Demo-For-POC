// src/Components/DataTable.tsx

import React from 'react';
import { useReactTable, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';

// Define a generic TableProps interface to handle dynamic data
interface TableProps<T> {
  data: T[];
  columns: any[];
  onAction: (id: string) => void;
}

// Define a column helper instance
// const columnHelper = createColumnHelper<any>();

const DataTable = <T,>({ data, columns }: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <div>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          السابق
        </button>
        <span>
          صفحة {table.getState().pagination.pageIndex + 1} من {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          التالي
        </button>
      </div>
    </div>
  );
};

export default DataTable;
