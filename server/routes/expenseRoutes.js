import express from "express";
import {
  getExpenses,
  getAllExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

router.get("/", getExpenses);
router.get("/all", getAllExpenses);
router.get("/:expenseId", getExpenseById);
router.post("/", addExpense);
router.delete("/:expenseId", deleteExpense);

export default router;
