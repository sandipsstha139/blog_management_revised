import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import AppError from "../error/AppError";
import prisma from "../database/database";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";
import httpStatusCodes from "http-status-codes";
import { NotFoundError } from "../error/NotFoundError";
import { Blog } from "@prisma/client";

interface CreateRequest extends Request {
  body: {
    name: string;
    templateId: number;
    Blog: Blog;
  };
}

const logger = loggerWithNameSpace("CategoryLogger");

export const createCategory = CatchAsync(
  async (req: CreateRequest, res: Response, next: NextFunction) => {
    const { name, templateId } = req.body;

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

export const getCategories = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { templateId } = req.query;
    const whereClause = templateId ? { templateId: Number(templateId) } : {};
    const categories = await prisma.category.findMany({
      where: whereClause,
      include: {
        Blog: true,
      },
    });

    res.status(httpStatusCodes.OK).json({
      status: 200,
      length: categories.length,
      message: "Categories fetched successfully",
      data: categories,
    });
  }
);

export const getCategory = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;

    const category = await prisma.category.findUnique({
      where: {
        id: Number(categoryId),
      },
      include: {
        Blog: true,
      },
    });

    if (!category) {
      return next(new NotFoundError("Category not found"));
    }

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Category fetched successfully",
      data: category,
    });
  }
);

export const updateCategory = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    if (!name) {
      return next(new BadRequestError("Name is required"));
    }

    const category = await prisma.category.update({
      where: { id: Number(categoryId) },
      data: { name },
    });

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Category updated successfully",
      data: category,
    });
  }
);

export const deleteCategory = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;

    const category = await prisma.category.delete({
      where: { id: Number(categoryId) },
    });

    if (!category) {
      return next(new NotFoundError("Category not found"));
    }

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Category deleted successfully",
      data: category,
    });
  }
);
