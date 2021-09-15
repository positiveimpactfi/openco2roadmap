import { User } from "types/generatedTypes";

export const isAdmin = (user: User): boolean => {
  if (!user) {
    return false;
  }

  return user.roles.some(
    (role) =>
      role.name === "ADMIN" ||
      role.name === "SUPERADMIN" ||
      role.name === "COMPANY_ADMIN"
  );
};

export const isSuperAdmin = (user: User): boolean => {
  if (!user) return false;
  return user.roles[0].name === "SUPERADMIN";
};
