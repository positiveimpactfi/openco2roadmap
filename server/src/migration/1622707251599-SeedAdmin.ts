import { User } from "../entity/User";
import argon2 from "argon2";
import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedAdmin1622707251599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(User, {
      email: "admin@co2roadmap.com",
      password: await argon2.hash("admin"),
      role: "admin",
      firstName: "Admin",
      lastName: "System",
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(User, {
      email: "admin@co2roadmap.com",
    });
  }
}
