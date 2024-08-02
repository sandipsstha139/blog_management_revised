import express from "express";
import {
  createContact,
  deleteContact,
  getAllContacts,
} from "../controllers/contact.controller";

const router = express.Router();

router.route("/").get(getAllContacts).post(createContact);
router.route("/:contactId").delete(deleteContact);

export default router;
