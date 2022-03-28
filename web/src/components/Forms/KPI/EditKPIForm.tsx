import { TrashIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import WarningModal from "components/Warning";
import { useDeleteKpiValueMutation } from "graphql/mutations/kpi/deleteKPIValue.generated";
import { MyOrganizationKpiValuesDocument } from "graphql/queries/kpi/myOrganizationKPIs.generated";
import { useState } from "react";
import { Kpi, KpiValue, MeasurementUnit } from "types/generatedTypes";
import { classNames } from "utils/classNames";

interface FormProps {
  kpi: Kpi;
  setOpen: (val: boolean) => void;
}

const EditKPIForm = ({ kpi, setOpen }: FormProps) => {
  const [deleteValue] = useDeleteKpiValueMutation();
  const [deletedValues, setDeletedValues] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>(null);
  const [warningOpen, setWarningOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteValue({
      variables: { id: selectedValue },
      refetchQueries: [MyOrganizationKpiValuesDocument],
    });
    if (res.data?.deleteKPIValue?.value) {
      console.log("value deleted successfully");
      setDeletedValues([...deletedValues, selectedValue]);
    } else {
      console.log("deletion failed");
    }
    setWarningOpen(false);
    setSelectedValue(null);
  };

  const handleValueSelect = (id: string) => {
    setWarningOpen(true);
    setSelectedValue(id);
  };

  const filteredValues = kpi?.values?.filter(
    (val) => !deletedValues.includes(val.id)
  );

  return (
    <>
      <WarningModal
        open={warningOpen}
        setOpen={setWarningOpen}
        title="Poistetaanko arvo?"
        description="Oletko varma, että valitsemasi tiedon voi poistaa? Tätä toimenpidettä ei voi perua."
        onConfirm={async () => await handleDelete()}
      />
      <div className="space-y-4">
        <h2 className="text-xl">{kpi.name}</h2>
        {filteredValues?.length > 0 ? (
          <>
            <h2 className="text-xs font-medium uppercase text-gray-700">
              Tunnusluvut kalenterivuosittain
            </h2>
            <ul role="list" className="mt-3 flex flex-wrap gap-3">
              {filteredValues.map((value) => (
                <KPIValue
                  unit={kpi.unit}
                  value={value}
                  key={value.id}
                  handleSelect={handleValueSelect}
                />
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
    </>
  );
};

const KPIValue = ({
  value,
  unit,
  handleSelect,
}: {
  value: KpiValue;
  unit: MeasurementUnit;
  handleSelect: (val: string) => void;
}) => {
  return (
    <li key={value.id} className="col-span-1 flex w-full rounded-md shadow-sm">
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
            {value.value.toLocaleString("fi")} {unit?.shorthand ?? "yksikkö"}
          </p>
          <p className="text-gray-500">
            1.1.{value.year} - 31.12.{value.year}
          </p>
        </div>
        <div className="mr-2 h-6 w-6 text-gray-400 hover:text-gray-600">
          <TrashIcon onClick={() => handleSelect(value.id)} />
        </div>
      </div>
    </li>
  );
};

export default EditKPIForm;
