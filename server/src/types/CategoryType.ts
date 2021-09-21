import { registerEnumType } from "type-graphql";
import { CategoryType } from "../../../shared/types/CategoryType";

registerEnumType(CategoryType, {
  name: "CategoryType",
  description: "Emission categories",
});
