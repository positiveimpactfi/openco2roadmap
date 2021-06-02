import { useApolloClient } from "@apollo/client";
import { useLogoutMutation, useMeQuery } from "generated/graphql";
import Link from "next/link";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data } = useMeQuery();
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

  const isLoggedIn = data?.me?.email !== undefined;

  const handleLogout = async () => {
    await logout();
    await apolloClient.resetStore();
  };

  return (
    <>
      <div className="flex flex-row justify-between w-full p-4">
        <div>{data?.me?.email ?? "Not logged in"}</div>
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
