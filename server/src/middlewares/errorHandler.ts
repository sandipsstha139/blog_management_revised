import httpStatusCodes from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { UnAuthenticatedError } from "../error/UnAuthenticatedError";
import { BadRequestError } from "../error/BadRequestError";
import { ForbiddenError } from "../error/ForbiddenError";
import { ConflictError } from "../error/ConflictError";
import { NotFoundError } from "../error/NotFoundError";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Errorhandler");

export function globalErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.stack) {
    logger.error(error.stack);
  }

  if (error instanceof UnAuthenticatedError) {
    return res.status(httpStatusCodes.UNAUTHORIZED).json({
      message: error.message,
    });
  } else if (error instanceof BadRequestError) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  } else if (error instanceof ForbiddenError) {
    return res.status(httpStatusCodes.FORBIDDEN).json({
      message: error.message,
    });
  } else if (error instanceof ConflictError) {
    return res.status(httpStatusCodes.CONFLICT).json({
      message: error.message,
    });
  } else if (error instanceof NotFoundError) {
    return res.status(httpStatusCodes.NOT_FOUND).json({
      message: error.message,
    });
  }

  return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
  });
}
