import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { NextFunction, Request, Response } from "express";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import cors from "cors";

const requestLogger = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  console.log("Method", request.method);
  console.log("Path: ", request.path);
  console.log("Body: ", request.body);
  console.log("----");
  next();
};

const main = async () => {
  await createConnection();
  // await conn.runMigrations();
  const app = express();
  app.use(express.json());

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL, {
    password: process.env.REDIS_PW,
  });

  app.set("trust proxy", 1);
  console.log("cors origin", process.env.CORS_ORIGIN);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(requestLogger);

  app.use(
    session({
      name: process.env.COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 2,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
