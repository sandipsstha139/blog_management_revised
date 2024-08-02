import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";
import prisma from "../database/database";
import { User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { CatchAsync } from "../utils/CatchAsync";

interface CustomRequest extends Request {
  user?: User;
}

const protect = CatchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token: string =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return next(new AppError("Unauthorized request", 401));
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as { id: number };

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    req.user = user;
    next();
  }
);

export default protect;
