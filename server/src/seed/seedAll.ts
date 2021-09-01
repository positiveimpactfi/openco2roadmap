import { createConnection } from "typeorm";
import typeormConfig from "../ormconfig";
import { seedAdminOrgAndUser } from "./seedAdmin";
import { seedBusinessFields } from "./seedBusinessFields";
import { seedCategories } from "./seedCategories";
import { seedComponents } from "./seedComponents";
import { seedUnits } from "./seedUnits";

const seedAll = async () => {
  const conn = await createConnection({
    ...typeormConfig,
    host: "localhost",
  });
  await seedBusinessFields(conn);
  await seedAdminOrgAndUser(conn);
  await seedCategories(conn);
  await seedComponents(conn);
  await seedUnits(conn);
};

seedAll();
