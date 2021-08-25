import { Connection, createConnection } from "typeorm";
import { seedComponents } from "./seedComponents";
import { seedAdminOrgAndUser } from "./seedAdmin";
import { seedBusinessFields } from "./seedBusinessFields";
import { seedCategories } from "./seedCategories";
import typeormConfig from "../ormconfig";

const seedAll = async () => {
  const conn: Connection = await createConnection({
    ...typeormConfig,
    host: "localhost",
  });
  await seedAdminOrgAndUser(conn);
  await seedBusinessFields(conn);
  await seedCategories(conn);
  await seedComponents(conn);
};

seedAll();
