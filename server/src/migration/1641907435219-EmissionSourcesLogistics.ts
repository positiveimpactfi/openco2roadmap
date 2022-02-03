import { MigrationInterface, QueryRunner } from "typeorm";

export class EmissionSourcesLogistics1641907435219
  implements MigrationInterface
{
  name = "EmissionSourcesLogistics1641907435219";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "calculation_result_emissionsource_enum" RENAME TO "calculation_result_emissionsource_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "calculation_result_emissionsource_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75')`
    );
    await queryRunner.query(
      `ALTER TABLE "calculation_result" ALTER COLUMN "emissionSource" TYPE "calculation_result_emissionsource_enum" USING "emissionSource"::"text"::"calculation_result_emissionsource_enum"`
    );
    await queryRunner.query(
      `DROP TYPE "calculation_result_emissionsource_enum_old"`
    );
    await queryRunner.query(
      `ALTER TYPE "data_entry_emissionsource_enum" RENAME TO "data_entry_emissionsource_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "data_entry_emissionsource_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75')`
    );
    await queryRunner.query(
      `ALTER TABLE "data_entry" ALTER COLUMN "emissionSource" TYPE "data_entry_emissionsource_enum" USING "emissionSource"::"text"::"data_entry_emissionsource_enum"`
    );
    await queryRunner.query(`DROP TYPE "data_entry_emissionsource_enum_old"`);

    await queryRunner.query(`
        INSERT INTO "public"."emission_source"("id","name","scope")
        VALUES
        (66,E'Henkilöautot',E'Scope 3'),
        (67,E'Julkiset kulkuneuvot',E'Scope 3'),
        (68,E'Laivamatkat',E'Scope 3'),
        (69,E'Lentomatkat',E'Scope 3'),
        (70,E'Muut henkilökuljetukset',E'Scope 3'),
        (71,E'Laivakuljetukset',E'Scope 3'),
        (72,E'Lentokuljetukset',E'Scope 3'),
        (73,E'Muut kuljetukset',E'Scope 3'),
        (74,E'Raidekuljetukset',E'Scope 3'),
        (75,E'Tiekuljetukset',E'Scope 3');`); // add new more generic emission sources
    await queryRunner.query(`INSERT INTO public.component_emission_sources_emission_source ("componentId", "emissionSourceId") 
	VALUES
	(5,66),(6,66),(7,66),
	(5,67),(6,67),(7,67),
	(5,68),(6,68),(7,68),
	(5,69),(6,69),(7,69),
	(5,70),(6,70),(7,70),
	(8,71), (8,72), (8,73), (8,74), (8,75);`); // fix emission source - components link

    // fix emission source - emission factor link
    await queryRunner.query(
      `with rows as (                                             
        delete from emission_source_emission_factors_emission_factor 
          where "emissionSourceId" in (23,24,25,26,27)
          returning "emissionFactorId"
      )
      insert into emission_source_emission_factors_emission_factor ("emissionSourceId", "emissionFactorId") 
        select 66, "emissionFactorId"from rows
        on conflict do nothing;   `
    ); // change personal car emission sources to Henkilöautot

    await queryRunner.query(
      `with rows as (                                             
        delete from emission_source_emission_factors_emission_factor 
          where "emissionSourceId" in (18,19,20)
          returning "emissionFactorId"
      )
      insert into emission_source_emission_factors_emission_factor ("emissionSourceId", "emissionFactorId") 
        select 67, "emissionFactorId"from rows
        on conflict do nothing;`
    ); // change public transport to Julkiset kulkuneuvot

    await queryRunner.query(
      `with rows as (                                             
        delete from emission_source_emission_factors_emission_factor 
          where "emissionSourceId" in (22)
          returning "emissionFactorId"
      )
      insert into emission_source_emission_factors_emission_factor ("emissionSourceId", "emissionFactorId") 
        select 68, "emissionFactorId"from rows
        on conflict do nothing;     `
    ); // change Laivaliput to Laivamatkat

    await queryRunner.query(
      `with rows as (                                             
        delete from emission_source_emission_factors_emission_factor 
          where "emissionSourceId" in (21,28,29,30,31)
          returning "emissionFactorId"
      )
      insert into emission_source_emission_factors_emission_factor ("emissionSourceId", "emissionFactorId") 
        select 69, "emissionFactorId"from rows
        on conflict do nothing;       
        `
    ); // change flights to Lentomatkat

    await queryRunner.query(
      `with rows as (                                             
        delete from emission_source_emission_factors_emission_factor 
          where "emissionSourceId" in (14,15,16,17)
          returning "emissionFactorId"
      )
      insert into emission_source_emission_factors_emission_factor ("emissionSourceId", "emissionFactorId") 
        select 70, "emissionFactorId"from rows
        on conflict do nothing;`
    ); // change travel expenses to Muut henkilökuljetukset

    await queryRunner.query(
      `with rows as (                                             
        delete from emission_source_emission_factors_emission_factor 
          where "emissionSourceId" in (37)
          returning "emissionFactorId"
      )
      insert into emission_source_emission_factors_emission_factor ("emissionSourceId", "emissionFactorId") 
        select 71, "emissionFactorId"from rows
        on conflict do nothing;`
    ); // change Konttialus to Laivakuljetukset

    await queryRunner.query(
      `with rows as (                                             
        delete from emission_source_emission_factors_emission_factor 
          where "emissionSourceId" in (40,41,42)
          returning "emissionFactorId"
      )
      insert into emission_source_emission_factors_emission_factor ("emissionSourceId", "emissionFactorId") 
        select 72, "emissionFactorId"from rows
        on conflict do nothing;`
    ); // change plane deliveries to Lentokuljetukset

    await queryRunner.query(
      `with rows as (                                             
        delete from emission_source_emission_factors_emission_factor 
          where "emissionSourceId" in (43)
          returning "emissionFactorId"
      )
      insert into emission_source_emission_factors_emission_factor ("emissionSourceId", "emissionFactorId") 
        select 73, "emissionFactorId"from rows
        on conflict do nothing;`
    ); // change Muut kuljetuspalveluhankinnat to Muut kuljetukset

    await queryRunner.query(
      `with rows as (                                             
        delete from emission_source_emission_factors_emission_factor 
          where "emissionSourceId" in (38,39)
          returning "emissionFactorId"
      )
      insert into emission_source_emission_factors_emission_factor ("emissionSourceId", "emissionFactorId") 
        select 74, "emissionFactorId"from rows
        on conflict do nothing;`
    ); // change rail deliveries to Raidekuljetukset

    await queryRunner.query(
      `with rows as (                                             
        delete from emission_source_emission_factors_emission_factor 
          where "emissionSourceId" in (32,33,34,35,36)
          returning "emissionFactorId"
      )
      insert into emission_source_emission_factors_emission_factor ("emissionSourceId", "emissionFactorId") 
        select 75, "emissionFactorId"from rows
        on conflict do nothing;  `
    ); // change to road deliveries to Tiekuljetukset

    // fix data entries and calculation results referencing old emission sources
    await queryRunner.query(
      ` UPDATE data_entry SET "emissionSource" = '66' WHERE "emissionSource" IN ('23','24','25','26','27');
        UPDATE calculation_result SET "emissionSource" = '66' WHERE "emissionSource" IN ('23','24','25','26','27');
      `
    );

    await queryRunner.query(
      ` UPDATE data_entry SET "emissionSource" = '67' WHERE "emissionSource" IN ('18','19','20');
        UPDATE calculation_result SET "emissionSource" = '67' WHERE "emissionSource" IN ('18','19','20');
        `
    );

    await queryRunner.query(
      ` UPDATE data_entry SET "emissionSource" = '68' WHERE "emissionSource" = '22';
        UPDATE calculation_result SET "emissionSource" = '68' WHERE "emissionSource" = '22';
          `
    );

    await queryRunner.query(
      ` UPDATE data_entry SET "emissionSource" = '69' WHERE "emissionSource" IN ('21','28','29', '30', '31');
        UPDATE calculation_result SET "emissionSource" = '69' WHERE "emissionSource" IN ('21','28','29', '30', '31');
          `
    );

    await queryRunner.query(
      ` UPDATE data_entry SET "emissionSource" = '70' WHERE "emissionSource" IN ('14','15','16', '17');
        UPDATE calculation_result SET "emissionSource" = '70' WHERE "emissionSource" IN ('14','15','16', '17');
            `
    );

    await queryRunner.query(
      ` UPDATE data_entry SET "emissionSource" = '71' WHERE "emissionSource" = '37';
        UPDATE calculation_result SET "emissionSource" = '71' WHERE "emissionSource" = '37';
            `
    );

    await queryRunner.query(
      ` UPDATE data_entry SET "emissionSource" = '72' WHERE "emissionSource" IN ('40', '41', '42');
        UPDATE calculation_result SET "emissionSource" = '72' WHERE "emissionSource" IN ('40', '41', '42');
            `
    );

    await queryRunner.query(
      ` UPDATE data_entry SET "emissionSource" = '73' WHERE "emissionSource" = '43';
        UPDATE calculation_result SET "emissionSource" = '73' WHERE "emissionSource" = '43'
              `
    );

    await queryRunner.query(
      ` UPDATE data_entry SET "emissionSource" = '74' WHERE "emissionSource" IN ('38', '39');
        UPDATE calculation_result SET "emissionSource" = '74' WHERE "emissionSource" IN ('38', '39');
              `
    );

    await queryRunner.query(
      ` UPDATE data_entry SET "emissionSource" = '75' WHERE "emissionSource" IN ('32', '33', '34', '35', '36');
        UPDATE calculation_result SET "emissionSource" = '75' WHERE "emissionSource" IN ('32', '33', '34', '35', '36');
              `
    );
    await queryRunner.query(
      `DELETE FROM "public"."emission_source" WHERE "id" > 13 AND "id" < 45;`
    ); // delete old overly specific emission sources
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "data_entry_emissionsource_enum_old" AS ENUM('1', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '2', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '3', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '4', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '5', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '6', '60', '61', '62', '63', '64', '65', '7', '8', '9')`
    );
    await queryRunner.query(
      `ALTER TABLE "data_entry" ALTER COLUMN "emissionSource" TYPE "data_entry_emissionsource_enum_old" USING "emissionSource"::"text"::"data_entry_emissionsource_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "data_entry_emissionsource_enum"`);
    await queryRunner.query(
      `ALTER TYPE "data_entry_emissionsource_enum_old" RENAME TO "data_entry_emissionsource_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "calculation_result_emissionsource_enum_old" AS ENUM('1', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '2', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '3', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '4', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '5', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '6', '60', '61', '62', '63', '64', '65', '7', '8', '9')`
    );
    await queryRunner.query(
      `ALTER TABLE "calculation_result" ALTER COLUMN "emissionSource" TYPE "calculation_result_emissionsource_enum_old" USING "emissionSource"::"text"::"calculation_result_emissionsource_enum_old"`
    );
    await queryRunner.query(
      `DROP TYPE "calculation_result_emissionsource_enum"`
    );
    await queryRunner.query(
      `ALTER TYPE "calculation_result_emissionsource_enum_old" RENAME TO "calculation_result_emissionsource_enum"`
    );

    await queryRunner.query(
      `DELETE FROM "public"."emission_source" WHERE "id" > 65 AND "id" < 76;`
    ); // delete newly added emission sources
  }
}
