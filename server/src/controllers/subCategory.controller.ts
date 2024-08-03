import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import prisma from "../database/database";
import { BadRequestError } from "../error/BadRequestError";

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
      return next(new BadRequestError("Name is required"));
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
