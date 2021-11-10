import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import config from "./config";

export default {
  type: "postgres",
  host: process.env.NODE_ENV === "migration" ? "localhost" : config.PG_HOST,
  port: config.PG_PORT,
  username: config.PG_USERNAME,
  password: config.PG_PW,
  database: config.PG_DB,
  synchronize: false,
  logging: config.ENV !== "production",
  entities: [getFolder("entity")],
  migrations: [getFolder("migration")],
  subscribers: [getFolder("subsciber")],
  cli: {
    entitiesDir: `src/entity`,
    migrationsDir: `src/migration`,
    subscribersDir: `src/subscriber`,
  },
} as PostgresConnectionOptions;

function getFolder(item: string) {
  const directory =
    process.env.NODE_ENV === "migration" ? "src" : `${__dirname}`;
  return `${directory}/${item}/**/*{.ts,.js}`;
}
