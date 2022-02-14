import React from "react";
import { useTable, useSortBy } from "react-table";
import {
  DotsVerticalIcon,
  PencilAltIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  TrashIcon,
} from "@heroicons/react/solid";

interface TableProps {
  columns: any[];
  data: any;
}

const Table = ({ columns, data }: TableProps) => {
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export const TableActionButton: React.FC<{
  fn: any;
  variant?: "edit" | "delete" | "expand";
}> = ({ fn, variant = "expand" }) => {
  return (
    <div className="whitespace-nowrap px-6 py-1 text-right text-sm font-medium">
      <button
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        onClick={fn}
      >
        <span className="sr-only">Avaa sivupalkki</span>
        {variant === "expand" ? (
          <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
        ) : variant === "edit" ? (
          <PencilAltIcon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <TrashIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export { Table };
