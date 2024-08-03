import { NextFunction } from "express";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("RequestLoger");

export const RequestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`${req.method}:$${req.url}`);
  next();
};
