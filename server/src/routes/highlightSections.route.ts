import express from "express";
import { upload } from "../utils/multer";
import {
  createHighlightSection,
  deleteHighlightSection,
  getAllHighlightSections,
  getHighlightSection,
  updateHighlightSection,
} from "../controllers/highlightSections.controller";

const router = express.Router();

router
  .route("/")
  .get(getAllHighlightSections)
  .post(upload.single("highlightSectionImage"), createHighlightSection);
router
  .route("/:highlightSectionId")
  .get(getHighlightSection)
  .patch(upload.single("highlightSectionImage"), updateHighlightSection)
  .delete(deleteHighlightSection);

export default router;
