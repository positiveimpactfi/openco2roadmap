import { MeasurementUnitType, MeasurementUnit } from "types/generatedTypes";
import { Form, Formik } from "formik";
import FormField from "../Common/FormField";
import Select from "../Common/Select";
import { allUnits } from "@/shared/measurementUnits";
import Button from "components/Button";
import { useCreateKpiMutation } from "graphql/mutations/kpi/createKPI.generated";
import { MyOrganizationKpiValuesDocument } from "graphql/queries/kpi/myOrganizationKPIs.generated";

interface FormValues {
  name: string;
  measurementUnit: MeasurementUnit;
}

const initialVales: FormValues = {
  name: "",
  measurementUnit: null,
};

const units = allUnits
  .map((u) => {
    return { ...u, name: u.shorthand };
  })
  .sort((a, b) => a.shorthand.localeCompare(b.shorthand));

interface FormProps {
  setOpen: (val: boolean) => void;
}

const CreateKPIForm = ({ setOpen }: FormProps) => {
  const [createNewKPI] = useCreateKpiMutation();
  return (
    <Formik
      initialValues={initialVales}
      onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
        const res = await createNewKPI({
          variables: {
            name: values.name,
            measurementUnit: values.measurementUnit
              ?.shorthand as MeasurementUnitType,
          },
          refetchQueries: [MyOrganizationKpiValuesDocument],
        });
        if (res?.data?.createKPI?.name) {
          console.log("new KPI created");
          setSubmitting(false);
          resetForm();
          setOpen(false);
        } else {
          console.log("failed creating new KPI");
        }
      }}
    >
      {({ isSubmitting, setFieldValue, handleReset }) => (
        <Form>
          <div className="flex flex-col space-y-4">
            <FormField
              showLabel
              label="Nimi"
              placeholder="Tunnusluvun nimi"
              name="name"
              roundedBottom
              roundedTop
              variant="tight"
              required
            />

            <Select
              options={units}
              setFieldValue={setFieldValue}
              name="measurementUnit"
              label="Yksikkö"
              showLabel
            />
            <div className="pt-5">
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={() => {
                    handleReset();
                    // onClose(false);
                  }}
                >
                  Peruuta
                </Button>
                <Button variant="success" type="submit" disabled={isSubmitting}>
                  Tallenna
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateKPIForm;
