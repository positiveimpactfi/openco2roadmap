import { DataSourceType } from "../../types";
import { EmissionSourceType } from "../../types/EmissionSourceType";
import { GHGScope } from "../../types/GHGScope";
import { MeasurementUnitType } from "../../types/MeasurementUnitType";
import { EmissionFactor } from "./emissionFactors";

export const emissionFactors: EmissionFactor[] = [
  {
    emissionSource: EmissionSourceType.JulkisetKulkuneuvot,
    name: "Kaupunkibussit keskimäärin (hkm)",
    unit: MeasurementUnitType.pkm,
    region: "Suomi",
    scope: GHGScope.Scope3,
    sourceType: DataSourceType.Secondary,
    value: 0.05,
    year: 2016,
    source: "VTT Lipasto",
  },
  {
    emissionSource: EmissionSourceType.JulkisetKulkuneuvot,
    name: "Kaupunkibussit keskimäärin (km)",
    unit: MeasurementUnitType.km,
    region: "Suomi",
    scope: GHGScope.Scope3,
    sourceType: DataSourceType.Secondary,
    value: 0.95,
    year: 2016,
    source: "VTT Lipasto",
  },
  {
    emissionSource: EmissionSourceType.JulkisetKulkuneuvot,
    name: "Linja-autot (pitkän matkan) keskimäärin (hkm)",
    unit: MeasurementUnitType.pkm,
    region: "Suomi",
    scope: GHGScope.Scope3,
    sourceType: DataSourceType.Secondary,
    value: 0.04,
    year: 2016,
    source: "VTT Lipasto",
  },
  {
    emissionSource: EmissionSourceType.JulkisetKulkuneuvot,
    name: "Linja-autot (pitkän matkan) keskimäärin (km)",
    unit: MeasurementUnitType.km,
    region: "Suomi",
    scope: GHGScope.Scope3,
    sourceType: DataSourceType.Secondary,
    value: 0.57,
    year: 2016,
    source: "VTT Lipasto",
  },
  {
    emissionSource: EmissionSourceType.JulkisetKulkuneuvot,
    name: "Dieselkäyttöinen taksi (hkm)",
    unit: MeasurementUnitType.pkm,
    region: "Suomi",
    scope: GHGScope.Scope3,
    sourceType: DataSourceType.Secondary,
    value: 0.05,
    year: 2016,
    source: "VTT Lipasto",
  },
  {
    emissionSource: EmissionSourceType.JulkisetKulkuneuvot,
    name: "Dieselkäyttöinen taksi (km)",
    unit: MeasurementUnitType.km,
    region: "Suomi",
    scope: GHGScope.Scope3,
    sourceType: DataSourceType.Secondary,
    value: 0.1,
    year: 2016,
    source: "VTT Lipasto",
  },
  {
    emissionSource: EmissionSourceType.JulkisetKulkuneuvot,
    name: "Tilataksi (dieselkäyttöinen pakettiauto täydellä kuormalla)",
    unit: MeasurementUnitType.km,
    region: "Suomi",
    scope: GHGScope.Scope3,
    sourceType: DataSourceType.Secondary,
    value: 0.18,
    year: 2016,
    source: "VTT Lipasto",
  },
  {
    emissionSource: EmissionSourceType.MuutHenkilokuljetukset,
    name: "Dieselkäyttöinen mönkijä",
    unit: MeasurementUnitType.l,
    region: "Suomi",
    scope: GHGScope.Scope3,
    sourceType: DataSourceType.Secondary,
    value: 2.67,
    year: 2016,
    source: "VTT Lipasto",
  },
  {
    emissionSource: EmissionSourceType.MuutHenkilokuljetukset,
    name: "Moottorikelkat keskimäärin",
    unit: MeasurementUnitType.l,
    region: "Suomi",
    scope: GHGScope.Scope3,
    sourceType: DataSourceType.Secondary,
    value: 2.24,
    year: 2016,
    source: "VTT Lipasto",
  },
  {
    emissionSource: EmissionSourceType.MuutHenkilokuljetukset,
    name: "2- tahti ja 4-tahti mönkijät keskimäärin",
    unit: MeasurementUnitType.l,
    region: "Suomi",
    scope: GHGScope.Scope3,
    sourceType: DataSourceType.Secondary,
    value: 2.27,
    year: 2016,
    source: "VTT Lipasto",
  },
  {
    emissionSource: EmissionSourceType.Biojate,
    name: "Biojäte kompostiin",
    unit: MeasurementUnitType.kg,
    region: "Suomi",
    scope: GHGScope.Scope3,
    sourceType: DataSourceType.Secondary,
    value: 0.13,
    year: 2008,
    source: "Myllymaa et al. 2008",
  },
  {
    emissionSource: EmissionSourceType.Polttoaineet,
    name: "Polttopuut, koivuklapi",
    unit: MeasurementUnitType.m3,
    region: "Suomi",
    scope: GHGScope.Scope1,
    sourceType: DataSourceType.Primary,
    value: 2600,
    year: 2019,
    source:
      "Tilastokeskus, https://www.bioenergianeuvoja.fi/biopolttoaineet/polttopuu/puu/ ",
  },
  {
    emissionSource: EmissionSourceType.Polttoaineet,
    name: "Puuhake ja rangat",
    unit: MeasurementUnitType.kWh,
    region: "Suomi",
    scope: GHGScope.Scope1,
    sourceType: DataSourceType.Primary,
    value: 1.06,
    year: 2020,
    source: "Tilastokeskus",
  },
  {
    emissionSource: EmissionSourceType.Polttoaineet,
    name: "Polttopuut",
    unit: MeasurementUnitType.kWh,
    region: "Suomi",
    scope: GHGScope.Scope1,
    sourceType: DataSourceType.Primary,
    value: 1.57,
    year: 2020,
    source: "Tilastokeskus",
  },
];

export const purchasesUpdate = [
  { name: "Alkoholittomat juomat", value: 0.55 },
  { name: "Audiovisuaaliset laitteet ja tietokoneet", value: 0.72 },
  { name: "Eläinperäiset elintarvikkeet", value: 1.21 },
  { name: "Henkilökohtaiset tavarat", value: 0.36 },
  { name: "Huonekalut, taide-esineet ja matot", value: 0.48 },
  { name: "Jalkineet", value: 0.24 },
  { name: "Kasviperäiset elintarvikkeet", value: 0.66 },
  { name: "Kirjat ja lehdet", value: 0.21 },
  { name: "Kodin ja puutarhan työkoneet, työkalut ym.", value: 0.84 },
  { name: "Kodinhoitotarvikkeet ja -palvelut", value: 0.36 },
  { name: "Kodinkoneet", value: 0.48 },
  { name: "Kodintekstiilit", value: 0.84 },
  { name: "Kotimaiset ja tuontituotteet, keskiarvo (2005)", value: 0.79 },
  { name: "Lasitavarat, astiat ja keittiötyövälineet", value: 0.6 },
  { name: "Lääkevalmisteet, hoitolaitteet ja -tarvikkeet", value: 0.21 },
  { name: "Muut suuret vapaa-ajan välineet", value: 0.48 },
  { name: "Muut virkistys- ja harrastusvälineet", value: 0.48 },
  { name: "Puhtaus ja kauneudenhoito", value: 0.24 },
  { name: "Vaatteet ja vaatekankaat", value: 0.36 },
  { name: "Asuminen", value: 0.36 },
  { name: "Ateriapalvelut", value: 0.33 },
  { name: "Koulutuspalvelut", value: 0.1 },
  { name: "Kuljetusalan hankinta (muuttuvat ostot)", value: 0.72 },
  { name: "Kulttuuri- ja vapaa-ajan palvelut", value: 0.21 },
  { name: "Lääkäri, laboratorio, fysioterapia ym.", value: 0.1 },
  { name: "Muut palvelut", value: 0.24 },
  { name: "Pankki- ja taloudelliset palvelut", value: 0.19 },
  { name: "Sairaala- ja poliklinikkapalvelut", value: 0.1 },
  { name: "Sosiaalipalvelut", value: 0.19 },
  { name: "Tietoliikenne", value: 0.12 },
  { name: "Vakuutukset", value: 0.1 },
];

export const wastesUpdate = [
  { name: "Metallijäte HSY", value: 0.13 },
  { name: "Pahvi ja kartonki HSY", value: 0.07 },
  { name: "Paperijäte HSY", value: 1.05 },
  { name: "Sekajäte (polttoon) HSY", value: 0.41 },
  { name: "SER (sähkölaitteet) HSY", value: 0.06 },
  { name: "Toimistopaperijäte HSY", value: 1.05 },
];

export const wasteWithNewSources = [
  {
    name: "SER (sähkölaitteet) HSY",
    value: 0.72,
    source:
      "WWF Ilmastolaskuri (Henna Teerihalme. 2018. HSY. Henkilökohtainen tiedonanto ja Dahlbo ym. 2011 SYKE)",
  },
  {
    name: "Paristot HSY",
    value: 0.93,
    source: "Ecoinvent 3.5 (Litiumakun käsittely)",
  },
  {
    name: "Energiajäte HSY",
    value: 0.41,
    source:
      "WWF Ilmastolaskuri (Henna Teerihalme. 2018. HSY. Henkilökohtainen tiedonanto ja Dahlbo ym. 2011 SYKE)",
  },
];

export const logisticsUpdate = [
  { name: "Junaliput", value: 0.64 },
  { name: "Laivaliput", value: 1.06 },
  { name: "Lentoliput", value: 1.06 },
  { name: "Linja-auto-, raitiovaunu- ja metromatkat", value: 0.74 },
  { name: "Majoituspalvelut", value: 0.42 },
  { name: "Matkailumenot ulkomailla", value: 0.39 },
  { name: "Matkakorvaukset, muut matkailumenot", value: 0.39 },
  { name: "Taksikulut", value: 0.18 },
  { name: "Valmismatkahankinnat", value: 0.48 },
];
