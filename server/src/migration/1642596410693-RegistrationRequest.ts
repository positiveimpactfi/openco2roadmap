import {MigrationInterface, QueryRunner} from "typeorm";

export class RegistrationRequest1642596410693 implements MigrationInterface {
    name = 'RegistrationRequest1642596410693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "registration_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lastName" character varying NOT NULL, "firstName" character varying NOT NULL, "email" character varying NOT NULL, "businessID" character varying NOT NULL, "municipalityId" integer, "businessFieldId" integer, CONSTRAINT "PK_a4cdc69e7b9197ae3360cdbb50e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "registration_request" ADD CONSTRAINT "FK_c2a50d9a73a8f667b6f6ccbf049" FOREIGN KEY ("municipalityId") REFERENCES "municipality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registration_request" ADD CONSTRAINT "FK_3ca0e6df70839d096c53f7143b3" FOREIGN KEY ("businessFieldId") REFERENCES "business_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registration_request" DROP CONSTRAINT "FK_3ca0e6df70839d096c53f7143b3"`);
        await queryRunner.query(`ALTER TABLE "registration_request" DROP CONSTRAINT "FK_c2a50d9a73a8f667b6f6ccbf049"`);
        await queryRunner.query(`DROP TABLE "registration_request"`);
    }

}
