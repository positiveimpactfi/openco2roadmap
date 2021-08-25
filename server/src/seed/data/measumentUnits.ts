import { PhysicalQuantity } from "../../entity/PhysicalQuantity";

export const quantities: Partial<PhysicalQuantity>[] = [
  { name: "Area" },
  { name: "Currency" },
  { name: "Energy" },
  { name: "Length" },
  { name: "Mass" },
  { name: "Time" },
  { name: "Transport" },
  { name: "Volume" },
];

interface Unit {
  name: string;
  shorthand: string;
  conversionFactor: number;
}

export const area: Unit[] = [
  {
    name: "Squared meter",
    shorthand: "m2",
    conversionFactor: 1,
  },
  {
    name: "Squared centimeter",
    shorthand: "cm2",
    conversionFactor: 1 / 100 / 100,
  },
  {
    name: "Squared kilometer",
    shorthand: "km2",
    conversionFactor: 1000 * 1000,
  },
  {
    name: "hectare",
    shorthand: "ha",
    conversionFactor: 10000,
  },
];

export const currency: Unit[] = [
  {
    name: "EURO",
    shorthand: "EUR",
    conversionFactor: 1,
  },
];

export const energy: Unit[] = [
  {
    name: "joule",
    shorthand: "J",
    conversionFactor: 1,
  },
  {
    name: "kilojoule",
    shorthand: "kJ",
    conversionFactor: 1000,
  },
  {
    name: "megajoule",
    shorthand: "MJ",
    conversionFactor: 1000 * 1000,
  },
  {
    name: "gigajoule",
    shorthand: "GJ",
    conversionFactor: 1000 * 1000 * 1000,
  },
  {
    name: "terajoule",
    shorthand: "TJ",
    conversionFactor: 1000 * 1000 * 1000 * 1000,
  },
  {
    name: "watt-hour",
    shorthand: "Wh",
    conversionFactor: 3.6 * 1000,
  },
  {
    name: "kilowatt-hour",
    shorthand: "kWh",
    conversionFactor: 3.6 * 1000 * 1000,
  },
  {
    name: "megawatt-hour",
    shorthand: "MWh",
    conversionFactor: 3.6 * 1000 * 1000 * 1000,
  },
  {
    name: "gigawatt-hour",
    shorthand: "GWh",
    conversionFactor: 3.6 * 1000 * 1000 * 1000 * 1000,
  },
];

export const length: Unit[] = [
  {
    name: "meter",
    shorthand: "m",
    conversionFactor: 1,
  },
  {
    name: "centimeter",
    shorthand: "cm",
    conversionFactor: 0.1,
  },
  {
    name: "kilometer",
    shorthand: "km",
    conversionFactor: 1000,
  },
  {
    name: "passenger-kilometer",
    shorthand: "pkm",
    conversionFactor: 1000,
  },
  {
    name: "mile",
    shorthand: "mi",
    conversionFactor: 1609.344,
  },
  {
    name: "nautical mile",
    shorthand: "nmi",
    conversionFactor: 1852,
  },
];

export const mass: Unit[] = [
  {
    name: "kilogram",
    shorthand: "kg",
    conversionFactor: 1,
  },
  {
    name: "gram",
    shorthand: "g",
    conversionFactor: 1 / 1000,
  },
  {
    name: "ton",
    shorthand: "t",
    conversionFactor: 1000,
  },
];

export const time: Unit[] = [
  {
    name: "second",
    shorthand: "s",
    conversionFactor: 1,
  },
  {
    name: "minute",
    shorthand: "min",
    conversionFactor: 60,
  },
  {
    name: "hour",
    shorthand: "h",
    conversionFactor: 60 * 60,
  },
  {
    name: "day",
    shorthand: "d",
    conversionFactor: 60 * 60 * 24,
  },
  {
    name: "month",
    shorthand: "MM",
    conversionFactor: 60 * 60 * 24 * 30,
  },
  {
    name: "year",
    shorthand: "a",
    conversionFactor: 60 * 60 * 24 * 30 * 365,
  },
];

export const transport: Unit[] = [
  {
    name: "ton-kilometer",
    shorthand: "tkm",
    conversionFactor: 1,
  },
];
export const volume: Unit[] = [
  {
    name: "cubic meter",
    shorthand: "m3",
    conversionFactor: 1,
  },
  {
    name: "cubic centimeter",
    shorthand: "cm3",
    conversionFactor: 1 / 100 / 100 / 100,
  },
  {
    name: "liter",
    shorthand: "l",
    conversionFactor: 1 / 1000,
  },
  {
    name: "milliliter",
    shorthand: "ml",
    conversionFactor: 1 / 1000 / 1000,
  },
];
