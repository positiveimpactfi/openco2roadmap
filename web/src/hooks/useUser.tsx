import { useMeQuery } from "generated/graphql";

export const useUser = () => {
  const { data, loading } = useMeQuery();
  const user = data?.me;
  return { user, loading };
};
