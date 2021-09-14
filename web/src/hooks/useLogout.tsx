import { useApolloClient } from "@apollo/client";
import { useLogoutMutation } from "graphql/mutations/auth/logout.generated";
import { useRouter } from "next/router";

const useLogout = () => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const router = useRouter();
  const logoutFn = async () => {
    await logout();
    await apolloClient.clearStore();
    await router.push("/");
  };

  return [logoutFn];
};

export default useLogout;
