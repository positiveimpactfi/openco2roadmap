import { withAuth } from "components/Auth";
import Button from "components/Button";
import ChangeLanguage from "components/ChangeLanguage";
import { RegistrationRequestForm } from "components/Forms/Auth/RegistationRequestForm";
import { Formik, FormikProps } from "formik";
import { useCreateRegistrationRequestMutation } from "graphql/mutations/organization/createRegistrationRequest.generated";
import { Translate } from "next-translate";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Municipality, SubIndustry } from "types/generatedTypes";
import * as yup from "yup";

interface RegisterFormProps {
  lastName: string;
  firstName: string;
  email: string;
  orgName: string;
  vatNumber: string;
  industry: SubIndustry;
  municipality: Municipality;
  comment: "";
  TOSUserData: boolean;
  TOSRights: boolean;
  TOSStats: boolean;
}

const RegisterSchema = yup.object().shape({
  email: yup.string().email("Invalid email!").min(5).required("Required!"),
  TOSUserData: yup.boolean().isTrue("Required!"),
  TOSRights: yup.boolean().isTrue("Required!"),
  TOSStats: yup.boolean().isTrue("Required!"),
});

const RegisterPage = () => {
  const { t } = useTranslation("auth");
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
  };

  const handleToLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>
          {(router.locale === "fi" ? "Rekisteröidy" : "Register") +
            " | Matkailun CO2-laskuri"}
        </title>
      </Head>
      {success ? (
        <FormSent t={t} handleToLogin={handleToLogin} />
      ) : (
        <Form t={t} onSuccess={handleSuccess} />
      )}
    </>
  );
};

const Form: React.FC<{ t: Translate; onSuccess: () => void }> = ({
  t,
  onSuccess,
}) => {
  const [createRegistrationRequest] = useCreateRegistrationRequestMutation();
  const initialValues: RegisterFormProps = {
    lastName: "",
    firstName: "",
    email: "",
    orgName: "",
    vatNumber: "",
    industry: null,
    municipality: null,
    comment: "",
    TOSUserData: false,
    TOSRights: false,
    TOSStats: false,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegisterSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const response = await createRegistrationRequest({
          variables: {
            data: {
              lastName: values.lastName,
              firstName: values.firstName,
              email: values.email,
              orgName: values.orgName,
              businessID: values.vatNumber,
              industryCode: values.industry.code.toString(),
              municipalityID: values.municipality.id,
            },
          },
        });
        if (!response.data?.createRegistrationRequest.id) {
          console.log("something went wrong...");
        } else {
          console.log("request sent successfully");
          onSuccess();
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue }: FormikProps<RegisterFormProps>) => (
        <div className="flex min-h-screen w-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="absolute right-4 top-4">
            <ChangeLanguage />
          </div>
          <div className="w-full max-w-xl space-y-8">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {t("pages.reg_request.title")}
            </h2>
            <RegistrationRequestForm
              isSubmitting={isSubmitting}
              setFieldValue={setFieldValue}
            />
          </div>
        </div>
      )}
    </Formik>
  );
};

const FormSent: React.FC<{ t: Translate; handleToLogin: () => void }> = ({
  t,
  handleToLogin,
}) => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute right-4 top-4">
        <ChangeLanguage />
      </div>
      <div className="w-full max-w-xl space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t("pages.reg_request.success.title")}
        </h2>
        <p className="text-md text-center font-medium text-gray-700">
          {t("pages.reg_request.success.description")}
        </p>
        <div className="flex justify-center">
          <Button variant="success" onClick={handleToLogin}>
            {t("pages.reg_request.actions.to_login")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(RegisterPage, false);
