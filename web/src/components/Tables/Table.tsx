import { TableCellOpenOptions } from "components/Table";
import React from "react";
import { useTable, useSortBy } from "react-table";
import { SortAscendingIcon, SortDescendingIcon } from "@heroicons/react/solid";

interface TableProps {
  columns: any[];
  data: any;
  actions?: {
    columnName: string;
    fn: (val: any) => void;
  };
}

const Table = ({ columns, data, actions = null }: TableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  const firstPageRows = rows;

  return (
    <>
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  {column.render("Header")}
                  <span className="flex h-5">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <SortDescendingIcon className="h-5" />
                      ) : (
                        <SortAscendingIcon className="h-5" />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  {actions.columnName}
                </th>
              )}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="divide-y divide-gray-200 bg-white"
        >
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      key={cell.value}
                      {...cell.getCellProps()}
                      className="px-6 py-1  text-sm font-medium text-gray-500"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                {actions && (
                  <TableCellOpenOptions fn={() => actions.fn(row.original)} />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export { Table };
