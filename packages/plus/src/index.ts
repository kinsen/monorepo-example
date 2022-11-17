import Redis from "ioredis";

function plus(a: number, b: number): number{
  return a + b;
}

var redis = new Redis({
  host: '127.0.0.1',
  port: 6379
});

export { plus };

export { logger } from "./logger";

export { DelayTasks } from "./task"
