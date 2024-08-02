import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import AppError from "../error/AppError";
import prisma from "../database/database";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";
import httpStatusCodes from "http-status-codes";
interface CreateRequest extends Request {
  body: {
    name: string;
  };
}

const logger = loggerWithNameSpace("CategoryLogger");

export const createCategory = CatchAsync(
  async (req: CreateRequest, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const { templateId } = req.params;

    if (!name) {
      return next(new BadRequestError("Name is required"));
    }

    const category = await prisma.category.create({
      data: { name, templateId: Number(templateId) },
    });

    logger.info(`Category created with name: ${name}`);
    res.status(httpStatusCodes.CREATED).json({
      status: 201,
      message: "Category created successfully",
      data: category,
    });
  }
);
