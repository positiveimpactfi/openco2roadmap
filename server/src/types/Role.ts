import { registerEnumType } from "type-graphql";

export enum Role {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  DESTINATION_MANAGER = "DESTINATION_MANAGER",
  COMPANY_ADMIN = "COMPANY_ADMIN",
  COMPANY_USER = "COMPANY_USER",
}

registerEnumType(Role, {
  name: "Role",
  description: "User roles",
});
