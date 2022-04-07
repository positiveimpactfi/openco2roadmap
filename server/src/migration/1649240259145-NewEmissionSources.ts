import {MigrationInterface, QueryRunner} from "typeorm";

export class NewEmissionSources1649240259145 implements MigrationInterface {
    name = 'NewEmissionSources1649240259145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "calculation_result_emissionsource_enum" RENAME TO "calculation_result_emissionsource_enum_old"`);
        await queryRunner.query(`CREATE TYPE "calculation_result_emissionsource_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80')`);
        await queryRunner.query(`ALTER TABLE "calculation_result" ALTER COLUMN "emissionSource" TYPE "calculation_result_emissionsource_enum" USING "emissionSource"::"text"::"calculation_result_emissionsource_enum"`);
        await queryRunner.query(`DROP TYPE "calculation_result_emissionsource_enum_old"`);
        await queryRunner.query(`ALTER TYPE "data_entry_emissionsource_enum" RENAME TO "data_entry_emissionsource_enum_old"`);
        await queryRunner.query(`CREATE TYPE "data_entry_emissionsource_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80')`);
        await queryRunner.query(`ALTER TABLE "data_entry" ALTER COLUMN "emissionSource" TYPE "data_entry_emissionsource_enum" USING "emissionSource"::"text"::"data_entry_emissionsource_enum"`);
        await queryRunner.query(`DROP TYPE "data_entry_emissionsource_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "data_entry_emissionsource_enum_old" AS ENUM('1', '10', '11', '12', '13', '2', '3', '4', '44', '45', '46', '47', '48', '49', '5', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '6', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '7', '70', '71', '72', '73', '74', '75', '8', '9')`);
        await queryRunner.query(`ALTER TABLE "data_entry" ALTER COLUMN "emissionSource" TYPE "data_entry_emissionsource_enum_old" USING "emissionSource"::"text"::"data_entry_emissionsource_enum_old"`);
        await queryRunner.query(`DROP TYPE "data_entry_emissionsource_enum"`);
        await queryRunner.query(`ALTER TYPE "data_entry_emissionsource_enum_old" RENAME TO "data_entry_emissionsource_enum"`);
        await queryRunner.query(`CREATE TYPE "calculation_result_emissionsource_enum_old" AS ENUM('1', '10', '11', '12', '13', '2', '3', '4', '44', '45', '46', '47', '48', '49', '5', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '6', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '7', '70', '71', '72', '73', '74', '75', '8', '9')`);
        await queryRunner.query(`ALTER TABLE "calculation_result" ALTER COLUMN "emissionSource" TYPE "calculation_result_emissionsource_enum_old" USING "emissionSource"::"text"::"calculation_result_emissionsource_enum_old"`);
        await queryRunner.query(`DROP TYPE "calculation_result_emissionsource_enum"`);
        await queryRunner.query(`ALTER TYPE "calculation_result_emissionsource_enum_old" RENAME TO "calculation_result_emissionsource_enum"`);
    }

}
