import { NextFunction } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import prisma from "../database/database";
import { Readable } from "stream";

import { Request, Response } from "express";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import httpStatusCodes from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import { deleteFile } from "../utils/multer";

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
    )}/public/${highlightSectionImage.filename.trim().replace(/\s/g, "")}`;

    logger.info("Highlight Section created successfully");

    const highlightSection = await prisma.highlightSections.create({
      data: {
        title,
        description,
        highlightId: Number(highlightId),
        highlightSectionImage: highlightSectionImage.filename,
        highlightSectionImageAltText,
        highlightSectionImageDescription,
        highlightSectionImageCaption,
      },
    });

    logger.info("Highlight Section created successfully");
    res.status(httpStatusCodes.CREATED).json({
      status: 201,
      message: "Highlight Section created successfully",
      data: {
        ...highlightSection,
        highlightSectionImage: highlightSectionImageUrl,
      },
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
      data: {
        ...highlightSection,
        highlightSectionImage: `${req.protocol}://${req.get("host")}/public/${
          highlightSection.highlightSectionImage
        }`,
      },
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
      data: {
        highlightSections: highlightSections.map((highlightSection) => ({
          ...highlightSection,
          highlightSectionImage: `${req.protocol}://${req.get("host")}/public/${
            highlightSection.highlightSectionImage
          }`,
        })),
      },
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

    let highlightSectionImage = highlightSection.highlightSectionImage;

    if (req.file) {
      deleteFile(`./public/uploads/${highlightSectionImage}`);
      highlightSectionImage = req.file.filename;
    }

    highlightSection = await prisma.highlightSections.update({
      where: { id: Number(highlightSectionId) },
      data: {
        ...req.body,
        highlightId: Number(req.body.highlightId),
        highlightSectionImage: highlightSectionImage,
      },
    });

    logger.info(`Highlight Section updated with id: ${highlightSectionId}`);

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Highlight Section updated successfully",
      data: {
        ...highlightSection,
        highlightSectionImage: `${req.protocol}://${req.get(
          "host"
        )}/public/${highlightSectionImage}`,
      },
    });
  }
);

export const deleteHighlightSection = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { highlightSectionId } = req.params;

    const section = await prisma.highlightSections.findUnique({
      where: { id: Number(highlightSectionId) },
    });
    if (!section) {
      return next(new NotFoundError("Highlight Section not found"));
    }

    await deleteFile(`./public/uploads/${section.highlightSectionImage}`);

    await prisma.highlightSections.delete({
      where: { id: Number(highlightSectionId) },
    });

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Highlight Section deleted successfully",
    });
  }
);
