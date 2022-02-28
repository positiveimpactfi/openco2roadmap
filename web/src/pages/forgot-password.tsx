import { withAuth } from "components/Auth";
import Head from "next/head";

import ForgotPasswordForm from "components/Forms/Auth/ForgotPasswordForm";
import { useRouter } from "next/router";

const ForgotPasswordPage: React.FC = () => {
  const { locale } = useRouter();
  return (
    <>
      <Head>
        <title>
          {locale === "fi" ? "Uusi salasana" : "Reset password"} | Matkailun
          CO2-laskuri
        </title>
      </Head>
      <ForgotPasswordForm />
    </>
  );
};

export default withAuth(ForgotPasswordPage, false);
