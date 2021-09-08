import { useApolloClient } from "@apollo/client";
import { UserContext } from "context/UserContext";
import { useLogoutMutation } from "graphql/mutations/auth/logout.generated";
import Link from "next/link";
import { useContext } from "react";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { user } = useContext(UserContext);
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

  const isLoggedIn = user?.email !== undefined;

  const handleLogout = async () => {
    await logout();
    await apolloClient.resetStore();
  };

  return (
    <>
      <div className="flex flex-row justify-between w-full p-4">
        <div>{user?.email ?? "Not logged in"}</div>
        <div className="flex flex-row gap-2 ml-auto">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link href="/login" passHref>
                <a>Login</a>
              </Link>
              <Link href="/register" passHref>
                <a>Register</a>
              </Link>{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
