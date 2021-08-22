import { User } from "generated/graphql";

export const isAdmin = (user: User): boolean => {
  if (!user) {
    return false;
  }

  return user.roles.some(
    (role) => role.name === "ADMIN" || role.name === "SUPERADMIN"
  );
};
