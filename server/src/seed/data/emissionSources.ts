import { GHGScope } from "../../types/GHGScope";
import { StaticEntity } from "../../types/StaticEntity";
import { EmissionSourceType as es } from "../../types/EmissionSourceType";
import { ComponentType } from "../../types/ComponentType";

type EmissionSource = StaticEntity & {
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
    componentIDs: [ComponentType.Lammitys],
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
    name: "Valmismatkahankinnat",
    id: es.Valmismatkahankinnat,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Majoituspalveluhankinnat",
    id: es.Majoituspalveluhankinnat,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Matkailumenot ulkomailla",
    id: es.MatkailumenotUlkomailla,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Matkakorvaukset",
    id: es.Matkakorvaukset,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Junaliput",
    id: es.Junaliput,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Linja-auto-, raitiovaunu- ja metroliput",
    id: es.LinjaRaitioMetro,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Taksikulut",
    id: es.Taksikulut,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Lentoliput",
    id: es.Lentoliput,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Laivaliput",
    id: es.Laivaliput,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Henkilöauto, keskiarvo",
    id: es.HenkiloautoKA,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Bensiinikäyttöinen henkilöauto, keskiarvo",
    id: es.BensiiniHenkiloauto,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Dieselkäyttöinen henkilöauto, keskiarvo",
    id: es.DieselHenkiloauto,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Kaasukäyttöinen henkilöauto, keskiarvo",
    id: es.KaasuHenkiloauto,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Sähkökäyttöinen henkilöauto, keskiarvo",
    id: es.SahkoHenkiloauto,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Kotimaan lyhyet lennot",
    id: es.LyhyetLennotKotimaa,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Kotimaan pitkät lennot ",
    id: es.PitkatLennotKotimaa,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Euroopan lyhyet lennot",
    id: es.LyhytLennotEurooppa,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Euroopan pitkät lennot",
    id: es.PitkatLennotEurooppa,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Pakettiauto",
    id: es.Pakettiauto,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Jakelukuorma-auto 6 t",
    id: es.Jakelukuormaauto6t,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Jakelukuorma-auto 15 t",
    id: es.Jakelukuormaauto15t,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Puoliperävaunuyhdistelmä",
    id: es.Puoliperavaunu,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Perävaunullinen yhdistelmä",
    id: es.Peravaunu,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Konttialus (mallia 1000 TEU, täyttöaste 65 %)",
    id: es.Konttialus,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Tavarajuna, diesel",
    id: es.TavarajunaDiesel,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Tavarajuna, sähkö",
    id: es.TavarajunaSahko,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Kotimaanlennot",
    id: es.Kotimaanlennot,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Lyhyet ulkomaanlennot",
    id: es.LyhyetUlkomaatlennot,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Kaukolennot",
    id: es.Kaukolennot,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Muut kuljetuspalveluhankinnat",
    id: es.MuutKuljetuspalveluHankinnat,
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
