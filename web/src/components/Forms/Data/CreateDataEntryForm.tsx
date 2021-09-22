import { components } from "@/shared/components";
import { allUnitsObject } from "@/shared/measurementUnits";
import { CategoryType } from "@/shared/types/CategoryType";
import { EmissionSourceType } from "@/shared/types/EmissionSourceType";
import Button from "components/Button";
import Select from "components/Forms/Common/Select";
import SelectNumber from "components/Forms/Common/SelectNumber";
import { months } from "data/months";
import { Form, Formik, FormikProps } from "formik";
import { useCreateDataEntryMutation } from "graphql/mutations/data/createDataEntry.generated";
import { MyDataEntriesDocument } from "graphql/queries/data/dataEntry.generated";
import { useAllPublicEmissionFactorsQuery } from "graphql/queries/emissions/allPublicEmissionFactors.generated";
import { useMyEmissionFactorsQuery } from "graphql/queries/emissions/myEmissionFactors.generated";
import { useMyOrganizationSitesQuery } from "graphql/queries/site/myOrganizationSites.generated";
import {
  EmissionSource,
  MeasurementUnit,
  MeasurementUnitType,
  SiteUnit,
} from "types/generatedTypes";
import FormField from "../Common/FormField";
import { startOfMonth, endOfMonth, add, sub } from "date-fns";

interface FormValues {
  consumptionValue: number;
  emissionFactorValue: ReducedEF;
  emissionSource: EmissionSource;
  measurementUnit: MeasurementUnit;
  siteUnit: SiteUnit;
  month: { id: number; name: string };
  year: number;
}

type ReducedEF = {
  sourceNames: string[];
  sourceIds: number[];
  id: number;
  name: string;
  physicalQuantity: {
    __typename?: "PhysicalQuantity";
    name: string;
    baseUnit: {
      __typename?: "MeasurementUnit";
      name: string;
      shorthand: string;
    };
  };
  values: {
    __typename?: "EmissionFactorValue";
    id: string;
    value: number;
    startDate: number;
    endDate: number;
  }[];
};

const CreateDataEntryForm: React.FC<{
  setOpen: (arg: boolean) => void;
}> = ({ setOpen }) => {
  const initialValues: FormValues = {
    consumptionValue: 0,
    emissionFactorValue: null,
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
          physicalQuantity: current?.physicalQuantity,
          values: current?.values,
        },
      ],
      [] as ReducedEF[]
    )
    .flat();

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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
        const today = new Date(values.year, values.month.id - 1);
        const monthStart = startOfMonth(today);
        const monthEnd = endOfMonth(today);
        const startDayUTC = sub(monthStart, {
          minutes: today.getTimezoneOffset(),
        });
        const endDayUTC = sub(monthEnd, {
          minutes: today.getTimezoneOffset(),
        });

        const vars = {
          category: CategoryType[
            (
              values.emissionSource as EmissionSource & {
                categoryID: number;
              }
            ).categoryID
          ] as unknown as CategoryType,
          consumptionValue: values.consumptionValue,
          emissionsFactorValueID: values.emissionFactorValue.values[0].id,
          emissionSource: EmissionSourceType[
            values.emissionFactorValue.sourceIds[0]
          ] as unknown as EmissionSourceType,
          measurementUnit: values.measurementUnit
            .shorthand as unknown as MeasurementUnitType,
          siteUnitID: values.siteUnit.id,
          startDate: startDayUTC,
          endDate: endDayUTC,
        };
        console.log("variables", vars);
        const response = await createDataEntry({
          variables: vars as any,
          refetchQueries: [MyDataEntriesDocument],
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
              placeholder="Valitse toimipaikka "
              required
            />
            <Select
              options={components.sort((a, b) => (a.name > b.name ? 1 : -1))}
              showLabel
              label="Komponentti"
              name="emissionSource"
              setFieldValue={setFieldValue}
            />
            <div className="flex justify-between">
              <div>
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
              <div className="w-full ml-2">
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
                  label="Mittayksikkö"
                  showLabel
                  options={
                    allUnitsObject[
                      values.emissionFactorValue?.physicalQuantity.name
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
