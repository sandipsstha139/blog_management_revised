import express from "express";

import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  updateBlogStatus,
} from "../controllers/blog.controller";
import { upload } from "../utils/multer";

const router = express.Router();

router.route("/").get(getAllBlogs);
router
  .route("/:blogId")
  .get(getBlog)
  .patch(upload.single("blogImage"), updateBlog)
  .delete(deleteBlog);
router.route("/update-status/:blogId").patch(updateBlogStatus);
router
  .route("/create/:templateId/:categoryId/:subCategoryId")
  .post(upload.single("blogImage"), createBlog);

router
  .route("/create/:templateId/:subCategoryId")
  .post(upload.single("blogImage"), createBlog);

export default router;
