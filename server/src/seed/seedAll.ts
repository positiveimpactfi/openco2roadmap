import { createConnection } from "typeorm";
import typeormConfig from "../ormconfig";
import { seedAdminOrgAndUser } from "./seedAdmin";
import { seedBusinessFields } from "./seedBusinessFields";
import { seedCategories } from "./seedCategories";
import { seedComponents } from "./seedComponents";
import { seedUnits } from "./seedUnits";
import { seedMunicipalities } from "./seedMunicipalities";
import { seedEmissionSources } from "./seedEmissionSources";
import { seedEmissionFactors } from "./seedEmissionFactors";
import { seedIndustries } from "./seedIndustries";

const seedAll = async () => {
  const conn = await createConnection({
    ...typeormConfig,
  });
  await seedBusinessFields(conn);
  await seedMunicipalities(conn);
  await seedAdminOrgAndUser(conn);
  await seedCategories(conn);
  await seedComponents(conn);
  await seedEmissionSources(conn);
  await seedUnits(conn);
  await seedEmissionFactors(conn);
  await seedIndustries(conn);
};

seedAll();
