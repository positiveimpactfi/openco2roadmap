import { MeasurementUnitType as UnitType } from "./types/MeasurementUnitType";
import { PhysicalEntityType as QuantityType } from "./types/PhysicalEntity";

export interface Unit {
  name: string;
  shorthand: string;
  conversionFactor: number;
  id: UnitType;
  physicalQuantity: QuantityType;
}

export const area: Unit[] = [
  {
    name: "Squared meter",
    shorthand: "m2",
    conversionFactor: 1,
    id: UnitType.m2,
    physicalQuantity: QuantityType.Area,
  },
  {
    name: "Squared centimeter",
    shorthand: "cm2",
    conversionFactor: 1 / 100 / 100,
    id: UnitType.cm2,
    physicalQuantity: QuantityType.Area,
  },
  {
    name: "Squared kilometer",
    shorthand: "km2",
    conversionFactor: 1000 * 1000,
    id: UnitType.km2,
    physicalQuantity: QuantityType.Area,
  },
  {
    name: "hectare",
    shorthand: "ha",
    conversionFactor: 10000,
    id: UnitType.ha,
    physicalQuantity: QuantityType.Area,
  },
];

export const currency: Unit[] = [
  {
    name: "EURO",
    shorthand: "EUR",
    conversionFactor: 1,
    id: UnitType.EUR,
    physicalQuantity: QuantityType.Area,
  },
];

export const energy: Unit[] = [
  {
    name: "joule",
    shorthand: "J",
    conversionFactor: 1 / (3.6 * 1000 * 1000),
    id: UnitType.J,
    physicalQuantity: QuantityType.Energy,
  },
  {
    name: "kilojoule",
    shorthand: "kJ",
    conversionFactor: 1 / (3.6 * 1000),
    id: UnitType.kJ,
    physicalQuantity: QuantityType.Energy,
  },
  {
    name: "megajoule",
    shorthand: "MJ",
    conversionFactor: 1 / 3.6,
    id: UnitType.MJ,
    physicalQuantity: QuantityType.Energy,
  },
  {
    name: "gigajoule",
    shorthand: "GJ",
    conversionFactor: 1000 / 3.6,
    id: UnitType.GJ,
    physicalQuantity: QuantityType.Energy,
  },
  {
    name: "terajoule",
    shorthand: "TJ",
    conversionFactor: 1000000 / 3.6,
    id: UnitType.TJ,
    physicalQuantity: QuantityType.Energy,
  },
  {
    name: "watt-hour",
    shorthand: "Wh",
    conversionFactor: 1 / 1000,
    id: UnitType.Wh,
    physicalQuantity: QuantityType.Energy,
  },
  {
    name: "kilowatt-hour",
    shorthand: "kWh",
    conversionFactor: 1,
    id: UnitType.kWh,
    physicalQuantity: QuantityType.Energy,
  },
  {
    name: "megawatt-hour",
    shorthand: "MWh",
    conversionFactor: 1000,
    id: UnitType.MWh,
    physicalQuantity: QuantityType.Energy,
  },
  {
    name: "gigawatt-hour",
    shorthand: "GWh",
    conversionFactor: 1000000,
    id: UnitType.GWh,
    physicalQuantity: QuantityType.Energy,
  },
];

export const length: Unit[] = [
  {
    name: "meter",
    shorthand: "m",
    conversionFactor: 1 / 1000,
    id: UnitType.m,
    physicalQuantity: QuantityType.Length,
  },
  {
    name: "centimeter",
    shorthand: "cm",
    conversionFactor: 0.1 / 1000,
    id: UnitType.cm,
    physicalQuantity: QuantityType.Length,
  },
  {
    name: "kilometer",
    shorthand: "km",
    conversionFactor: 1,
    id: UnitType.km,
    physicalQuantity: QuantityType.Length,
  },
  {
    name: "passenger-kilometer",
    shorthand: "pkm",
    conversionFactor: 1,
    id: UnitType.pkm,
    physicalQuantity: QuantityType.Length,
  },
  {
    name: "mile",
    shorthand: "mi",
    conversionFactor: 1609.344 / 1000,
    id: UnitType.mi,
    physicalQuantity: QuantityType.Length,
  },
  {
    name: "nautical mile",
    shorthand: "nmi",
    conversionFactor: 1852 / 1000,
    id: UnitType.nmi,
    physicalQuantity: QuantityType.Length,
  },
];

export const mass: Unit[] = [
  {
    name: "kilogram",
    shorthand: "kg",
    conversionFactor: 1,
    id: UnitType.kg,
    physicalQuantity: QuantityType.Mass,
  },
  {
    name: "gram",
    shorthand: "g",
    conversionFactor: 1 / 1000,
    id: UnitType.g,
    physicalQuantity: QuantityType.Mass,
  },
  {
    name: "ton",
    shorthand: "t",
    conversionFactor: 1000,
    id: UnitType.t,
    physicalQuantity: QuantityType.Mass,
  },
];

export const time: Unit[] = [
  {
    name: "second",
    shorthand: "s",
    conversionFactor: 1,
    id: UnitType.s,
    physicalQuantity: QuantityType.Time,
  },
  {
    name: "minute",
    shorthand: "min",
    conversionFactor: 60,
    id: UnitType.min,
    physicalQuantity: QuantityType.Time,
  },
  {
    name: "hour",
    shorthand: "h",
    conversionFactor: 60 * 60,
    id: UnitType.h,
    physicalQuantity: QuantityType.Time,
  },
  {
    name: "day",
    shorthand: "d",
    conversionFactor: 60 * 60 * 24,
    id: UnitType.d,
    physicalQuantity: QuantityType.Time,
  },
  {
    name: "month",
    shorthand: "MM",
    conversionFactor: 60 * 60 * 24 * 30,
    id: UnitType.MM,
    physicalQuantity: QuantityType.Time,
  },
  {
    name: "year",
    shorthand: "a",
    conversionFactor: 60 * 60 * 24 * 30 * 365,
    id: UnitType.a,
    physicalQuantity: QuantityType.Time,
  },
];

export const transport: Unit[] = [
  {
    name: "ton-kilometer",
    shorthand: "tkm",
    conversionFactor: 1,
    id: UnitType.tkm,
    physicalQuantity: QuantityType.Transport,
  },
];
export const volume: Unit[] = [
  {
    name: "cubic meter",
    shorthand: "m3",
    conversionFactor: 1,
    id: UnitType.m3,
    physicalQuantity: QuantityType.Volume,
  },
  {
    name: "cubic centimeter",
    shorthand: "cm3",
    conversionFactor: 1 / 100 / 100 / 100,
    id: UnitType.cm3,
    physicalQuantity: QuantityType.Volume,
  },
  {
    name: "liter",
    shorthand: "l",
    conversionFactor: 1 / 1000,
    id: UnitType.l,
    physicalQuantity: QuantityType.Volume,
  },
  {
    name: "milliliter",
    shorthand: "ml",
    conversionFactor: 1 / 1000 / 1000,
    id: UnitType.ml,
    physicalQuantity: QuantityType.Volume,
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
