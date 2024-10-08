import { NextFunction, Request, Response } from "express";
import { Readable } from "stream";
import { NotFoundError } from "../error/NotFoundError";
import prisma from "../database/database";
import { CatchAsync } from "../utils/CatchAsync";
import slugify from "slugify";
import { BadRequestError } from "../error/BadRequestError";
import httpStatusCodes from "http-status-codes";
import { deleteFile } from "../utils/multer";
import { ImageUrlGenerator } from "../utils/ImageUrlGenerator";
import { Sections } from "../interface/sections.interface";
import { Highlight } from "../interface/highlight.interface";
import { HighlightSections } from "../interface/highlightSections.interface";

enum Status {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

interface createBlogRequest extends Request {
  body: {
    canonicalTag: string;
    titleTag: string;
    metaTag: string;
    blogName: string;
    blogDescription: string;
    blogTitle: string;
    titleDescription: string;
    blogImageAltText: string;
    blogImageDescription: string;
    blogImageCaption: string;
    slug: string;
    status: Status;
    blogImage: Readable;
  };
}

export const createBlog = CatchAsync(
  async (req: createBlogRequest, res: Response) => {
    const {
      canonicalTag,
      titleTag,
      metaTag,
      blogName,
      blogDescription,
      blogTitle,
      titleDescription,
      blogImageAltText,
      blogImageDescription,
      blogImageCaption,
      slug,
      status,
    } = req.body;

    const { templateId, categoryId, subCategoryId } = req.params;
    let blogImageUrl;

    if (req.file) {
      blogImageUrl = ImageUrlGenerator(req, req.file?.filename);
    }

    const blog = await prisma.blog.create({
      data: {
        canonicalTag,
        titleTag,
        metaTag,
        blogName,
        blogDescription,
        blogTitle,
        titleDescription,
        blogImageAltText,
        blogImageDescription,
        blogImageCaption,
        slug: slugify(slug, { lower: true }),
        status,
        blogImage: req.file?.filename ?? "",
        templateId: Number(templateId),
        categoryId: Number(categoryId),
        subCategoryId: Number(subCategoryId),
      },
      include: {
        subCategory: {
          include: {
            category: {
              include: {
                template: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(httpStatusCodes.CREATED).json({
      status: 201,
      message: "Blog created successfully",
      data: {
        ...blog,
        blogImage: blogImageUrl || "",
      },
    });
  }
);

export const updateBlog = CatchAsync(
  async (req: createBlogRequest, res: Response, next: NextFunction) => {
    const { blogId } = req.params;

    let blog = await prisma.blog.findUnique({
      where: { id: Number(blogId) },
      include: {
        Sections: true,
        Highlight: {
          include: {
            HighlightSections: true,
          },
        },
      },
    });
    if (!blog) {
      return next(new NotFoundError("Blog not found"));
    }

    let blogImage = blog.blogImage;

    if (req.file) {
      await deleteFile(`./public/uploads/${blog.blogImage}`);
      blogImage = req.file.filename;
    }

    if (req.body.status) {
      return next(
        new BadRequestError("You can't update the status of the blog here")
      );
    }

    blog = await prisma.blog.update({
      where: { id: Number(blogId) },
      data: {
        ...req.body,
        blogImage: blogImage,
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
      message: "Blog updated successfully",
      data: {
        ...blog,
        blogImage: ImageUrlGenerator(req, blogImage),
        Sections: blog.Sections?.map((section: Sections) => ({
          ...section,
          sectionImage: ImageUrlGenerator(req, section.sectionImage),
        })),
        Highlight: blog.Highlight?.map((highlight: Highlight) => ({
          ...highlight,
          HighlightSections: highlight.HighlightSections?.map(
            (highlightSection: HighlightSections) => ({
              ...highlightSection,
              highlightSectionImage: ImageUrlGenerator(
                req,
                highlightSection.highlightSectionImage
              ),
            })
          ),
        })),
      },
    });
  }
);

export const updateBlogStatus = CatchAsync(
  async (req: createBlogRequest, res: Response) => {
    const { blogId } = req.params;

    const { status } = req.body;

    const blog = await prisma.blog.update({
      where: { id: Number(blogId) },
      data: {
        status,
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
      message: "Blog status updated successfully",
      data: {
        ...blog,
        blogImage: ImageUrlGenerator(req, blog.blogImage),
      },
      Sections: blog.Sections?.map((section: Sections) => ({
        ...section,
        sectionImage: ImageUrlGenerator(req, section.sectionImage),
      })),
      Highlight: blog.Highlight?.map((highlight) => ({
        ...highlight,
        HighlightSections: highlight.HighlightSections?.map(
          (highlightSection: HighlightSections) => ({
            ...highlightSection,
            highlightSectionImage: ImageUrlGenerator(
              req,
              highlightSection.highlightSectionImage
            ),
          })
        ),
      })),
    });
  }
);

export const getBlog = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { id: Number(blogId) },
      include: {
        Sections: true,
        Highlight: {
          include: {
            HighlightSections: true,
          },
        },
        subCategory: {
          select: {
            id: true,
            //   name: true,
            category: {
              select: {
                id: true,
                //   name: true,
                template: {
                  select: {
                    id: true,
                    //   name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!blog) {
      return next(new NotFoundError("Blog not found"));
    }

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Blog fetched successfully",
      data: {
        ...blog,
        blogImage: `${req.protocol}://${req.get("host")}/public/${
          blog.blogImage
        }`,
        Sections: blog.Sections?.map((section: Sections) => ({
          ...section,
          sectionImage: ImageUrlGenerator(req, section.sectionImage),
        })),
        Highlight: blog.Highlight?.map((highlight) => ({
          ...highlight,
          HighlightSections: highlight.HighlightSections?.map(
            (highlightSection: HighlightSections) => ({
              ...highlightSection,
              highlightSectionImage: ImageUrlGenerator(
                req,
                highlightSection.highlightSectionImage
              ),
            })
          ),
        })),
      },
    });
  }
);

export const getAllBlogs = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { templateId, categoryId, subCategoryId } = req.query;

    let queryClause = {};

    if (templateId) {
      queryClause = { ...queryClause, templateId: Number(templateId) };
    }

    if (categoryId) {
      queryClause = { ...queryClause, categoryId: Number(categoryId) };
    }
    if (subCategoryId) {
      queryClause = { ...queryClause, subCategoryId: Number(subCategoryId) };
    }

    console.log(queryClause);
    const blogs = await prisma.blog.findMany({
      where: queryClause,
      include: {
        Sections: true,
        Highlight: {
          include: {
            HighlightSections: true,
          },
        },
      },
    });

    if (!blogs) {
      return next(new NotFoundError("Blogs not found"));
    }

    res.status(200).json({
      status: 200,
      results: blogs.length,
      message: "Blogs fetched successfully",
      data: {
        blogs: blogs.map((blog) => ({
          ...blog,
          blogImage: ImageUrlGenerator(req, blog.blogImage),
          Sections: blog.Sections?.map((section: Sections) => ({
            ...section,
            sectionImage: ImageUrlGenerator(req, section.sectionImage),
          })),
          Highlight: blog.Highlight?.map((highlight) => ({
            ...highlight,
            HighlightSections: highlight.HighlightSections?.map(
              (highlightSection: HighlightSections) => ({
                ...highlightSection,
                highlightSectionImage: ImageUrlGenerator(
                  req,
                  highlightSection.highlightSectionImage
                ),
              })
            ),
          })),
        })),
      },
    });
  }
);

export const deleteBlog = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { id: Number(blogId) },
    });

    if (!blog) {
      return next(new NotFoundError("Blog not found"));
    }

    deleteFile(`./public/uploads/${blog.blogImage}`);

    await prisma.blog.delete({
      where: { id: Number(blogId) },
    });

    res.status(httpStatusCodes.OK).json({
      status: 200,
      message: "Blog deleted successfully",
    });
  }
);
