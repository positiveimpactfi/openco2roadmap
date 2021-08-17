import FormField from "components/FormField";
import { Form, Formik, FormikProps } from "formik";
import { Organization } from "pages/admin/organizations";

interface EditOrganizationProps {
  org: Organization;
}

const EditOrganizationForm: React.FC<EditOrganizationProps> = ({ org }) => {
  return (
    <Formik
      initialValues={{
        name: org.name,
        businessField: org.businessField,
        municipality: org.municipality,
      }}
      onSubmit={() => console.log("submitting new org")}
    >
      {({ isSubmitting }: FormikProps<{}>) => (
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
              name="businessField"
              placeholder="Toimiala"
              roundedTop
              roundedBottom
              required
            />
            <FormField
              showLabel
              label="Kotikunta"
              name="municipality"
              placeholder="Kotikunta"
              roundedTop
              roundedBottom
            />
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
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

export default EditOrganizationForm;
