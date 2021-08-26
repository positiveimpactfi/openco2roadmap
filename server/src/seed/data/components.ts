import { CategoryType } from "../../types/CategoryType";

interface EmissionComponent {
  name: string;
  categoryID: number;
}

export const emissionComponents: EmissionComponent[] = [
  {
    name: "Jäähdytys",
    categoryID: CategoryType.Toimitilat,
  },

  {
    name: "Lämmitys",
    categoryID: CategoryType.Toimitilat,
  },
  {
    name: "Sähkönkulutus",
    categoryID: CategoryType.Toimitilat,
  },
  {
    name: "Jäte",
    categoryID: CategoryType.Toimitilat,
  },
  {
    name: "Kiinteistöhuollon polttoaineet",
    categoryID: CategoryType.Toimitilat,
  },
  {
    name: "Tavarakuljetukset",
    categoryID: CategoryType.Logistiikka,
  },
  {
    name: "Asiakkaiden kuljetukset",
    categoryID: CategoryType.Logistiikka,
  },
  {
    name: "Työmatkat",
    categoryID: CategoryType.Logistiikka,
  },
  {
    name: "Elintarvikehankinnat",
    categoryID: CategoryType.Hankinnat,
  },
  {
    name: "Palveluhankinnat",
    categoryID: CategoryType.Hankinnat,
  },
  {
    name: "Muut hankinnat",
    categoryID: CategoryType.Hankinnat,
  },
  {
    name: "Yleiset hankinnat",
    categoryID: CategoryType.Hallinto,
  },
  {
    name: "Työssäkäyntimatkat",
    categoryID: CategoryType.Hallinto,
  },
];
