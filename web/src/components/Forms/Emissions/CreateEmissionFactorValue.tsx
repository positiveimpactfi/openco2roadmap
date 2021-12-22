import Button from "components/Button";
import { Form, Formik } from "formik";
import { useCreateEmissionFactorValueMutation } from "graphql/mutations/emissions/createEmissionFactorValue.generated";
import { AllPublicEmissionFactorsDocument } from "graphql/queries/emissions/allPublicEmissionFactors.generated";
import { MyEmissionFactorsDocument } from "graphql/queries/emissions/myEmissionFactors.generated";
import { EmissionFactor, EmissionFactorValue } from "types/generatedTypes";
import { numberToString } from "utils/numberToString";
import FormField from "../Common/FormField";

interface FormValues {
  startDate: number;
  endDate: number;
  value: number;
}

const CreateEmissionFactorValueForm: React.FC<{
  onClose: (val: boolean) => void;
  onSuccess: (newValue: EmissionFactorValue) => void;
  emissionFactor: EmissionFactor;
}> = ({ onClose, onSuccess, emissionFactor }) => {
  const [createEmissionFactorValue] = useCreateEmissionFactorValueMutation();
  const initialValues: FormValues = {
    startDate: null,
    endDate: null,
    value: null,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
        const response = await createEmissionFactorValue({
          variables: {
            emissionFactorID: emissionFactor.id,
            startDate: Number(values.startDate),
            endDate: Number(values.endDate),
            value: Number(values.value),
          },
          refetchQueries: [
            AllPublicEmissionFactorsDocument,
            MyEmissionFactorsDocument,
          ],
        });
        if (response.data.createEmissionFactorValue.id) {
          setSubmitting(false);
          onSuccess(
            response.data.createEmissionFactorValue as EmissionFactorValue
          );
          resetForm();
        } else {
          console.log("could not add new emission factor value");
        }
      }}
    >
      {({ values, isSubmitting, handleReset }) => (
        <Form>
          <div className="flex flex-col align-baseline justify-items-start">
            <div className="my-4 text-xs uppercase font-medium text-gray-600">
              Määritä päästökertoimen arvot
            </div>
            <div className="flex justify-between mb-4">
              <FormField
                showLabel
                label="Alkaen"
                placeholder="vuosi"
                name="startDate"
                value={values.startDate === null ? "" : values.startDate}
                variant="tight"
                roundedBottom
                roundedTop
                type="number"
                required
              />
              <FormField
                showLabel
                label="Päättyen"
                placeholder="vuosi"
                name="endDate"
                value={values.endDate === null ? "" : values.endDate}
                variant="tight"
                roundedTop
                roundedBottom
                type="number"
                required
              />
            </div>
            <div className="flex items-end">
              <FormField
                showLabel
                label="Päästökertoimen arvo"
                placeholder={numberToString(0, 2)}
                value={values.value === null ? "" : values.value}
                name="value"
                variant="tight"
                roundedBottom
                roundedTop
                type="number"
                required
              />
              <div className="ml-4 text-sm font-medium text-gray-600 py-2">
                {" "}
                kg CO2e / {emissionFactor.physicalQuantity.baseUnit.shorthand}
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => {
                  handleReset();
                  onClose(false);
                }}
              >
                Peruuta
              </Button>
              <Button variant="success" type="submit" disabled={isSubmitting}>
                Tallenna
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateEmissionFactorValueForm;
