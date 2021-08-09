import { useApolloClient } from "@apollo/client";
import { useLogoutMutation } from "generated/graphql";
import { useRouter } from "next/router";

const useLogout = () => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const router = useRouter();
  const logoutFn = async () => {
    await logout();
    await apolloClient.resetStore();
    router.push("/");
  };

  return [logoutFn];
};

export default useLogout;
