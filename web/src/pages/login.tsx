import { withAuth } from "components/Auth";
import ChangeLanguage from "components/ChangeLanguage";
import { Formik, FormikProps } from "formik";
import { useLoginMutation } from "graphql/mutations/auth/login.generated";
import { MeDocument, MeQuery } from "graphql/queries/users/me.generated";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { errorArrayToObject } from "utils/errorArrayToObject";
import * as Yup from "yup";
import { LoginForm } from "../components/Forms/Auth/LoginForm";
import Head from "next/head";

interface LoginFormProps {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Tarkista antamasi sähköpostiosoite")
    .min(5)
    .required("Sähköpostiosoite vaaditaan!"),
  password: Yup.string().min(5).max(30).required("Salasana vaaditan!"),
});

const LoginPage = () => {
  const { t } = useTranslation("auth");
  const [login] = useLoginMutation();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>
          {(router.locale === "fi" ? "Kirjaudu" : "Login") +
            " | Open CO2 Roadmap"}
        </title>
      </Head>
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
            router.push("/");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }: FormikProps<LoginFormProps>) => (
          <div className="flex min-h-screen w-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute right-4 top-4">
              <ChangeLanguage />
            </div>
            <div className="w-full max-w-md space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  {t("pages.login.title")}
                </h2>
                {/* <p className="mt-2 text-center text-sm text-gray-600">
                Tai{" "}
                <Link href="/register" passHref>
                  <a className="font-medium text-teal-600 hover:text-teal-500">
                    Luo uusi käyttäjätunnus
                  </a>
                </Link>
              </p> */}
              </div>
              <LoginForm isSubmitting={isSubmitting} />
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default withAuth(LoginPage, false);
