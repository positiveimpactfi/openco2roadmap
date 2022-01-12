import { GHGScope } from "./types/GHGScope";
import { StaticEntity } from "./types/StaticEntity";
import { EmissionSourceType as es } from "./types/EmissionSourceType";
import { ComponentType } from "./types/ComponentType";

export type EmissionSource = StaticEntity & {
  componentIDs: number[];
  scope: GHGScope;
};

export const emissionSources: EmissionSource[] = [
  {
    name: "Kaukojäähdytys",
    id: es.Kaukojaahdytys,
    scope: GHGScope.Scope2,
    componentIDs: [ComponentType.Jaahdytys],
  },
  {
    name: "Kaukolämpö",
    id: es.Kaukolampo,
    scope: GHGScope.Scope2,
    componentIDs: [ComponentType.Lammitys],
  },
  {
    name: "Polttoaineet",
    id: es.Polttoaineet,
    scope: GHGScope.Scope1,
    componentIDs: [
      ComponentType.Lammitys,
      ComponentType.KiinteistoPolttoaineet,
    ],
  },
  {
    name: "Sähkö",
    id: es.Sahko,
    scope: GHGScope.Scope2,
    componentIDs: [ComponentType.Sahkonkulutus],
  },
  {
    name: "Biojäte",
    id: es.Biojate,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Energiajäte",
    id: es.Energiajate,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Lasijäte",
    id: es.Lasijate,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Metallijäte",
    id: es.Metallijate,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Pahvi ja kartonki",
    id: es.PahviJaKartonki,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Paperijäte",
    id: es.Paperijate,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Paristot",
    id: es.Paristot,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Sekajäte",
    id: es.Sekajate,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "SER (sähkölaitteet) ",
    id: es.SER,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Henkilöautot",
    id: es.Henkiloautot,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Julkiset kulkuneuvot",
    id: es.JulkisetKulkuneuvot,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Laivamatkat",
    id: es.Laivamatkat,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Lentomatkat",
    id: es.Lentomatkat,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Muut henkilökuljetukset",
    id: es.MuutHenkilokuljetukset,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Laivakuljetukset",
    id: es.Laivakuljetukset,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Lentokuljetukset",
    id: es.Lentokuljetukset,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Muut kuljetukset",
    id: es.MuutKuljetukset,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Raidekuljetukset",
    id: es.Raidekuljetukset,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Tiekuljetukset",
    id: es.Tiekuljetukset,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Juomat",
    id: es.Juomat,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Maitotuotteet",
    id: es.Maitotuotteet,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Rasvat",
    id: es.Rasvat,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Kananmunat",
    id: es.Kananmunat,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Kasvimaidot ja -proteiinit",
    id: es.KasvimaidotJaProteiinit,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Hedelmät ja vihannekset",
    id: es.HedelmatJaVihannekset,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Liha",
    id: es.Liha,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Kala ja merenelävät",
    id: es.KalaJaMerenlevat,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Muut proteiinit",
    id: es.MuutProteiinit,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Viljatuotteet",
    id: es.Viljatuotteet,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Herkut",
    id: es.Herkut,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Muut tuotteet",
    id: es.MuutTuotteet,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Elintarvikkeet ja juomat (euroina)",
    id: es.ElintarvikkeetEUR,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.YleisetHankinnat, ComponentType.MuutHankinnat],
  },
  {
    name: "Kiinteistönhoito",
    id: es.Kiinteistohoito,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.YleisetHankinnat, ComponentType.MuutHankinnat],
  },
  {
    name: "Laitehankinnat",
    id: es.Laitehankinnat,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.YleisetHankinnat, ComponentType.MuutHankinnat],
  },
  {
    name: "Muut hyödykkeet",
    id: es.MuutHyodykkeet,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.YleisetHankinnat, ComponentType.MuutHankinnat],
  },
  {
    name: "Palveluhankinnat",
    id: es.PalveluHankinnat,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.YleisetHankinnat,
      ComponentType.MuutHankinnat,
      ComponentType.PalveluHankinnat,
    ],
  },
  {
    name: "Tavarahankinnat",
    id: es.TavaraHankinnat,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.YleisetHankinnat,
      ComponentType.MuutHankinnat,
      ComponentType.PalveluHankinnat,
    ],
  },
  {
    name: "Terveydenhoito",
    id: es.Terveydenhoito,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.YleisetHankinnat, ComponentType.MuutHankinnat],
  },
  {
    name: "Tietoliikenne",
    id: es.Tietoliikenne,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.YleisetHankinnat, ComponentType.MuutHankinnat],
  },
  {
    name: "Toimistotarvikkeet",
    id: es.Toimistotarvikkeet,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.YleisetHankinnat, ComponentType.MuutHankinnat],
  },
  {
    name: "Toimitilat",
    id: es.Toimitilat,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.YleisetHankinnat,
      ComponentType.MuutHankinnat,
      ComponentType.PalveluHankinnat,
    ],
  },
];
