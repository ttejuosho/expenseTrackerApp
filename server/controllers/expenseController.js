import Expense from "../models/Expense.js";
import Category from "../models/Category.js";

// Get a single expense by ID
export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ["id", "name", "color"] }],
    });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    // Flatten category
    const { Category: categoryData, ...expenseData } = expense.toJSON();
    const flattened = {
      ...expenseData,
      categoryId: categoryData.id,
      categoryName: categoryData.name,
      categoryColor: categoryData.color,
    };

    res.json(flattened);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET all expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [{ model: Category, attributes: ["id", "name", "color"] }],
      order: [["date", "DESC"]],
    });

    // Flatten category into the expense object
    const flattened = expenses.map((exp) => {
      const { Category, ...expenseData } = exp.toJSON();
      return {
        ...expenseData,
        categoryId: Category.id,
        categoryName: Category.name,
        categoryColor: Category.color,
      };
    });

    res.json(flattened);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create new expense
export const addExpense = async (req, res) => {
  try {
    const { amount, categoryId, date, notes } = req.body;
    if (!amount || !date || !categoryId) {
      return res
        .status(400)
        .json({ error: "Amount, date, and categoryId are required" });
    }
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const expense = await Expense.create({ amount, categoryId, date, notes });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Expense not found" });

    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
};
