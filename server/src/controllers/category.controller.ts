import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import AppError from "../errors/AppError";
import prisma from "../database/database";

interface CreateRequest extends Request {
  body: {
    name: string;
  };
}

export const createCategory = CatchAsync(
  async (req: CreateRequest, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const { templateId } = req.params;

    if (!name) {
      return next(new AppError("Name is required", 400));
    }

    const category = await prisma.category.create({
      data: { name, templateId: Number(templateId) },
    });

    console.log(category);
    res.status(201).json({
      status: 201,
      message: "Category created successfully",
      data: category,
    });
  }
);
