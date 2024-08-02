import { Request, Response, NextFunction } from "express";

export const CatchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error: any) => next(error));
  };
};
