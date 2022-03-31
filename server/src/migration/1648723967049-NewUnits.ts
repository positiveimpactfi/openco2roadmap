import {MigrationInterface, QueryRunner} from "typeorm";

export class NewUnits1648723967049 implements MigrationInterface {
    name = 'NewUnits1648723967049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "calculation_result_measurementunit_enum" RENAME TO "calculation_result_measurementunit_enum_old"`);
        await queryRunner.query(`CREATE TYPE "calculation_result_measurementunit_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37')`);
        await queryRunner.query(`ALTER TABLE "calculation_result" ALTER COLUMN "measurementUnit" TYPE "calculation_result_measurementunit_enum" USING "measurementUnit"::"text"::"calculation_result_measurementunit_enum"`);
        await queryRunner.query(`DROP TYPE "calculation_result_measurementunit_enum_old"`);
        await queryRunner.query(`ALTER TYPE "data_entry_measurementunit_enum" RENAME TO "data_entry_measurementunit_enum_old"`);
        await queryRunner.query(`CREATE TYPE "data_entry_measurementunit_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37')`);
        await queryRunner.query(`ALTER TABLE "data_entry" ALTER COLUMN "measurementUnit" TYPE "data_entry_measurementunit_enum" USING "measurementUnit"::"text"::"data_entry_measurementunit_enum"`);
        await queryRunner.query(`DROP TYPE "data_entry_measurementunit_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "data_entry_measurementunit_enum_old" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34')`);
        await queryRunner.query(`ALTER TABLE "data_entry" ALTER COLUMN "measurementUnit" TYPE "data_entry_measurementunit_enum_old" USING "measurementUnit"::"text"::"data_entry_measurementunit_enum_old"`);
        await queryRunner.query(`DROP TYPE "data_entry_measurementunit_enum"`);
        await queryRunner.query(`ALTER TYPE "data_entry_measurementunit_enum_old" RENAME TO "data_entry_measurementunit_enum"`);
        await queryRunner.query(`CREATE TYPE "calculation_result_measurementunit_enum_old" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34')`);
        await queryRunner.query(`ALTER TABLE "calculation_result" ALTER COLUMN "measurementUnit" TYPE "calculation_result_measurementunit_enum_old" USING "measurementUnit"::"text"::"calculation_result_measurementunit_enum_old"`);
        await queryRunner.query(`DROP TYPE "calculation_result_measurementunit_enum"`);
        await queryRunner.query(`ALTER TYPE "calculation_result_measurementunit_enum_old" RENAME TO "calculation_result_measurementunit_enum"`);
    }

}
