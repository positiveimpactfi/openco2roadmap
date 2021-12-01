import typeormConfig from "./ormconfig";
import { createConnection } from "typeorm";

const dropDb = async () => {
  const conn = await createConnection({
    ...typeormConfig,
    // host: "localhost",
  });
  await conn.dropDatabase();
};

dropDb();
