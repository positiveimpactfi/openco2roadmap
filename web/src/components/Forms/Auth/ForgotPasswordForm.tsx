import { Formik, Form } from "formik";
import FormField from "../Common/FormField";
import Button from "components/Button";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "graphql/mutations/auth/forgotPassword.generated";
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import ChangeLanguage from "components/ChangeLanguage";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Taskista antamasi sähköpostiosoite")
    .min(5, "Sähköpostiosoitteen pitää olla vähintään 5 merkkiä pitkä")
    .required("Sähköpostiosoite vaaditaan!"),
});

const ForgotPasswordForm: React.FC = () => {
  const { t } = useTranslation("auth");
  const [forgotPassword, { error }] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
  if (error) {
    console.error(error);
  }
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async (values) => {
        const res = await forgotPassword({ variables: values });
        if (!res) {
          console.error("password reset failed");
        } else setComplete(true);
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, errors, values }) => (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-screen">
          <div className="absolute right-4 top-4">
            <ChangeLanguage />
          </div>
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {t("pages.forgot_password.title")}
              </h2>
              <p className="text-sm font-medium text-gray-700 text-center">
                {t("pages.forgot_password.description")}
              </p>
            </div>
            <Form className="mt-8 space-y-6">
              <FormField
                label={t("pages.forgot_password.form.email")}
                name="email"
                placeholder={t("pages.forgot_password.form.email")}
                required
                roundedBottom
                roundedTop
                type="email"
                autoComplete="email"
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="success"
                  disabled={
                    values.email === "" ||
                    isSubmitting ||
                    Object.keys(errors).length !== 0
                  }
                >
                  {t("pages.forgot_password.title")}
                </Button>
              </div>
              {complete && (
                <div>
                  <p className="text-center font-medium text-md text-gray-700">
                    {t("pages.forgot_password.form.success")}
                  </p>
                </div>
              )}
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
