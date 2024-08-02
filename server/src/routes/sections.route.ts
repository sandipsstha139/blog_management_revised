import express from "express";
import {
  createSection,
  deleteSection,
  getAllSections,
  getSection,
  updateSection,
} from "../controllers/sections.controller";
import { upload } from "../utils/multer";

const router = express.Router();

router
  .route("/")
  .get(getAllSections)
  .post(upload.single("sectionImage"), createSection);
router
  .route("/:sectionId")
  .get(getSection)
  .patch(upload.single("sectionImage"), updateSection)
  .delete(deleteSection);

export default router;
