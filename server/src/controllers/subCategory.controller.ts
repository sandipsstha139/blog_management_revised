import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import prisma from "../database/database";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import httpStatusCodes from "http-status-codes";
import { Blog } from "@prisma/client";

interface CreateRequest extends Request {
  body: {
    name: string;
    categoryId: number;
  };
}

export const createSubCategory = CatchAsync(
  async (req: CreateRequest, res: Response, next: NextFunction) => {
    const { name, categoryId } = req.body;

    if (!name) {
      return next(new BadRequestError("Name is required"));
    }

    const subCategory = await prisma.subCategory.create({
      data: { name, categoryId: Number(categoryId) },
    });

    res.status(httpStatusCodes.CREATED).json({
      status: 201,
      message: "Sub Category created successfully",
      data: subCategory,
    });
  }
);

export const getSubCategories = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.query;
    const whereClause = categoryId ? { categoryId: Number(categoryId) } : {};

    const subCategories = await prisma.subCategory.findMany({
      where: whereClause,
      include: {
        Blog: true,
      },
    });

    if (subCategories.length === 0) {
      return next(new NotFoundError("No sub categories found"));
    }

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Sub Categories fetched successfully",
      data: subCategories,
    });
  }
);

export const getSubCategory = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { subCategoryId } = req.params;

    const subCategory = await prisma.subCategory.findUnique({
      where: {
        id: Number(subCategoryId),
      },
      include: {
        Blog: true,
      },
    });

    if (!subCategory) {
      return next(new NotFoundError("Sub Category not found"));
    }

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Sub Category fetched successfully",
      data: subCategory,
    });
  }
);

export const updateSubCategory = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { subCategoryId } = req.params;
    const { name } = req.body;

    if (!name) {
      return next(new BadRequestError("Name is required"));
    }

    const subCategory = await prisma.subCategory.update({
      where: { id: Number(subCategoryId) },
      data: { name },
    });

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Sub Category updated successfully",
      data: subCategory,
    });
  }
);

export const deleteSubCategory = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { subCategoryId } = req.params;

    const subCategory = await prisma.subCategory.delete({
      where: { id: Number(subCategoryId) },
    });

    if (!subCategory) {
      return next(new NotFoundError("Sub Category not found"));
    }

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Sub Category deleted successfully",
    });
  }
);
