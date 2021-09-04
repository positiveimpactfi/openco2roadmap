import { Connection } from "typeorm";
import { Organization } from "../entity/Organization";
import { User } from "../entity/User";
import { UserRole } from "../entity/UserRole";
import config from "../config";
import argon2 from "argon2";
import { BusinessField } from "../entity/BusinessField";
import { Municipality } from "../entity/Municipality";

export const seedAdminOrgAndUser = async (conn: Connection) => {
  const businessField = await BusinessField.findOne(15);
  const municipality = await Municipality.findOne({
    where: { name: "Helsinki" },
  });

  const adminOrg = await conn.manager.save(Organization, {
    name: "Admin org",
    businessID: "XXXXXX-X",
    businessField: businessField,
    municipality: municipality,
  });
  const role = await conn.manager.save(UserRole, {
    name: "SUPERADMIN",
    organizationID: adminOrg.id,
  });
  const adminUser = await conn.manager.save(User, {
    email: config.SUPERADMIN_EMAIL,
    password: await argon2.hash(config.SUPERADMIN_PW),
    roles: [role],
    firstName: "Super",
    lastName: "Admin",
    organizations: [adminOrg],
  });
  adminOrg.users = [adminUser];
  const savedAdminOrg = await conn.manager.save(Organization, adminOrg);
  console.log("new admin organization created", savedAdminOrg);
};
