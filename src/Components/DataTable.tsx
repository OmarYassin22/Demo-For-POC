import React from 'react';
import { useReactTable, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';

// Define a generic TableProps interface to handle dynamic data
interface TableProps<T> {
  data: T[];
  columns: any[];
  onAction: (id: string) => void;
}

const DataTable = <T,>({ data, columns, onAction }: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: data.length } },
  });

  const getRowColor = (status: boolean, result: string) => {


    if (status === true) {
      return '';
    } else if (status === false && result === "أخري") {

      return 'bg-yellow-100';
      //  alert(result);
    } else if (status === false) {
      return 'bg-red-100';
    }
    return '';
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg" dir="rtl">
      <table className="min-w-full table-auto text-sm text-gray-700">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-4 py-2 text-right font-medium">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            const rowindex = Number(row.id);
            const status = data[rowindex].Status;
            const Result = data[rowindex].Result
            // Assuming 'status' is the column you want to check

            return (
              <tr key={row.id} className={`border-b hover:bg-gray-50 ${getRowColor(status, Result)}`}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2 text-right">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
