import { CategoryType } from "../../types/CategoryType";
import { StaticEntity } from "../../types/StaticEntity";

const cat: StaticEntity[] = [
  { name: "Toimitilat ja kiinteistöt", id: CategoryType.Toimitilat },
  { name: "Logistiikka", id: CategoryType.Logistiikka },
  { name: "Hankinnat", id: CategoryType.Hankinnat },
  { name: "Hallinto", id: CategoryType.Hallinto },
];

export const emissionCategories = cat.map((category) => {
  return {
    name: category.name,
    id: category.id,
  };
});
