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
// import { requestLogger } from "./utils/requestLogger";
import { authChecker } from "./utils/authChecker";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const main = async () => {
  await createConnection(typeormConfig);
  // await conn.runMigrations();
  const app = express();
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

  // app.use(requestLogger);

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
