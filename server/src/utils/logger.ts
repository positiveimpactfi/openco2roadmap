import childProcess from "child_process";
import stream from "stream";
import pino from "pino";
import pinoHttp from "pino-http";

const cwd = process.cwd();
const { env } = process;
const logThrough = new stream.PassThrough();
const logsPath = `${cwd}/logs`;

const child = childProcess.spawn(
  process.execPath,
  [
    require.resolve("pino-tee"),
    "info",
    `${logsPath}/info.log`,
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
const pinoStreams = [
  logThrough,
  { level: "info" as pino.Level, stream: process.stdout },
];

export const pinoInstance = pinoHttp(
  { name: "openco2roadmap" },
  pino.multistream(pinoStreams)
);
