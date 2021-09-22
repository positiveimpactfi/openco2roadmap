import { registerEnumType } from "type-graphql";
import { GHGScope } from "../../../shared/types/GHGScope";

registerEnumType(GHGScope, {
  name: "GHGScope",
  description: "Greenhouse gas protocol emission scopes",
});

export { GHGScope };
