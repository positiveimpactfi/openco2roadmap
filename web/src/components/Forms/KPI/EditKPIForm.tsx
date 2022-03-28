import Button from "components/Button";
import { Kpi } from "types/generatedTypes";
import { classNames } from "utils/classNames";

interface FormProps {
  kpi: Kpi;
  setOpen: (val: boolean) => void;
}

const EditKPIForm = ({ kpi, setOpen }: FormProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl">{kpi.name}</h2>
      {kpi.values?.length > 0 ? (
        <>
          <h2 className="text-xs font-medium uppercase text-gray-700">
            Tunnusluvut kalenterivuosittain
          </h2>
          <ul role="list" className="mt-3 flex flex-wrap gap-5 sm:gap-6">
            {kpi.values.map((value) => (
              <li
                key={value.id}
                className="col-span-1 flex w-full rounded-md shadow-sm"
              >
                <div
                  className={classNames(
                    "bg-gray-500",
                    "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
                  )}
                >
                  {value.year}
                </div>
                <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
                  <div className="flex-1 truncate px-4 py-2 text-sm">
                    <p className="font-medium text-gray-900 hover:text-gray-600">
                      {value.value.toLocaleString("fi")}{" "}
                      {kpi.unit?.shorthand ?? "yksikkö"}
                    </p>
                    <p className="text-gray-500">
                      1.1.{value.year} - 31.12.{value.year}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>Ei arvoja</div>
      )}
      <div className="mt-8 flex justify-end gap-x-2">
        <Button variant="success" onClick={() => setOpen(false)}>
          Sulje
        </Button>
      </div>
    </div>
  );
};

export default EditKPIForm;
