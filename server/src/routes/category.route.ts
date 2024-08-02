import express from "express";
import { createCategory } from "../controllers/category.controller";

const router = express.Router();

router.route("/:templateId").post(createCategory);

export default router;
