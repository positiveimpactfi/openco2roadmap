import { Connection } from "typeorm";
import { EmissionFactor } from "../entity/EmissionFactor";
import { EmissionFactorValue } from "../entity/EmissionFactorValue";
import { EmissionSource } from "../entity/EmissionSource";
import { MeasurementUnit } from "../entity/MeasurementUnit";
import { emissionFactors } from "./data/emissionFactors";

export const seedEmissionFactors = async (conn: Connection) => {
  console.log("===========START SEEDING EMISSION FACTORS==========");
  for (let ef of emissionFactors) {
    const es = await conn.manager.findByIds(EmissionSource, [
      ef.emissionSource,
    ]);
    const unit = await conn.manager.findOne(MeasurementUnit, ef.unit, {
      relations: ["physicalQuantity"],
    });
    if (!unit) break;

    const savedEF = await conn.manager
      .create(EmissionFactor, {
        name: ef.name,
        source: ef.source,
        geographicalArea: ef.region,
        emissionSources: Promise.resolve(es),
        dataSourceType: ef.sourceType,
        physicalQuantity: unit.physicalQuantity,
      })
      .save();
    const efValue = await conn.manager
      .create(EmissionFactorValue, {
        value: ef.value / unit.conversionFactor,
        startDate: ef.year,
        endDate: 2050,
        emissionFactor: savedEF,
      })
      .save();
    savedEF.values = savedEF.values ? [...savedEF.values, efValue] : [efValue];
    await conn.manager.save(EmissionFactor, savedEF);
    for (let emissionSource of es) {
      const currentFactors = await emissionSource.emissionFactors;
      emissionSource.emissionFactors = Promise.resolve([
        ...currentFactors,
        savedEF,
      ]);
      await conn.manager.save(EmissionSource, emissionSource);
    }
  }

  console.log("===========FINISH SEEDING EMISSION FACTORS==========");
};
