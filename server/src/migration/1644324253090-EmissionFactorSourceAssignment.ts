import { MigrationInterface, QueryRunner } from "typeorm";
import { EmissionFactor, EmissionSource } from "../entity";
import { emissionFactors } from "../seed/data/emissionFactorUpdate1";

export class EmissionFactorSourceAssignment1644324253090
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let emissionFactor of emissionFactors) {
      const es = await queryRunner.connection.manager.findOne(
        EmissionSource,
        emissionFactor.emissionSource
      );
      const ef = await queryRunner.connection.manager.findOne(EmissionFactor, {
        name: emissionFactor.name,
      });
      if (es && ef) {
        const current = await es.emissionFactors;
        es.emissionFactors = Promise.resolve([...current, ef]);
        await es.save();
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.close();
  }
}
