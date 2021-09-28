import { businessFields } from "@/shared/businessFields";
import { municipalities } from "@/shared/municipalities";
import Button from "components/Button";
import FormField from "components/Forms/Common/FormField";
import Select from "components/Forms/Common/Select";
import Notification from "components/Notification";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useUpdateOrganizationMutation } from "graphql/mutations/organization/updateOrganization.generated";
import { AllOrganizationsDocument } from "graphql/queries/organization/allOrganizations.generated";
import { MyOrganization } from "pages/admin/organizations";
import { useState } from "react";
import { Municipality, Organization } from "types/generatedTypes";
import { compareString } from "utils/compareStrings";
import { deepObjectsEqual } from "utils/objectsEqual";

interface EditOrganizationProps {
  org: MyOrganization;
  setSlideoverOpen?: (arg: boolean) => void;
}

const EditOrganizationForm: React.FC<EditOrganizationProps> = ({
  org,
  setSlideoverOpen,
}) => {
  const [updateOrganization] = useUpdateOrganizationMutation();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<Partial<Organization>>({
    name: org.name,
    businessID: org.businessID,
    municipality: org.municipality,
    businessField: org.businessField,
  });
  return (
    <>
      <Notification
        title="Hienoa!"
        description="Yrityksen tiedot päivitetty onnistuneesti."
        show={notificationOpen}
        setShow={setNotificationOpen}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={async (
          values: Partial<Organization>,
          {
            setSubmitting,
            resetForm,
            setValues,
          }: FormikHelpers<Partial<Organization>>
        ) => {
          // Only send request to API server if form values are changed
          if (!deepObjectsEqual(values, initialValues)) {
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
              refetchQueries: setSlideoverOpen && [AllOrganizationsDocument],
            });
            if (response.data.updateOrganization.id) {
              const updatedOrg = response.data.updateOrganization;
              console.log("updated org", updatedOrg);
              setSubmitting(false);
              resetForm();
              setSlideoverOpen && setSlideoverOpen(false);
              setNotificationOpen(true);
              setValues({
                name: updatedOrg.name,
                businessID: updatedOrg.businessID,
                municipality: updatedOrg.municipality as Municipality,
                businessField: updatedOrg.businessField,
              });
              setInitialValues({
                name: updatedOrg.name,
                businessID: updatedOrg.businessID,
                municipality: updatedOrg.municipality as Municipality,
                businessField: updatedOrg.businessField,
              });
            } else {
              console.error("Failed to add organization");
            }
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }: FormikProps<{}>) => (
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
                options={[...businessFields].sort((a, b) =>
                  compareString(a.name, b.name)
                )}
                selectedValue={org.businessField}
              />
              <div className="pt-5">
                <div className="flex justify-end space-x-4">
                  {/* only show cancel button when not inside modal*/}
                  {setSlideoverOpen && (
                    <Button onClick={() => setSlideoverOpen(false)}>
                      Peruuta
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting || deepObjectsEqual(values, initialValues)
                    }
                    variant="success"
                  >
                    Tallenna
                  </Button>
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
