import express from "express";

import {
  createHighlight,
  deleteHighlight,
  getAllHighlights,
  getHighlight,
  updateHighlight,
} from "../controllers/highlight.controller";

const router = express.Router();

router.route("/").post(createHighlight).get(getAllHighlights);
router
  .route("/:highlightId")
  .get(getHighlight)
  .patch(updateHighlight)
  .delete(deleteHighlight);

export default router;
