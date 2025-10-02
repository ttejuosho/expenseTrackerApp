import express from "express";
import {
  getExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.post("/", addExpense);
router.delete("/:id", deleteExpense);

export default router;
