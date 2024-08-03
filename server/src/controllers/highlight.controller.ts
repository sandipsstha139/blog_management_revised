import { Request, Response, NextFunction } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/BadRequestError";
import prisma from "../database/database";
import httpStatusCodes from "http-status-codes";
import { NotFoundError } from "../error/NotFoundError";
interface HighlightRequest extends Request {
  body: {
    id: number;
    title: string;
    description: string;
    blogId: number;
  };
}

const logger = loggerWithNameSpace("HighlightLogger");

export const createHighlight = CatchAsync(
  async (req: HighlightRequest, res: Response, next: NextFunction) => {
    const { title, description, blogId } = req.body;

    if (!title || !description || !blogId) {
      return next(
        new BadRequestError("Title, description and blogId are required")
      );
    }

    const highlight = await prisma.highlight.create({
      data: { title, description, blogId },
    });
    logger.info("Highlight created successfully");

    res.status(httpStatusCodes.CREATED).json({
      status: 201,
      message: "Highlight created successfully",
      data: highlight,
    });
  }
);

export const getHighlight = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { highlightId } = req.params;

    const highlight = await prisma.highlight.findUnique({
      where: { id: Number(highlightId) },
    });

    if (!highlight) {
      return next(new BadRequestError("Highlight not found"));
    }

    logger.info(`Highlight found with id: ${highlightId}`);

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Highlight found successfully",
      data: highlight,
    });
  }
);

export const getAllHighlights = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const highlights = await prisma.highlight.findMany();

    logger.info("Highlights found successfully");
    res.status(httpStatusCodes.OK).json({
      status: 200,
      result: highlights.length,
      message: "Highlights found successfully",
      data: highlights,
    });
  }
);

export const updateHighlight = CatchAsync(
  async (req: HighlightRequest, res: Response, next: NextFunction) => {
    const { highlightId } = req.params;

    let highlight = await prisma.highlight.findUnique({
      where: { id: Number(highlightId) },
    });

    if (!highlight) {
      return next(new NotFoundError("Highlight not found"));
    }

    highlight = await prisma.highlight.update({
      where: { id: Number(highlightId) },
      data: { ...req.body },
    });

    logger.info(`Highlight updated with id: ${highlightId}`);
    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Highlight updated successfully",
      data: highlight,
    });
  }
);

export const deleteHighlight = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { highlightId } = req.params;

    const highlight = await prisma.highlight.delete({
      where: { id: Number(highlightId) },
    });

    logger.info(`Highlight deleted with id: ${highlightId}`);

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Highlight deleted successfully",
    });
  }
);
