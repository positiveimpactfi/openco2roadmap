import { withAuth } from "components/Auth";
import ChangeLanguage from "components/ChangeLanguage";
import { RegisterForm } from "components/Forms/Auth/RegisterForm";
import { Formik, FormikProps } from "formik";
import { useRegisterMutation } from "graphql/mutations/auth/register.generated";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import { errorArrayToObject } from "utils/errorArrayToObject";
import * as yup from "yup";

interface RegisterFormProps {
  email: string;
  password: string;
}

const RegisterSchema = yup.object().shape({
  email: yup.string().email("Invalid email!").min(5).required("Required!"),
  password: yup.string().min(5).max(20).required("Required!"),
});

const RegisterPage = () => {
  const { t } = useTranslation("auth");
  const [registerMutation] = useRegisterMutation();
  const [tokenError, setTokenError] = useState("");
  const router = useRouter();
  const { token } = router.query;
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={RegisterSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        const response = await registerMutation({
          variables: {
            email: values.email,
            password: values.password,
            token: token as string,
          },
        });
        if (response.data?.register.errors) {
          const errors = errorArrayToObject(response.data.register.errors);
          if ("token" in errors) {
            console.log("bad token", errors.token);
            setTokenError(errors.token);
          }
          setErrors(errors);
        } else {
          router.push("/");
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }: FormikProps<RegisterFormProps>) => (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-screen">
          <div className="absolute right-4 top-4">
            <ChangeLanguage />
          </div>
          <div className="max-w-md w-full space-y-8">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {t("pages.register.title")}
            </h2>
            {tokenError && <p className="text-red-400">{tokenError}</p>}
            <RegisterForm isSubmitting={isSubmitting} />
          </div>
        </div>
      )}
    </Formik>
  );
};

export default withAuth(RegisterPage, false);
