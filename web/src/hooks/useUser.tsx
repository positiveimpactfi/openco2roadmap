import { useMeQuery } from "graphql/queries/users/me.generated";

export const useUser = () => {
  const { data, loading } = useMeQuery();
  const user = data?.me;
  return { user, loading };
};
