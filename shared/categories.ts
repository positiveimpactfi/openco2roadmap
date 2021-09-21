import { CategoryType } from "./types/CategoryType";
import { StaticEntity } from "./types/StaticEntity";

export const emissionCategories: StaticEntity[] = [
  { name: "Toimitilat ja kiinteistöt", id: CategoryType.Toimitilat },
  { name: "Logistiikka", id: CategoryType.Logistiikka },
  { name: "Hankinnat", id: CategoryType.Hankinnat },
  { name: "Hallinto", id: CategoryType.Hallinto },
];
