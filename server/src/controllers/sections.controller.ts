import { NextFunction } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import prisma from "../database/database";
import { Readable } from "stream";

import { Request, Response } from "express";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";

interface CreateRequest extends Request {
  body: {
    title: string;
    description: string;
    blogId: number;
    sectionImage: Readable;
    sectionImageAltText: string;
    sectionImageDescription: string;
    sectionImageCaption: string;
  };
}

export const createSection = CatchAsync(
  async (req: CreateRequest, res: Response, next: NextFunction) => {
    const {
      title,
      description,
      blogId,
      sectionImageAltText,
      sectionImageDescription,
      sectionImageCaption,
    } = req.body;

    // console.log(req.body);
    if (
      !title ||
      !description ||
      !blogId ||
      !sectionImageAltText ||
      !sectionImageDescription ||
      !sectionImageCaption
    ) {
      return next(
        new BadRequestError(
          "Title, description, blogId, section image alt text, section image description and section image caption are required"
        )
      );
    }

    const sectionImage = req.file;

    if (!sectionImage) {
      return next(new BadRequestError("Section image is required"));
    }

    const sectionImageUrl = `${req.protocol}://${req.get("host")}/public/${
      sectionImage.filename
    }`;

    const section = await prisma.sections.create({
      data: {
        title,
        description,
        blogId: Number(blogId),
        sectionImage: sectionImageUrl,
        sectionImageAltText,
        sectionImageDescription,
        sectionImageCaption,
      },
    });

    res.status(201).json({
      status: 201,
      message: "Section created successfully",
      data: section,
    });
  }
);

export const getSection = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { sectionId } = req.params;

    const section = await prisma.sections.findUnique({
      where: {
        id: Number(sectionId),
      },
    });

    if (!section) {
      return next(new NotFoundError("Section not found"));
    }

    res.status(200).json({
      status: 200,
      message: "Section fetched successfully",
      data: section,
    });
  }
);

export const getAllSections = CatchAsync(
  async (req: Request, res: Response) => {
    const sections = await prisma.sections.findMany();

    res.status(200).json({
      status: 200,
      results: sections.length,
      message: "Sections fetched successfully",
      data: sections,
    });
  }
);

export const updateSection = CatchAsync(
  async (req: CreateRequest, res: Response, next: NextFunction) => {
    const { sectionId } = req.params;

    let section = await prisma.sections.findUnique({
      where: { id: Number(sectionId) },
    });

    if (!section) {
      return next(new NotFoundError("Section not found"));
    }

    let sectionImageUrl = section.sectionImage;

    if (req.file) {
      sectionImageUrl = `${req.protocol}://${req.get("host")}/public/${
        req.file.filename
      }`;
    }

    section = await prisma.sections.update({
      where: { id: Number(sectionId) },
      data: {
        ...req.body,
        blogId: Number(req.body.blogId),
        sectionImage: sectionImageUrl,
      },
    });

    res.status(200).json({
      status: 200,
      message: "Section updated successfully",
      data: section,
    });
  }
);

export const deleteSection = CatchAsync(async (req: Request, res: Response) => {
  const { sectionId } = req.params;

  const section = await prisma.sections.delete({
    where: { id: Number(sectionId) },
  });

  res.status(200).json({
    status: 200,
    message: "Section deleted successfully",
  });
});
