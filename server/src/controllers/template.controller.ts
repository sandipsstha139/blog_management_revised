import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import AppError from "../errors/AppError";
import prisma from "../database/database";

interface CreateRequest extends Request {
  body: {
    name: string;
  };
}

export const createTemplate = CatchAsync(
  async (req: CreateRequest, res: Response, next: NextFunction) => {
    const { name } = req.body;

    if (!name) {
      return next(new AppError("Name is required", 400));
    }

    const template = await prisma.template.create({
      data: { name },
    });

    res.status(201).json({
      status: 201,
      message: "Template created successfully",
      data: template,
    });
  }
);
