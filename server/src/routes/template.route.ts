import express from "express";
import { createTemplate } from "../controllers/template.controller";

const router = express.Router();

router.route("/").post(createTemplate);

export default router;
