import { registerEnumType } from "type-graphql";

export enum GHGScope {
  Scope1 = "Scope 1",
  Scope2 = "Scope 2",
  Scope3 = "Scope 3",
}

registerEnumType(GHGScope, {
  name: "GHGScope",
  description: "Greenhouse gas protocol emission scopes",
});
