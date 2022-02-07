import { municipalities } from "@/shared/municipalities";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import FormField from "components/Forms/Common/FormField";
import Select from "components/Forms/Common/Select";
import Table, {
  TableCellOpenOptions,
  TableCellWithEdit,
} from "components/Table";
import { Form, Formik, FormikProps } from "formik";
import { useUpdateSiteMutation } from "graphql/mutations/site/updateSite.generated";
import { MyOrganizationSitesDocument } from "graphql/queries/site/myOrganizationSites.generated";
import { useMyOrganizationSiteTypesQuery } from "graphql/queries/site/myOrganizationSiteTypes.generated";
import { Dispatch, SetStateAction, useState } from "react";
import { Municipality, Site, SiteType, SiteUnit } from "types/generatedTypes";
import { deepObjectsEqual } from "utils/objectsEqual";

interface FormValues {
  name: string;
  siteType: SiteType;
  municipality: Municipality;
  siteUnits: SiteUnit[];
}

const EditSiteForm: React.FC<{
  setOpen: Dispatch<SetStateAction<boolean>>;
  site: Site;
}> = ({ setOpen, site }) => {
  const [updateSite] = useUpdateSiteMutation();
  const [units, setUnits] = useState(site.siteUnits);
  const [showInputField, setShowInputField] = useState(false);

  const { data } = useMyOrganizationSiteTypesQuery();
  if (!data?.siteTypes) return <div>Cannot get site types</div>;
  const initialValues: FormValues = {
    name: site.name,
    siteType: data?.siteTypes?.find(
      (s) => s.id === site.siteType.id
    ) as SiteType,
    municipality: site.municipality,
    siteUnits: site.siteUnits,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
        if (
          !deepObjectsEqual(values, initialValues) ||
          !deepObjectsEqual(units, site.siteUnits)
        ) {
          const response = await updateSite({
            variables: {
              siteID: site.id,
              name: values.name,
              siteTypeID: values.siteType?.id,
              municipalityID: values.municipality?.id,
              siteUnits: units.map((u) => {
                return { id: u.id, name: u.name };
              }),
            },
            refetchQueries: [MyOrganizationSitesDocument],
          });
          if (response.data.updateSite.id) {
            setSubmitting(false);
            resetForm();
            setOpen(false);
          } else {
            console.error("Failed to update site");
          }
        }
      }}
    >
      {({ isSubmitting, handleReset, setFieldValue }: FormikProps<{}>) => (
        <Form>
          <div className="space-y-4 rounded-md">
            <FormField
              showLabel
              label="Toimipaikan nimi"
              name="name"
              placeholder="Uusi toimipaikka "
              roundedTop
              roundedBottom
              required
            />
            <Select
              options={[...data?.siteTypes].sort((a, b) =>
                a.name.toLocaleLowerCase() > b.name.toLowerCase() ? 1 : -1
              )}
              showLabel
              label="Toimipaikan tyyppi"
              name="siteType"
              setFieldValue={setFieldValue}
              selectedValue={initialValues.siteType}
            />
            <Select
              options={municipalities}
              showLabel
              label="Kotikunta"
              name="municipality"
              setFieldValue={setFieldValue}
              selectedValue={initialValues.municipality}
            />

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
                  site={site}
                />
              )}
              <SiteUnitsTable
                units={units.filter((u) => !u.name.startsWith("default_"))}
                setUnits={setUnits}
              />
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

const SiteUnitsTable: React.FC<{
  units: SiteUnit[];
  setUnits: (val: SiteUnit[]) => void;
}> = ({ units, setUnits }) => {
  if (units.length === 0) return null;

  const handleParentValue = (oldVal: string, newValue: string) => {
    setUnits(
      units.map((u) => {
        return u.name === oldVal ? { ...u, name: newValue } : u;
      })
    );
  };

  return (
    <Table headers={["Yksiköt", ""]}>
      {units.map((unit, id) => {
        return (
          <tr key={unit.id + id} className="">
            <TableCellWithEdit
              value={unit.name}
              handleParentValue={handleParentValue}
            />
            <TableCellOpenOptions
              fn={() => setUnits(units.filter((u) => u.id !== unit.id))}
              variant="delete"
            />
          </tr>
        );
      })}
    </Table>
  );
};

const NewUnitInputField: React.FC<{
  units: SiteUnit[];
  setUnits: (val: SiteUnit[]) => void;
  setOpen: (val: boolean) => void;
  site: Site;
}> = ({ units, setUnits, setOpen, site }) => {
  const [unit, setUnit] = useState("");
  return (
    <div className="rounded-md bg-gray-200 px-2 py-2">
      <label
        htmlFor="newUnitField"
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Uuden yksikön nimi
      </label>
      <div className="flex">
        <input
          id="newUnitField"
          placeholder="Uusi yksikkö"
          className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
          value={unit}
          onChange={(e) => setUnit(e.currentTarget.value)}
        />
        <button
          type="submit"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-red-500 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          onClick={() => {
            setUnit(null);
            setOpen(false);
          }}
        >
          <XIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 bg-transparent text-teal-500 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          onClick={() => {
            setUnits([
              ...units,
              {
                id: `new_${unit}`,
                name: unit,
                site: site,
                __typename: "SiteUnit",
              },
            ]);
            setUnit("");
          }}
        >
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default EditSiteForm;
