// routes/budgetRoutes.js
import express from "express";
import { authenticate } from "../middleware/auth.js";
import { createBudget, getBudgets } from "../controllers/budgetController.js";

const router = express.Router();

router.post("/", authenticate, createBudget);
router.get("/", authenticate, getBudgets); // GET /budgets?year=2025

export default router;
