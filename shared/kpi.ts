import { MeasurementUnitType } from "./types/MeasurementUnitType";

interface KPI {
  name: string;
  unit?: MeasurementUnitType;
}

export const kpis: KPI[] = [
  {
    name: "Liikevaihto",
    unit: MeasurementUnitType.EUR,
  },
  {
    name: "Aukiolopäivät vuodessa",
  },
  {
    name: "Asiakasmäärä",
  },
  {
    name: "Työntekijämäärä",
  },
  {
    name: "Myydyt tuotteet ja palvelut",
  },
  {
    name: "Majoitusvuorokaudet",
  },
  {
    name: "Vedenkulutus",
    unit: MeasurementUnitType.m3,
  },
];
