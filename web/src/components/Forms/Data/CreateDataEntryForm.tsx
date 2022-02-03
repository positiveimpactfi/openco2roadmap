import { EmissionSource } from "@/shared/emissionSources";
import { allUnitsObject, Unit } from "@/shared/measurementUnits";
import { CategoryType } from "@/shared/types/CategoryType";
import { EmissionSourceType } from "@/shared/types/EmissionSourceType";
import Button from "components/Button";
import Select from "components/Forms/Common/Select";
import SelectNumber from "components/Forms/Common/SelectNumber";
import { months } from "data/months";
import { Form, Formik, FormikProps } from "formik";
import { EmissionFactorFragmentFragment } from "graphql/fragments/emissionFactor.generated";
import { useCreateDataEntryMutation } from "graphql/mutations/data/createDataEntry.generated";
import { MyDataEntriesDocument } from "graphql/queries/data/myDataEntries.generated";
import { MyOrganizationDataEntriesDocument } from "graphql/queries/data/myOrganizationDataEntries.generated";
import { useAllPublicEmissionFactorsQuery } from "graphql/queries/emissions/allPublicEmissionFactors.generated";
import { useMyEmissionFactorsQuery } from "graphql/queries/emissions/myEmissionFactors.generated";
import { useMyOrganizationSitesQuery } from "graphql/queries/site/myOrganizationSites.generated";
import { useEmissionSourceOptions } from "hooks/useEmissionSourceOptions";
import {
  MeasurementUnit,
  MeasurementUnitType,
  SiteUnit,
} from "types/generatedTypes";
import { compareString } from "utils/compareStrings";
import { getMonthStartAndEndDays } from "utils/getMonthStartAndEndDays";
import FormField from "../Common/FormField";
import MultiLevelSelect from "../Common/MultiLevelSelect";

export interface FormValues {
  consumptionValue: number;
  emissionFactor: EmissionFactorFragmentFragment;
  emissionSource: EmissionSource & { categoryID: number };
  measurementUnit: MeasurementUnit | Unit;
  siteUnit: SiteUnit;
  month: { id: number; name: string };
  year: number;
}

const CreateDataEntryForm: React.FC<{
  setOpen: (arg: boolean) => void;
}> = ({ setOpen }) => {
  const initialValues: FormValues = {
    consumptionValue: null,
    emissionFactor: null,
    emissionSource: null,
    measurementUnit: null,
    siteUnit: null,
    month: {
      id: new Date().getMonth() + 1,
      name: months.find((m) => m.id === new Date().getMonth() + 1).name,
    },
    year: new Date().getFullYear(),
  };
  const [createDataEntry] = useCreateDataEntryMutation();

  const { data: siteUnits } = useMyOrganizationSitesQuery();
  const { data: myEFs } = useMyEmissionFactorsQuery();
  const { data: publicEFs } = useAllPublicEmissionFactorsQuery();
  const { sourceOptions } = useEmissionSourceOptions();

  const allEmissionFactors = myEFs?.myEmissionFactors.concat(
    publicEFs?.allPublicEmissionFactors
  );

  if (!siteUnits?.allSitesInMyOrganization) return <div>Ei yksikköjä</div>;

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

  if (allSiteUnits.flat().length === 1)
    initialValues.siteUnit = allSiteUnits.flat()[0] as SiteUnit;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
        const today = new Date(values.year, values.month.id - 1);
        const vars = {
          category: CategoryType[values.emissionSource?.categoryID],
          consumptionValue: values.consumptionValue,
          emissionsFactorValueID: values.emissionFactor.values[0].id,
          emissionSource: EmissionSourceType[values.emissionSource.id],
          measurementUnit: values.measurementUnit
            .shorthand as unknown as MeasurementUnitType,
          siteUnitID: values.siteUnit.id,
          startDate: getMonthStartAndEndDays(today).start,
          endDate: getMonthStartAndEndDays(today).end,
        };
        const response = await createDataEntry({
          variables: vars as any,
          refetchQueries: [
            MyDataEntriesDocument,
            MyOrganizationDataEntriesDocument,
          ],
        });
        if (response.data.createDataEntry.id) {
          setSubmitting(false);
          resetForm();
          setOpen(false);
        } else {
          console.error("Failed to create data entry");
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
              placeholder="Valitse toimipaikka"
              selectedValue={
                allSiteUnits.flat().length === 1 ? allSiteUnits.flat()[0] : null
              }
              required
            />

            <MultiLevelSelect
              options={sourceOptions}
              showLabel
              label="Päästölähde"
              setFieldValue={setFieldValue}
              name="emissionSource"
              levels="three"
            />
            <div className="flex">
              <div className="w-1/3">
                <SelectNumber
                  options={Array.from(
                    { length: 10 },
                    (_, i) => new Date().getFullYear() - i
                  )}
                  label="Vuosi"
                  name="year"
                  showLabel
                  selectedValue={values.year}
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className="w-2/3 ml-2">
                <Select
                  className="w-full"
                  label="Kuukausi"
                  showLabel
                  options={months}
                  name="month"
                  selectedValue={values.month}
                  setFieldValue={setFieldValue}
                />
              </div>
            </div>
            <Select
              options={
                allEmissionFactors
                  ? allEmissionFactors
                      ?.filter((ef) =>
                        ef?.emissionSources
                          .map((es) => es.id)
                          .includes(values.emissionSource?.id)
                      )
                      .sort((a, b) => compareString(a.name, b.name))
                  : []
              }
              showLabel
              label="Käytettävä päästökerroin"
              name="emissionFactor"
              setFieldValue={setFieldValue}
            />
            <div className="flex">
              <div className="w-1/3">
                <FormField
                  name="consumptionValue"
                  type="number"
                  placeholder="0,00"
                  step={0.01}
                  min={0}
                  label="Kulutus"
                  showLabel
                  roundedBottom
                  roundedTop
                  variant="tight"
                  value={
                    values.consumptionValue === null
                      ? ""
                      : values.consumptionValue
                  }
                />
              </div>
              <div className="w-2/3 ml-2">
                <Select
                  name="measurementUnit"
                  label="Mittayksikkö"
                  showLabel
                  options={
                    allUnitsObject[
                      values.emissionFactor?.physicalQuantity.name
                    ]?.map((unit) => {
                      return { ...unit, name: unit.shorthand };
                    }) ?? []
                  }
                  setFieldValue={setFieldValue}
                />
              </div>
            </div>

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

export default CreateDataEntryForm;
