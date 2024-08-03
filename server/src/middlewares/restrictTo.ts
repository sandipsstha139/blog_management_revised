import { Request, Response, NextFunction } from "express";
import { Role } from "../types/roles";
import { ForbiddenError } from "../error/ForbiddenError";

export const restrictTo = (...roles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.roles)) {
      return next(
        new ForbiddenError("You do not have permission to perform this action")
      );
    }
    next();
  };
};
