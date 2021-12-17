import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1637920489086 implements MigrationInterface {
  name = "InitDB1637920489086";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "kpi_value" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "year" integer NOT NULL, "value" double precision NOT NULL, "parentKPIId" uuid, CONSTRAINT "PK_6b4a10260242a07160894fd5df8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "kpi" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "organizationId" uuid, CONSTRAINT "PK_56589835e31cc0331684d2d28a7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "municipality" ("id" integer NOT NULL, "name" character varying NOT NULL, "stateCode" integer NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_281ad341f20df7c41b83a182e2a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "calculation_result_measurementunit_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34')`
    );
    await queryRunner.query(
      `CREATE TYPE "calculation_result_emissionsource_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65')`
    );
    await queryRunner.query(
      `CREATE TYPE "calculation_result_category_enum" AS ENUM('1', '2', '3', '4')`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "calculation_result" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "consumptionValue" double precision NOT NULL, "emissionFactorValue" double precision NOT NULL, "measurementUnit" "calculation_result_measurementunit_enum" NOT NULL, "emissionsCalculated" double precision, "siteUnitID" character varying NOT NULL, "siteID" character varying NOT NULL, "creatorID" character varying NOT NULL, "organizationID" character varying NOT NULL, "emissionSource" "calculation_result_emissionsource_enum" NOT NULL, "category" "calculation_result_category_enum" NOT NULL, "isLatest" boolean NOT NULL, "dataEntryId" uuid, CONSTRAINT "PK_6e89a2824e3d464474c75e3e43b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "category" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "component" ("id" integer NOT NULL, "name" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_c084eba2d3b157314de79135f09" PRIMARY KEY ("id"))`
    );
    // await queryRunner.query(
    //   `CREATE TYPE "emission_source_scope_enum" AS ENUM('Scope 1', 'Scope 2', 'Scope 3')`
    // );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "emission_source" ("id" integer NOT NULL, "name" character varying NOT NULL, "scope" text NOT NULL DEFAULT 'Scope 3', CONSTRAINT "PK_519ffc6f377bca49760dcd8ba8a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "measurement_unit" ("id" integer NOT NULL, "name" character varying NOT NULL, "shorthand" character varying NOT NULL, "conversionFactor" double precision NOT NULL, "physicalQuantityId" integer, CONSTRAINT "PK_fc57e5fd5adea5a7009f99e140a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "physical_quantity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "baseUnitId" integer, CONSTRAINT "UQ_bac1b594d4799415d4275d493fb" UNIQUE ("name"), CONSTRAINT "REL_52d90f9fff2f7e91258a676edf" UNIQUE ("baseUnitId"), CONSTRAINT "PK_6dc5041452efe0499e23736331c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "emission_factor_datasourcetype_enum" AS ENUM('0', '1', '2')`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "emission_factor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "source" character varying, "geographicalArea" character varying, "dataSourceType" "emission_factor_datasourcetype_enum" NOT NULL DEFAULT '1', "creatorId" uuid, "physicalQuantityId" integer, CONSTRAINT "PK_d43611b38f58108945ea9bf3019" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "emission_factor_value" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" double precision NOT NULL, "startDate" integer NOT NULL, "endDate" integer NOT NULL, "emissionFactorId" uuid, "creatorId" uuid, CONSTRAINT "PK_360cf7b50b79541e9e479ec21de" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "user_role_name_enum" AS ENUM('SUPERADMIN', 'ADMIN', 'DESTINATION_MANAGER', 'COMPANY_ADMIN', 'COMPANY_USER')`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user_role" ("id" SERIAL NOT NULL, "name" "user_role_name_enum" NOT NULL DEFAULT 'COMPANY_USER', "organizationID" character varying NOT NULL, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user" ("createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying, "lastName" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "data_entry_measurementunit_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34')`
    );
    await queryRunner.query(
      `CREATE TYPE "data_entry_emissionsource_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65')`
    );
    await queryRunner.query(
      `CREATE TYPE "data_entry_category_enum" AS ENUM('1', '2', '3', '4')`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "data_entry" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "consumptionValue" double precision NOT NULL, "comments" character varying, "measurementUnit" "data_entry_measurementunit_enum" NOT NULL, "emissionSource" "data_entry_emissionsource_enum" NOT NULL, "category" "data_entry_category_enum" NOT NULL, "createdById" uuid, "siteUnitId" uuid, "emissionFactorValueId" uuid, CONSTRAINT "PK_31c5981e1ba6c6b29e59215dd37" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "site_unit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "siteId" uuid, CONSTRAINT "PK_4ea741fa8fe980d6563d32af56e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "site" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "siteTypeId" uuid, "municipalityId" integer, CONSTRAINT "PK_635c0eeabda8862d5b0237b42b4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "site_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "organizationId" uuid, CONSTRAINT "PK_1e979abce770c3cabdb5838a9a1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "businessID" character varying NOT NULL, "municipalityId" integer, "businessFieldId" integer, CONSTRAINT "UQ_c21e615583a3ebbb0977452afb0" UNIQUE ("name"), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "business_field" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_36da863ea8df1055b39851401b7" UNIQUE ("name"), CONSTRAINT "PK_fa1399a17b0e40b68eb7c0493bc" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "component_emission_sources_emission_source" ("componentId" integer NOT NULL, "emissionSourceId" integer NOT NULL, CONSTRAINT "PK_08f5e2c06c222eb6588ddf13c29" PRIMARY KEY ("componentId", "emissionSourceId"))`
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_667ee16efb6c77fb16401f41c7" ON "component_emission_sources_emission_source" ("componentId") `
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_135017227cac6ada87833dd6ea" ON "component_emission_sources_emission_source" ("emissionSourceId") `
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "emission_source_emission_factors_emission_factor" ("emissionSourceId" integer NOT NULL, "emissionFactorId" uuid NOT NULL, CONSTRAINT "PK_508b3ab46226a7e12a4ee582131" PRIMARY KEY ("emissionSourceId", "emissionFactorId"))`
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_0acdf535f8712abd4fb604879b" ON "emission_source_emission_factors_emission_factor" ("emissionSourceId") `
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_925bcb2d587abf4a6dcbff1018" ON "emission_source_emission_factors_emission_factor" ("emissionFactorId") `
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user_roles_user_role" ("userId" uuid NOT NULL, "userRoleId" integer NOT NULL, CONSTRAINT "PK_cd5bf7bedcc5f7671f0a97b9224" PRIMARY KEY ("userId", "userRoleId"))`
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_dc94447a3cabad70eb2c96f5e1" ON "user_roles_user_role" ("userId") `
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_4698620c2fcf96fdbabb09f384" ON "user_roles_user_role" ("userRoleId") `
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "organization_users_user" ("organizationId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_a0057ab2ced35777f00eaaa9673" PRIMARY KEY ("organizationId", "userId"))`
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_e1e28e472b43bbad7ff3cecdcd" ON "organization_users_user" ("organizationId") `
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_a02d820429038dce37d18f74b6" ON "organization_users_user" ("userId") `
    );
    await queryRunner.query(
      `ALTER TABLE "kpi_value" ADD CONSTRAINT "FK_2430479ddf67812d5858d004b2a" FOREIGN KEY ("parentKPIId") REFERENCES "kpi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "kpi" ADD CONSTRAINT "FK_b6a3473dcb95917b9ffe612b59f" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "calculation_result" ADD CONSTRAINT "FK_f55fe7d1463a23c3d0c4529552d" FOREIGN KEY ("dataEntryId") REFERENCES "data_entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "component" ADD CONSTRAINT "FK_74b7c65b491326f25974bdde284" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "measurement_unit" ADD CONSTRAINT "FK_966bd104ee989c6bb91770effef" FOREIGN KEY ("physicalQuantityId") REFERENCES "physical_quantity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "physical_quantity" ADD CONSTRAINT "FK_52d90f9fff2f7e91258a676edfb" FOREIGN KEY ("baseUnitId") REFERENCES "measurement_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "emission_factor" ADD CONSTRAINT "FK_9e9809e05926f78e3abf082c0b9" FOREIGN KEY ("creatorId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "emission_factor" ADD CONSTRAINT "FK_166a5d81776458506ae18d00ba0" FOREIGN KEY ("physicalQuantityId") REFERENCES "physical_quantity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "emission_factor_value" ADD CONSTRAINT "FK_47bc5c64139d84df897bd72fda8" FOREIGN KEY ("emissionFactorId") REFERENCES "emission_factor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "emission_factor_value" ADD CONSTRAINT "FK_ed577b61ef5b35831f1ea38f50c" FOREIGN KEY ("creatorId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "data_entry" ADD CONSTRAINT "FK_02cb81c59583c39596b030b6e4c" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "data_entry" ADD CONSTRAINT "FK_d64866364152e6ee9d17c81c121" FOREIGN KEY ("siteUnitId") REFERENCES "site_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "data_entry" ADD CONSTRAINT "FK_1f9c9c72c53f198ce695429ca65" FOREIGN KEY ("emissionFactorValueId") REFERENCES "emission_factor_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "site_unit" ADD CONSTRAINT "FK_15d4516bd165a85cdb430f42fe5" FOREIGN KEY ("siteId") REFERENCES "site"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "site" ADD CONSTRAINT "FK_ac8b84b6b775d7063b2d0710b17" FOREIGN KEY ("siteTypeId") REFERENCES "site_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "site" ADD CONSTRAINT "FK_fd413dc7ef49c8f712c31c38bb6" FOREIGN KEY ("municipalityId") REFERENCES "municipality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "site_type" ADD CONSTRAINT "FK_8e48f723823db89e2feab6ea74c" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "FK_545a25b3d326840a066ce3cfdde" FOREIGN KEY ("municipalityId") REFERENCES "municipality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "FK_270bcc5c69907cc90c246e55baa" FOREIGN KEY ("businessFieldId") REFERENCES "business_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "component_emission_sources_emission_source" ADD CONSTRAINT "FK_667ee16efb6c77fb16401f41c72" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "component_emission_sources_emission_source" ADD CONSTRAINT "FK_135017227cac6ada87833dd6ea5" FOREIGN KEY ("emissionSourceId") REFERENCES "emission_source"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "emission_source_emission_factors_emission_factor" ADD CONSTRAINT "FK_0acdf535f8712abd4fb604879b6" FOREIGN KEY ("emissionSourceId") REFERENCES "emission_source"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "emission_source_emission_factors_emission_factor" ADD CONSTRAINT "FK_925bcb2d587abf4a6dcbff10188" FOREIGN KEY ("emissionFactorId") REFERENCES "emission_factor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role" ADD CONSTRAINT "FK_dc94447a3cabad70eb2c96f5e1d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role" ADD CONSTRAINT "FK_4698620c2fcf96fdbabb09f3844" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "organization_users_user" ADD CONSTRAINT "FK_e1e28e472b43bbad7ff3cecdcdd" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "organization_users_user" ADD CONSTRAINT "FK_a02d820429038dce37d18f74b68" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization_users_user" DROP CONSTRAINT "FK_a02d820429038dce37d18f74b68"`
    );
    await queryRunner.query(
      `ALTER TABLE "organization_users_user" DROP CONSTRAINT "FK_e1e28e472b43bbad7ff3cecdcdd"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role" DROP CONSTRAINT "FK_4698620c2fcf96fdbabb09f3844"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role" DROP CONSTRAINT "FK_dc94447a3cabad70eb2c96f5e1d"`
    );
    await queryRunner.query(
      `ALTER TABLE "emission_source_emission_factors_emission_factor" DROP CONSTRAINT "FK_925bcb2d587abf4a6dcbff10188"`
    );
    await queryRunner.query(
      `ALTER TABLE "emission_source_emission_factors_emission_factor" DROP CONSTRAINT "FK_0acdf535f8712abd4fb604879b6"`
    );
    await queryRunner.query(
      `ALTER TABLE "component_emission_sources_emission_source" DROP CONSTRAINT "FK_135017227cac6ada87833dd6ea5"`
    );
    await queryRunner.query(
      `ALTER TABLE "component_emission_sources_emission_source" DROP CONSTRAINT "FK_667ee16efb6c77fb16401f41c72"`
    );
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "FK_270bcc5c69907cc90c246e55baa"`
    );
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "FK_545a25b3d326840a066ce3cfdde"`
    );
    await queryRunner.query(
      `ALTER TABLE "site_type" DROP CONSTRAINT "FK_8e48f723823db89e2feab6ea74c"`
    );
    await queryRunner.query(
      `ALTER TABLE "site" DROP CONSTRAINT "FK_fd413dc7ef49c8f712c31c38bb6"`
    );
    await queryRunner.query(
      `ALTER TABLE "site" DROP CONSTRAINT "FK_ac8b84b6b775d7063b2d0710b17"`
    );
    await queryRunner.query(
      `ALTER TABLE "site_unit" DROP CONSTRAINT "FK_15d4516bd165a85cdb430f42fe5"`
    );
    await queryRunner.query(
      `ALTER TABLE "data_entry" DROP CONSTRAINT "FK_1f9c9c72c53f198ce695429ca65"`
    );
    await queryRunner.query(
      `ALTER TABLE "data_entry" DROP CONSTRAINT "FK_d64866364152e6ee9d17c81c121"`
    );
    await queryRunner.query(
      `ALTER TABLE "data_entry" DROP CONSTRAINT "FK_02cb81c59583c39596b030b6e4c"`
    );
    await queryRunner.query(
      `ALTER TABLE "emission_factor_value" DROP CONSTRAINT "FK_ed577b61ef5b35831f1ea38f50c"`
    );
    await queryRunner.query(
      `ALTER TABLE "emission_factor_value" DROP CONSTRAINT "FK_47bc5c64139d84df897bd72fda8"`
    );
    await queryRunner.query(
      `ALTER TABLE "emission_factor" DROP CONSTRAINT "FK_166a5d81776458506ae18d00ba0"`
    );
    await queryRunner.query(
      `ALTER TABLE "emission_factor" DROP CONSTRAINT "FK_9e9809e05926f78e3abf082c0b9"`
    );
    await queryRunner.query(
      `ALTER TABLE "physical_quantity" DROP CONSTRAINT "FK_52d90f9fff2f7e91258a676edfb"`
    );
    await queryRunner.query(
      `ALTER TABLE "measurement_unit" DROP CONSTRAINT "FK_966bd104ee989c6bb91770effef"`
    );
    await queryRunner.query(
      `ALTER TABLE "component" DROP CONSTRAINT "FK_74b7c65b491326f25974bdde284"`
    );
    await queryRunner.query(
      `ALTER TABLE "calculation_result" DROP CONSTRAINT "FK_f55fe7d1463a23c3d0c4529552d"`
    );
    await queryRunner.query(
      `ALTER TABLE "kpi" DROP CONSTRAINT "FK_b6a3473dcb95917b9ffe612b59f"`
    );
    await queryRunner.query(
      `ALTER TABLE "kpi_value" DROP CONSTRAINT "FK_2430479ddf67812d5858d004b2a"`
    );
    await queryRunner.query(`DROP INDEX "IDX_a02d820429038dce37d18f74b6"`);
    await queryRunner.query(`DROP INDEX "IDX_e1e28e472b43bbad7ff3cecdcd"`);
    await queryRunner.query(`DROP TABLE "organization_users_user"`);
    await queryRunner.query(`DROP INDEX "IDX_4698620c2fcf96fdbabb09f384"`);
    await queryRunner.query(`DROP INDEX "IDX_dc94447a3cabad70eb2c96f5e1"`);
    await queryRunner.query(`DROP TABLE "user_roles_user_role"`);
    await queryRunner.query(`DROP INDEX "IDX_925bcb2d587abf4a6dcbff1018"`);
    await queryRunner.query(`DROP INDEX "IDX_0acdf535f8712abd4fb604879b"`);
    await queryRunner.query(
      `DROP TABLE "emission_source_emission_factors_emission_factor"`
    );
    await queryRunner.query(`DROP INDEX "IDX_135017227cac6ada87833dd6ea"`);
    await queryRunner.query(`DROP INDEX "IDX_667ee16efb6c77fb16401f41c7"`);
    await queryRunner.query(
      `DROP TABLE "component_emission_sources_emission_source"`
    );
    await queryRunner.query(`DROP TABLE "business_field"`);
    await queryRunner.query(`DROP TABLE "organization"`);
    await queryRunner.query(`DROP TABLE "site_type"`);
    await queryRunner.query(`DROP TABLE "site"`);
    await queryRunner.query(`DROP TABLE "site_unit"`);
    await queryRunner.query(`DROP TABLE "data_entry"`);
    await queryRunner.query(`DROP TYPE "data_entry_category_enum"`);
    await queryRunner.query(`DROP TYPE "data_entry_emissionsource_enum"`);
    await queryRunner.query(`DROP TYPE "data_entry_measurementunit_enum"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TYPE "user_role_name_enum"`);
    await queryRunner.query(`DROP TABLE "emission_factor_value"`);
    await queryRunner.query(`DROP TABLE "emission_factor"`);
    await queryRunner.query(`DROP TYPE "emission_factor_datasourcetype_enum"`);
    await queryRunner.query(`DROP TABLE "physical_quantity"`);
    await queryRunner.query(`DROP TABLE "measurement_unit"`);
    await queryRunner.query(`DROP TABLE "emission_source"`);
    await queryRunner.query(`DROP TYPE "emission_source_scope_enum"`);
    await queryRunner.query(`DROP TABLE "component"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "calculation_result"`);
    await queryRunner.query(`DROP TYPE "calculation_result_category_enum"`);
    await queryRunner.query(
      `DROP TYPE "calculation_result_emissionsource_enum"`
    );
    await queryRunner.query(
      `DROP TYPE "calculation_result_measurementunit_enum"`
    );
    await queryRunner.query(`DROP TABLE "municipality"`);
    await queryRunner.query(`DROP TABLE "kpi"`);
    await queryRunner.query(`DROP TABLE "kpi_value"`);
  }
}
