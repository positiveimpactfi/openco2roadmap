import { useUser } from "hooks/useUser";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Link from "next/link";
import LandingPage from "./LandingPage";
import Container from "./Layout/Container";
import LoadingBar from "./LoadingBar";

export const Auth: React.FC = ({ children }) => {
  const { user, loading } = useUser();
  if (loading) {
    return (
      <Container hideElements={true}>
        <div className="flex h-screen items-center justify-center">
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
      <LandingPage />
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
