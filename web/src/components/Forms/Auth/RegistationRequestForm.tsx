import FormField from "components/Forms/Common/FormField";
import { Form } from "formik";
import useTranslation from "next-translate/useTranslation";
import Checkbox from "../Common/Checkbox";

export const RegistrationRequestForm: React.FC<{ isSubmitting: boolean }> = ({
  isSubmitting,
}) => {
  const { t } = useTranslation("auth");
  return (
    <Form className="mt-8 space-y-6">
      <div className="rounded-md space-y-6">
        <FormField
          label={t("profile:contact.last_name")}
          name="lastName"
          required
          placeholder={t("profile:contact.last_name")}
          roundedBottom
          roundedTop
          showLabel
          variant="tight"
        />
        <FormField
          label={t("profile:contact.first_name")}
          name="firstName"
          required
          placeholder={t("profile:contact.first_name")}
          roundedBottom
          roundedTop
          showLabel
          variant="tight"
        />
        <FormField
          label={t("common.email")}
          name="email"
          autoComplete="email"
          required
          placeholder={t("common.email")}
          roundedBottom
          roundedTop
          showLabel
          variant="tight"
        />
        <FormField
          label={t("settings:pages.org_settings.form.name")}
          name="orgName"
          required
          placeholder={t("settings:pages.org_settings.form.name")}
          roundedBottom
          roundedTop
          showLabel
          variant="tight"
        />
        <FormField
          label={t("settings:pages.org_settings.form.id")}
          name="vatNumber"
          required
          placeholder={t("settings:pages.org_settings.form.id")}
          roundedBottom
          roundedTop
          showLabel
          variant="tight"
        />
        <FormField
          label={t("pages.reg_request.main_field")}
          name="businessField"
          required
          placeholder={t("pages.reg_request.main_field")}
          roundedBottom
          roundedTop
          showLabel
          variant="tight"
        />
        <FormField
          label={t("pages.reg_request.business_location")}
          name="location"
          required
          placeholder={t("pages.reg_request.business_location")}
          roundedBottom
          roundedTop
          showLabel
          variant="tight"
        />
        <Checkbox
          name="TOSUserData"
          label={t("pages.reg_request.user_agreements.user_data.label")}
          description={t(
            "pages.reg_request.user_agreements.user_data.description"
          )}
        />
        <Checkbox
          name="TOSRights"
          label={t("pages.reg_request.user_agreements.user_rights.label")}
          description={t(
            "pages.reg_request.user_agreements.user_rights.description"
          )}
        />
        <Checkbox
          name="TOSStats"
          label={t("pages.reg_request.user_agreements.user_stats.label")}
          description={t(
            "pages.reg_request.user_agreements.user_stats.description"
          )}
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
          {t("pages.reg_request.actions.send_request")}
        </button>
      </div>
    </Form>
  );
};
