// controllers/budgetController.js
import { Budget } from "../models/index.js";

export const createBudget = async (req, res) => {
  try {
    const { month, year, amount } = req.body;
    const userId = req.user.userId;

    const budget = await Budget.create({
      userId,
      month,
      year,
      amount,
    });

    res.status(201).json(budget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create budget" });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const userId = req.user.userId;
    const year = req.query.year || new Date().getFullYear(); // default to current year

    const budgets = await Budget.findAll({
      where: {
        userId,
        year: year.toString(),
      },
      order: [["month", "ASC"]],
    });

    res.json(budgets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
};
