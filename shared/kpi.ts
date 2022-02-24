import { Organization } from "../server/src/entity";
import { MeasurementUnitType } from "../server/src/types";

interface KPI {
  name: string;
  owner?: Organization;
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
