import "dotenv/config";

export default {
  ENV: process.env.NODE_ENV as string,
  PORT: parseInt(process.env.PORT as string),
  PG_HOST: process.env.PG_HOST as string,
  PG_PORT: parseInt(process.env.PG_PORT as string),
  PG_USERNAME: process.env.PG_USERNAME as string,
  PG_DB: process.env.PG_DB as string,
  PG_PW: process.env.PG_PW as string,
  REDIS_PW: process.env.REDIS_PW as string,
  REDIS_HOST: process.env.REDIS_HOST as string,
  REDIS_PORT: parseInt(process.env.REDIS_PORT as string),
  SESSION_SECRET: process.env.SESSION_SECRET as string,
  COOKIE_NAME: process.env.COOKIE_NAME as string,
  CORS_ORIGIN: process.env.CORS_ORIGIN as string,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY as string,
  SENDGRID_EMAIL: process.env.SENDGRID_EMAIL as string,
  SUPERADMIN_EMAIL: process.env.SUPERADMIN_EMAIL as string,
  SUPERADMIN_PW: process.env.SUPERADMIN_PW as string,
};
