import express from "express";
import protect from "../middlewares/auth.middleware.js";

import {
  signup,
  login,
  logout,
  checkAuth,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/me", protect, checkAuth);

export default router;
