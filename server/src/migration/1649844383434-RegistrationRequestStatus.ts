import {MigrationInterface, QueryRunner} from "typeorm";

export class RegistrationRequestStatus1649844383434 implements MigrationInterface {
    name = 'RegistrationRequestStatus1649844383434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registration_request" ADD "processed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registration_request" DROP COLUMN "processed"`);
    }

}
