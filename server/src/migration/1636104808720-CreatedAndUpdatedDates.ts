import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedAndUpdatedDates1636104808720 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()'
    );
    await queryRunner.query(
      'ALTER TABLE "user" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "createdDate"');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMNN "updatedDate"');
  }
}
