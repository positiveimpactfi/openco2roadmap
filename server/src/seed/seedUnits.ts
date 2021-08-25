import { Connection } from "typeorm";
import { MeasurementUnit } from "../entity/MeasurementUnit";
import { PhysicalQuantity } from "../entity/PhysicalQuantity";
import {
  quantities,
  area,
  currency,
  energy,
  length,
  mass,
  time,
  transport,
  volume,
} from "./data/measumentUnits";

export const seedUnits = async (conn: Connection) => {
  console.log("======== SEEDING PHYSICAL QUANTITIES AND UNITS =======");
  const savedQuantities = await conn.manager.save(PhysicalQuantity, quantities);
  const unitsToSave = area
    .map((a) => {
      return { ...a, physicalQuantity: savedQuantities[0] };
    })
    .concat(
      currency.map((c) => {
        return { ...c, physicalQuantity: savedQuantities[1] };
      }),
      energy.map((e) => {
        return { ...e, physicalQuantity: savedQuantities[2] };
      }),
      length.map((l) => {
        return { ...l, physicalQuantity: savedQuantities[3] };
      }),
      mass.map((m) => {
        return { ...m, physicalQuantity: savedQuantities[4] };
      }),
      time.map((t) => {
        return { ...t, physicalQuantity: savedQuantities[5] };
      }),
      transport.map((t) => {
        return { ...t, physicalQuantity: savedQuantities[6] };
      }),
      volume.map((v) => {
        return { ...v, physicalQuantity: savedQuantities[7] };
      })
    );
  const savedAreaUnits = await conn.manager.save(MeasurementUnit, unitsToSave);

  console.log("saved area units", savedAreaUnits);
  console.log("======= FINISHED SEEDING QUANTITIES AND UNITS =====");
};
