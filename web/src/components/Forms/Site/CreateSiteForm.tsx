import FormField from "components/Forms/Common/FormField";
import Select from "components/Forms/Common/Select";
import { municipalities } from "data/municipalities";
import { Form, Formik, FormikProps } from "formik";
import { useCreateSiteMutation } from "graphql/mutations/site/createSite.generated";
import { MyOrganizationSitesDocument } from "graphql/queries/site/myOrganizationSites.generated";
import { useMyOrganizationSiteTypesQuery } from "graphql/queries/site/myOrganizationSiteTypes.generated";
import { Dispatch, SetStateAction } from "react";
import { Municipality, SiteType } from "types";

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
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                    setOpen(false);
                  }}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Peruuta
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Tallenna
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateSiteForm;
