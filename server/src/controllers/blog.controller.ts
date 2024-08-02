import { NextFunction, Request, Response } from "express";
import { Readable } from "stream";
import { NotFoundError } from "../errors/NotFoundError";
import prisma from "../database/database";
import { CatchAsync } from "../utils/CatchAsync";
import slugify from "slugify";
import AppError from "../errors/AppError";

enum Status {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

interface createBlogRequest extends Request {
  body: {
    titleTag: string;
    metaTag: string;
    blogName: string;
    blogDescription: string;
    blogTitle: string;
    titleDescription: string;
    slug: string;
    status: Status;
    blogImage: Readable;
  };
}

export const createBlog = CatchAsync(
  async (req: createBlogRequest, res: Response) => {
    console.log(req.body);
    const {
      titleTag,
      metaTag,
      blogName,
      blogDescription,
      blogTitle,
      titleDescription,
      slug,
      status,
    } = req.body;

    const { subCategoryId } = req.params;

    const blogImageUrl = `${req.protocol}://${req.get("host")}/public/${
      req.file?.filename
    }`;

    const blog = await prisma.blog.create({
      data: {
        titleTag,
        metaTag,
        blogName,
        blogDescription,
        blogTitle,
        titleDescription,
        slug: slugify(slug, { lower: true }),
        status,
        blogImage: blogImageUrl,
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

    res.status(201).json({
      status: 201,
      message: "Blog created successfully",
      data: blog,
    });
  }
);

export const updateBlog = CatchAsync(
  async (req: createBlogRequest, res: Response, next: NextFunction) => {
    const { blogId } = req.params;

    let blog = await prisma.blog.findUnique({ where: { id: Number(blogId) } });

    if (!blog) {
      throw new NotFoundError("Blog not found");
    }

    let blogImageUrl = blog.blogImage;

    if (req.file) {
      blogImageUrl = `${req.protocol}://${req.get("host")}/public/${
        req.file.filename
      }`;
    }

    if (req.body.status) {
      return next(
        new AppError("Use Change status route to update Status", 400)
      );
    }

    blog = await prisma.blog.update({
      where: { id: Number(blogId) },
      data: {
        ...req.body,
        blogImage: blogImageUrl,
      },
      include: {
        Sections: true,
      },
    });

    res.status(200).json({
      status: 200,
      message: "Blog updated successfully",
      data: blog,
    });
  }
);

export const updateBlogStatus = CatchAsync(
  async (req: createBlogRequest, res: Response) => {
    const { blogId } = req.params;

    const { status } = req.body;
    console.log(req.body);

    const blog = await prisma.blog.update({
      where: { id: Number(blogId) },
      data: {
        status,
      },
      include: {
        Sections: true,
      },
    });

    res.status(200).json({
      status: 200,
      message: "Blog status updated successfully",
      data: blog,
    });
  }
);

export const getBlog = CatchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;

  const blog = await prisma.blog.findUnique({
    where: { id: Number(blogId) },
    include: {
      Sections: true,
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
    throw new NotFoundError("Blog not found");
  }

  res.status(200).json({
    status: 200,
    message: "Blog fetched successfully",
    data: blog,
  });
});

export const getAllBlogs = CatchAsync(async (req: Request, res: Response) => {
  const blogs = await prisma.blog.findMany({
    include: {
      Sections: true,
    },
  });

  if (!blogs) {
    throw new NotFoundError("No blogs found");
  }

  res.status(200).json({
    status: 200,
    results: blogs.length,
    message: "Blogs fetched successfully",
    data: blogs,
  });
});

export const deleteBlog = CatchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;

  const blog = await prisma.blog.delete({
    where: { id: Number(blogId) },
  });

  if (!blog) {
    throw new NotFoundError("Blog not found");
  }

  res.status(200).json({
    status: 200,
    message: "Blog deleted successfully",
  });
});
