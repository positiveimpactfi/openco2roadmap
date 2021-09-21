import { registerEnumType } from "type-graphql";
import { Role } from "../../../shared/types/Role";

registerEnumType(Role, {
  name: "Role",
  description: "User roles",
});
