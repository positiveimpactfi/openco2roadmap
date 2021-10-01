import { municipalities } from "@/shared/municipalities";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import FormField from "components/Forms/Common/FormField";
import Select from "components/Forms/Common/Select";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { Form, Formik, FormikProps } from "formik";
import { useCreateSiteMutation } from "graphql/mutations/site/createSite.generated";
import { MyOrganizationSitesDocument } from "graphql/queries/site/myOrganizationSites.generated";
import { useMyOrganizationSiteTypesQuery } from "graphql/queries/site/myOrganizationSiteTypes.generated";
import { Dispatch, SetStateAction, useState } from "react";
import { Municipality, SiteType } from "types/generatedTypes";

interface FormValues {
  name: string;
  siteType: SiteType;
  municipality: Municipality;
}

const CreateSiteForm: React.FC<{
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  const initialValues: FormValues = {
    name: "",
    siteType: null,
    municipality: null,
  };
  const [createSite] = useCreateSiteMutation();
  const [units, setUnits] = useState([]);
  const [showInputField, setShowInputField] = useState(false);

  const { data } = useMyOrganizationSiteTypesQuery();
  if (!data?.siteTypes) return <div>Cannot get site types</div>;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
        const response = await createSite({
          variables: {
            name: values.name,
            siteTypeID: values.siteType.id,
            municipalityID: values.municipality?.id,
            siteUnits: units,
          },
          refetchQueries: [MyOrganizationSitesDocument],
        });
        if (response.data.createSite.id) {
          setSubmitting(false);
          resetForm();
          setOpen(false);
        } else {
          console.error("Failed to create site");
        }
      }}
    >
      {({ isSubmitting, handleReset, setFieldValue }: FormikProps<{}>) => (
        <Form>
          <div className="rounded-md space-y-4">
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
            />
            <Select
              options={municipalities}
              showLabel
              label="Kotikunta"
              name="municipality"
              setFieldValue={setFieldValue}
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
                />
              )}
              <SiteUnitsTable units={units} />
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

export default CreateSiteForm;
