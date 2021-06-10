import { User } from "generated/graphql";

export const isAdmin = (user: User): boolean => {
  if (!user) {
    return false;
  }
  return user.roles[0].name === "ADMIN";
};
