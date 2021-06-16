import FormField from "components/FormField";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useLoginMutation } from "../generated/graphql";
import { errorArrayToObject } from "utils/errorArrayToObject";
import { useApolloClient } from "@apollo/client";
import { isAdmin } from "utils/isAdmin";

interface LoginFormProps {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").min(5).required("Required!"),
  password: Yup.string().min(5).max(20).required("Required!"),
});

const LoginPage = () => {
  const [loginMutation] = useLoginMutation();
  const router = useRouter();
  const apolloClient = useApolloClient();
  return (
    <div>
      Login
      <br />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const response = await loginMutation({ variables: values });
          if (response.data?.login.errors) {
            setErrors(errorArrayToObject(response.data.login.errors));
          } else {
            apolloClient.resetStore();
            const user = response.data.login.user;
            const userIsAdmin = isAdmin(user);
            userIsAdmin ? router.push("/admin") : router.push("/");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }: FormikProps<LoginFormProps>) => (
          <Form>
            <div className="mx-8 my-4 max-w-md w-full space-y-8">
              <div className="flex flex-col justify-center items-center bg:white p-4 shadow rounded-lg space-y-6 ">
                <FormField
                  label="email"
                  name="email"
                  autoComplete="email"
                  required
                />
                <FormField
                  label="password"
                  name="password"
                  required
                  type="password"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-auto justify-center px-4 py-4 text-white rounded-md bg-indigo-500 "
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
