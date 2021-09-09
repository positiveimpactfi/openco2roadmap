import { MeasurementUnitType as Type } from "../../types/MeasurementUnitType";

interface Unit {
  name: string;
  shorthand: string;
  conversionFactor: number;
  id: Type;
}

export const area: Unit[] = [
  {
    name: "Squared meter",
    shorthand: "m2",
    conversionFactor: 1,
    id: Type.m2,
  },
  {
    name: "Squared centimeter",
    shorthand: "cm2",
    conversionFactor: 1 / 100 / 100,
    id: Type.cm2,
  },
  {
    name: "Squared kilometer",
    shorthand: "km2",
    conversionFactor: 1000 * 1000,
    id: Type.km2,
  },
  {
    name: "hectare",
    shorthand: "ha",
    conversionFactor: 10000,
    id: Type.ha,
  },
];

export const currency: Unit[] = [
  {
    name: "EURO",
    shorthand: "EUR",
    conversionFactor: 1,
    id: Type.EUR,
  },
];

export const energy: Unit[] = [
  {
    name: "joule",
    shorthand: "J",
    conversionFactor: 1,
    id: Type.J,
  },
  {
    name: "kilojoule",
    shorthand: "kJ",
    conversionFactor: 1000,
    id: Type.kJ,
  },
  {
    name: "megajoule",
    shorthand: "MJ",
    conversionFactor: 1000 * 1000,
    id: Type.MJ,
  },
  {
    name: "gigajoule",
    shorthand: "GJ",
    conversionFactor: 1000 * 1000 * 1000,
    id: Type.GJ,
  },
  {
    name: "terajoule",
    shorthand: "TJ",
    conversionFactor: 1000 * 1000 * 1000 * 1000,
    id: Type.TJ,
  },
  {
    name: "watt-hour",
    shorthand: "Wh",
    conversionFactor: 3.6 * 1000,
    id: Type.Wh,
  },
  {
    name: "kilowatt-hour",
    shorthand: "kWh",
    conversionFactor: 3.6 * 1000 * 1000,
    id: Type.kWh,
  },
  {
    name: "megawatt-hour",
    shorthand: "MWh",
    conversionFactor: 3.6 * 1000 * 1000 * 1000,
    id: Type.MWh,
  },
  {
    name: "gigawatt-hour",
    shorthand: "GWh",
    conversionFactor: 3.6 * 1000 * 1000 * 1000 * 1000,
    id: Type.GWh,
  },
];

export const length: Unit[] = [
  {
    name: "meter",
    shorthand: "m",
    conversionFactor: 1,
    id: Type.m,
  },
  {
    name: "centimeter",
    shorthand: "cm",
    conversionFactor: 0.1,
    id: Type.cm,
  },
  {
    name: "kilometer",
    shorthand: "km",
    conversionFactor: 1000,
    id: Type.km,
  },
  {
    name: "passenger-kilometer",
    shorthand: "pkm",
    conversionFactor: 1000,
    id: Type.pkm,
  },
  {
    name: "mile",
    shorthand: "mi",
    conversionFactor: 1609.344,
    id: Type.mi,
  },
  {
    name: "nautical mile",
    shorthand: "nmi",
    conversionFactor: 1852,
    id: Type.nmi,
  },
];

export const mass: Unit[] = [
  {
    name: "kilogram",
    shorthand: "kg",
    conversionFactor: 1,
    id: Type.kg,
  },
  {
    name: "gram",
    shorthand: "g",
    conversionFactor: 1 / 1000,
    id: Type.g,
  },
  {
    name: "ton",
    shorthand: "t",
    conversionFactor: 1000,
    id: Type.t,
  },
];

export const time: Unit[] = [
  {
    name: "second",
    shorthand: "s",
    conversionFactor: 1,
    id: Type.s,
  },
  {
    name: "minute",
    shorthand: "min",
    conversionFactor: 60,
    id: Type.min,
  },
  {
    name: "hour",
    shorthand: "h",
    conversionFactor: 60 * 60,
    id: Type.h,
  },
  {
    name: "day",
    shorthand: "d",
    conversionFactor: 60 * 60 * 24,
    id: Type.d,
  },
  {
    name: "month",
    shorthand: "MM",
    conversionFactor: 60 * 60 * 24 * 30,
    id: Type.MM,
  },
  {
    name: "year",
    shorthand: "a",
    conversionFactor: 60 * 60 * 24 * 30 * 365,
    id: Type.a,
  },
];

export const transport: Unit[] = [
  {
    name: "ton-kilometer",
    shorthand: "tkm",
    conversionFactor: 1,
    id: Type.tkm,
  },
];
export const volume: Unit[] = [
  {
    name: "cubic meter",
    shorthand: "m3",
    conversionFactor: 1,
    id: Type.m3,
  },
  {
    name: "cubic centimeter",
    shorthand: "cm3",
    conversionFactor: 1 / 100 / 100 / 100,
    id: Type.cm3,
  },
  {
    name: "liter",
    shorthand: "l",
    conversionFactor: 1 / 1000,
    id: Type.l,
  },
  {
    name: "milliliter",
    shorthand: "ml",
    conversionFactor: 1 / 1000 / 1000,
    id: Type.ml,
  },
];
