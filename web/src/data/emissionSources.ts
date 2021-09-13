type EmissionSource = {
  name: string;
  id: number;
  componentIDs: number[];
  scope: GHGScope;
};

export enum GHGScope {
  Scope1 = "Scope 1",
  Scope2 = "Scope 2",
  Scope3 = "Scope 3",
}

export enum ComponentType {
  Jaahdytys = 1,
  Lammitys = 2,
  Sahkonkulutus = 3,
  Jate = 4,
  AsiakkaidenKuljetukset = 5,
  Tyomatkat = 6,
  Tyossakayntimatkat = 7,
  Tavarakuljetukset = 8,
  Elintarvikehankinnat = 9,
  YleisetHankinnat = 10,
  MuutHankinnat = 11,
  PalveluHankinnat = 12,
}

export enum EmissionSourceType {
  Kaukojaahdytys = 1,
  Kaukolampo = 2,
  Polttoaineet = 3,
  Sahko = 4,
  Biojate = 5,
  Energiajate = 6,
  Lasijate = 7,
  Metallijate = 8,
  PahviJaKartonki = 9,
  Paperijate = 10,
  Paristot = 11,
  Sekajate = 12,
  SER = 13,
  Valmismatkahankinnat = 14,
  Majoituspalveluhankinnat = 15,
  MatkailumenotUlkomailla = 16,
  Matkakorvaukset = 17,
  Junaliput = 18,
  LinjaRaitioMetro = 19,
  Taksikulut = 20,
  Lentoliput = 21,
  Laivaliput = 22,
  HenkiloautoKA = 23,
  BensiiniHenkiloauto = 24,
  DieselHenkiloauto = 25,
  KaasuHenkiloauto = 26,
  SahkoHenkiloauto = 27,
  LyhyetLennotKotimaa = 28,
  PitkatLennotKotimaa = 29,
  LyhytLennotEurooppa = 30,
  PitkatLennotEurooppa = 31,
  Pakettiauto = 32,
  Jakelukuormaauto6t = 33,
  Jakelukuormaauto15t = 34,
  Puoliperavaunu = 35,
  Peravaunu = 36,
  Konttialus = 37,
  TavarajunaDiesel = 38,
  TavarajunaSahko = 39,
  Kotimaanlennot = 40,
  LyhyetUlkomaatlennot = 41,
  Kaukolennot = 42,
  MuutKuljetuspalveluHankinnat = 43,
  Juomat = 44,
  Maitotuotteet = 45,
  Rasvat = 46,
  Kananmunat = 47,
  KasvimaidotJaProteiinit = 48,
  HedelmatJaVihannekset = 49,
  Liha = 50,
  KalaJaMerenlevat = 51,
  MuutProteiinit = 52,
  Viljatuotteet = 53,
  Herkut = 54,
  MuutTuotteet = 55,
  ElintarvikkeetEUR = 56,
  Kiinteistohoito = 57,
  Laitehankinnat = 58,
  MuutHyodykkeet = 59,
  PalveluHankinnat = 60,
  TavaraHankinnat = 61,
  Terveydenhoito = 62,
  Tietoliikenne = 63,
  Toimistotarvikkeet = 64,
  Toimitilat = 65,
}

export const emissionSources: EmissionSource[] = [
  {
    name: "Kaukojäähdytys",
    id: EmissionSourceType.Kaukojaahdytys,
    scope: GHGScope.Scope2,
    componentIDs: [ComponentType.Jaahdytys],
  },
  {
    name: "Kaukolämpö",
    id: EmissionSourceType.Kaukolampo,
    scope: GHGScope.Scope2,
    componentIDs: [ComponentType.Lammitys],
  },
  {
    name: "Polttoaineet",
    id: EmissionSourceType.Polttoaineet,
    scope: GHGScope.Scope1,
    componentIDs: [ComponentType.Lammitys],
  },
  {
    name: "Sähkö",
    id: EmissionSourceType.Sahko,
    scope: GHGScope.Scope2,
    componentIDs: [ComponentType.Sahkonkulutus],
  },
  {
    name: "Biojäte",
    id: EmissionSourceType.Biojate,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Energiajäte",
    id: EmissionSourceType.Energiajate,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Lasijäte",
    id: EmissionSourceType.Lasijate,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Metallijäte",
    id: EmissionSourceType.Metallijate,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Pahvi ja kartonki",
    id: EmissionSourceType.PahviJaKartonki,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Paperijäte",
    id: EmissionSourceType.Paperijate,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Paristot",
    id: EmissionSourceType.Paristot,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Sekajäte",
    id: EmissionSourceType.Sekajate,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "SER (sähkölaitteet) ",
    id: EmissionSourceType.SER,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Jate],
  },
  {
    name: "Valmismatkahankinnat",
    id: EmissionSourceType.Valmismatkahankinnat,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Majoituspalveluhankinnat",
    id: EmissionSourceType.Majoituspalveluhankinnat,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Matkailumenot ulkomailla",
    id: EmissionSourceType.MatkailumenotUlkomailla,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Matkakorvaukset",
    id: EmissionSourceType.Matkakorvaukset,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Junaliput",
    id: EmissionSourceType.Junaliput,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Linja-auto-, raitiovaunu- ja metroliput",
    id: EmissionSourceType.LinjaRaitioMetro,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Taksikulut",
    id: EmissionSourceType.Taksikulut,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Lentoliput",
    id: EmissionSourceType.Lentoliput,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Laivaliput",
    id: EmissionSourceType.Laivaliput,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Henkilöauto, keskiarvo",
    id: EmissionSourceType.HenkiloautoKA,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Bensiinikäyttöinen henkilöauto, keskiarvo",
    id: EmissionSourceType.BensiiniHenkiloauto,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Dieselkäyttöinen henkilöauto, keskiarvo",
    id: EmissionSourceType.DieselHenkiloauto,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Kaasukäyttöinen henkilöauto, keskiarvo",
    id: EmissionSourceType.KaasuHenkiloauto,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Sähkökäyttöinen henkilöauto, keskiarvo",
    id: EmissionSourceType.SahkoHenkiloauto,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Kotimaan lyhyet lennot",
    id: EmissionSourceType.LyhyetLennotKotimaa,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Kotimaan pitkät lennot ",
    id: EmissionSourceType.PitkatLennotKotimaa,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Euroopan lyhyet lennot",
    id: EmissionSourceType.LyhytLennotEurooppa,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Euroopan pitkät lennot",
    id: EmissionSourceType.PitkatLennotEurooppa,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.AsiakkaidenKuljetukset,
      ComponentType.Tyomatkat,
      ComponentType.Tyossakayntimatkat,
    ],
  },
  {
    name: "Pakettiauto",
    id: EmissionSourceType.Pakettiauto,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Jakelukuorma-auto 6 t",
    id: EmissionSourceType.Jakelukuormaauto6t,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Jakelukuorma-auto 15 t",
    id: EmissionSourceType.Jakelukuormaauto15t,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Puoliperävaunuyhdistelmä",
    id: EmissionSourceType.Puoliperavaunu,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Perävaunullinen yhdistelmä",
    id: EmissionSourceType.Peravaunu,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Konttialus (mallia 1000 TEU, täyttöaste 65 %)",
    id: EmissionSourceType.Konttialus,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Tavarajuna, diesel",
    id: EmissionSourceType.TavarajunaDiesel,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Tavarajuna, sähkö",
    id: EmissionSourceType.TavarajunaSahko,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Kotimaanlennot",
    id: EmissionSourceType.Kotimaanlennot,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Lyhyet ulkomaanlennot",
    id: EmissionSourceType.LyhyetUlkomaatlennot,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Kaukolennot",
    id: EmissionSourceType.Kaukolennot,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Muut kuljetuspalveluhankinnat",
    id: EmissionSourceType.MuutKuljetuspalveluHankinnat,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Tavarakuljetukset],
  },
  {
    name: "Juomat",
    id: EmissionSourceType.Juomat,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Maitotuotteet",
    id: EmissionSourceType.Maitotuotteet,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Rasvat",
    id: EmissionSourceType.Rasvat,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Kananmunat",
    id: EmissionSourceType.Kananmunat,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Kasvimaidot ja -proteiinit",
    id: EmissionSourceType.KasvimaidotJaProteiinit,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Hedelmät ja vihannekset",
    id: EmissionSourceType.HedelmatJaVihannekset,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Liha",
    id: EmissionSourceType.Liha,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Kala ja merenelävät",
    id: EmissionSourceType.KalaJaMerenlevat,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Muut proteiinit",
    id: EmissionSourceType.MuutProteiinit,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Viljatuotteet",
    id: EmissionSourceType.Viljatuotteet,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Herkut",
    id: EmissionSourceType.Herkut,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Muut tuotteet",
    id: EmissionSourceType.MuutTuotteet,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.Elintarvikehankinnat],
  },
  {
    name: "Elintarvikkeet ja juomat (euroina)",
    id: EmissionSourceType.ElintarvikkeetEUR,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.YleisetHankinnat, ComponentType.MuutHankinnat],
  },
  {
    name: "Kiinteistönhoito",
    id: EmissionSourceType.Kiinteistohoito,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.YleisetHankinnat, ComponentType.MuutHankinnat],
  },
  {
    name: "Laitehankinnat",
    id: EmissionSourceType.Laitehankinnat,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.YleisetHankinnat, ComponentType.MuutHankinnat],
  },
  {
    name: "Muut hyödykkeet",
    id: EmissionSourceType.MuutHyodykkeet,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.YleisetHankinnat, ComponentType.MuutHankinnat],
  },
  {
    name: "Palveluhankinnat",
    id: EmissionSourceType.PalveluHankinnat,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.YleisetHankinnat,
      ComponentType.MuutHankinnat,
      ComponentType.PalveluHankinnat,
    ],
  },
  {
    name: "Tavarahankinnat",
    id: EmissionSourceType.TavaraHankinnat,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.YleisetHankinnat,
      ComponentType.MuutHankinnat,
      ComponentType.PalveluHankinnat,
    ],
  },
  {
    name: "Terveydenhoito",
    id: EmissionSourceType.Terveydenhoito,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.YleisetHankinnat, ComponentType.MuutHankinnat],
  },
  {
    name: "Tietoliikenne",
    id: EmissionSourceType.Tietoliikenne,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.YleisetHankinnat, ComponentType.MuutHankinnat],
  },
  {
    name: "Toimistotarvikkeet",
    id: EmissionSourceType.Toimistotarvikkeet,
    scope: GHGScope.Scope3,
    componentIDs: [ComponentType.YleisetHankinnat, ComponentType.MuutHankinnat],
  },
  {
    name: "Toimitilat",
    id: EmissionSourceType.Toimitilat,
    scope: GHGScope.Scope3,
    componentIDs: [
      ComponentType.YleisetHankinnat,
      ComponentType.MuutHankinnat,
      ComponentType.PalveluHankinnat,
    ],
  },
];

export enum CategoryType {
  Toimitilat = 1,
  Logistiikka = 2,
  Hankinnat = 3,
  Hallinto = 4,
}

interface Component {
  id: ComponentType;
  name: string;
  categoryID?: CategoryType;
  sources?: EmissionSourceType[];
}

export const emissionComponents: Component[] = [
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
