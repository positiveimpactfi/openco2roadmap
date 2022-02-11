import {MigrationInterface, QueryRunner} from "typeorm";

export class RegistrationRequestComment1644582467443 implements MigrationInterface {
    name = 'RegistrationRequestComment1644582467443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registration_request" ADD "comment" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registration_request" DROP COLUMN "comment"`);
    }

}
