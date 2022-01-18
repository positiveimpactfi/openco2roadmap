import { withAuth } from "components/Auth";
import ChangeLanguage from "components/ChangeLanguage";
import { RegistrationRequestForm } from "components/Forms/Auth/RegistationRequestForm";
import { Formik, FormikProps } from "formik";
import { useRegisterMutation } from "graphql/mutations/auth/register.generated";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { errorArrayToObject } from "utils/errorArrayToObject";
import * as yup from "yup";

interface RegisterFormProps {
  lastName: string;
  firstName: string;
  email: string;
  orgName: string;
  vatNumber: string;
  businessField: string;
  TOSUserData: boolean;
  TOSRights: boolean;
  TOSStats: boolean;
}

const RegisterSchema = yup.object().shape({
  email: yup.string().email("Invalid email!").min(5).required("Required!"),
});

const RegisterPage = () => {
  const { t } = useTranslation("auth");
  const [registerMutation] = useRegisterMutation();
  const [tokenError, setTokenError] = useState("");
  const router = useRouter();
  const { token } = router.query;
  const initialValues: RegisterFormProps = {
    lastName: "",
    firstName: "",
    email: "",
    orgName: "",
    vatNumber: "",
    businessField: "",
    TOSUserData: false,
    TOSRights: false,
    TOSStats: false,
  };
  return (
    <>
      <Head>
        <title>
          {(router.locale === "fi" ? "Rekisteröidy" : "Register") +
            " | Open CO2 Roadmap"}
        </title>
      </Head>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          // const response = await registerMutation({
          //   variables: {
          //     email: values.email,
          //     token: token as string,
          //   },
          // });
          // if (response.data?.register.errors) {
          //   const errors = errorArrayToObject(response.data.register.errors);
          //   if ("token" in errors) {
          //     console.log("bad token", errors.token);
          //     setTokenError(errors.token);
          //   }
          //   setErrors(errors);
          // } else {
          //   router.push("/");
          // }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }: FormikProps<RegisterFormProps>) => (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-screen">
            <div className="absolute right-4 top-4">
              <ChangeLanguage />
            </div>
            <div className="max-w-lg w-full space-y-8">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {t("pages.reg_request.title")}
              </h2>
              {tokenError && <p className="text-red-400">{tokenError}</p>}
              <RegistrationRequestForm isSubmitting={isSubmitting} />
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default withAuth(RegisterPage, false);
