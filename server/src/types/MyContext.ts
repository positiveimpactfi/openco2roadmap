import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import type { HttpLogger } from "pino-http";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: string };
    log: HttpLogger;
  };
  res: Response;
  redis: Redis;
};
