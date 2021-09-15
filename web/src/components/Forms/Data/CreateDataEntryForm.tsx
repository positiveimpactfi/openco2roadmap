import { CheckIcon, XIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import Select from "components/Forms/Common/Select";
import SelectNumber from "components/Forms/Common/SelectNumber";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { components } from "data/emissionSources";
import { allUnitsObject } from "data/measurementUnits";
import { months } from "data/months";
import { Form, Formik, FormikProps } from "formik";
import { useCreateDataEntryMutation } from "graphql/mutations/data/createDataEntry.generated";
import { useAllPublicEmissionFactorsQuery } from "graphql/queries/emissions/allPublicEmissionFactors.generated";
import { useMyEmissionFactorsQuery } from "graphql/queries/emissions/myEmissionFactors.generated";
import {
  MyOrganizationSitesDocument,
  useMyOrganizationSitesQuery,
} from "graphql/queries/site/myOrganizationSites.generated";
import { Dispatch, SetStateAction, useState } from "react";
import {
  CategoryType,
  EmissionFactorValue,
  EmissionSource,
  EmissionSourceType,
  MeasurementUnitType,
  SiteUnit,
} from "types/generatedTypes";
import FormField from "../Common/FormField";

interface FormValues {
  consumptionValue: number;
  startDate: Date;
  endDate: Date;
  category: CategoryType;
  measurementUnit: MeasurementUnitType;
  emissionSource: EmissionSource;
  emissionFactorValue: EmissionFactorValue;
  siteUnit: SiteUnit;
}

const CreateDataEntryForm: React.FC<{
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  const initialValues: FormValues = {
    consumptionValue: 0,
    startDate: null,
    endDate: null,
    category: null,
    measurementUnit: null,
    emissionSource: null,
    emissionFactorValue: null,
    siteUnit: null,
  };
  const [createDataEntry] = useCreateDataEntryMutation();
  const [showNewUnitButton, setShowNewUnitButton] = useState(false);
  const [units, setUnits] = useState([]);
  const [showInputField, setShowInputField] = useState(false);

  const { data: siteUnits } = useMyOrganizationSitesQuery();
  const { data: myEFs } = useMyEmissionFactorsQuery();
  const { data: publicEFs } = useAllPublicEmissionFactorsQuery();
  const allEmissionFactors = myEFs?.myEmissionFactors.concat(
    publicEFs?.allPublicEmissionFactors
  );
  const reducedSources = allEmissionFactors
    ?.reduce(
      (prev, current) => [
        ...prev,
        {
          sourceIds: current?.emissionSources.map((e) => e.id),
          sourceNames: current?.emissionSources.map((e) => e.name),
          id: current?.id,
          name: current?.name,
          physicalQuantityName: current?.physicalQuantity?.name,
        },
      ],
      [] as {
        sourceNames: string[];
        sourceIds: number[];
        id: number;
        name: string;
        physicalQuantityName: string;
      }[]
    )
    .flat();

  if (!siteUnits?.allSitesInMyOrganization)
    return <div>Cannot get site types</div>;

  const allSiteUnits = siteUnits.allSitesInMyOrganization
    .map((site) => {
      const defaultSiteUnit = site.siteUnits.find((siteUnit) =>
        siteUnit.name.startsWith("default_")
      );
      const filteredSiteUnits = site.siteUnits.filter(
        (siteUnit) => !siteUnit.name.startsWith("default_")
      );
      const siteUnits = [
        { ...defaultSiteUnit, name: site.name, isParent: true },
        ...filteredSiteUnits,
      ];
      return { ...site, siteUnits: siteUnits };
    })
    .reduce((prev, current) => [...prev, current.siteUnits], [] as SiteUnit[]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
        const response = await createDataEntry({
          variables: {
            consumptionValue: values.consumptionValue,
            endDate: values.endDate,
            startDate: values.startDate,
            category: values.category,
            measurementUnit: values.measurementUnit,
            emissionSource: EmissionSourceType[values.emissionSource.id],
            emissionsFactorValueID: values.emissionFactorValue.id,
            siteUnitID: values.siteUnit.id,
          },
          refetchQueries: [MyOrganizationSitesDocument],
        });
        if (response.data.createDataEntry.id) {
          setSubmitting(false);
          resetForm();
          setOpen(false);
        } else {
          console.error("Failed to create site");
        }
      }}
    >
      {({
        isSubmitting,
        handleReset,
        setFieldValue,
        values,
      }: FormikProps<FormValues>) => (
        <Form>
          <div className="rounded-md space-y-4">
            <Select
              options={allSiteUnits.flat()}
              setFieldValue={setFieldValue}
              showLabel
              label="Toimipaikka ja yksikkö"
              name="siteUnit"
              placeholder="Valitse toimipaikka "
              required
            />
            <Select
              options={components.sort((a, b) => (a.name > b.name ? 1 : -1))}
              showLabel
              label="Päästölähde"
              name="emissionSource"
              setFieldValue={setFieldValue}
            />
            <div className="flex justify-between">
              <div>
                <SelectNumber
                  options={[2015, 2016, 2017]}
                  label="Vuosi"
                  showLabel
                />
              </div>
              <div className="w-full ml-2">
                <Select
                  className="w-full"
                  label="Kuukausi"
                  showLabel
                  options={months}
                  name="month"
                  setFieldValue={setFieldValue}
                />
              </div>
            </div>
            <Select
              options={
                reducedSources?.filter((r) =>
                  (
                    values.emissionSource as EmissionSource & {
                      sources: EmissionSource[];
                    }
                  )?.sources.some((id) => r.sourceIds.includes(id.id))
                ) ?? []
              }
              showLabel
              label="Käytettävä päästökerroin"
              name="emissionFactorValue"
              setFieldValue={setFieldValue}
            />
            <div className="flex justify-between items-center">
              <FormField
                name="consumptionValue"
                type="number"
                placeholder="0,00"
                label="Kulutus"
                showLabel
                roundedBottom
                roundedTop
                variant="tight"
              />
              <div className="w-full ml-2">
                <Select
                  name="measurementUnit"
                  placeholder="0,00"
                  label="Mittayksikkö"
                  showLabel
                  options={
                    allUnitsObject[
                      (values.emissionFactorValue as any)?.physicalQuantityName
                    ] ?? []
                  }
                  setFieldValue={setFieldValue}
                />
              </div>
            </div>
            <button
              type="button"
              className="mt-4 text-sm"
              onClick={() => setShowNewUnitButton(!showNewUnitButton)}
            >
              Lisäasetukset
            </button>
            {showNewUnitButton && (
              <div className="flex flex-col space-y-4">
                <div>
                  <Button onClick={() => setShowInputField(!showInputField)}>
                    Lisää uusi yksikkö
                  </Button>
                </div>
                {showInputField && (
                  <NewUnitInputField
                    units={units}
                    setUnits={setUnits}
                    setOpen={setShowInputField}
                  />
                )}
                <SiteUnitsTable units={units} />
              </div>
            )}
            <div className="pt-5">
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={() => {
                    handleReset();
                    setOpen(false);
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

const SiteUnitsTable: React.FC<{ units: string[] }> = ({ units }) => {
  if (units.length === 0) return null;
  return (
    <Table headers={["Yksiköt", ""]}>
      {units.map((unit, id) => (
        <tr key={unit + id}>
          <TableCell value={unit} />
          <TableCellOpenOptions fn={() => console.log("opened edit")} />
        </tr>
      ))}
    </Table>
  );
};

const NewUnitInputField: React.FC<{
  units: string[];
  setUnits: (val: string[]) => void;
  setOpen: (val: boolean) => void;
}> = ({ units, setUnits, setOpen }) => {
  const [unit, setUnit] = useState("");
  return (
    <div className="bg-gray-200 px-2 py-2 rounded-md">
      <label
        htmlFor="newUnitField"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Uuden yksikön nimi
      </label>
      <div className="flex">
        <input
          id="newUnitField"
          placeholder="Uusi yksikkö"
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm rounded-md"
          value={unit}
          onChange={(e) => setUnit(e.currentTarget.value)}
        />
        <button
          type="submit"
          className="w-8 h-8 bg-white inline-flex items-center justify-center text-red-500 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          onClick={() => {
            setUnit(null);
            setOpen(false);
          }}
        >
          <XIcon className="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="w-8 h-8 bg-teal-500 inline-flex items-center justify-center text-teal-500 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          onClick={() => {
            setUnits([...units, unit]);
            setUnit("");
          }}
        >
          <CheckIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default CreateDataEntryForm;
