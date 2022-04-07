import { MigrationInterface, QueryRunner } from "typeorm";

export class EmissionSourceUpdates1649318542385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query(
      `
            INSERT INTO "public"."emission_source" ("id", "name", "scope")
            VALUES (76, 'Maalämpö', 'Scope 2');
        INSERT INTO "public"."emission_source" ("id", "name", "scope")
            VALUES (77, 'Pakkausjätteet', 'Scope 3');
        INSERT INTO "public"."emission_source" ("id", "name", "scope")
            VALUES (78, 'Muut jätejakeet', 'Scope 3');
        INSERT INTO "public"."emission_source" ("id", "name", "scope")
            VALUES (79, 'Polttoaineet', 'Scope 3');
        INSERT INTO "public"."emission_source" ("id", "name", "scope")
            VALUES (80, 'Kylmäaineet', 'Scope 1');
        INSERT INTO "public"."component_emission_sources_emission_source" ("componentId", "emissionSourceId")
            VALUES (2, 4), (2, 76), (1, 4), (1, 80);
        UPDATE
            "public"."component"
        SET
            "name" = 'Yleiset hankinnat EUR'
        WHERE
            "id" = 10;
        UPDATE
            "public"."emission_source"
        SET
            "name" = 'Joukkoliikenne'
        WHERE
            "id" = 67;
        UPDATE
            "public"."emission_source"
        SET
            "name" = 'Energiajae'
        WHERE
            "id" = 6;
        INSERT INTO "public"."component_emission_sources_emission_source" ("componentId", "emissionSourceId")
            VALUES (8, 79);
        INSERT INTO "public"."component_emission_sources_emission_source" ("componentId", "emissionSourceId")
            VALUES (5, 79);
        INSERT INTO "public"."component_emission_sources_emission_source" ("componentId", "emissionSourceId")
            VALUES (6, 79);
        INSERT INTO "public"."component_emission_sources_emission_source" ("componentId", "emissionSourceId")
            VALUES (7, 79);
        DELETE FROM "public"."component_emission_sources_emission_source"
        WHERE "componentId" = 4
            AND "emissionSourceId" = 7
            OR "componentId" = 4
            AND "emissionSourceId" = 8
            OR "componentId" = 4
            AND "emissionSourceId" = 9
            OR "componentId" = 4
            AND "emissionSourceId" = 10
            OR "componentId" = 4
            AND "emissionSourceId" = 11
            OR "componentId" = 4
            AND "emissionSourceId" = 13;
        INSERT INTO "public"."component_emission_sources_emission_source" ("componentId", "emissionSourceId")
            VALUES (4, 77);
        INSERT INTO "public"."component_emission_sources_emission_source" ("componentId", "emissionSourceId")
            VALUES (4, 78);
        DELETE FROM "public"."emission_source_emission_factors_emission_factor"
        WHERE "emissionSourceId" IN (7, 8, 9, 10, 11, 13)
            AND "emissionFactorId" = '4913f7f6-5786-4397-9319-bc11cb0edf06';
        UPDATE
            "public"."emission_source_emission_factors_emission_factor"
        SET
            "emissionSourceId" = 77
        WHERE
            "emissionSourceId" IN (7, 8, 9, 10);
        UPDATE
            "public"."emission_source_emission_factors_emission_factor"
        SET
            "emissionSourceId" = 78
        WHERE
            "emissionSourceId" IN (11, 13);
        INSERT INTO "public"."emission_source_emission_factors_emission_factor" ("emissionSourceId", "emissionFactorId")
            VALUES (77, '4913f7f6-5786-4397-9319-bc11cb0edf06'), (78, '4913f7f6-5786-4397-9319-bc11cb0edf06');
        DELETE FROM "public"."emission_source"
        WHERE "id" = 7
            OR "id" = 8
            OR "id" = 9
            OR "id" = 10
            OR "id" = 11
            OR "id" = 13;
            `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.connection.close();
  }
}
