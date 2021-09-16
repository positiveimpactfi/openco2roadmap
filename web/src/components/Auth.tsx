import { useUser } from "hooks/useUser";
import Link from "next/link";
import React from "react";
import Container from "./Layout/Container";
import LoadingBar from "./LoadingBar";

export const Auth: React.FC = ({ children }) => {
  const { user, loading } = useUser();
  if (loading) {
    return (
      <Container>
        <div className="flex h-screen justify-center items-center">
          <LoadingBar />
        </div>
      </Container>
    );
  }

  return <>{user ? <Container>{children}</Container> : <UserNotLoggedIn />}</>;
};

const UserNotLoggedIn = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div>Et ole kirjautunut!</div>
      <div>
        <Link href="/login" passHref>
          <a className="font-medium text-teal-600 hover:text-teal-500">
            Kirjautumaan
          </a>
        </Link>
      </div>
    </div>
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
