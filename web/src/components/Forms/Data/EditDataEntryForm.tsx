import { allUnits, allUnitsObject } from "@/shared/measurementUnits";
import { CategoryType } from "@/shared/types/CategoryType";
import { EmissionSourceType } from "@/shared/types/EmissionSourceType";
import Button from "components/Button";
import Select from "components/Forms/Common/Select";
import SelectNumber from "components/Forms/Common/SelectNumber";
import { months } from "data/months";
import { Form, Formik, FormikProps } from "formik";
import { useUpdateDataEntryMutation } from "graphql/mutations/data/updateDataEntry.generated";
import { MyDataEntriesDocument } from "graphql/queries/data/myDataEntries.generated";
import { MyOrganizationDataEntriesDocument } from "graphql/queries/data/myOrganizationDataEntries.generated";
import { useAllPublicEmissionFactorsQuery } from "graphql/queries/emissions/allPublicEmissionFactors.generated";
import { useMyEmissionFactorsQuery } from "graphql/queries/emissions/myEmissionFactors.generated";
import { useMyOrganizationSitesQuery } from "graphql/queries/site/myOrganizationSites.generated";
import { useEmissionSourceOptions } from "hooks/useEmissionSourceOptions";
import { DataEntry, MeasurementUnitType, SiteUnit } from "types/generatedTypes";
import { compareString } from "utils/compareStrings";
import { getMonthStartAndEndDays } from "utils/getMonthStartAndEndDays";
import FormField from "../Common/FormField";
import MultiLevelSelect from "../Common/MultiLevelSelect";
import { FormValues } from "./CreateDataEntryForm";

const EditDataEntryForm: React.FC<{
  setOpen: (arg: boolean) => void;
  dataEntry: DataEntry;
}> = ({ setOpen, dataEntry }) => {
  const [updateDataEntry] = useUpdateDataEntryMutation();

  const { data: siteUnits } = useMyOrganizationSitesQuery();
  const { data: myEFs } = useMyEmissionFactorsQuery();
  const { data: publicEFs } = useAllPublicEmissionFactorsQuery();
  const { sources, sortedSourceOptions } = useEmissionSourceOptions();

  if (!sortedSourceOptions) return null;
  const allSources = sources?.allCategories.flatMap((cat) =>
    cat.components.flatMap((comp) =>
      comp.emissionSources.map((source) => {
        return { ...source, categoryID: cat.id };
      })
    )
  );
  const allEmissionFactors = myEFs?.myEmissionFactors.concat(
    publicEFs?.allPublicEmissionFactors
  );
  if (!allEmissionFactors) return null;

  if (!siteUnits?.allSitesInMyOrganization) return <div>Ei yksikk??j??</div>;

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

  const initialValues: FormValues = {
    consumptionValue: dataEntry.consumptionValue,
    emissionFactor: allEmissionFactors.find(
      (ef) => ef?.id === dataEntry.emissionFactorValue.emissionFactor.id
    ),
    emissionSource: allSources?.find(
      (source) => source.id === EmissionSourceType[dataEntry.emissionSource]
    ) as any,
    measurementUnit: allUnits.find(
      (unit) => unit.shorthand === dataEntry.measurementUnit
    ),
    siteUnit: allSiteUnits
      .flat()
      .find((s) => s.id === dataEntry.siteUnit.id) as SiteUnit,
    month: months.find(
      (m) => m.id === new Date(dataEntry.startDate).getMonth() + 1
    ),
    year: new Date(dataEntry.startDate).getFullYear(),
  };
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
        const today = new Date(values.year, values.month.id - 1);
        const vars = {
          dataEntryID: dataEntry.id,
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
        const response = await updateDataEntry({
          variables: vars as any,
          refetchQueries: [
            MyDataEntriesDocument,
            MyOrganizationDataEntriesDocument,
          ],
        });
        if (response.data.updateDataEntry.id) {
          setSubmitting(false);
          resetForm();
          setOpen(false);
        } else {
          console.error("Failed to edit data entry");
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
          <div className="space-y-4 rounded-md">
            <Select
              options={allSiteUnits.flat()}
              setFieldValue={setFieldValue}
              showLabel
              label="Toimipaikka ja yksikk??"
              name="siteUnit"
              placeholder="Valitse toimipaikka"
              selectedValue={values.siteUnit}
              required
            />

            <MultiLevelSelect
              options={sortedSourceOptions}
              showLabel
              label="P????st??l??hde"
              setFieldValue={setFieldValue}
              selectedValue={values.emissionSource}
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
              <div className="ml-2 w-2/3">
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
              label="K??ytett??v?? p????st??kerroin"
              name="emissionFactor"
              setFieldValue={setFieldValue}
              selectedValue={values.emissionFactor}
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
              <div className="ml-2 w-2/3">
                <Select
                  name="measurementUnit"
                  label="Mittayksikk??"
                  showLabel
                  options={
                    allUnitsObject[
                      values.emissionFactor?.physicalQuantity.name
                    ]?.map((unit) => {
                      return { ...unit, name: unit.shorthand };
                    }) ?? []
                  }
                  setFieldValue={setFieldValue}
                  selectedValue={allUnits
                    .map((unit) => {
                      return { ...unit, name: unit.shorthand };
                    })
                    .find(
                      (unit) => unit.name === values.measurementUnit.shorthand
                    )}
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

export default EditDataEntryForm;
