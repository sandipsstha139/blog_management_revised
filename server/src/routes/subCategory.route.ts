import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
} from "../controllers/subCategory.controller";

const router = express.Router();

router.route("/").post(createSubCategory).get(getSubCategories);
router
  .route("/:subCategoryId")
  .get(getSubCategory)
  .patch(updateSubCategory)
  .delete(deleteSubCategory);

export default router;
