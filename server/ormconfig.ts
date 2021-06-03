import { ConnectionOptions } from "typeorm";

const connection: ConnectionOptions = {
  type: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PW,
  database: process.env.PG_DB,
  synchronize: true,
  logging: process.env.NODE_ENV !== "production",
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

export = connection;
