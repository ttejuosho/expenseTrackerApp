import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  getExpenses,
  getAllExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

router.get("/", authenticate, getExpenses);
router.get("/all", getAllExpenses);
router.get("/:expenseId", authenticate, getExpenseById);
router.post("/", authenticate, addExpense);
router.delete("/:expenseId", authenticate, deleteExpense);

export default router;
