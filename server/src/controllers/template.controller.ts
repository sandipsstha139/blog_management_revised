import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import prisma from "../database/database";
import { BadRequestError } from "../error/BadRequestError";
import httpStatusCodes from "http-status-codes";
import { NotFoundError } from "../error/NotFoundError";
import { Blog, Category, SubCategory } from "@prisma/client";

interface CreateRequest extends Request {
  body: {
    name: string;
  };
}

export const createTemplate = CatchAsync(
  async (req: CreateRequest, res: Response, next: NextFunction) => {
    const { name } = req.body;

    if (!name) {
      return next(new BadRequestError("Name is required"));
    }

    const template = await prisma.template.create({
      data: { name },
    });

    res.status(httpStatusCodes.CREATED).json({
      status: 201,
      message: "Template created successfully",
      data: template,
    });
  }
);

export const getTemplates = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const templates = await prisma.template.findMany({
      include: {
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
        SubCategory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Templates fetched successfully",
      data: templates,
    });
  }
);

export const getTemplate = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { templateId } = req.params;

    const template = await prisma.template.findUnique({
      where: {
        id: Number(templateId),
      },
      include: {
        Blog: true,
      },
    });

    if (!template) {
      return next(new NotFoundError("Template not found"));
    }

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Template fetched successfully",
      data: template,
    });
  }
);

export const updateTemplate = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { templateId } = req.params;
    const { name } = req.body;

    const template = await prisma.template.update({
      where: { id: Number(templateId) },
      data: { name },
    });

    if (!template) {
      return next(new NotFoundError("Template not found"));
    }

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Template updated successfully",
      data: template,
    });
  }
);

export const deleteTemplate = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { templateId } = req.params;

    const template = await prisma.template.delete({
      where: { id: Number(templateId) },
    });

    if (!template) {
      return next(new NotFoundError("Template not found"));
    }

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Template deleted successfully",
    });
  }
);
