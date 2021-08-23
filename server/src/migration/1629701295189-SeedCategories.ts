import { MigrationInterface, QueryRunner } from "typeorm";
import { Category } from "../entity/Category";
import { emissionCategories } from "../seed/categories";

export class SeedCategories1629701295189 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const res = await queryRunner.manager.save(Category, emissionCategories);
    console.log("seeded categories", res);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Category, {});
  }
}
