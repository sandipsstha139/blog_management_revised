import { NextFunction } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import prisma from "../database/database";
import { Readable } from "stream";

import { Request, Response } from "express";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import httpStatusCodes from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";

interface CreateRequest extends Request {
  body: {
    title: string;
    description: string;
    highlightId: number;
    highlightSectionImage: Readable;
    highlightSectionImageAltText: string;
    highlightSectionImageDescription: string;
    highlightSectionImageCaption: string;
  };
}

const logger = loggerWithNameSpace("HighlightSectionLogger");

export const createHighlightSection = CatchAsync(
  async (req: CreateRequest, res: Response, next: NextFunction) => {
    const {
      title,
      description,
      highlightId,
      highlightSectionImageAltText,
      highlightSectionImageDescription,
      highlightSectionImageCaption,
    } = req.body;
    console.log(req.body);

    console.log(req.body);
    if (
      !title ||
      !description ||
      !highlightId ||
      !highlightSectionImageAltText ||
      !highlightSectionImageDescription ||
      !highlightSectionImageCaption
    ) {
      return next(
        new BadRequestError(
          "Title, description, highlightId, highlight section image alt text, highlight section image description and highlight section image caption are required"
        )
      );
    }

    const highlightSectionImage = req.file;

    if (!highlightSectionImage) {
      return next(new BadRequestError("Highlight Section image is required"));
    }

    const highlightSectionImageUrl = `${req.protocol}://${req.get(
      "host"
    )}/public/${highlightSectionImage.filename}`;

    logger.info("Highlight Section created successfully", {
      title,
      description,
      highlightId,
      highlightSectionImageAltText,
      highlightSectionImageDescription,
      highlightSectionImageCaption,
    });

    const highlightSection = await prisma.highlightSections.create({
      data: {
        title,
        description,
        highlightId: Number(highlightId),
        highlightSectionImage: highlightSectionImageUrl,
        highlightSectionImageAltText,
        highlightSectionImageDescription,
        highlightSectionImageCaption,
      },
    });

    logger.info("Highlight Section created successfully");
    res.status(httpStatusCodes.CREATED).json({
      status: 201,
      message: "Highlight Section created successfully",
      data: highlightSection,
    });
  }
);

export const getHighlightSection = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { highlightSectionId } = req.params;

    const highlightSection = await prisma.highlightSections.findUnique({
      where: {
        id: Number(highlightSectionId),
      },
    });

    if (!highlightSection) {
      return next(new NotFoundError("Highlight Section not found"));
    }

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Highlight Section fetched successfully",
      data: highlightSection,
    });
  }
);

export const getAllHighlightSections = CatchAsync(
  async (req: Request, res: Response) => {
    const highlightSections = await prisma.highlightSections.findMany();

    logger.info("Highlight Sections fetched successfully");

    res.status(httpStatusCodes.OK).json({
      status: 200,
      results: highlightSections.length,
      message: "highlight Sections fetched successfully",
      data: highlightSections,
    });
  }
);

export const updateHighlightSection = CatchAsync(
  async (req: CreateRequest, res: Response, next: NextFunction) => {
    const { highlightSectionId } = req.params;

    let highlightSection = await prisma.highlightSections.findUnique({
      where: { id: Number(highlightSectionId) },
    });

    if (!highlightSection) {
      return next(new NotFoundError("Highlight Section not found"));
    }

    let highlightSectionImageUrl = highlightSection.highlightSectionImage;

    if (req.file) {
      highlightSectionImageUrl = `${req.protocol}://${req.get("host")}/public/${
        req.file.filename
      }`;
    }

    highlightSection = await prisma.highlightSections.update({
      where: { id: Number(highlightSectionId) },
      data: {
        ...req.body,
        highlightId: Number(req.body.highlightId),
        highlightSectionImage: highlightSectionImageUrl,
      },
    });

    logger.info(`Highlight Section updated with id: ${highlightSectionId}`);

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Highlight Section updated successfully",
      data: highlightSection,
    });
  }
);

export const deleteHighlightSection = CatchAsync(
  async (req: Request, res: Response) => {
    const { highlightSectionId } = req.params;

    const section = await prisma.sections.delete({
      where: { id: Number(highlightSectionId) },
    });

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Highlight Section deleted successfully",
    });
  }
);
