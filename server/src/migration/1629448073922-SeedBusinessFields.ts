import { BusinessField } from "../entity/BusinessField";
import { businessFields } from "../seed/businessFields";
import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedBusinessFields1629448073922 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const res = await queryRunner.manager.save(BusinessField, businessFields);
    console.log("seed result", res);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
