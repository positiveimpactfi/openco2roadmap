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
    name: "Vedenkulutus",
    categoryID: CategoryType.Toimitilat,
  },
  {
    name: "Jäte",
    categoryID: CategoryType.Toimitilat,
  },
  {
    name: "Kuljetukset",
    categoryID: CategoryType.Logistiikka,
  },
  {
    name: "Henkilömatkat",
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
    name: "Muut hankinnat",
    categoryID: CategoryType.Hallinto,
  },
];
