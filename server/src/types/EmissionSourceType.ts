import { registerEnumType } from "type-graphql";
import { EmissionSourceType } from "../../../shared/types/EmissionSourceType";

registerEnumType(EmissionSourceType, {
  name: "EmissionSourceType",
  description: "Emission sources",
});

export { EmissionSourceType };
