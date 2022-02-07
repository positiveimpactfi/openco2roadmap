import FormField from "components/Forms/Common/FormField";
import { Form } from "formik";
import useTranslation from "next-translate/useTranslation";

export const RegisterForm: React.FC<{ isSubmitting: boolean }> = ({
  isSubmitting,
}) => {
  const { t } = useTranslation("auth");
  return (
    <Form className="mt-8 space-y-6">
      <div className="-space-y-px rounded-md shadow-sm">
        <FormField
          label={t("common.email")}
          name="email"
          autoComplete="email"
          required
          placeholder={t("common.email")}
          roundedTop
        />
        <FormField
          label={t("common.password")}
          name="password"
          required
          type="password"
          placeholder={t("common.password")}
          roundedBottom
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
          {t("pages.register.actions.register")}
        </button>
      </div>
    </Form>
  );
};
