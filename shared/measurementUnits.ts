import { MeasurementUnitType as UnitType } from "./types/MeasurementUnitType";

interface Unit {
  name: string;
  shorthand: string;
  conversionFactor: number;
  id: UnitType;
}

export const area: Unit[] = [
  {
    name: "Squared meter",
    shorthand: "m2",
    conversionFactor: 1,
    id: UnitType.m2,
  },
  {
    name: "Squared centimeter",
    shorthand: "cm2",
    conversionFactor: 1 / 100 / 100,
    id: UnitType.cm2,
  },
  {
    name: "Squared kilometer",
    shorthand: "km2",
    conversionFactor: 1000 * 1000,
    id: UnitType.km2,
  },
  {
    name: "hectare",
    shorthand: "ha",
    conversionFactor: 10000,
    id: UnitType.ha,
  },
];

export const currency: Unit[] = [
  {
    name: "EURO",
    shorthand: "EUR",
    conversionFactor: 1,
    id: UnitType.EUR,
  },
];

export const energy: Unit[] = [
  {
    name: "joule",
    shorthand: "J",
    conversionFactor: 1,
    id: UnitType.J,
  },
  {
    name: "kilojoule",
    shorthand: "kJ",
    conversionFactor: 1000,
    id: UnitType.kJ,
  },
  {
    name: "megajoule",
    shorthand: "MJ",
    conversionFactor: 1000 * 1000,
    id: UnitType.MJ,
  },
  {
    name: "gigajoule",
    shorthand: "GJ",
    conversionFactor: 1000 * 1000 * 1000,
    id: UnitType.GJ,
  },
  {
    name: "terajoule",
    shorthand: "TJ",
    conversionFactor: 1000 * 1000 * 1000 * 1000,
    id: UnitType.TJ,
  },
  {
    name: "watt-hour",
    shorthand: "Wh",
    conversionFactor: 3.6 * 1000,
    id: UnitType.Wh,
  },
  {
    name: "kilowatt-hour",
    shorthand: "kWh",
    conversionFactor: 3.6 * 1000 * 1000,
    id: UnitType.kWh,
  },
  {
    name: "megawatt-hour",
    shorthand: "MWh",
    conversionFactor: 3.6 * 1000 * 1000 * 1000,
    id: UnitType.MWh,
  },
  {
    name: "gigawatt-hour",
    shorthand: "GWh",
    conversionFactor: 3.6 * 1000 * 1000 * 1000 * 1000,
    id: UnitType.GWh,
  },
];

export const length: Unit[] = [
  {
    name: "meter",
    shorthand: "m",
    conversionFactor: 1,
    id: UnitType.m,
  },
  {
    name: "centimeter",
    shorthand: "cm",
    conversionFactor: 0.1,
    id: UnitType.cm,
  },
  {
    name: "kilometer",
    shorthand: "km",
    conversionFactor: 1000,
    id: UnitType.km,
  },
  {
    name: "passenger-kilometer",
    shorthand: "pkm",
    conversionFactor: 1000,
    id: UnitType.pkm,
  },
  {
    name: "mile",
    shorthand: "mi",
    conversionFactor: 1609.344,
    id: UnitType.mi,
  },
  {
    name: "nautical mile",
    shorthand: "nmi",
    conversionFactor: 1852,
    id: UnitType.nmi,
  },
];

export const mass: Unit[] = [
  {
    name: "kilogram",
    shorthand: "kg",
    conversionFactor: 1,
    id: UnitType.kg,
  },
  {
    name: "gram",
    shorthand: "g",
    conversionFactor: 1 / 1000,
    id: UnitType.g,
  },
  {
    name: "ton",
    shorthand: "t",
    conversionFactor: 1000,
    id: UnitType.t,
  },
];

export const time: Unit[] = [
  {
    name: "second",
    shorthand: "s",
    conversionFactor: 1,
    id: UnitType.s,
  },
  {
    name: "minute",
    shorthand: "min",
    conversionFactor: 60,
    id: UnitType.min,
  },
  {
    name: "hour",
    shorthand: "h",
    conversionFactor: 60 * 60,
    id: UnitType.h,
  },
  {
    name: "day",
    shorthand: "d",
    conversionFactor: 60 * 60 * 24,
    id: UnitType.d,
  },
  {
    name: "month",
    shorthand: "MM",
    conversionFactor: 60 * 60 * 24 * 30,
    id: UnitType.MM,
  },
  {
    name: "year",
    shorthand: "a",
    conversionFactor: 60 * 60 * 24 * 30 * 365,
    id: UnitType.a,
  },
];

export const transport: Unit[] = [
  {
    name: "ton-kilometer",
    shorthand: "tkm",
    conversionFactor: 1,
    id: UnitType.tkm,
  },
];
export const volume: Unit[] = [
  {
    name: "cubic meter",
    shorthand: "m3",
    conversionFactor: 1,
    id: UnitType.m3,
  },
  {
    name: "cubic centimeter",
    shorthand: "cm3",
    conversionFactor: 1 / 100 / 100 / 100,
    id: UnitType.cm3,
  },
  {
    name: "liter",
    shorthand: "l",
    conversionFactor: 1 / 1000,
    id: UnitType.l,
  },
  {
    name: "milliliter",
    shorthand: "ml",
    conversionFactor: 1 / 1000 / 1000,
    id: UnitType.ml,
  },
];

export const allUnits = area.concat(
  currency,
  energy,
  length,
  mass,
  time,
  transport,
  volume
);

export const allUnitsObject = {
  Area: area,
  Currency: currency,
  Energy: energy,
  Length: length,
  Mass: mass,
  Time: time,
  Transport: transport,
  Volume: volume,
};
