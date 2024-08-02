import express from "express";
import {
  getMe,
  getUserById,
  login,
  register,
  logout,
} from "../controllers/user.controller";
import protect from "../middlewares/protect";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/getme").get(protect, getMe);
router.route("/:id").get(getUserById);
router.route("/logout").post(protect, logout);

export default router;
