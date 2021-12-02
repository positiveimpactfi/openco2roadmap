import { MigrationInterface, QueryRunner } from "typeorm";

export class EmissionScopeEnum1638435771375 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table emission_source add column scope_enum character varying default 'Scope 3'::character varying not null`
    );
    await queryRunner.query(`update emission_source set scope_enum = scope`);
    await queryRunner.query(
      `create type "emission_source_scope_enum" as enum('Scope 1', 'Scope 2', 'Scope 3')`
    );
    await queryRunner.query(
      `alter table emission_source alter scope_enum drop default`
    ); // we need to drop the default to be able to cast to enum
    await queryRunner.query(`alter table emission_source
        alter column scope_enum type emission_source_scope_enum
         using scope_enum::emission_source_scope_enum`);
    await queryRunner.query(
      `alter table emission_source alter scope_enum set default 'Scope 3'`
    ); // set the default back
    await queryRunner.query(
      `alter table "emission_source" rename column "scope" TO "scope_old"`
    ); // keep the old column around in case of an error
    await queryRunner.query(
      `alter table "emission_source" rename column "scope_enum" TO "scope";`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table emission_source drop column scope`);
    await queryRunner.query(
      `alter table emission_source rename column "scope_old" to "scope"`
    );
    await queryRunner.query(`drop type emission_source_scope_enum`);
  }
}
