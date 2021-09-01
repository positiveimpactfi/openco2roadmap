import { DotsVerticalIcon } from "@heroicons/react/solid";
interface TableProps {
  headers: string[];
}

const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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

export const TableCell: React.FC<{ value: string }> = ({ value }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
      {value}
    </td>
  );
};

export const TableCellOpenOptions: React.FC<{ fn: any }> = ({ fn }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button
        type="button"
        className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        onClick={fn}
      >
        <span className="sr-only">Avaa sivupalkki</span>
        <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
      </button>
    </td>
  );
};

export default Table;
