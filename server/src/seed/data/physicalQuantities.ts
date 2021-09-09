import { PhysicalEntityType } from "../../types/PhysicalEntity";
import { StaticEntity } from "../../types/StaticEntity";

export const physicalQuantities: (StaticEntity & { id: PhysicalEntityType })[] =
  [
    {
      name: "Area",
      id: PhysicalEntityType.Area,
    },
    {
      name: "Currency",
      id: PhysicalEntityType.Currency,
    },
    {
      name: "Energy",
      id: PhysicalEntityType.Energy,
    },
    {
      name: "Length",
      id: PhysicalEntityType.Length,
    },
    {
      name: "Mass",
      id: PhysicalEntityType.Mass,
    },
    {
      name: "Time",
      id: PhysicalEntityType.Time,
    },
    {
      name: "Transport",
      id: PhysicalEntityType.Transport,
    },
    {
      name: "Volume",
      id: PhysicalEntityType.Volume,
    },
  ];
