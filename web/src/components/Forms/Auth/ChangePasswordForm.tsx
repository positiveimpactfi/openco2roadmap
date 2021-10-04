import Button from "components/Button";
import { Form, Formik } from "formik";
import { useChangePasswordMutation } from "graphql/mutations/auth/changePassword.generated";
import { useState } from "react";
import * as Yup from "yup";
import FormField from "../Common/FormField";
import Link from "next/link";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(5, "Salasanan pitää olla vähintään 5 merkkiä pitkä")
    .required("Uusi salasana vaaditaan!"),
});

const ChangePasswordForm: React.FC<{ token: string }> = ({ token }) => {
  const [changePassword] = useChangePasswordMutation();
  const [complete, setComplete] = useState(false);
  const [tokenError, setTokenError] = useState("");
  return (
    <Formik
      initialValues={{ newPassword: "" }}
      onSubmit={async (values) => {
        const res = await changePassword({
          variables: { newPassword: values.newPassword, token: token },
        });
        if (res.data.changePassword.errors) {
          console.error("password reset failed");
          setTokenError("Epäkelpo tietue");
        } else {
          setTokenError("");
          setComplete(true);
        }
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, errors, values }) => (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-screen">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Vaihda salasana
              </h2>
              {/* <p className="text-sm font-medium text-gray-700 text-center">
                Uusiaksesi salasanan syötä alle sähköpostiosoite. Linkki ja
                ohjeet salasanan uusimiseksi lähetetään sähköpostiisi.
              </p> */}
            </div>
            <Form className="mt-8 space-y-6">
              <FormField
                label="Salasana"
                name="newPassword"
                placeholder="Uusi salasana"
                required
                roundedBottom
                roundedTop
                type="password"
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="success"
                  disabled={
                    values.newPassword === "" ||
                    isSubmitting ||
                    Object.keys(errors).length !== 0
                  }
                >
                  Vaihda salasana
                </Button>
              </div>
              {complete && (
                <div className="flex flex-col justify-center items-center">
                  <p className="text-center font-medium text-md text-gray-700">
                    Salasana päivitetty!
                  </p>
                  <Link href="/login" passHref>
                    <a className="text-center font-medium text-teal-600 hover:text-teal-500">
                      Kirjautumaan
                    </a>
                  </Link>
                </div>
              )}
              {tokenError !== "" && (
                <div>
                  <p className="font-medium text-red-500 text-center text-md">
                    {tokenError}
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

export default ChangePasswordForm;
