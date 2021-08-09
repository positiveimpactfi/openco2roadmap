import FormField from "components/FormField";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { errorArrayToObject } from "utils/errorArrayToObject";
import { isAdmin } from "utils/isAdmin";
import * as Yup from "yup";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { LockClosedIcon } from "@heroicons/react/solid";

interface LoginFormProps {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").min(5).required("Required!"),
  password: Yup.string().min(5).max(20).required("Required!"),
});

const LoginPage = () => {
  const [login] = useLoginMutation();
  const router = useRouter();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        const response = await login({
          variables: values,
          update: (caches, { data }) => {
            caches.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: data?.login.user,
              },
            });
          },
        });
        if (response.data?.login.errors) {
          setErrors(errorArrayToObject(response.data.login.errors));
        } else {
          const user = response.data.login.user;
          isAdmin(user) ? router.push("/admin") : router.push("/");
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }: FormikProps<LoginFormProps>) => (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-screen">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Kirjaudu CO2-laskuriin
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Tai{" "}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Luo uusi käyttäjätunnus
                </a>
              </p>
            </div>
            <LoginForm isSubmitting={isSubmitting} />
          </div>
        </div>
      )}
    </Formik>
  );
};

const LoginForm: React.FC<{ isSubmitting: boolean }> = ({ isSubmitting }) => {
  return (
    <Form className="mt-8 space-y-6">
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <FormField
          label="Sähköpostiosoite"
          name="email"
          placeholder="Sähköpostiosoite"
          autoComplete="email"
          roundedTop
          required
        />
        <FormField
          label="Salasana"
          name="password"
          placeholder="Salasana"
          type="password"
          roundedBottom
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Muista minut
          </label>
        </div>

        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Salasana hukassa?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          Kirjaudu
        </button>
      </div>
    </Form>
  );
};

export default LoginPage;
