import FormField from "components/Forms/Common/FormField";
import Select from "components/Forms/Common/Select";
import { businessFields } from "@/shared/businessFields";
import { municipalities } from "@/shared/municipalities";
import { Form, Formik, FormikProps } from "formik";
import { useCreateOrganizationMutation } from "graphql/mutations/organization/createOrganization.generated";
import { AllOrganizationsDocument } from "graphql/queries/organization/allOrganizations.generated";
import { BusinessField, Municipality } from "types/generatedTypes";
import { Dispatch, SetStateAction } from "react";
import { compareString } from "utils/compareStrings";
import useTranslation from "next-translate/useTranslation";

interface FormValues {
  name: string;
  businessID: string;
  municipality?: Municipality;
  businessField?: BusinessField;
}

const NewOrganizationForm: React.FC<{
  setSlideoverOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setSlideoverOpen }) => {
  const { t } = useTranslation("settings");

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
          <div className="space-y-4 rounded-md">
            <FormField
              showLabel
              label={t("pages.org_settings.form.name")}
              name="name"
              placeholder={t("pages.org_settings.form.name")}
              autoComplete="email"
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
              options={municipalities}
              showLabel
              label={t("pages.org_settings.form.location")}
              name="municipality"
              setFieldValue={setFieldValue}
            />
            <Select
              options={[...businessFields].sort((a, b) =>
                compareString(a.name, b.name)
              )}
              showLabel
              label={t("pages.org_settings.form.business_field")}
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
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Peruuta
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
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
