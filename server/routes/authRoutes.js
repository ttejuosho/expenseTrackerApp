import express from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getCurrentUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", getCurrentUser);

export default router;
