import FormField from "components/FormField";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { errorArrayToObject } from "utils/errorArrayToObject";
import * as Yup from "yup";
import { useRegisterMutation } from "../generated/graphql";

interface RegisterFormProps {
  email: string;
  password: string;
}

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").min(5).required("Required!"),
  password: Yup.string().min(5).max(20).required("Required!"),
});

const RegisterPage = () => {
  const [registerMutation] = useRegisterMutation();
  const router = useRouter();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={RegisterSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        const response = await registerMutation({ variables: values });
        if (response.data?.register.errors) {
          setErrors(errorArrayToObject(response.data.register.errors));
        } else {
          router.push("/");
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }: FormikProps<RegisterFormProps>) => (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-screen">
          <div className="max-w-md w-full space-y-8">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Luo uusi käyttäjä
            </h2>
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <FormField
                  label="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="Sähköposti"
                  roundedTop
                />
                <FormField
                  label="password"
                  name="password"
                  required
                  type="password"
                  placeholder="Salasana"
                  roundedBottom
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                  Rekisteröi
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RegisterPage;
