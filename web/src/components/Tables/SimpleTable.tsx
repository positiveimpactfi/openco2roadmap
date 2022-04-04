import { CheckIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { classNames } from "utils/classNames";
interface TableProps {
  headers: string[];
  alignLastRight?: boolean;
}
import { XIcon } from "@heroicons/react/outline";

const Table: React.FC<TableProps> = ({
  headers,
  alignLastRight = false,
  children,
}) => {
  return (
    <table className="min-w-full table-fixed divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header, i) => (
            <th
              key={header + i}
              scope="col"
              className={classNames(
                "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500",
                "md:first:min-w-[500px]",
                alignLastRight ? "last:text-right" : null
              )}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
    </table>
  );
};

export const TableCell: React.FC<{
  value: string;
  clamped?: boolean;
  hideOnSm?: boolean;
  bolded?: boolean;
}> = ({ value, clamped = false, hideOnSm = false, bolded = false }) => {
  return (
    <td
      className={classNames(
        "px-6 py-1 text-sm",
        clamped ? `max-w-[40px] truncate md:max-w-[70px]` : null,
        hideOnSm ? "hidden md:visible" : null,
        bolded ? "font-bold text-gray-600" : "font-medium text-gray-500"
      )}
    >
      {value}
    </td>
  );
};

export const TableCellWithEdit: React.FC<{
  value: string;
  handleParentValue: (oldVal: string, newVal: string) => void;
  clamped?: boolean;
  hideOnSm?: boolean;
}> = ({ value, clamped = false, hideOnSm = false, handleParentValue }) => {
  const [changedValue, setChangedValue] = useState("");
  const [edit, setEdit] = useState(false);
  return (
    <td
      className={classNames(
        "px-6 py-1 text-sm font-medium text-gray-500",
        clamped ? `max-w-[40px] truncate md:max-w-[70px]` : null,
        hideOnSm ? "hidden md:visible" : null
      )}
    >
      {edit ? (
        <span className="flex">
          <input
            placeholder="Uusi nimi"
            onChange={(e) => setChangedValue(e.target.value)}
            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
          />{" "}
          <span className="absolute right-20">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-red-500 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              onClick={() => {
                setEdit(false);
              }}
            >
              <XIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => {
                setEdit(false);
                handleParentValue(value, changedValue);
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 bg-transparent text-teal-500 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <CheckIcon className="h-5 w-5 text-teal-500" />
            </button>
          </span>
        </span>
      ) : (
        <span className="flex items-center">
          {changedValue === "" ? value : changedValue}
          <button
            type="button"
            className="absolute right-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            onClick={() => setEdit(true)}
          >
            <span className="sr-only">Muokkaa yksikön nimeä</span>
            <PencilAltIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </span>
      )}
    </td>
  );
};

export const TableCellOpenOptions: React.FC<{
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

export default Table;
