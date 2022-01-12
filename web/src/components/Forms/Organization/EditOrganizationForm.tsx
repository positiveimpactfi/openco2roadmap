import { businessFields } from "@/shared/businessFields";
import { municipalities } from "@/shared/municipalities";
import Button from "components/Button";
import FormField from "components/Forms/Common/FormField";
import Select from "components/Forms/Common/Select";
import Notification from "components/Notification";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useUpdateOrganizationMutation } from "graphql/mutations/organization/updateOrganization.generated";
import { AllOrganizationsDocument } from "graphql/queries/organization/allOrganizations.generated";
import useTranslation from "next-translate/useTranslation";
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
  const { t } = useTranslation("settings");
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
                label={t("pages.org_settings.form.name")}
                name="name"
                placeholder={t("pages.org_settings.form.name")}
                roundedTop
                roundedBottom
                required
              />
              <FormField
                showLabel
                label={t("pages.org_settings.form.id")}
                name="businessID"
                placeholder={t("pages.org_settings.form.id")}
                roundedTop
                roundedBottom
                required
              />
              <Select
                name="municipality"
                showLabel
                label={t("pages.org_settings.form.location")}
                setFieldValue={setFieldValue}
                options={municipalities}
                selectedValue={org.municipality}
              />
              <Select
                name="businessField"
                showLabel
                label={t("pages.org_settings.form.business_field")}
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
