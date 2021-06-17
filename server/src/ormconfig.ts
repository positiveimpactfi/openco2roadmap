import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import config from "./config";

export const typeormConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: config.PG_HOST,
  port: config.PG_PORT,
  username: config.PG_USERNAME,
  password: config.PG_PW,
  database: config.PG_DB,
  synchronize: true,
  logging: config.ENV !== "production",
  entities: [`${__dirname}/entity/*.{ts,js}`],
  migrations: [`${__dirname}/migration/*.js`],
  subscribers: [`${__dirname}/subscriber/**/*.{ts,js}`],
  cli: {
    entitiesDir: `${__dirname}/entity`,
    migrationsDir: `${__dirname}/migration`,
    subscribersDir: `${__dirname}/subscriber`,
  },
};
