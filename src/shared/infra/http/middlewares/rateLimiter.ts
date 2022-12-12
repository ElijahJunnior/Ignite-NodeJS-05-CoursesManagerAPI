import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "redis";

import { AppError } from "@shared/errors/AppError";

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient, // Instancia do banco de dados
  keyPrefix: "raterLimiter",
  duration: 5, // intervalo para que a contagem de consumos seja zerada
  points: 5, // quantos consumos serão permitidos dentro do intervalo
});

export default async function rateLimiter(
  req: Request,
  res: Response,
  nxt: NextFunction
): Promise<void> {
  try {
    await limiter.consume(req.ip);

    return nxt();
  } catch (err) {
    throw new AppError("Too many requests", 429);
  }
}
