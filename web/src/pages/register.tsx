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
    <div>
      Register
      <br />
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
                  Register
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
