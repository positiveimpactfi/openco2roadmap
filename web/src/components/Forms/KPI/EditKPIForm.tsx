import { TrashIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import WarningModal from "components/Warning";
import { Form, Formik, FormikProps } from "formik";
import { useCreateKpiValueMutation } from "graphql/mutations/kpi/createKPIValue.generated";
import { useDeleteKpiValueMutation } from "graphql/mutations/kpi/deleteKPIValue.generated";
import { MyOrganizationKpiValuesDocument } from "graphql/queries/kpi/myOrganizationKPIs.generated";
import { useEffect, useState } from "react";
import { Kpi, KpiValue, MeasurementUnit } from "types/generatedTypes";
import { classNames } from "utils/classNames";
import FormField from "../Common/FormField";

interface FormProps {
  kpi: Kpi;
  setOpen: (val: boolean) => void;
}

const EditKPIForm = ({ kpi, setOpen }: FormProps) => {
  const [deleteValue] = useDeleteKpiValueMutation();
  const [deletedValues, setDeletedValues] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>(null);
  const [warningOpen, setWarningOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [filteredValues, setFilteredValues] = useState(() => kpi?.values);

  useEffect(() => {
    const currentValues = kpi?.values;
    const filtered = currentValues?.filter(
      (val) => !deletedValues.includes(val.id)
    );
    setFilteredValues(filtered);
  }, [kpi, deletedValues]);

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
        {formOpen && (
          <div>
            <CreateKPIValueForm setOpen={setFormOpen} kpi={kpi} />
          </div>
        )}
        <div className="mt-8 flex justify-end gap-x-2">
          <Button variant="neutral" onClick={() => setFormOpen(true)}>
            Lisää uusi arvo
          </Button>
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
            {value.value.toLocaleString("fi")} {unit?.shorthand ?? "yksikköä"}
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

interface FormValues {
  year: number;
  value: number;
}

const CreateKPIValueForm = ({ kpi, setOpen }: FormProps) => {
  const [createKPIValue] = useCreateKpiValueMutation();
  const initialValues: FormValues = {
    year: null,
    value: null,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: FormValues) => {
        const res = await createKPIValue({
          variables: { value: values.value, year: values.year, kpiID: kpi.id },
          refetchQueries: [MyOrganizationKpiValuesDocument],
        });
        if (res.data?.createKPIValue?.id) {
          console.log("created KPI value");
          setOpen(false);
        } else {
          console.log("failed to create value");
        }
      }}
    >
      {({ isSubmitting, handleReset, values }: FormikProps<FormValues>) => (
        <Form>
          <div className="rounded-md bg-[#F4F5F7] px-2 pt-2 pb-4 [box-shadow:0px_4px_4px_0px_#00000040]">
            <h3 className="text-xs font-medium uppercase leading-4 tracking-wide text-gray-500">
              Määritä uusi tunnusluku
            </h3>
            <div className="my-2 space-y-2">
              <FormField
                name="year"
                placeholder="Vuosi"
                label="Tilikauden päättymisvuosi"
                showLabel
                roundedBottom
                roundedTop
                variant="tight"
                required
                min={1990}
                max={2100}
                type="number"
                value={values.year !== null ? values.year : ""}
              />
              <div className="flex">
                <FormField
                  name="value"
                  placeholder="Arvo"
                  label="Tunnusluku"
                  showLabel
                  roundedBottom
                  roundedTop
                  variant="tight"
                  required
                  min={0}
                  step={0.1}
                  type="number"
                  value={values.value !== null ? values.value : ""}
                />
                <p className="mt-6 self-center px-2 text-gray-700">
                  {kpi?.unit?.shorthand}
                </p>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-x-2">
              <Button
                variant="neutral"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Peruuta
              </Button>
              <Button type="submit" variant="success" disabled={isSubmitting}>
                Tallenna
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditKPIForm;
