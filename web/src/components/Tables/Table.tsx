import React from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import {
  DotsVerticalIcon,
  PencilAltIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  TrashIcon,
  SearchIcon,
} from "@heroicons/react/solid";

interface TableProps {
  columns: any[];
  data: any;
}

const Table = ({ columns, data }: TableProps) => {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = useTable(
    {
      columns,
      data,
      filterTypes,
    },
    useGlobalFilter,
    useSortBy
  );

  const firstPageRows = rows;

  return (
    <>
      <div className="mb-4 flex justify-end">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
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
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 last:text-right hover:bg-gray-100 hover:font-extrabold"
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
                      className="px-6 py-1  text-sm font-medium text-gray-500 last:place-content-end last:text-right"
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

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="w-72">
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          name="table-filter"
          id="table-filter"
          className="block w-full rounded-md border-gray-300 py-2 pl-10 focus:border-teal-500 focus:ring-teal-500 focus-visible:outline-teal-500 sm:text-sm"
          placeholder={`Hae ${count} riviltä`}
        />
      </div>
    </div>
  );
}

export { Table };
