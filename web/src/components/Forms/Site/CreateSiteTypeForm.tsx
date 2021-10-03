import FormField from "components/Forms/Common/FormField";
import { Form, Formik, FormikProps } from "formik";
import { useCreateSiteTypeMutation } from "graphql/mutations/site/createSiteType.generated";
import {
  MyOrganizationSiteTypesDocument,
  MyOrganizationSiteTypesQueryResult,
  useMyOrganizationSiteTypesQuery,
} from "graphql/queries/site/myOrganizationSiteTypes.generated";

interface FormValues {
  name: string;
}

const CreateSiteTypeForm: React.FC<{ setOpen: (val: boolean) => void }> = ({
  setOpen,
}) => {
  const [createSiteType] = useCreateSiteTypeMutation();
  const { data } = useMyOrganizationSiteTypesQuery({
    fetchPolicy: "network-only",
  });
  const initialValues: FormValues = {
    name: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
        const response = await createSiteType({
          variables: {
            name: values.name,
          },
        });
        if (response.data.createSiteType.id) {
          setSubmitting(false);
          resetForm();
          setOpen(false);
        } else {
          console.error("Failed to add organization");
        }
      }}
    >
      {({ isSubmitting, handleReset }: FormikProps<{}>) => (
        <Form>
          <div className="rounded-md space-y-4">
            <FormField
              showLabel
              label="Toimipaikan tyypin nimi"
              name="name"
              placeholder="Toimipaikan tyypin nimi"
              roundedTop
              roundedBottom
              required
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
          {data?.siteTypes && (
            <>
              <p className="mt-2 text-sm font-medium text-gray-700">
                Organisaatiosi toimipaikkojen tyypit:
              </p>
              <ul className="list-disc ml-8 text-sm font-medium text-gray-700">
                {data.siteTypes.map((st) => (
                  <li key={st.id}> {st.name}</li>
                ))}
              </ul>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default CreateSiteTypeForm;
