import FormField from "components/Forms/Common/FormField";
import { Form, Formik, FormikProps } from "formik";
import { Organization } from "pages/admin/organizations";
import Select from "components/Forms/Common/Select";
import { municipalities } from "data/municipalities";
import { businessFields } from "data/businessFields";

interface EditOrganizationProps {
  org: Organization;
}

const EditOrganizationForm: React.FC<EditOrganizationProps> = ({ org }) => {
  return (
    <Formik
      initialValues={{
        name: org.name,
        businessId: org.businessId,
        municipality: org.municipality,
        businessField: org.businessField,
      }}
      onSubmit={() => console.log("submitting new org")}
    >
      {({ isSubmitting, setFieldValue }: FormikProps<{}>) => (
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
              name="businessId"
              placeholder="Y-tunnus"
              roundedTop
              roundedBottom
              required
            />
            <Select
              name="Kotikunta"
              showLabel
              label="Kotikunta"
              setFieldValue={setFieldValue}
              options={municipalities}
            />
            <Select
              name="Toimiala"
              showLabel
              label="Toimiala"
              setFieldValue={setFieldValue}
              options={businessFields}
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
