import express from "express";
import { createSubCategory } from "../controllers/subCategory.controller";

const router = express.Router();

router.route("/:categoryId").post(createSubCategory);

export default router;
