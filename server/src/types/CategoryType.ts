import { registerEnumType } from "type-graphql";

export enum CategoryType {
  Toimitilat = 1,
  Logistiikka = 2,
  Hankinnat = 3,
  Hallinto = 4,
}

registerEnumType(CategoryType, {
  name: "CategoryType",
  description: "Emission categories",
});
