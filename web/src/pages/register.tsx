import { Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { errorArrayToObject } from "utils/errorArrayToObject";
import * as Yup from "yup";
import { useRegisterMutation } from "../generated/graphql";
import { RegisterForm } from "../components/Forms/Auth/RegisterForm";

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
            <RegisterForm isSubmitting={isSubmitting} />
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RegisterPage;
