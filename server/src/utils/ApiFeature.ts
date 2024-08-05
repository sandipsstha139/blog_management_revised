import { Request, Response, NextFunction } from "express";
import httpStatusCodes from "http-status-codes";
import prisma from "../database/database";

const filterBlogBySubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { subCategoryId } = req.params;

  const blogs = await prisma.blog.findMany({
    where: {
      subCategoryId: Number(subCategoryId),
    },
    include: {
      Sections: true,
      Highlight: {
        include: {
          HighlightSections: true,
        },
      },
    },
  });

  res.status(httpStatusCodes.OK).json({
    status: 200,
    results: blogs.length,
    message: "Blogs fetched successfully",
    data: {
      blogs: blogs.map((blog) => ({
        ...blog,
        blogImage: `${req.protocol}://${req.get("host")}/public/${
          blog.blogImage
        }`,
      })),
    },
  });
};
