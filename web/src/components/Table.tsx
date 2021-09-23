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
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header, i) => (
            <th
              key={header + i}
              scope="col"
              className={classNames(
                "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                alignLastRight ? "last:text-right" : null
              )}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
    </table>
  );
};

export const TableCell: React.FC<{
  value: string;
  clamped?: boolean;
  hideOnSm?: boolean;
}> = ({ value, clamped = false, hideOnSm = false }) => {
  return (
    <td
      className={classNames(
        "px-6 py-4  text-sm font-medium text-gray-500",
        clamped ? `max-w-[40px] md:max-w-[70px] truncate` : null,
        hideOnSm ? "hidden md:visible" : null
      )}
    >
      {value}
    </td>
  );
};

export const TableCellWithEdit: React.FC<{
  value: string;
  clamped?: boolean;
  hideOnSm?: boolean;
}> = ({ value, clamped = false, hideOnSm = false }) => {
  const [newValue, setNewValue] = useState(value);
  const [changedValue, setChangedValue] = useState("");
  const [edit, setEdit] = useState(false);
  return (
    <div>
      <td
        className={classNames(
          "px-6 py-4  text-sm font-medium text-gray-500",
          clamped ? `max-w-[40px] md:max-w-[70px] truncate` : null,
          hideOnSm ? "hidden md:visible" : null
        )}
      >
        {edit ? (
          <span className="flex">
            <input
              placeholder="Uusi nimi"
              onChange={(e) => setChangedValue(e.target.value)}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm rounded-md"
            />{" "}
            <div className="absolute right-20">
              <button
                type="button"
                className="w-8 h-8 bg-white inline-flex items-center justify-center text-red-500 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => {
                  setEdit(false);
                }}
              >
                <XIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewValue(changedValue);
                  setEdit(false);
                }}
                className="w-8 h-8 bg-teal-500 inline-flex items-center justify-center text-teal-500 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <CheckIcon className="w-5 h-5 text-teal-500" />
              </button>
            </div>
          </span>
        ) : (
          newValue
        )}
        {!edit && (
          <button
            type="button"
            className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 absolute right-20"
            onClick={() => setEdit(true)}
          >
            <span className="sr-only">Muokkaa yksikön nimeä</span>
            <PencilAltIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </td>
    </div>
  );
};

export const TableCellOpenOptions: React.FC<{
  fn: any;
  variant?: "edit" | "delete" | "expand";
}> = ({ fn, variant = "expand" }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button
        type="button"
        className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        onClick={fn}
      >
        <span className="sr-only">Avaa sivupalkki</span>
        {variant === "expand" ? (
          <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
        ) : variant === "edit" ? (
          <PencilAltIcon className="w-5 h-5" aria-hidden="true" />
        ) : (
          <TrashIcon className="w-5 h-5" aria-hidden="true" />
        )}
      </button>
    </td>
  );
};

export default Table;
