import { MigrationInterface, QueryRunner } from "typeorm";
import { KPI, MeasurementUnit } from "../entity";
import { kpis } from "../seed/data/kpi";

export class KPISeed1645605461348 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let kpi of kpis) {
      if (kpi.unit) {
        const measurementUnit = await queryRunner.connection.manager.findOne(
          MeasurementUnit,
          kpi.unit
        );
        if (!measurementUnit) {
          await queryRunner.connection.manager
            .create(KPI, {
              name: kpi.name,
              organization: undefined,
            })
            .save();
        } else {
          await queryRunner.connection.manager
            .create(KPI, {
              name: kpi.name,
              unit: measurementUnit ? measurementUnit : undefined,
              organization: undefined,
            })
            .save();
        }
      } else {
        await queryRunner.connection.manager
          .create(KPI, {
            name: kpi.name,
            organization: undefined,
          })
          .save();
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM kpi");
  }
}
