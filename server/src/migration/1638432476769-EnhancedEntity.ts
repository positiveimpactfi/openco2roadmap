import { MigrationInterface, QueryRunner } from "typeorm";

export class EnhancedEntity1638432476769 implements MigrationInterface {
  name = "EnhancedEntity1638432476769";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedDate"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdDate"`);
  }
}
