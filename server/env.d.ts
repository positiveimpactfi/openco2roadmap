declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    PG_HOST: string;
    PG_PORT: string;
    PG_USERNAME: string;
    PG_DB: string;
    PG_PW: string;
    REDIS_PW: string;
    REDIS_URL: string;
    SESSION_SECRET: string;
    COOKIE_NAME: string;
    CORS_ORIGIN: string;
    SENDGRID_API_KEY: string;
    SENDGRID_EMAIL: string;
    SUPERADMIN_EMAIL: string;
    SUPERADMIN_PW: string;
    NOTIFICATIONS_URI: string;
    NOTIFICATIONS_REFRESH_PASS: string;
  }
}
