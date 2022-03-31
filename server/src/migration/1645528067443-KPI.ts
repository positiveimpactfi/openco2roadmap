import { MigrationInterface, QueryRunner } from "typeorm";

export class KPI1645528067443 implements MigrationInterface {
  name = "KPI1645528067443";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kpi_value" DROP CONSTRAINT "FK_2430479ddf67812d5858d004b2a"`
    );
    await queryRunner.query(
      `ALTER TABLE "kpi_value" RENAME COLUMN "parentKPIId" TO "parentId"`
    );
    await queryRunner.query(
      `ALTER TABLE "kpi_value" ADD "organizationId" uuid`
    );
    await queryRunner.query(
      `ALTER TABLE "kpi_value" ADD CONSTRAINT "FK_4772ae0a0d2f5e200f38c5282de" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "kpi" ADD "unitId" integer`);
    await queryRunner.query(
      `ALTER TABLE "kpi_value" ADD CONSTRAINT "FK_fd1f1473f16552df22c5f388363" FOREIGN KEY ("parentId") REFERENCES "kpi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "kpi" ADD CONSTRAINT "FK_860e1930a1e1d0ab4ef4839de42" FOREIGN KEY ("unitId") REFERENCES "measurement_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kpi" DROP CONSTRAINT "FK_860e1930a1e1d0ab4ef4839de42"`
    );
    await queryRunner.query(
      `ALTER TABLE "kpi_value" DROP CONSTRAINT "FK_fd1f1473f16552df22c5f388363"`
    );
    await queryRunner.query(
      `ALTER TABLE "kpi_value" DROP CONSTRAINT "FK_4772ae0a0d2f5e200f38c5282de"`
    );
    await queryRunner.query(
      `ALTER TABLE "kpi_value" DROP COLUMN "organizationId"`
    );
    await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "unitId"`);
    await queryRunner.query(
      `ALTER TABLE "kpi_value" RENAME COLUMN "parentId" TO "parentKPIId"`
    );
    await queryRunner.query(
      `ALTER TABLE "kpi_value" ADD CONSTRAINT "FK_2430479ddf67812d5858d004b2a" FOREIGN KEY ("parentKPIId") REFERENCES "kpi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
