import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  getExpenses,
  getAllExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
  getMonthlySummary,
  getSummaryByCategory,
} from "../controllers/expenseController.js";

const router = express.Router();

router.get("/", authenticate, getExpenses);
router.post("/", authenticate, addExpense);
router.get("/monthlySummary", authenticate, getMonthlySummary);
router.get("/monthlySummaryByCategory", authenticate, getSummaryByCategory);
router.get("/all", getAllExpenses);
router.get("/:expenseId", authenticate, getExpenseById);
router.delete("/:expenseId", authenticate, deleteExpense);

export default router;
