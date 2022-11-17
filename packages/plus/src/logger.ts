import { Logger } from "tslog";
import { createStream } from "rotating-file-stream";

const stream = createStream("logs/log.log", {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
});

const logger = new Logger();
logger.attachTransport((logObj:any):void => {
  stream.write(JSON.stringify(logObj) + "\n");
});

export { logger };