import { withAuth } from "components/Auth";
import ChangePasswordForm from "components/Forms/Auth/ChangePasswordForm";
import { useRouter } from "next/router";
import Head from "next/head";

const ChangePasswordPage: React.FC = ({}) => {
  const router = useRouter();
  const token =
    typeof router.query.token === "string" ? router.query.token : "";

  return (
    <>
      <Head>
        <title>
          {router.locale === "fi" ? "Vaihda salasana" : "Change password"} |
          Matkailun CO2-laskuri
        </title>
      </Head>
      <ChangePasswordForm token={token} />
    </>
  );
};

export default withAuth(ChangePasswordPage, false);
