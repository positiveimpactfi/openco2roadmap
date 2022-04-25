import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import config from "./config";
import typeormConfig from "./ormconfig";
import { resolvers } from "./resolvers";
import { authChecker } from "./utils/authChecker";
import { announcements, fetchAnnoucements } from "./notifications";

import pinoHttp from "pino-http";
import childProcess from "child_process";
import stream from "stream";

const cwd = process.cwd();
const { env } = process;
const logThrough = new stream.PassThrough();
const logsPath = `${cwd}/logs`;

const child = childProcess.spawn(
  process.execPath,
  [
    require.resolve("pino-tee"),
    "warn",
    `${logsPath}/warn.log`,
    "error",
    `${logsPath}/error.log`,
    "fatal",
    `${logsPath}/fatal.log`,
    "debug",
    `${logsPath}/debug.log`,
  ],
  { cwd, env }
);

logThrough.pipe(child.stdin);

const main = async () => {
  await createConnection(typeormConfig);
  const app = express();
  const transport = {
    name: "openco2roadmap",
    target: "pino-pretty",
    options: {
      colorize: true,
      messageFormat: "[Request: {req.id}] {msg}",
      ignore:
        "pid,hostname,req.method,req.url,req.remoteAddress,req.remotePort,req.headers.host,req.headers.apollo-query-plan-experimental,req.headers.x-apollo-tracing,req.headers.sec-gpc,req.headers.sec-fetch-site,req.headers.sec-fetch-mode,req.headers.sec-fetch-dest,req.headers.connection,req.headers.accept,req.headers.accept-encoding,req.headers.accept-language,res.headers.x-powered-by,res.headers.access-control-allow-origin,res.headers.access-control-allow-credentials,res.headers.vary",
    },
  };

  const myPino = pinoHttp(
    {
      name: "openco2roadmap",
      transport: config.ENV === "production" ? undefined : transport,
    },
    logThrough
  );
  app.use(myPino);

  myPino.logger.info({}, "logging started");
  app.use(express.json());

  const RedisStore = connectRedis(session);
  const redis = new Redis({
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    password: config.REDIS_PW,
  });

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: config.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.get("/notifications", (_req, res) => {
    res.json(announcements);
  });

  app.get("/refreshNotifications", async (req, res) => {
    const passPhrase = req.query?.pass;
    if (passPhrase && passPhrase === config.NOTIFICATIONS_REFRESH_PASS) {
      await fetchAnnoucements();
      return res.status(200).send("ok");
    }
    return res.status(403).send("forbidden: wrong passphrase");
  });

  app.use(
    session({
      name: config.COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 2,
        httpOnly: true,
        sameSite: "lax",
        secure: config.ENV === "production",
      },
      saveUninitialized: false,
      secret: config.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: resolvers,
      validate: false,
      authChecker: authChecker,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        settings: { "request.credentials": "include" },
      }),
      // {
      //   requestDidStart(ctx) {
      //     ctx.logger = pino.child({ requestId: v4() });
      //     ctx.logger.info({
      //       operationName: ctx.request.operationName,
      //       query: ctx.request.query,
      //       variables: ctx.request.variables,
      //     });

      //     return {
      //       didEncounterErrors({ logger, errors }) {
      //         errors.forEach((error) => logger.warn(error));
      //       },
      //     };
      //   },
      // },
    ],
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(config.PORT, () => {
    console.log(`🚀 Server started at http://localhost:${config.PORT}/graphql`);
  });
};

main().catch((err) => {
  console.error(err);
});
