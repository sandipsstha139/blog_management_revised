import express from "express";
import {
  createTemplate,
  deleteTemplate,
  getTemplate,
  getTemplates,
  updateTemplate,
} from "../controllers/template.controller";

const router = express.Router();

router.route("/").post(createTemplate).get(getTemplates);
router
  .route("/:templateId")
  .patch(updateTemplate)
  .get(getTemplate)
  .delete(deleteTemplate);

export default router;
