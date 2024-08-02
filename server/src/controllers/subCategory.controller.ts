import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import AppError from "../errors/AppError";
import prisma from "../database/database";

interface CreateRequest extends Request {
  body: {
    name: string;
  };
}

export const createSubCategory = CatchAsync(
  async (req: CreateRequest, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const { categoryId } = req.params;

    if (!name) {
      return next(new AppError("Name is required", 400));
    }

    const subCategory = await prisma.subCategory.create({
      data: { name, categoryId: Number(categoryId) },
    });

    res.status(201).json({
      status: 201,
      message: "Sub Category created successfully",
      data: subCategory,
    });
  }
);
