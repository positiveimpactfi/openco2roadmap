import { useUser } from "hooks/useUser";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Link from "next/link";
import Container from "./Layout/Container";
import LoadingBar from "./LoadingBar";

export const Auth: React.FC = ({ children }) => {
  const { user, loading } = useUser();
  if (loading) {
    return (
      <Container hideElements={true}>
        <div className="flex h-screen justify-center items-center">
          <LoadingBar />
        </div>
      </Container>
    );
  }

  return <>{user ? <Container>{children}</Container> : <UserNotLoggedIn />}</>;
};

const UserNotLoggedIn = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Open CO2 Roadmap</title>
      </Head>
      <div className="flex flex-col h-screen items-center justify-center">
        <div>{t("errors:auth.not_logged_in")}</div>
        <div>
          <Link href="/login" passHref>
            <a className="font-medium text-teal-600 hover:text-teal-500">
              {t("auth:actions.to_login")}
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export function withAuth(Component: React.FC, auth = true) {
  // eslint-disable-next-line react/display-name
  return () =>
    !auth ? (
      <Component />
    ) : (
      <Auth>
        <Component />
      </Auth>
    );
}

export default Auth;
