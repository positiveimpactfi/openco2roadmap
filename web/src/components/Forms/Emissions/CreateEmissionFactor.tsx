import Button from "components/Button";
import { Form, Formik } from "formik";
import {
  CreateEmissionFactorMutationVariables,
  useCreateEmissionFactorMutation,
} from "graphql/mutations/emissions/createEmissionFactor.generated";
import { useBaseMeasurementUnitsQuery } from "graphql/queries/calculation/baseUnits.generated";
import { AllPublicEmissionFactorsDocument } from "graphql/queries/emissions/allPublicEmissionFactors.generated";
import { MyEmissionFactorsDocument } from "graphql/queries/emissions/myEmissionFactors.generated";
import { useEmissionSourceOptions } from "hooks/useEmissionSourceOptions";
import {
  DataSourceType,
  EmissionSource,
  MeasurementUnit,
} from "types/generatedTypes";
import { compareString } from "utils/compareStrings";
import { numberToString } from "utils/numberToString";
import FormField from "../Common/FormField";
import MultiLevelSelect from "../Common/MultiLevelSelect";
import Select from "../Common/Select";

interface FormValues {
  emissionFactorName: string;
  emissionSource: EmissionSource;
  measurementUnit: MeasurementUnit;
  source: string;
  geographicalCoverage: string;
  startDate: number;
  endDate: number;
  value: number;
}

const CreateEmissionFactorForm: React.FC<{
  onClose: (val: boolean) => void;
}> = ({ onClose }) => {
  const [createEmissionFactor] = useCreateEmissionFactorMutation();
  const { sourceOptions } = useEmissionSourceOptions();
  const { data } = useBaseMeasurementUnitsQuery();
  const baseUnits = data?.physicalQuantities?.map((p) => p.baseUnit);

  const initialValues: FormValues = {
    emissionFactorName: "",
    emissionSource: null,
    measurementUnit: null,
    geographicalCoverage: "",
    source: "",
    startDate: null,
    endDate: null,
    value: null,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
        const physicalQuantity = data.physicalQuantities.find(
          (p) => p.baseUnit.id === values.measurementUnit.id
        );
        const variables: CreateEmissionFactorMutationVariables = {
          name: values.emissionFactorName,
          emissionSourceIDs: [values.emissionSource.id],
          physicalQuantityID: physicalQuantity.id,
          geographicalCoverage: values.geographicalCoverage,
          source: values.source,
          startDate: Number(values.startDate),
          endDate: Number(values.endDate),
          value: Number(values.value),
          dataSourceType: DataSourceType.Secondary,
        };
        const response = await createEmissionFactor({
          variables,
          refetchQueries: [
            AllPublicEmissionFactorsDocument,
            MyEmissionFactorsDocument,
          ],
        });
        console.log("response", response);
        if (response.data.createEmissionFactor.id) {
          console.log("response data", response.data.createEmissionFactor);
          setSubmitting(false);
          resetForm();
          onClose(false);
        } else {
          console.log("could not add new emission factor value");
        }
      }}
    >
      {({ values, isSubmitting, handleReset, setFieldValue }) => (
        <Form>
          <div className="flex flex-col justify-items-start space-y-2 align-baseline">
            <div className="my-4 text-lg font-medium text-gray-600">
              {values.emissionFactorName === ""
                ? "Uusi päästökerroin"
                : values.emissionFactorName}
            </div>
            <FormField
              showLabel
              label="Päästökertoimen nimi"
              placeholder="Uusi päästökerroin"
              name="emissionFactorName"
              roundedBottom
              roundedTop
              variant="tight"
              required
            />

            <MultiLevelSelect
              options={sourceOptions}
              showLabel
              label="Liittyy päästölähteeseen"
              setFieldValue={setFieldValue}
              name="emissionSource"
              levels="three"
              required
            />

            <FormField
              showLabel
              label="Alueellinen kattavuus"
              placeholder="Alue"
              name="geographicalCoverage"
              roundedBottom
              roundedTop
              variant="tight"
            />

            <FormField
              showLabel
              label="Lähde"
              placeholder="Päästökertoimen lähde"
              name="source"
              roundedBottom
              roundedTop
              variant="tight"
            />

            <div className="flex flex-col ">
              <label className="block text-sm font-medium text-gray-700">
                Mittayksikkö
              </label>
              <div className="flex items-center space-x-1">
                <p className="w-24 pt-1 font-medium italic text-gray-500">
                  kg CO2e /{" "}
                </p>
                <div className="w-full">
                  <Select
                    name="measurementUnit"
                    // label="Mittayksikkö"
                    // showLabel
                    options={
                      baseUnits
                        ? [
                            ...baseUnits?.map((unit) => {
                              return {
                                ...unit,
                                name: unit.name + " [" + unit.shorthand + "]",
                              };
                            }),
                          ].sort((a, b) =>
                            compareString(a.shorthand, b.shorthand)
                          )
                        : []
                    }
                    setFieldValue={setFieldValue}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between space-x-1">
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
                min={1900}
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
                max={2100}
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
              <div className="ml-4 py-2 text-sm font-medium text-gray-600">
                {" "}
                kg CO2e / {values.measurementUnit?.shorthand}
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

export default CreateEmissionFactorForm;
