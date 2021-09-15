import FormField from "components/Forms/Common/FormField";
import Select from "components/Forms/Common/Select";
import { businessFields } from "data/businessFields";
import { municipalities } from "data/municipalities";
import { Form, Formik, FormikProps } from "formik";
import { useCreateOrganizationMutation } from "graphql/mutations/organization/createOrganization.generated";
import { AllOrganizationsDocument } from "graphql/queries/organization/allOrganizations.generated";
import { BusinessField, Municipality } from "types/generatedTypes";
import { Dispatch, SetStateAction } from "react";

interface FormValues {
  name: string;
  businessID: string;
  municipality?: Municipality;
  businessField?: BusinessField;
}

const NewOrganizationForm: React.FC<{
  setSlideoverOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setSlideoverOpen }) => {
  const initialValues: FormValues = {
    name: "",
    businessID: "",
    municipality: null,
    businessField: null,
  };
  const [addOrganization] = useCreateOrganizationMutation();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
        const response = await addOrganization({
          variables: {
            data: {
              name: values.name,
              businessID: values.businessID,
              municipalityID: values.municipality?.id,
              businessFieldID: values.businessField?.id,
            },
          },
          refetchQueries: [AllOrganizationsDocument],
        });
        if (response.data.createOrganization.id) {
          setSubmitting(false);
          resetForm();
          setSlideoverOpen(false);
        } else {
          console.error("Failed to add organization");
        }
      }}
    >
      {({ isSubmitting, handleReset, setFieldValue }: FormikProps<{}>) => (
        <Form>
          <div className="rounded-md space-y-4">
            <FormField
              showLabel
              label="Yrityksen nimi"
              name="name"
              placeholder="Yrityksen nimi"
              autoComplete="email"
              roundedTop
              roundedBottom
              required
            />
            <FormField
              showLabel
              label="Y-tunnus"
              name="businessID"
              placeholder="Y-tunnus"
              roundedTop
              roundedBottom
              required
            />
            <Select
              options={municipalities}
              showLabel
              label="Kotikunta"
              name="municipality"
              setFieldValue={setFieldValue}
            />
            <Select
              options={businessFields}
              showLabel
              label="Toimiala"
              name="businessField"
              setFieldValue={setFieldValue}
            />
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                    setSlideoverOpen(false);
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

export default NewOrganizationForm;
