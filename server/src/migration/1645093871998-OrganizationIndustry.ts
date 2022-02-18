import {MigrationInterface, QueryRunner} from "typeorm";

export class OrganizationIndustry1645093871998 implements MigrationInterface {
    name = 'OrganizationIndustry1645093871998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" ADD "industryId" integer`);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_ff5edcf9b19c97e15748e1ed6e6" FOREIGN KEY ("industryId") REFERENCES "sub_industry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_ff5edcf9b19c97e15748e1ed6e6"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "industryId"`);
    }

}
