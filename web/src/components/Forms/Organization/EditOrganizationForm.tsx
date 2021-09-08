import FormField from "components/Forms/Common/FormField";
import Select from "components/Forms/Common/Select";
import WarningModal from "components/Warning";
import { businessFields } from "data/businessFields";
import { municipalities } from "data/municipalities";
import { Form, Formik, FormikProps } from "formik";
import { useUpdateOrganizationMutation } from "graphql/mutations/organization/updateOrganization.generated";
import { Organization } from "types";
import { AllOrganizationsDocument } from "graphql/queries/organization/allOrganizations.generated";
import { MyOrganization } from "pages/admin/organizations";
import { useState } from "react";

interface EditOrganizationProps {
  org: MyOrganization;
  setSlideoverOpen?: (arg: boolean) => void;
}

const EditOrganizationForm: React.FC<EditOrganizationProps> = ({
  org,
  setSlideoverOpen,
}) => {
  const [updateOrganization] = useUpdateOrganizationMutation();
  const [warningOpen, setWarningOpen] = useState(false);
  return (
    <>
      <WarningModal
        open={warningOpen}
        setOpen={setWarningOpen}
        title="Deactivate account"
        description="Are you sure you want to deactivate your account? All of your data will be permanently removed
                      from our servers forever. This action cannot be undone."
        onConfirm={() => console.log("clicked confirm")}
      />
      <Formik
        initialValues={{
          name: org.name,
          businessID: org.businessID,
          municipality: org.municipality,
          businessField: org.businessField,
        }}
        onSubmit={async (
          values: Partial<Organization>,
          { setSubmitting, resetForm }
        ) => {
          const response = await updateOrganization({
            variables: {
              organizationID: org.id,
              newData: {
                name: values.name,
                businessID: values.businessID,
                municipalityID: values.municipality?.id,
                businessFieldID: values.businessField?.id,
              },
            },
            refetchQueries: [AllOrganizationsDocument],
          });
          if (response.data.updateOrganization.id) {
            setSubmitting(false);
            resetForm();
            setSlideoverOpen(false);
          } else {
            console.error("Failed to add organization");
          }
        }}
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
                name="businessID"
                placeholder="Y-tunnus"
                roundedTop
                roundedBottom
                required
              />
              <Select
                name="municipality"
                showLabel
                label="Kotikunta"
                setFieldValue={setFieldValue}
                options={municipalities}
                selectedValue={org.municipality}
              />
              <Select
                name="Toimiala"
                showLabel
                label="Toimiala"
                setFieldValue={setFieldValue}
                options={businessFields}
                selectedValue={org.businessField}
              />
              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setWarningOpen(true)}
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
    </>
  );
};

export default EditOrganizationForm;
