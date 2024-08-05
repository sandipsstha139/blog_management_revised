import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controller";

const router = express.Router();

router.route("/").post(createCategory).get(getCategories);
router
  .route("/:categoryId")
  .patch(updateCategory)
  .get(getCategory)
  .delete(deleteCategory);

export default router;
