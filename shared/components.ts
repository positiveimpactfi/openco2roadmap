import { CategoryType } from "./types/CategoryType";
import { StaticEntity } from "./types/StaticEntity";
import { ComponentType } from "./types/ComponentType";
import { emissionSources } from "./emissionSources";

export type EmissionComponent = StaticEntity & {
  categoryID: number;
};

export const emissionComponents: EmissionComponent[] = [
  {
    name: "Jäähdytys",
    id: ComponentType.Jaahdytys,
    categoryID: CategoryType.Toimitilat,
  },

  {
    name: "Lämmitys",
    id: ComponentType.Lammitys,
    categoryID: CategoryType.Toimitilat,
  },
  {
    name: "Sähkönkulutus",
    id: ComponentType.Sahkonkulutus,
    categoryID: CategoryType.Toimitilat,
  },
  {
    name: "Jäte",
    id: ComponentType.Jate,
    categoryID: CategoryType.Toimitilat,
  },

  {
    name: "Asiakkaiden kuljetukset",
    id: ComponentType.AsiakkaidenKuljetukset,
    categoryID: CategoryType.Logistiikka,
  },
  {
    name: "Työmatkat",
    id: ComponentType.Tyomatkat,
    categoryID: CategoryType.Logistiikka,
  },
  {
    name: "Työssäkäyntimatkat",
    id: ComponentType.Tyossakayntimatkat,
    categoryID: CategoryType.Logistiikka,
  },
  {
    name: "Tavarakuljetukset",
    id: ComponentType.Tavarakuljetukset,
    categoryID: CategoryType.Logistiikka,
  },
  {
    name: "Elintarvikehankinnat",
    id: ComponentType.Elintarvikehankinnat,
    categoryID: CategoryType.Hankinnat,
  },
  {
    name: "Yleiset hankinnat",
    id: ComponentType.YleisetHankinnat,
    categoryID: CategoryType.Hallinto,
  },
  {
    name: "Muut hankinnat",
    id: ComponentType.MuutHankinnat,
    categoryID: CategoryType.Hankinnat,
  },
  {
    name: "Palveluhankinnat",
    id: ComponentType.PalveluHankinnat,
    categoryID: CategoryType.Hankinnat,
  },
];

export const components = emissionComponents.map((component) => {
  const sources = emissionSources.filter((es) =>
    es.componentIDs.includes(component.id)
  );
  return { ...component, sources: sources };
});
