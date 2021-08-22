import { User } from "../entity/User";
import { UserRole } from "../entity/UserRole";
import argon2 from "argon2";
import { MigrationInterface, QueryRunner } from "typeorm";
import config from "../config";
import { Organization } from "../entity/Organization";

export class SeedAdmin1622707251599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminOrg = await queryRunner.manager.save(Organization, {
      name: "Admin org",
      businessID: "XXXXXX-X",
    });
    const role = await queryRunner.manager.save(UserRole, {
      name: "SUPERADMIN",
      organizationId: adminOrg.id,
    });
    const adminUser = await queryRunner.manager.save(User, {
      email: config.SUPERADMIN_EMAIL,
      password: await argon2.hash(config.SUPERADMIN_PW),
      roles: [role],
      firstName: "Super",
      lastName: "Admin",
    });
    adminOrg.users = [adminUser];
    const savedAdminOrg = await queryRunner.manager.save(
      Organization,
      adminOrg
    );

    console.log("new admin organization created", savedAdminOrg);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(User, {
      email: config.SUPERADMIN_EMAIL,
    });
  }
}
