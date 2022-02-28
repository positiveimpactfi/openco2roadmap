import { municipalities } from "@/shared/municipalities";
import FormField from "components/Forms/Common/FormField";
import { Field, Form } from "formik";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { localizedIndustries } from "utils/getLocalizedIndustries";
import Checkbox from "../Common/Checkbox";
import MultiLevelSelect from "../Common/MultiLevelSelect";
import Select from "../Common/Select";

export const RegistrationRequestForm: React.FC<{
  isSubmitting: boolean;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}> = ({ isSubmitting, setFieldValue }) => {
  const { locale } = useRouter();
  const { t } = useTranslation("auth");

  return (
    <Form className="mt-8 space-y-6">
      <div className="space-y-6 rounded-md">
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
        <MultiLevelSelect
          levels="two"
          options={
            locale === "fi"
              ? localizedIndustries("fi")
              : localizedIndustries("en")
          }
          showLabel
          label={t("pages.reg_request.main_field")}
          name="industry"
          setFieldValue={setFieldValue}
          required
        />
        <Select
          options={municipalities}
          showLabel
          label={t("pages.reg_request.business_location")}
          name="municipality"
          setFieldValue={setFieldValue}
          required
        />
        <div>
          <label
            htmlFor="comment"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {t("pages.reg_request.comment.title")}
          </label>
          <Field
            id="comment"
            name="comment"
            rows={10}
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            placeholder={t("pages.reg_request.comment.placeholder")}
            as="textarea"
          />
        </div>
        <Checkbox
          name="TOSUserData"
          label={t("pages.reg_request.user_agreements.user_data.label")}
          description={t(
            "pages.reg_request.user_agreements.user_data.description"
          )}
          required
          href="/tos"
        />
        <Checkbox
          name="TOSRights"
          label={t("pages.reg_request.user_agreements.user_rights.label")}
          description={t(
            "pages.reg_request.user_agreements.user_rights.description"
          )}
          required
        />
        <Checkbox
          name="TOSStats"
          label={t("pages.reg_request.user_agreements.user_stats.label")}
          description={t(
            "pages.reg_request.user_agreements.user_stats.description"
          )}
          required
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
          {t("pages.reg_request.actions.send_request")}
        </button>
      </div>
    </Form>
  );
};
